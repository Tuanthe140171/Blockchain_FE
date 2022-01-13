import React from "react";
import { RouteProps } from "react-router-dom";

export interface CRVRoute extends RouteProps {
  path: string;
  component: any;
  exact: boolean;
}

const CRV001Page = React.lazy(() => import("../containers/CRV001"));
const CRV002Page = React.lazy(() => import("../containers/CRV002"));
const CRV003Page = React.lazy(() => import("../containers/CRV003"));

const routes: CRVRoute[] = [
  {
    path: "/CRV001",
    component: CRV001Page,
    exact: true,
  },
  {
    path: "/CRV002",
    component: CRV002Page,
    exact: true,
  },
  {
    path: "/CRV003",
    component: CRV003Page,
    exact: true,
  },
];

export default routes;
