import React, { lazy } from "react";
import { RouteProps } from "react-router-dom";

export interface CRVRoute extends RouteProps {
  path: string;
  component: React.ElementType;
  exact: boolean;
}

const VotingPage = lazy(() => import("../containers/VotingPage"));
const Dashboard = lazy(() => import("../containers/Dashboard"));
const ProfilePage = lazy(() => import("../containers/ProfilePage"));
const HomePage = lazy(() => import("../containers/HomePage"));

const routes: CRVRoute[] = [
  {
    path: "/voting",
    component: VotingPage,
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
