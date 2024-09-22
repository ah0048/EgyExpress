
import './App.css';
import About from './Components/About'; 
import ProductDtials from './Components/ProductDetials';
import Login from "./Components/Register/Login";
import Register from "./Components/Register/Register";
import Logout from "./Components/Register/Logout";
import PrivateRoute from "./Components/PrivateRoute";
import Cart from "./Components/Cart";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from './pages/RootPage';
import Home from './pages/Home';
import Profile from './Components/Profile';
import Order from './Components/Order';
import Tracking from './Components/Tracking';
import CategroiesList from './Components/CategroiesList'
import EditAcc from "./Components/EditAcc"
import ChangePassword from './Components/ChangePassword';
import DeleteAcount from './Components/Register/DeleteAcount';
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "order",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "product/:productId",
        element: <ProductDtials />,
      },
      {
        path: "tracking",
        element: <Tracking />,
      },
      {
        path: "categories",
        element: <CategroiesList />,
      },
      {
        path: "edit-account",
        element: <EditAcc />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "delete-acount",
        element: <DeleteAcount/>,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
