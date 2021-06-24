import { makeAutoObservable, runInAction } from 'mobx';
import { User } from '../interface/user.interface';
import { UserService } from '../service/user.service';

export class UserStore {
  public _id: string | null = null;
  public email: string | null = null;
  public phoneNumber: string | null = null;
  public username: string | null = null;

  public userService: UserService;

  public isLoading = false;

  constructor (user?: User) {
    if(user) this.initUser(user);
    this.userService = UserService.getInstance();

    makeAutoObservable(this);
  }

  initUser(user: User) {
    this._id = user._id;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.username = user.username;
  }
}
