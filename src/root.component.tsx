import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./components/welcome/welcome";
import './output.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Login />
      }
    ]
  }
]);

export default function Root() {
  return <>
    kiscifdsajl
    <RouterProvider router={router} />
  </>;
}
