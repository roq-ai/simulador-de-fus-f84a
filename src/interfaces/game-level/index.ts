import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GameLevelInterface {
  id?: string;
  level_name: string;
  difficulty: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface GameLevelGetQueryInterface extends GetQueryInterface {
  id?: string;
  level_name?: string;
  user_id?: string;
}
