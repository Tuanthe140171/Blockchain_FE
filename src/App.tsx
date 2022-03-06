import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routes, { CRVRoute } from "./routes";
import UserLayout from "./layout/UserLayout";
import Web3ReactManager from "./components/Web3ReactManager";

const HomePage = lazy(() => import("./containers/HomePage"));

const App = () => {
  const renderContainers = (routes: CRVRoute[]) => {
    return routes.map((route) => (
      <Route path={route.path} element={<UserLayout><route.component /></UserLayout>} key={route.path} />
    ));
  };

  // useEffect(() => {
  //   const calling = async () => {
  //     const data = await axios.post("http://35.206.106.18:8000/subgraphs/name/DynamoVue/CharityVerse", {
  //     query:  ` 
  //       {
  //           donations()) {
  //             id
  //             from {
  //               id
  //               totalDonation
  //             }
  //             to {
  //               id
  //               totalDonation
  //             }
  //             amount
  //           }
  //       }
  //     `
  //   });
  //   console.log(data);
  //   }

  //   calling();
  // });

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
