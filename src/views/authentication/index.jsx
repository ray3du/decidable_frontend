import { lazy, Suspense } from "react";
import Loader from "../../utils/Loader";

const LazyLogin = lazy(() => import("./components/Login"));
const LazyRegistration = lazy(() => import("./components/Registration"));

export const routes = [
  {
    path: "/register",
    exact: true,
    element: (
      <Suspense fallback={<Loader />}>
        <LazyRegistration />
      </Suspense>
    ),
    name: "registration",
  },
  {
    path: "/login",
    exact: true,
    element: (
      <Suspense fallback={<Loader />}>
        <LazyLogin />
      </Suspense>
    ),
    name: "login",
  },
];
