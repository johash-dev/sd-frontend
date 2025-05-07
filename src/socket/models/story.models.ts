import { StorySummaryDto } from '@/models/Story';

export interface CreateStoryDto {
  roomCode: string;
  story: StorySummaryDto;
}

export interface SelectStoryDto {
  roomCode: string;
  storyId: string;
}

export interface StartEstimationDto {
  roomCode: string;
  storyId: string;
}

export interface StartedEstimationDto {
  storyId: string;
}
