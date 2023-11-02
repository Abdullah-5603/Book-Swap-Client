import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import BookDetails from "../Pages/Daynamic/BookDetails/BookDetails";

const router = createBrowserRouter([
    {
        path : '/',
        element : <Main/>,
        children: [
            {
                path : '/',
                element: <Home/>
            },
            {
                path: '/book-details/:id',
                element: <BookDetails/>,
                loader : ({params}) => fetch(`${import.meta.env.VITE_BASE_URL}/book/${params.id}`)
            }
        ]
    }
])

export default router;