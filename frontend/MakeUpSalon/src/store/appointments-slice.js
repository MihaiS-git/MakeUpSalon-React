import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAppointmentsByPersonId = createAsyncThunk(
    'appointments/fetchAppointmentsByPersonId',
    async (personId, { rejectWithValue, getState }) => {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            return rejectWithValue('No token found, user might be logged out');
        }

        try {
            const response = await fetch(`http://localhost:8080/api/persons/id/${personId}/appointments`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

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
    async (appointmentRequestDto, { rejectWithValue, getState }) => {
        const { auth } = getState();
        const token = auth?.token;

        try {
            const response = await fetch('http://localhost:8080/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(appointmentRequestDto),
            });

            if (!response.ok) {
                console.log("REAPONSE: ", response);

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

export const updateAppointment = createAsyncThunk(
    'appointments/updateAppointment',
    async ({ appointmentId, requestBody }, { getState, rejectWithValue }) => {
        const { auth } = getState();
        const token = auth?.token;

        try {
            const response = await fetch(
                `http://localhost:8080/api/appointments/${appointmentId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (!response.ok) {
                const errorMessage = response.status === 404
                    ? "Unable to update appointment. The selected employee is not available."
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

export const deleteAppointment = createAsyncThunk(
    'appointments/deleteAppointment',
    async (appointmentId, { rejectWithValue, getState }) => {
        const { auth } = getState();
        const token = auth?.token;

        try {
            const response = await fetch(`http://localhost:8080/api/appointments/${appointmentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete the appointment');
            }

            return appointmentId;
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
            .addCase(updateAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAppointment.fulfilled, (state, action) => {
                const updatedAppointment = action.payload;
                state.appointments = state.appointments.map((appointment) =>
                    appointment.appointmentId === updatedAppointment.appointmentId
                        ? updatedAppointment
                        : appointment
                );
                state.loading = false;
            })
            .addCase(updateAppointment.rejected, (state, action) => {
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
            .addCase(deleteAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = state.appointments.filter(
                    (appointment) => appointment.appointmentId !== action.payload
                );
            })
            .addCase(deleteAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { removeAppointment } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
