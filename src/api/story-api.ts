import axios from '@/axios';
import { RoomResponseDto, StoryDetail, UpdateStoryDto } from '@/models/Room';
import {
  CreateStoryDto,
  SelectStoryDto,
  StartStoryEstimationDto,
  StorySummaryDto,
} from '@/models/Story';
import { AxiosResponse } from 'axios';

export const StoryAPI = {
  createStory: async (
    createStoryDto: CreateStoryDto
  ): Promise<AxiosResponse<StorySummaryDto>> => {
    return await axios.post<StorySummaryDto>('/story', createStoryDto);
  },
  selectStory: async (
    selectStoryDto: SelectStoryDto
  ): Promise<AxiosResponse<RoomResponseDto>> => {
    return await axios.patch<RoomResponseDto>('/story/select', selectStoryDto);
  },
  startStoryEstimation: async (
    startStoryEstimationDto: StartStoryEstimationDto
  ): Promise<AxiosResponse<RoomResponseDto>> => {
    return await axios.patch<RoomResponseDto>(
      '/story/startEstimation',
      startStoryEstimationDto
    );
  },
  updateStory: async (
    updateStoryDto: UpdateStoryDto
  ): Promise<AxiosResponse<StoryDetail>> => {
    return await axios.patch<StoryDetail>('/story', updateStoryDto);
  },
};
