import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import NotFound from "./SharedModule/Components/NotFound/NotFound";
import MasterLayout from "./SharedModule/Components/MasterLayout/MasterLayout";
import GroupsList from "./GroupsList/GroupsList";
import PostDetails from "./Posts/Components/PostDetails/PostDetails";
import PostsList from "./Posts/Components/PostsList/PostsList";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <GroupsList /> },
        { path: "posts/:index", element: <PostsList /> },
        { path: "post-details/:groupindex/:postindex", element: <PostDetails /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
