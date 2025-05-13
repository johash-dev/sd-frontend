import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
import {
  CreateStoryDto,
  ReEstimateDto,
  RevealStoryEstimateDto,
  SelectStoryDto,
  StartStoryEstimationDto,
  StorySummaryDto,
  UserStoryStatus,
} from '@/models/Story';
import {
  SelectStoryDto as SelectStorySocketDto,
  StartedEstimationDto,
} from '@/socket/models/story.models';

export interface RoomState {
  room: RoomResponseDto | null;
  roomDetail: RoomDetail | null;
  selectedStory: StoryDetail | null;
  revealResults: boolean;
  userRooms: RoomResponseDto[];
}

const initialState: RoomState = {
  room: null,
  roomDetail: null,
  selectedStory: null,
  revealResults: false,
  userRooms: [],
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

export const getAllRooms = createAsyncThunk('room/getAllRooms', async () => {
  const response = await RoomAPI.getAllRooms();
  return response.data;
});

export const createStory = createAsyncThunk(
  'room/createStory',
  async (createStoryDto: CreateStoryDto) => {
    const response = await StoryAPI.createStory(createStoryDto);
    return response.data;
  }
);

export const selectStory = createAsyncThunk(
  'room/selectStory',
  async (selectStoryDto: SelectStoryDto) => {
    const response = await StoryAPI.selectStory(selectStoryDto);
    return response.data;
  }
);

export const startStoryEstimation = createAsyncThunk(
  'room/startStoryEstimation',
  async (startStoryEstimationDto: StartStoryEstimationDto) => {
    const response = await StoryAPI.startStoryEstimation(
      startStoryEstimationDto
    );
    return response.data;
  }
);

export const reEstimateStory = createAsyncThunk(
  'room/reEstimateStory',
  async (reEstimateDto: ReEstimateDto) => {
    const response = await StoryAPI.reEstimateStory(reEstimateDto);
    return response.data;
  }
);

export const revealEstimate = createAsyncThunk(
  'room/revealEstimations',
  async (revealStoryEstimateDto: RevealStoryEstimateDto) => {
    const response = await StoryAPI.revealStoryEstimate(revealStoryEstimateDto);
    return response.data;
  }
);

export const updateRoomStory = createAsyncThunk(
  'room/updateStory',
  async (storyDto: UpdateStoryDto) => {
    const response = await StoryAPI.updateStory(storyDto);
    return response.data;
  }
);

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    selectStoryInRoom: (state, action: PayloadAction<SelectStorySocketDto>) => {
      if (state.room?.roomCode === action.payload.roomCode) {
        state.room.stories = state.room.stories.map((story) => {
          if (story.id === action.payload.storyId) {
            return {
              ...story,
              selected: true,
            };
          }
          return {
            ...story,
            selected: false,
          };
        });
      }
    },
    startEstimationForSelectedStory: (
      state,
      action: PayloadAction<StartedEstimationDto>
    ) => {
      if (state.room) {
        state.room.stories = state.room?.stories.map((story) => {
          if (story.id === action.payload.storyId) {
            return {
              ...story,
              status: UserStoryStatus.ACTIVE,
              estimations: [],
            };
          }
          return story;
        });
      }
    },
    setRoom: (state, { payload }: PayloadAction<RoomResponseDto>) => {
      state.room = payload;
    },
  },
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
    builder.addCase(getAllRooms.fulfilled, (state, { payload }) => {
      state.userRooms = payload;
    });
    builder.addCase(createStory.fulfilled, (state, { payload }) => {
      if (payload && state.room) {
        SocketEventHandler.handleCreateStory({
          roomCode: state.room.roomCode,
          story: payload,
        });
      }
    });
    builder.addCase(selectStory.fulfilled, (state, { payload }) => {
      if (payload && state.room) {
        SocketEventHandler.handleSelectStory({
          roomCode: payload.roomCode,
          storyId: getSelectedStoryId(payload.stories),
        });
      }
    });
    builder.addCase(startStoryEstimation.fulfilled, (state, { payload }) => {
      if (payload && state.room) {
        SocketEventHandler.handleStartEstimation({
          roomCode: payload.roomCode,
          storyId: getSelectedStoryId(payload.stories),
        });
      }
    });
    builder.addCase(reEstimateStory.fulfilled, (state, { payload }) => {
      if (payload && state.room) {
        SocketEventHandler.handleReEstimate({
          roomCode: payload.roomCode,
          storyId: getSelectedStoryId(payload.stories),
        });
      }
    });
    builder.addCase(revealEstimate.fulfilled, (state, { payload }) => {
      if (payload && state.room) {
        SocketEventHandler.handleRevealEstimate({
          roomCode: payload.roomCode,
          storyId: getSelectedStoryId(payload.stories),
        });
      }
    });
  },
});

const getSelectedStoryId = (stories: StorySummaryDto[]) => {
  return stories.filter((story) => story.selected)[0].id;
};

export const { selectStoryInRoom, startEstimationForSelectedStory, setRoom } =
  roomSlice.actions;

export default roomSlice.reducer;
