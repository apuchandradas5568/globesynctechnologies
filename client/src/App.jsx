
import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import OtpVerification from './pages/OtpVerification';
import EventRegister from './pages/EventRegister';
import Events from './pages/Events';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/otp-verification",
    element: <OtpVerification />,
  },
  {
    path: "/event-register",
    element: <EventRegister/>
  }, 
  {
    path: '/events',
    element: <Events/>
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
