import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routes, { CRVRoute } from "./routes";
import UserLayout from "./layout/UserLayout";

const HomePage = lazy(() => import("./containers/HomePage"));

const App = () => {
  const renderContainers = (routes: CRVRoute[]) => {
    return routes.map((route) => (
      <Route path={route.path} element={<route.component />} key={route.path} />
    ));
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={"/"} element={<HomePage />} key={"/"} />
      </Routes>
      <UserLayout>
        <Routes>{renderContainers(routes)}</Routes>
      </UserLayout>
    </Suspense>
  );
};

export default App;
