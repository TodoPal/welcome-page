import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Welcome } from "./components/welcome/welcome";
import './output.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
    children: [
      {
        path: 'login',
        element: <Welcome />
      },
      {
        path: 'signup',
        element: <Welcome />
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
