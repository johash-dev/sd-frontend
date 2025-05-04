import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RoomAPI } from '@/api/room-api';
import {
  RoomDto,
  Room,
  RoomDetail,
  Story,
  StoryDto,
  StoryDetail,
  UpdateStoryDto,
  EstimationDto,
} from '@/models/Room';
import { StoryAPI } from '@/api/story-api';

export interface RoomState {
  room: Room | null;
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
  async (roomDto: RoomDto) => {
    const response = await RoomAPI.createRoom(roomDto);
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

export const creatStoryForRoom = createAsyncThunk(
  'room/createStory',
  async (storyDto: StoryDto) => {
    const response = await StoryAPI.createStory(storyDto);
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
  reducers: {
    createNewRoom: (state, action: PayloadAction<Room>) => {
      state.room = action.payload;
    },
    setRoomDetail: (state, action: PayloadAction<RoomDetail>) => {
      state.roomDetail = action.payload;
    },
    updateStory: (state, action: PayloadAction<StoryDetail>) => {
      if (state.roomDetail) {
        state.roomDetail.stories.forEach((story) => {
          if (story.id === action.payload.id) {
            story.status = action.payload.status;
            story.title = action.payload.title;
          }
        });
      }
      if (action.payload.selected) {
        state.selectedStory = action.payload;
      }
    },
    addStoryToRoom: (state, action: PayloadAction<Story>) => {
      if (state.roomDetail) {
        const exists = state.roomDetail.stories.some(
          (story) => story.id === action.payload.id
        );

        if (!exists) {
          state.roomDetail.stories.push(action.payload);
        }
      }
    },
    addEstimationToStory: (state, action: PayloadAction<EstimationDto>) => {
      console.log('ACTION PAYLOAD', action.payload);

      if (state.selectedStory) {
        state.selectedStory.estimations = [
          ...state.selectedStory.estimations,
          action.payload,
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.room = action.payload;
    });
    builder.addCase(getRoom.fulfilled, (state, action) => {
      state.roomDetail = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  createNewRoom,
  setRoomDetail,
  addStoryToRoom,
  updateStory,
  addEstimationToStory,
} = roomSlice.actions;

export default roomSlice.reducer;
