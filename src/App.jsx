import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./views/authentication/components/ProtectedRoute";
import PageNotFound from "./views/notFound/PageNotFound";
import { routes } from "./routes";
import { routes as publicRoutes } from "./views/authentication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, i) => {
          return (
            route.element && (
              <Route
                key={i}
                exact={route.exact}
                path={route.path}
                name={route.name}
                element={route.element}
              />
            )
          );
        })}
        <Route element={<ProtectedRoute />}>
          <Route path={"*"} element={<PageNotFound />} />
          {routes.map((route, i) => {
            return (
              route.element && (
                <Route
                  key={i}
                  exact={route.exact}
                  path={route.path}
                  name={route.name}
                  element={route.element}
                />
              )
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
