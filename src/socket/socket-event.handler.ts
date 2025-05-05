import socket from './index';
import { JoinRoomDto } from './models/room.models';
import { SOCKET_EVENTS } from './socket-events';

export const SocketEventHandler = {
  handleCreateRoom: (joinRoomDto: JoinRoomDto) => {
    socket.emit(SOCKET_EVENTS.CREATE_ROOM, joinRoomDto);
  },
  handleJoinRoom: (joinRoomDto: JoinRoomDto) => {
    console.log('EMIT JOIN_ROOM');

    socket.emit(SOCKET_EVENTS.JOIN_ROOM, joinRoomDto);
  },
};
