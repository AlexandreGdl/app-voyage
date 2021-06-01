import { Token } from "../../auth/auth.interface";
import { ApiService } from "../../common/services/api.service";
import { CreateUserDto, loginUserDto } from "../dto/user.dto";

export class UserService {
  private static instance: UserService;

  private apiService: ApiService;

  constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  public async login(user: loginUserDto): Promise<Token> {
    try {
      const token = await this.apiService.request<Token>('post', '/users/login', { body: user });
      return token;
    } catch (err) {
      throw new Error(err);
    }
  };

  public async signup(user: CreateUserDto): Promise<Token> {
    try {
      const token = await this.apiService.request<Token>('post', '/users/signup', { body: user });
      return token;
    } catch (err) {
      throw new Error(err);
    }
  };

}