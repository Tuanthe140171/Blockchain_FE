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
const DoneePage = lazy(() => import("../containers/DoneePage"));
const ExchangeMoneyPage = lazy(() => import("../containers/ExchangeMoney"));

const routes: CRVRoute[] = [
  {
    path: "/exchange",
    component: ExchangeMoneyPage,
    exact: true,
  },
  {
    path: "/donee",
    component: DoneePage,
    exact: true,
  },
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
    path: "/profile/edit/",
    component: ProfileEditPage,
    exact: true,
  },
];

export default routes;
