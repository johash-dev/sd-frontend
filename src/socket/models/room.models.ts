import { RoomResponseDto } from '@/models/Room';
import { UserDto } from './user.models';

export interface JoinRoomDto {
  roomCode: string;
  user: UserDto;
}

export interface JoinRoomResponseDto {
  room: RoomResponseDto;
  user: UserDto;
}
