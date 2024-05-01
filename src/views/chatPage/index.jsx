import { lazy, Suspense } from "react";
import Loader from "../../utils/Loader";
const ChatAppLazy = lazy(() => import("./components/ChatApp"));

export const routes = [
  {
    path: "/",
    exact: true,
    element: (
      <Suspense fallback={<Loader />}>
        <ChatAppLazy />
      </Suspense>
    ),
    name: "cahtapp",
  },
];
