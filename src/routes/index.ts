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
const ContactUs = lazy(() => import("../containers/ContactUs"));
const TokenTransferManagement = lazy(
  () => import("../containers/TokenTransferManagement")
);
const Claim = lazy(() => import("../containers/Claim"));
const Notification = lazy(() => import("../containers/Notification"));

const routes: CRVRoute[] = [
  {
    path: "/claim",
    component: Claim,
    exact: true,
  },
  {
    path: "/admin",
    component: TokenTransferManagement,
    exact: true,
  },
  {
    path: "/contact-us",
    component: ContactUs,
    exact: true,
  },
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
    path: "/profile/",
    component: ProfilePage,
    exact: true,
  },
  {
    path: "/profile/edit/",
    component: ProfileEditPage,
    exact: true,
  },
  {
    path: "/notification/",
    component: Notification,
    exact: true,
  },
  {
    path: "/notification/:id",
    component: Notification,
    exact: true,
  },
];

export default routes;
