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

export interface ReEstimateDto {
  roomCode: string;
  storyId: string;
}

export interface StartedEstimationDto {
  storyId: string;
}

export interface RevealStoryEstimateDto {
  roomCode: string;
  storyId: string;
}

export interface RevealVotesDto {
  roomCode: string;
  storyId: string;
}
