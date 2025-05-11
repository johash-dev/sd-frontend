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
    setEstimateValues: (state, action: PayloadAction<Array<number | null>>) => {
      if (action.payload.length === 3) {
        action.payload.forEach((value, index) => {
          state.values[index] = value;
        });
        state.selectedIndex = 0;
      }
    },
    resetValues: (state) => {
      state.values = initialState.values;
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

export function getFibonacciEstimate(O: number, R: number, P: number): number {
  const weightedAverage = (O + 4 * R + P) / 6;
  return parseFloat(weightedAverage.toFixed(2));
}

// Action creators are generated for each case reducer function
export const {
  setEstimationValue,
  setSelectedIndex,
  setEstimateValues,
  resetValues,
} = estimationSlice.actions;

export default estimationSlice.reducer;
