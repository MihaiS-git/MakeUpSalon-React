import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = 'http://localhost:8080/api';

export const fetchPerson = createAsyncThunk('person/fetchPerson', async (personId, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/persons/id/${personId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch person data.");
        }
        const person = await response.json();
        return person;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const personSlice = createSlice({
    name: 'person',
    initialState: {
        person: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPerson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPerson.fulfilled, (state, action) => {
                state.loading = false;
                state.person = action.payload;
            })
            .addCase(fetchPerson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default personSlice.reducer;
