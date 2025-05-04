import { User } from './Auth';

export interface RoomDto {
  title: string;
}

export interface StoryDto {
  roomId: string;
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
  id: string;
  owner: RoomOwner;
  participants: Participant[];
  roomCode: string;
  stories: Array<Story>;
  title: string;
}

export interface Participant {
  id: number;
  user: User;
}

export interface Story {
  id: string;
  title: string;
  status: UserStoryStatus;
  roomId: string;
  createdAt: Date;
}

export enum UserStoryStatus {
  PENDING = 'pending',
  IN_ESTIMATION = 'in_estimation',
  ESTIMATED = 'estimated',
}
