import { IEmployee } from "@/utils/interfaces/IEmployee";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmployeeState {
  list: IEmployee[];
}

const initialState: EmployeeState = {
  list: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Array<IEmployee>>) => {
      state.list = action.payload;
    },
  },
});

export const { setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
