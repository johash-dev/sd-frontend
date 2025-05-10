import { UserResponseDto } from './User';

export interface StorySummaryDto {
  id: string;
  title: string;
  selected: boolean;
  status: UserStoryStatus;
  estimations?: EstimationDto[];
}

export interface EstimationDto {
  storyId: string;
  user: UserResponseDto;
  optimistic: number | null;
  realistic: number | null;
  pessimistic: number | null;
  ready: boolean;
}

export interface CreateStoryDto {
  roomId: string;
  title: string;
}

export interface SelectStoryDto {
  storyId: string;
  roomCode: string;
}

export interface StartStoryEstimationDto {
  roomId: string;
  storyId: string;
}

export interface RevealStoryEstimateDto {
  roomId: string;
  storyId: string;
}

export enum UserStoryStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  REVEALED = 'REVEALED',
}

export interface CreateEstimationDto {
  roomId: string;
  storyId: string;
  optimistic: number;
  realistic: number;
  pessimistic: number;
  ready: boolean;
}
