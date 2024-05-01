import ChatApp from "./components/ChatApp";

export const routes = [
  {
    path: "/",
    exact: true,
    element: <ChatApp />,
    name: "cahtapp",
  },
];
