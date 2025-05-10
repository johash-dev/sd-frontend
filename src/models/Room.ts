import { User } from './Auth';
import { StorySummaryDto, UserStoryStatus } from './Story';
import { UserResponseDto } from './User';

export interface CreateRoomDto {
  title: string;
}

export interface RoomResponseDto {
  id: string;
  title: string;
  description?: string;
  roomCode: string;
  owner: UserResponseDto;
  participants: UserResponseDto[];
  stories: StorySummaryDto[];
}
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
  participants: User[];
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
  updatedAt: Date;
  selected: boolean;
}

export interface EstimationDto {
  storyId: string;
  userId: string;
  optimistic: number | null;
  realistic: number | null;
  pessimistic: number | null;
  ready: boolean;
}

export interface Estimation {
  id: string;
  storyId: string;
  userId: string;
  optimistic: number;
  realistic: number;
  pessimistic: number;
  ready: boolean;
}

export interface StoryDetail {
  id: string;
  title: string;
  status: UserStoryStatus;
  roomId: string;
  createdAt: Date;
  updatedAt: Date;
  selected: boolean;
  estimations: EstimationDto[];
}

export interface UpdateStoryDto {
  id: string;
  roomId: string;
  title?: string;
  selected?: boolean;
  status?: UserStoryStatus;
  optimistic?: number;
  realistic?: number;
  pessimistic?: number;
  ready?: boolean;
}
