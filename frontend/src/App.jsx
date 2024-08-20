import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/homePage.jsx";
import SignupPage from "./pages/signupPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import WatchPage from "./pages/watchPage.jsx";
import { Footer } from "./components/footer.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { ContentProvider } from "./context/useContent.jsx";

const App = () => {
    const user = false;
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <>
                    <HomePage />
                </>
            ),
        },
        {
            path: "/signup/:email?",
            element: <>{!user ? <SignupPage /> : <Navigate to="/" />}</>,
        },
        {
            path: "/login",
            element: <>{!user ? <LoginPage /> : <Navigate to="/" />}</>,
        },
    ]);
    return (
        <>
            <ContentProvider>
                <AuthContextProvider>
                    <RouterProvider router={router} />
                    <Footer />
                    <Toaster />
                </AuthContextProvider>
            </ContentProvider>
        </>
    );
};

export default App;
