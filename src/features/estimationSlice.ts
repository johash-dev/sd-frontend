import { EstimationAPI } from '@/api/estimation-api';
import { RootState } from '@/app/store';
import { CreateEstimationDto } from '@/models/Story';
import { EstimationReadyDto } from '@/socket/models/estimation.models';
import { SocketEventHandler } from '@/socket/socket-event.handler';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setRoom } from './roomSlice';

export interface EstimationState {
  values: Array<number | null>;
  selectedIndex: number;
  total: number | null;
}

const initialState: EstimationState = {
  values: [null, null, null],
  selectedIndex: 0,
  total: null,
};

export const estimationReady = createAsyncThunk(
  'estimation/ready',
  async (
    createEstimationDto: CreateEstimationDto,
    { dispatch, getState }
  ): Promise<EstimationReadyDto> => {
    const response = await EstimationAPI.crateEstimation(createEstimationDto);
    const state: RootState = getState() as RootState;
    const roomState = state.room;
    const authState = state.auth;
    dispatch(setRoom(response.data));
    return {
      roomCode: roomState.room?.roomCode ?? '',
      user: {
        id: authState.user?.id ?? '',
        email: authState.user?.email ?? '',
        firstName: authState.user?.firstName ?? '',
      },
    };
  }
);

export const estimationSlice = createSlice({
  name: 'estimation',
  initialState,
  reducers: {
    setEstimationValue: (state, action: PayloadAction<number>) => {
      state.values[state.selectedIndex] = action.payload;
      if (state.selectedIndex === 2) {
        state.selectedIndex = 0;
      } else {
        state.selectedIndex += 1;
      }

      if (state.values.every((value) => value !== null)) {
        state.total = getFibonacciEstimate(
          state.values[0],
          state.values[1],
          state.values[2]
        );
      }
    },
    setSelectedIndex: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(estimationReady.fulfilled, (_, { payload }) => {
      SocketEventHandler.handleEstimationReady({
        roomCode: payload.roomCode,
        user: payload.user,
      });
    });
  },
});

function getFibonacciEstimate(O: number, R: number, P: number): number {
  const fibonacci: number[] = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

  const weightedAverage = (O + 4 * R + P) / 6;

  let closest = fibonacci[0];
  let minDiff = Math.abs(weightedAverage - closest);

  for (const num of fibonacci) {
    const diff = Math.abs(weightedAverage - num);
    if (diff < minDiff) {
      minDiff = diff;
      closest = num;
    }
  }

  return closest;
}

// Action creators are generated for each case reducer function
export const { setEstimationValue, setSelectedIndex } = estimationSlice.actions;

export default estimationSlice.reducer;
