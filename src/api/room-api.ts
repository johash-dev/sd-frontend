import axios from '@/axios';
import { Room, RoomDetail, RoomDto } from '@/models/Room';
import { AxiosResponse } from 'axios';

export const RoomAPI = {
  createRoom: async (roomDto: RoomDto): Promise<AxiosResponse<Room>> => {
    return await axios.post<Room>('/room', roomDto);
  },
  getRoom: async (roomCode: string): Promise<AxiosResponse<RoomDetail>> => {
    return await axios.get<RoomDetail>(`/room/${roomCode}`);
  },
};
