import socket from './index';
import { JoinRoomDto } from './models/room.models';
import { CreateStoryDto } from './models/story.models';
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
};
