import axios from '@/axios';
import { RoomResponseDto } from '@/models/Room';
import { CreateEstimationDto } from '@/models/Story';
import { AxiosResponse } from 'axios';

export const EstimationAPI = {
  crateEstimation: async (
    createEstimationDto: CreateEstimationDto
  ): Promise<AxiosResponse<RoomResponseDto>> => {
    return await axios.post<RoomResponseDto>(
      '/estimation',
      createEstimationDto
    );
  },
};
