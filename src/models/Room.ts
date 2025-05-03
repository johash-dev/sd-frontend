import { User } from './Auth';

export interface RoomDto {
  title: string;
}

export interface Room {
  id: number;
  roomCode: string;
  title: string;
  owner: RoomOwner;
}

export interface RoomOwner {
  id: number;
  firstName: string;
  email: string;
  password: string;
}

export interface RoomDetail {
  id: number;
  owner: RoomOwner;
  participants: Participant[];
  roomCode: string;
  stories: Array<string>;
  title: string;
}

export interface Participant {
  id: number;
  user: User;
}
