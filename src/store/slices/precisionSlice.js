import { createSlice } from "@reduxjs/toolkit";

const PRECISIONS = ["P0", "P1", "P2", "P3", "P4", "R0"];

const initialState = {
  pointer: 2,
  value: PRECISIONS[2],
  canIncrease: true,
  canDecrease: true,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    increasePrecision: (state) => {
      state.pointer = state.canIncrease ? state.pointer + 1 : state.pointer;
      state.value = PRECISIONS[state.pointer];
      state.canIncrease = state.pointer <= PRECISIONS.length - 2;
      state.canDecrease = true;
    },
    decreasePrecision: (state) => {
      state.pointer = state.canDecrease ? state.pointer - 1 : state.pointer;
      state.value = PRECISIONS[state.pointer];
      state.canDecrease = state.pointer >= 1;
      state.canIncrease = true;
    },
  },
});

export const { increasePrecision, decreasePrecision } = filtersSlice.actions;

export default filtersSlice.reducer;
