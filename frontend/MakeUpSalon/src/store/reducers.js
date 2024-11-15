import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default is localStorage

// Import your reducers
import authReducer from './auth-slice.js';
import treatmentsReducer from './treatments-slice.js';
import employeesReducer from './employees-slice.js';
import employeeTreatmentsReducer from './employee-treatments-slice.js';
import personReducer from './person-slice.js';
import cartReducer from './cart-slice.js';
import appointmentsReducer from './appointments-slice.js';

// Persist configuration for the root reducer
const persistConfig = {
  key: 'root',  // the key used for persisted state
  storage,  // where the state is saved (localStorage by default)
  whitelist: ['auth', 'cart', 'appointments'],  // specify which slices to persist
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  treatments: treatmentsReducer,
  employees: employeesReducer,
  employeeTreatments: employeeTreatmentsReducer,
  person: personReducer,
  cart: cartReducer,
  appointments: appointmentsReducer,
});

// Apply persistReducer to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
