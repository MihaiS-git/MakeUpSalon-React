import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../store/auth-slice.js";

const useTokenExpirationChecker = () => {
    const dispatch = useDispatch();
    const { token, tokenExpiresAt } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token && tokenExpiresAt) {
            // Set timeout based on token expiration time
            const expirationTime = tokenExpiresAt - Date.now();

            if (expirationTime <= 0) {
                // If token has already expired, logout immediately
                dispatch(logout());
                alert("Session expired. You have been logged out.");
                window.location.href = "/auth";
            } else {
                const timeout = setTimeout(() => {
                    dispatch(logout());
                    alert("Session expired. You have been logged out.");
                    window.location.href = "/auth";
                }, expirationTime);

                // Cleanup the timeout when the component is unmounted or when token changes
                return () => clearTimeout(timeout);
            }
        }
    }, [token, tokenExpiresAt, dispatch]);
};

export default useTokenExpirationChecker;
