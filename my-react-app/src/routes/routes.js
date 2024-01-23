import LoginPage from "../pages/auth/login";
import Register from "../pages/auth/register";
import Homepage from "../pages/homePage/home";

class RouteClass {
    constructor(path, element) {
      this.path = path;
      this.element = element;
    }
  }
export const routes = [
    new RouteClass('login', <LoginPage />),
    new RouteClass('register', <Register />),
    new RouteClass('/', <Homepage/>),



]