import { UserDto } from './user.models';

export interface EstimationReadyDto {
  roomCode: string;
  user: UserDto;
}
