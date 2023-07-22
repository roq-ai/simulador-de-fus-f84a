import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GameProgressInterface {
  id?: string;
  race_won: number;
  car_transformation: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface GameProgressGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
