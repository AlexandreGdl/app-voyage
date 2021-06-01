import { Token } from "../../auth/auth.interface";
import { ApiService } from "../../common/services/api.service";
import { loginUserDto } from "../dto/user.dto";

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
    return await this.apiService.request('post', '/users/login', { body: user });
  };

}