import AsyncStorage from "@react-native-community/async-storage";
import { decode } from 'base-64';
import { Token } from "../../auth/auth.interface";
import { ApiService } from "../../common/services/api.service";
import { CreateUserDto, loginUserDto } from "../dto/user.dto";
import { User } from "../interface/user.interface";

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

  public async getUserConnected(): Promise<User | false> {
    const token = await AsyncStorage.getItem('token');
    if (!token) return false;

    const jwtToken = token.split(' ')[1].split('.')[1];

    const user = JSON.parse(decode(jwtToken)) as User

    try {
      const userAuth = await this.apiService.request<User>('get', `/users/${user._id}`, { headers: { 'Authorization': `${token}` } });
      return userAuth;
    } catch (err) {
      return false;
    }
  };

}