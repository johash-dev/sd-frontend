import axios from '@/axios';
import { Story, StoryDetail, StoryDto, UpdateStoryDto } from '@/models/Room';
import { AxiosResponse } from 'axios';

export const StoryAPI = {
  createStory: async (storyDto: StoryDto): Promise<AxiosResponse<Story>> => {
    return await axios.post<Story>('/story', storyDto);
  },
  updateStory: async (
    updateStoryDto: UpdateStoryDto
  ): Promise<AxiosResponse<StoryDetail>> => {
    return await axios.patch<StoryDetail>('/story', updateStoryDto);
  },
};
