import * as express from "express";
import * as bcrypt from "bcrypt";
import Controller from "@/interfaces/controller.interface";
import { Login, Register } from "./auth.interface";
import authModel from "./auth.model";
import Response from "@/helpers/response.helper";

class AuthController implements Controller {
  public path = "/auth";
  public router = express.Router();
  private auth = authModel;
  private saltRounds: number = 10;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.Login);
    this.router.post(`${this.path}/register`, this.Register);
  }

  private Login = async (req: express.Request, res: express.Response) => {
    const { username, password }: Login = req.body;
    const user = await this.auth.findOne({ username });
    if (!user) {
      return Response.error(res, { message: "User name does not exist" }, 403);
    }
    const isPasswordCorrect = await bcrypt.compare(
      password + "",
      user.password
    );
    if (!isPasswordCorrect) {
      return Response.error(res, { message: "Wrong password" }, 403);
    }

    return Response.success(res, { user }, 201);
  };

  private Register = async (req: express.Request, res: express.Response) => {
    const { username, password, confirmPassword }: Register = req.body;

    const user = await this.auth.findOne({ username });
    if (user) {
      return Response.error(res, { message: "Username has been used" }, 403);
    }
    if (password !== confirmPassword) {
      return Response.error(res, { message: "Password not matched" }, 403);
    }
    const hashPassword = await bcrypt.hash(password, this.saltRounds);
    const newUser = new this.auth({
      username,
      password: hashPassword
    });
    await newUser.save();
    return Response.success(res, { user: newUser }, 201);
  };
}
export default AuthController;
