import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createWeb3ReactRoot, Web3ReactProvider } from "web3-react-core";
import App from "./App";
import { NetworkContextName } from "./constants/misc";
import store from "./stores/store";
import "./styles/main.scss";
import getLibrary from "./utils/getLibrary";


const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <App />
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
