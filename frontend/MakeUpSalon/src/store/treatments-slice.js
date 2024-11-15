import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = 'http://localhost:8080/api';

export const fetchTreatments = createAsyncThunk('treatments/fetchTreatments', async () => { 
    const response = await fetch(`${BASE_URL}/treatments`);
    if (response.ok) { 
        const data = await response.json();
        return data;
    }
    
    throw new Error('Failed to fetch treatments.')
});

const treatmentsSlice = createSlice({
    name: 'treatments',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => { 
        builder
            .addCase(fetchTreatments.pending, (state) => { 
                state.status = 'loading';
            })
            .addCase(fetchTreatments.fulfilled, (state, action) => { 
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTreatments.rejected, (state, action) => { 
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default treatmentsSlice.reducer;