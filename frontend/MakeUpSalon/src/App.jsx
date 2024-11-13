import "./App.css";
import RootLayout from "./components/Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import AuthenticationPage from "./pages/Authentication.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import RecoverPasswordPage from "./pages/RecoverPassword.jsx";
import TreatmentsPage from "./pages/Treatments.jsx";
import ProfessionalsPage from "./pages/Professionals.jsx";
import EmployeeTreatmentsPage from "./pages/EmployeeTreatments.jsx";
import ContactPage from "./pages/Contact.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "auth",
                element: <AuthenticationPage />,
            },
            {
                path: "signup",
                element: <SignUpPage />,
            },
            {
                path: "recover",
                element: <RecoverPasswordPage />,
            },
            {
                path: "treatments",
                element: <TreatmentsPage />,
            },
            {
                path: "professionals",
                element: <ProfessionalsPage />,
            },
            {
                path: "professionals/:id/treatments",
                element: <EmployeeTreatmentsPage />,
            },
            {
                path: "contact",
                element: <ContactPage/>
            }
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
