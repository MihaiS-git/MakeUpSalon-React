import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = 'http://localhost:8080/api';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await fetch(`${BASE_URL}/users/role/EMPLOYEE`);

    if (!response.ok) {
        throw new Error("Failed to fetch employees.");
    }

    const users = await response.json();

    const employeesWithPersonData = await Promise.all(
        users.map(async (user) => {
            const personResponse = await fetch(`${BASE_URL}/persons/id/${user.personId}`);
            if (!personResponse.ok) {
                throw new Error('Could not fetch employee details.')
            }
            const person = await personResponse.json();
            return { ...user, person };
        })
    );

    return employeesWithPersonData;
});

export const fetchEmployeeById = createAsyncThunk(
    'employees/fetchEmployeeById',
    async (employeeId, { rejectWithValue }) => { 
        try {
            const response = await fetch(`http://localhost:8080/api/id/${employeeId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch the employee.');
            }

            const data = await response.json();
            return data;
        } catch (error) { 
            return rejectWithValue(error.message);
        }
})

const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        employees: [],
        employee: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchEmployeeById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeById.fulfilled, (state, action) => {
                state.loading = false;
                state.employee = action.payload;
            })
            .addCase(fetchEmployeeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default employeesSlice.reducer;
