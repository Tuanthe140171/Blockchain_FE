import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
//@ts-ignore
import Lottie from 'react-lottie';
import axios from 'axios';
import * as animationData from './lottie/donation.json'
import routes, { CRVRoute } from "./routes";
import UserLayout from "./layout/UserLayout";
import Web3ReactManager from "./components/Web3ReactManager";
import "./index.scss";

const HomePage = lazy(() => import("./containers/HomePage"));

const App = () => {
  const renderContainers = (routes: CRVRoute[]) => {
    return routes.map((route) => (
      <Route path={route.path} element={<UserLayout><route.component /></UserLayout>} key={route.path} />
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

  useEffect(() => {
    const calling = async () => {
      const data = await axios.post("http://35.206.106.18:8000/subgraphs/name/DynamoVue/CharityVerse", {
        query: ` 
          query DonationTransaction($first: BigInt!, $orderBy: String!, $orderDirection: String!) {
            donationTransactions(first: $first, orderBy: $orderBy, orderDirection: $orderDirection) {
                id
                from {
                  id
                }
                to {
                  id
                }
            }
          }
      `,
        variables: {
          first: 5,
          orderBy: 'id',
          orderDirection: 'desc'
        }
      });
      console.log(data);
    }

    calling();
  });

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
