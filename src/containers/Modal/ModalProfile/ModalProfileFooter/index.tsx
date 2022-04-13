import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useWeb3React } from "web3-react-core";
import useLocalStorage from "../../../../hooks/useLocalStorage";

import "./index.scss";

const ModalProfileFooter = () => {
  const { deactivate, account } = useWeb3React();
  const navigate = useNavigate();
  const [charityStorage, setCharityStorage] = useLocalStorage("charity", { auth: {} });

  const logOut = () => {
    deactivate();
    const auth = charityStorage.auth;
      delete (auth as any)[account as any];
      setCharityStorage({
        auth: {
          ...charityStorage.auth,
        }
      });

      navigate("/");
  }
  
  return (
    <div className="modal-profile__footer">
      <LogoutOutlined className="modal-profile__footer__icon" />
      <div className="modal-profile__footer__text" onClick={logOut}>Đăng xuất</div>
    </div>
  );
};

export default ModalProfileFooter;
