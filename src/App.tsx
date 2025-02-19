import Home from './pages/Home'
import AddContact from './pages/AddContact'
import EditContact from './pages/EditContact'
import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/addContact",
    element: <AddContact />
  },
  {
    path: "/editContact/:contactID",
    element: <EditContact />
  }
], { basename: "/EvolvePOS_technical_test" });

export default function App() {
  return <RouterProvider router={router} />
}