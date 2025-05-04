import axios from '@/axios';
import { Story, StoryDto } from '@/models/Room';
import { AxiosResponse } from 'axios';

export const StoryAPI = {
  createStory: async (storyDto: StoryDto): Promise<AxiosResponse<Story>> => {
    return await axios.post<Story>('/story', storyDto);
  },
};
