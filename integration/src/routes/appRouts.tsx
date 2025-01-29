import { Services, NotFound } from "../pages";

const appRoutes = [
  {
    path: "/",
    element: <Services />,
    title: "Services",
  },
  {
    path: "*",
    element: <NotFound />,
    title: "404",
  },
];

export default appRoutes;
