import React, { lazy } from "react";
import { RouteProps } from "react-router-dom";

export interface CRVRoute extends RouteProps {
  path: string;
  component: React.ElementType;
  exact: boolean;
}

const HomePage = lazy(() => import("../containers/HomePage"));
const Dashboard = lazy(() => import("../containers/Dashboard"));
const ProfilePage = lazy(() => import("../containers/ProfilePage"));
const ProfileEditPage = lazy(() => import("../containers/ProfileEdit"));

const routes: CRVRoute[] = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/dashboard/",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/profile/:id",
    component: ProfilePage,
    exact: true,
  },
  {
    path: "/profile/edit/:id",
    component: ProfileEditPage,
    exact: true,
  },

  // {
  //   path: "/CRV002",
  //   component: CRV002Page,
  //   exact: true,
  // },
  // {
  //   path: "/CRV003",
  //   component: CRV003Page,
  //   exact: true,
  // },
];

export default routes;
