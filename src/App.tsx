import routes, { CRVRoute } from "./routes";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import DefaultLayout from "./layout/DefaultLayout";

const App = () => {
  const renderContainers = (routes: CRVRoute[]) => {
    return routes.map((route) => (
      <Route path={route.path} element={<route.component />} key={route.path} />
    ));
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DefaultLayout>
        <Routes>{renderContainers(routes)}</Routes>
      </DefaultLayout>
    </Suspense>
  );
};

export default App;
