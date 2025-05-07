import socket from './index';
import { EstimationReadyDto } from './models/estimation.models';
import { JoinRoomDto } from './models/room.models';
import {
  CreateStoryDto,
  SelectStoryDto,
  StartEstimationDto,
} from './models/story.models';
import { SOCKET_EVENTS } from './socket-events';

export const SocketEventHandler = {
  handleCreateRoom: (joinRoomDto: JoinRoomDto) => {
    socket.emit(SOCKET_EVENTS.CREATE_ROOM, joinRoomDto);
  },
  handleJoinRoom: (joinRoomDto: JoinRoomDto) => {
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, joinRoomDto);
  },
  handleCreateStory: (createStoryDto: CreateStoryDto) => {
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, createStoryDto);
  },
  handleSelectStory: (selectStoryDto: SelectStoryDto) => {
    socket.emit(SOCKET_EVENTS.SELECT_STORY, selectStoryDto);
  },
  handleStartEstimation: (startEstimationDto: StartEstimationDto) => {
    socket.emit(SOCKET_EVENTS.START_ESTIMATION, startEstimationDto);
  },
  handleEstimationReady: (estimationReadyDto: EstimationReadyDto) => {
    socket.emit(SOCKET_EVENTS.READY, estimationReadyDto);
  },
};
