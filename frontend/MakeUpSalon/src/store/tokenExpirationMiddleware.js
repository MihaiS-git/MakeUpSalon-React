import { logout } from "./auth-slice";

export const tokenExpirationMiddleware = (store) => (next) => (action) => { 
    const state = store.getState();
    const { token, tokenExpiresAt } = state.auth;

    if (token && tokenExpiresAt && Date.now() > Date.now()) {
        store.dispatch(logout());
        alert("Session expired. Please login again.");
    }

    return next(action);
}