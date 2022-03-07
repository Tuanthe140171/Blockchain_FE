import React, { lazy } from "react";
import { RouteProps } from "react-router-dom";

export interface CRVRoute extends RouteProps {
  path: string;
  component: React.ElementType;
  exact: boolean;
}

const Dashboard = lazy(() => import("../containers/Dashboard"));
const ProfilePage = lazy(() => import("../containers/ProfilePage"));
const ProfileEditPage = lazy(() => import("../containers/ProfileEdit"));
const VotingPage = lazy(() => import("../containers/VotingPage"));

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
  {
    path: "/profile/edit/:id",
    component: ProfileEditPage,
    exact: true,
  },
];

export default routes;
