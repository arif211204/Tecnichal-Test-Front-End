import { useAuth } from "./AuthProvider";
import PrivateRoute from "./privateRoute";
import { routes } from "./routes/routes";
import { Routes, Route } from "react-router-dom";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      {routes.map((route, i) => {
        const { isPrivate, ...rest } = route;

        return isPrivate ? (
          <PrivateRoute key={i} path={route.path} element={<route.element />} />
        ) : (
          <Route {...rest} key={i} />
        );
      })}
    </Routes>
  );
}

export default App;
