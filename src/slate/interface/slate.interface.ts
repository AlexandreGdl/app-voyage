import { User } from "../../user/interface/user.interface";

export interface Slate {
  _id: string;
  donorId: string;
  recipientId: string;
  amount: number;
  completed: boolean;
  title: string;
  voyageId: string;
  donorUser: User;
  recipientUser: User;
  date: Date;
}