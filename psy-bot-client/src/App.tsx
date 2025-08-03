import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Chat from "./views/home/chat";
import Register from "./views/register/register";
import Login from "./views/login/login";
import PrivateRoute from "./components/privateRoute";
import Layout1 from "./layouts/layout-1";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        element={
          <PrivateRoute>
            <Layout1 />
          </PrivateRoute>
        }
      >
        <Route index element={<Chat />} />
        <Route path="chat/:id" element={<Chat />} />
      </Route>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Route>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
