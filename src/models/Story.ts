export interface StorySummaryDto {
  id: string;
  title: string;
  selected: boolean;
  status: UserStoryStatus;
}

export interface CreateStoryDto {
  roomId: string;
  title: string;
}

export enum UserStoryStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  REVEALED = 'REVEALED',
}
