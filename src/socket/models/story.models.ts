import { StorySummaryDto } from '@/models/Story';

export interface CreateStoryDto {
  roomCode: string;
  story: StorySummaryDto;
}
