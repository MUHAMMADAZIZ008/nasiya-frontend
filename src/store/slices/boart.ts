import { createSlice } from "@reduxjs/toolkit";

export interface stateType {
  title: string;
  subTitle: string;
}

const initialState: stateType = {
  title: "Home",
  subTitle: "Home",
};

const boartValues = createSlice({
  name: "board_values",
  initialState,
  reducers: {
    changeValue: (state, action: { type: any; payload: stateType }) => {
      return { ...state, ...action.payload };
    },
  },
});

export default boartValues.reducer;
export const { changeValue } = boartValues.actions;
