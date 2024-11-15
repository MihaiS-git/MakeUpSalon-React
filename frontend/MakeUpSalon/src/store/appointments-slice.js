import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAppointmentsByPersonId = createAsyncThunk('appointments/fetchAppointmentsByPersonId',
    async (personId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8080/api/persons/id/${personId}/appointments`);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('Failed to fetch the appointments');
            }
        } catch (error) { 
            return rejectWithValue(error.message);
        }
    }
);

export const saveAppointment = createAsyncThunk(
    'appointments/saveAppointment',
    async (appointmentRequestDto, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8080/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appointmentRequestDto)
            });

            if (!response.ok) {
                const errorMessage = response.status === 400
                    ? "Unable to create appointment. Please check the provided details."
                    : "Something went wrong. Please try again.";
                return rejectWithValue(errorMessage);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: {
        appointments: [],
        loading: false,
        error: null,
    },
    reducers: {
        removeAppointment: (state, action) => {
            state.appointments = state.appointments.filter(
                (appointment) => appointment.appointmentId !== action.payload.appointmentId
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveAppointment.fulfilled, (state, action) => {
                state.appointments.push(action.payload);
                state.loading = false;
            })
            .addCase(saveAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAppointmentsByPersonId.pending, (state) => { 
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppointmentsByPersonId.fulfilled, (state, action) => { 
                state.loading = false;
                state.appointments = action.payload;
            })
            .addCase(fetchAppointmentsByPersonId.rejected, (state, action) => { 
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { removeAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
