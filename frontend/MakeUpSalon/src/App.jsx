import "./App.css";
import RootLayout from "./components/Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import AuthenticationPage from "./pages/Authentication";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { path: 'home', element: <HomePage /> },
            {
                path: 'auth',
                element: <AuthenticationPage />,
                
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
