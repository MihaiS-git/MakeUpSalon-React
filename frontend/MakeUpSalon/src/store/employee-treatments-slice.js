import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = 'http://localhost:8080/api';

export const fetchEmployeeTreatments = createAsyncThunk('employeeTreatments/fetchEmployeeTreatments', async (personId, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/persons/id/${personId}/treatments`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        throw new Error('Failed to fetch treatments.');
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const employeeTreatmentsSlice = createSlice({
    name: 'employeeTreatments',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeTreatments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeTreatments.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                console.log("EmployeeTreatments fetched: ", state.items);
            })
            .addCase(fetchEmployeeTreatments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default employeeTreatmentsSlice.reducer;