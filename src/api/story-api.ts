import axios from '@/axios';
import { StoryDetail, UpdateStoryDto } from '@/models/Room';
import { CreateStoryDto, StorySummaryDto } from '@/models/Story';
import { AxiosResponse } from 'axios';

export const StoryAPI = {
  createStory: async (
    createStoryDto: CreateStoryDto
  ): Promise<AxiosResponse<StorySummaryDto>> => {
    return await axios.post<StorySummaryDto>('/story', createStoryDto);
  },
  updateStory: async (
    updateStoryDto: UpdateStoryDto
  ): Promise<AxiosResponse<StoryDetail>> => {
    return await axios.patch<StoryDetail>('/story', updateStoryDto);
  },
};
