import User from "../entities/Users";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";

class UserRepository {
  private static usersRepository = AppDataSource.getRepository(User);

  static async getUsers(): Promise<IUser[]> {
    return this.usersRepository.find();
  }
}

export default UserRepository;