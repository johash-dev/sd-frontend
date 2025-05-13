// selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

export const selectSelectedStory = createSelector(
  (state: RootState) => state.room.room?.stories,
  (stories) => stories?.find((s) => s.selected) || null
);
