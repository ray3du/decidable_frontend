import Login from "./components/Login";
import Registration from "./components/Registration";

export const routes = [
  {
    path: "/register",
    exact: true,
    element: <Registration />,
    name: "registration",
  },
  {
    path: "/login",
    exact: true,
    element: <Login />,
    name: "login",
  },
];
