import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, AppThunk } from "../../app/store";

export interface FilterPayload {
  magType: string;
  magnitude: MagnitudeRange;
}
interface MagnitudeRange {
  min: number;
  max: number | string;
}
export interface FilterState {
  magType: string;
  magnitude: MagnitudeRange;
  magTypes: string[];
  limit: number;
  offset: number;
}

const initialState: FilterState = {
  magType: "",
  magnitude: { min: 0, max: "" },
  magTypes: [],
  limit: 16,
  offset: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filtersUpdated: (state, action: PayloadAction<FilterPayload>) => {
      state.magType = action.payload.magType;
      state.magnitude = action.payload.magnitude;
      state.offset = 1;
    },
    offsetIncremented: (state) => {
      state.offset = state.offset + state.limit;
    },
    offsetDecremented: (state) => {
      state.offset = state.offset - state.limit;
    },
    offsetUpdatedByAmount: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    magTypeDataUpdated: (state, action: PayloadAction<string[]>) => {
      state.magTypes = action.payload;
    },
  },
});

export const {
  filtersUpdated,
  offsetIncremented,
  offsetDecremented,
  offsetUpdatedByAmount,
  magTypeDataUpdated,
} = filterSlice.actions;

export const getMagTypeData = (): AppThunk => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://earthquake.usgs.gov/fdsnws/event/1/application.json"
    );
    dispatch(magTypeDataUpdated(res.data.magnitudetypes));
  } catch (error) {
    console.log(error);
  }
};

export const selectMagTypeFilter = (state: RootState) => state.filter.magType;
export const selectMinMagnitudeFilter = (state: RootState) =>
  state.filter.magnitude.min;
export const selectMaxMagnitudeFilter = (state: RootState) =>
  state.filter.magnitude.max;
export const selectLimitFilter = (state: RootState) => state.filter.limit;
export const selectOffsetFilter = (state: RootState) => state.filter.offset;
export const selectMagTypes = (state: RootState) => state.filter.magTypes;

export default filterSlice.reducer;
