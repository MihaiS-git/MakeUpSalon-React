import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from './reducers'; // Import the persisted rootReducer
import { persistStore } from 'redux-persist';
/* import { tokenExpirationMiddleware } from './tokenExpirationMiddleware'; */

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  /* middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenExpirationMiddleware) */
});

// Create a persistor instance for redux-persist
const persistor = persistStore(store);

// Export both store and persistor
export { store, persistor };
