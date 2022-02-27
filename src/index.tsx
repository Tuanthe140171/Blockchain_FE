import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createWeb3ReactRoot, Web3ReactProvider } from 'web3-react-core';

import { NetworkContextName } from './constants/misc'
import getLibrary from './utils/getLibrary'

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./styles/main.scss";
import App from "./App";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

ReactDOM.render(
  <BrowserRouter>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
      <App />
    </Web3ProviderNetwork>
  </Web3ReactProvider>
  </BrowserRouter >,
  document.getElementById("root")
);
