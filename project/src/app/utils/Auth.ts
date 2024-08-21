import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { ITokenData } from "../interfaces/ILogin";
import ErrorExtension from "../utils/ErrorExtension";

dotenv.config();

const SECRET = "meusegredo";

const jwtDefaultConfig: SignOptions = {
  expiresIn: "1h",
  algorithm: "HS256",
};

class Auth {
  constructor(private jwtConfig?: SignOptions) {
    if (!jwtConfig) {
      this.jwtConfig = jwtDefaultConfig;
    }
  }

  public JwtGenerator(payload: ITokenData) {
    return jwt.sign(payload, SECRET, this.jwtConfig);
  }

  public async authenticateToken(token: string) {
    if (!token) {
      throw new ErrorExtension(401, "Sem Token");
    }
    try {
      const validateJwt = jwt.verify(token, SECRET, this.jwtConfig);
      console.log(validateJwt);

      return validateJwt;
    } catch (error) {
      throw new ErrorExtension(401, "Token Inválido");
    }
  }
}

export default Auth;