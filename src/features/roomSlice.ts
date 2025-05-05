import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RoomAPI } from '@/api/room-api';
import {
  RoomDetail,
  StoryDetail,
  UpdateStoryDto,
  CreateRoomDto,
  RoomResponseDto,
} from '@/models/Room';
import { StoryAPI } from '@/api/story-api';
import { SocketEventHandler } from '@/socket/socket-event.handler';
import { JoinRoomDto } from '@/socket/models/room.models';
import { CreateStoryDto } from '@/models/Story';

export interface RoomState {
  room: RoomResponseDto | null;
  roomDetail: RoomDetail | null;
  selectedStory: StoryDetail | null;
  revealResults: boolean;
}

const initialState: RoomState = {
  room: null,
  roomDetail: null,
  selectedStory: null,
  revealResults: false,
};

export const createRoom = createAsyncThunk(
  'room/createRoom',
  async (createRoomDto: CreateRoomDto) => {
    const response = await RoomAPI.createRoom(createRoomDto);
    return response.data;
  }
);

export const joinRoom = createAsyncThunk(
  'room/joinRoom',
  async (roomCode: string) => {
    const response = await RoomAPI.joinRoom(roomCode);
    return response.data;
  }
);

export const getRoom = createAsyncThunk(
  'room/getRoom',
  async (roomCode: string) => {
    const response = await RoomAPI.getRoom(roomCode);
    return response.data;
  }
);

export const createStory = createAsyncThunk(
  'room/createStory',
  async (createStoryDto: CreateStoryDto) => {
    const response = await StoryAPI.createStory(createStoryDto);
    return response.data;
  }
);

export const updateRoomStory = createAsyncThunk(
  'room/updateStory',
  async (storyDto: UpdateStoryDto) => {
    console.log(storyDto);

    const response = await StoryAPI.updateStory(storyDto);
    return response.data;
  }
);

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createRoom.fulfilled, (state, { payload }) => {
      state.room = payload;
      const createRoomDto: JoinRoomDto = {
        roomCode: payload.roomCode,
        user: payload.owner,
      };
      SocketEventHandler.handleCreateRoom(createRoomDto);
    });
    builder.addCase(joinRoom.fulfilled, (state, { payload }) => {
      state.room = payload.room;
      const joinRoomDto: JoinRoomDto = {
        roomCode: payload.room.roomCode,
        user: payload.user,
      };
      SocketEventHandler.handleJoinRoom(joinRoomDto);
    });
    builder.addCase(getRoom.fulfilled, (state, { payload }) => {
      state.room = payload;
    });
    builder.addCase(createStory.fulfilled, (state, { payload }) => {
      if (payload && state.room) {
        SocketEventHandler.handleCreateStory({
          roomCode: state.room.roomCode,
          story: payload,
        });
      }
    });
  },
});

// export const {} = roomSlice.actions;

export default roomSlice.reducer;
