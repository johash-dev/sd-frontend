import axios from '@/axios';
import { Room, RoomDto } from '@/models/Room';
import { AxiosResponse } from 'axios';

export const RoomAPI = {
  createRoom: async (roomDto: RoomDto): Promise<AxiosResponse<Room>> => {
    return await axios.post<Room>('/room', roomDto);
  },
};
