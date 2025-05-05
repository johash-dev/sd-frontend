export interface StorySummaryDto {
  id: string;
  title: string;
  selected: boolean;
  status: UserStoryStatus;
}

export enum UserStoryStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  REVEALED = 'REVEALED',
}
