import { ValidationErrorItem } from "joi";
import User from "../entities/Users";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";
import ErrorExtension from "../utils/ErrorExtension";
import userSchemaValidation from "../utils/validations/userValidationSchema";
import { ILogin } from "../interfaces/ILogin";
import Auth from "../utils/Auth";

class UserRepository {
  private static usersRepository = AppDataSource.getRepository(User);

  static async getUsers(): Promise<IUser[]> {
    return this.usersRepository.find();
  }

  static async newUser(user: IUser): Promise<IUser> {
    const { error } = userSchemaValidation.validate(user, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.map(
        (detail: ValidationErrorItem) => detail.message
      );
      throw new ErrorExtension(400, validationErrors.join(", "));
    }

    const createdUser = await this.usersRepository.save(user);
    return createdUser as IUser;
  }

  static async getUserById(id: number): Promise<IUser | null> {
    return this.usersRepository.findOneBy({ id });
  }

  static async updateUser(id: number, user: IUser): Promise<IUser> {
    const { error } = userSchemaValidation.validate(user, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.map(
        (detail: ValidationErrorItem) => detail.message
      );
      throw new ErrorExtension(400, validationErrors.join(", "));
    }

    await this.usersRepository.update(id, user);

    return user as IUser;
  }

  static async removeUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  static async getUserEmail(email: string): Promise<IUser | null> {
    return this.usersRepository.findOneBy({ email });
  }

  static async auth(loginData: ILogin): Promise<string> {
    const { email, password } = loginData;

    if (!email || !password)
      throw new ErrorExtension(401, "Dados faltando!");

    const user = await this.getUserEmail(email);
    if (!user) throw new ErrorExtension(404, "Usuário não existe!");

    if (password !== user.password) {
      throw new ErrorExtension(401, "E-mail ou Senha inválidos!");
    }

    const payload = {
      name: user.name,
      email: user.email,
    };

    const tokenGenerator = new Auth();
    const token = tokenGenerator.JwtGenerator(payload);
    return token;
  }
}

export default UserRepository;