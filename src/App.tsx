import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
//@ts-ignore
import Lottie from 'react-lottie';
import * as animationData from './lottie/donation.json'
import routes, { CRVRoute } from "./routes";
import UserLayout from "./layout/UserLayout";
import Web3ReactManager from "./components/Web3ReactManager";
import AppPrivateRoute from "./components/AppPrivateRoute";
import "./index.scss";

const HomePage = lazy(() => import("./containers/HomePage"));

const App = () => {
  const renderContainers = (routes: CRVRoute[]) => {
    return routes.map((route) => (
      <Route 
        path={route.path} 
        element={
          <AppPrivateRoute>
            <UserLayout>
              <route.component />
            </UserLayout>
          </AppPrivateRoute>
        } 
        key={route.path} 
      />
    ));
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Suspense fallback={
      <div className="fallback-loading">
        <Lottie options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
    }>
      <Web3ReactManager>
        <Routes>
          {renderContainers(routes)}
          <Route path={"/*"} element={<HomePage />} key={"/"} />
        </Routes>
      </Web3ReactManager>
    </Suspense>
  );
};

export default App;
