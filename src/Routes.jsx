import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Details from "./Pages/Details";
import Home from "./Pages/Home";
import Error from "./Pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
    ],
  },
]);

export default router;
