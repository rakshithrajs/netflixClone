import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/homePage.jsx";
import SignupPage from "./pages/signupPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import ContentDetails from "./pages/contentDetails.jsx";
import { Footer } from "./components/footer.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { ContentProvider } from "./context/useContent.jsx";
import Navbar from "./components/navbar.jsx";
import SearchPage from "./pages/SearchPage.jsx";

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
        {
            path: "/watch/:id",
            element: (
                <>
                    <Navbar />
                    {!user ? <ContentDetails /> : <Navigate to="/" />}
                </>
            ),
        },
        {
            path: "/search",
            element: (
                <>
                    <Navbar />
                    {!user ? <SearchPage /> : <Navigate to="/" />}
                </>
            ),
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
