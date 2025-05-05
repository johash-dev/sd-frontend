import axios from '@/axios';
import { CreateRoomDto, RoomResponseDto } from '@/models/Room';
import { JoinRoomResponseDto } from '@/socket/models/room.models';
import { AxiosResponse } from 'axios';

export const RoomAPI = {
  createRoom: async (
    createRoomDto: CreateRoomDto
  ): Promise<AxiosResponse<RoomResponseDto>> => {
    return await axios.post<RoomResponseDto>('/room', createRoomDto);
  },
  joinRoom: async (
    roomCode: string
  ): Promise<AxiosResponse<JoinRoomResponseDto>> => {
    return await axios.post<JoinRoomResponseDto>(`/room/join/${roomCode}`);
  },
  getRoom: async (
    roomCode: string
  ): Promise<AxiosResponse<RoomResponseDto>> => {
    return await axios.get<RoomResponseDto>(`/room/${roomCode}`);
  },
};
