import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RoomAPI } from '@/api/room-api';
import { RoomDto, Room, RoomDetail } from '@/models/Room';

export interface RoomState {
  room: Room | null;
  roomDetail: RoomDetail | null;
}

const initialState: RoomState = {
  room: null,
  roomDetail: null,
};

export const createRoom = createAsyncThunk(
  'room/createRoom',
  async (roomDto: RoomDto) => {
    const response = await RoomAPI.createRoom(roomDto);
    return response.data;
  }
);

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    createNewRoom: (state, action: PayloadAction<Room>) => {
      state.room = action.payload;
    },
    setRoomDetail: (state, action: PayloadAction<RoomDetail>) => {
      state.roomDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.room = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { createNewRoom, setRoomDetail } = roomSlice.actions;

export default roomSlice.reducer;
