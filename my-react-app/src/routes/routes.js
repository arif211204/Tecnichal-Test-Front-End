import LoginPage from "../pages/auth/login";
import Register from "../pages/auth/register";
import CategoryPage from "../pages/category/categoryPage";
import Homepage from "../pages/mainPage/home";

class RouteClass {
    constructor(path, element) {
      this.path = path;
      this.element = element;
    }
  }
export const routes = [
    new RouteClass('login', <LoginPage />),
    new RouteClass('register', <Register />),
  new RouteClass('/', <Homepage />),
  new RouteClass('/category', <CategoryPage />),

    



]