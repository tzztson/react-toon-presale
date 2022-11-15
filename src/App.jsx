import "./App.css";
import { useWallet } from "use-wallet";
import contractABI from "./contract/abi/5.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './assets/images/logo.png'
import telegram from './assets/images/telegram.svg';
import eth from './assets/images/eth.png';
import token from './assets/images/Token.png';
import cross from './assets/images/cross.svg';
import metamask from './assets/images/metamask.svg';
import coinbase from './assets/images/coinbase.svg';
import mobile from './assets/images/wallet-connect.svg';

function App() {
  const wallet = useWallet();

  const [isConnected, setIsConnected] = useState(false);
  const [ETHamount, setETHAmount] = useState(0);
  const [TFTamount, setTFTAmount] = useState(0);
  const [TFTprice, setTFTPrice] = useState(0);

  useEffect(() => {
    if (wallet.status === "connected") {
      setIsConnected(false);
      getPrice();
    }
  }, [wallet.status]);


  const getPrice = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://goerli.infura.io/v3/ca11249dabe247c1a6e0877c24376dda"
      );

      const ToonContract = new ethers.Contract(
        contractABI.presale.address,
        contractABI.presale.abi,
        provider
      );

      let price = (await ToonContract.getPrice()) / 1000000;

      setTFTPrice(price);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTFTAmount(ETHamount * TFTprice);
  }, [ETHamount]);

  const buyToken = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(wallet.ethereum);

      const signer = provider.getSigner();
      const ToonContract = new ethers.Contract(
        contractABI.presale.address,
        contractABI.presale.abi,
        signer
      );

      let tx = await ToonContract.buy({
        value: ethers.utils.parseUnits(ETHamount.toString(), 18),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const connectWallet = () => {
    setIsConnected(true);
  };

  const ethHandleChange = (e) => {
    setETHAmount(e.target.value);
  };

  const buy_connect_toggle =
    wallet.status === "connected" ? "Buy Token" : "Connect Wallet";

  const length_of_address =
    wallet.status === "connected"
      ? wallet.account.slice(0, 4) + "..." + wallet.account.slice(-4)
      : "Connect Wallet";

  return (
    <div className="container">
      <div className="container-section">
        <a
          href="https://toon.finance"
          className="logo-box"
        >
          <img
            src={logo}
            alt="logo"
            width="350px"
            height="50px"
          />
        </a>
        <div className="nav-buttons-box">
          <button
            onClick={connectWallet}
            type="button"
            className="top-connect-button"
          >
            {length_of_address}
          </button>
          <a
            href="https://t.me/ToonSwapFinance"
            target="_blank"
            rel="noreferrer"
            className="telegram-button"
          >
            <img
              src={telegram}
              alt="telegram"
              width={20}
              height={20}
              className="telegram-image"
            />
            <span className="support">Presale Support</span>
          </a>
        </div>
      </div>
      <div className="h-[18px]"></div>
      <div className="height-div"></div>
      <div className="sub-container">
        <form className="sub-content">
          <h2 className="join-title">
            {" "}
            Join $TFT Presale{" "}
          </h2>
          <div className="height-div"></div>
          <div className="vice-title">
            {" "}
            Toon Finance Presale Stage 2{" "}
          </div>
          <div className="height-div"></div>
          <div className="text-center font-bold mb-1"></div>
          <p className="mb-3 text-center font-xl text-2x1"></p>
          <div className="form-group">
            <button className="form-button">
              <p className="form-button">
                <img
                  src={eth}
                  alt="Ethereum logo"
                  width="40"
                  height="40"
                  className="eth-image"
                  loading="lazy"
                />
                ETH
              </p>
            </button>
            <input
              type="text"
              placeholder="0.0"
              className="eth-input"
              value={ETHamount}
              onChange={(e) => ethHandleChange(e)}
            />
          </div>
          <div className="height-div"></div>
          <div className="strike">
            <span className="strike-pan"></span>
          </div>
          <div className="height-div"></div>
          <div className="form-group">
            <button className="form-button">
              <p className="form-button">
                <img
                  src={token}
                  alt="TFT logo"
                  width="40"
                  height="40"
                  className="eth-image"
                  loading="lazy"
                />
                TFT
              </p>
            </button>
            <input
              type="text"
              placeholder="0.0"
              value={TFTamount}
              readOnly
              className="eth-input"
            />
          </div>
          <div className="height-div"></div>
          <div className="height-div"></div>
          <button
            onClick={wallet.status === "connected" ? buyToken : connectWallet}
            type="button"
            className="connect-button"
          // className="text-[white] font-bold text-black-800 dark:text-black-600 bg-blue-700 hover:bg-blue-400 p-2  mx-2 rounded-xl"
          >
            {buy_connect_toggle}
          </button>
          <div className="height-div"></div>
          <div className="height-div"></div>
        </form>
        <div className="import-section">
          <button className="import-button">
            Import TFT Token to Metamask
          </button>
        </div>
      </div>
      {isConnected ? (
        <div className="modal-position">
          <div className="modal-container">
            <div className="modal-content">
              <button
                type="button"
                className="modal-button"
                data-modal-toggle="crypto-modal"
                onClick={() => setIsConnected(false)}
              >
                <img
                  src={cross}
                  width={30}
                  height={30}
                  alt=""
                />
                <span className="sr-only" style={{ position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", borderWidth: "0" }}>Close modal</span>
              </button>
              <div className="py-4 px-6 rounded-t border-b">
                <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                  Connect wallet
                </h3>
              </div>
              <div className="p-6" style={{ padding: "24px" }}>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400"
                  style={{ fontSize: "16px", fontWeight: "500", color: "grey" }}>
                  Connect with one of our available wallet providers or create a
                  new one.
                </p>
                <ul className="my-4 space-y-3" style={{ margin: "12px 0", listStyleType: "none" }}>
                  <li style={{}}>
                    <span
                      className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      style={{ display: "flex", alignItems: "center", padding: "12px", fontWeight: "bold", fontSize: "16px", borderRadius: "12px", }}
                      onClick={() => wallet.connect("injected")}
                    >
                      <img
                        src={metamask}
                        width={40}
                        height={40}
                        alt=""
                      />

                      <span className="flex-1 ml-3 whitespace-nowrap text-lg pl-2"
                        style={{ display: "flex 1 1 0%", marginLeft: "12px", whiteSpace: "nowrap", paddingLeft: "8px", fontSize: "18px" }}>
                        MetaMask
                      </span>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-sm font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400"
                        style={{ backgroundColor: "#b4b9b4", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "2px 8px", marginLeft: "12px", fontSize: "14px", fontWeight: "400", borderRadius: "4px" }}>
                        Popular
                      </span>
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => wallet.connect("walletlink")}
                      className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      style={{ display: "flex", alignItems: "center", padding: "12px", fontWeight: "bold", fontSize: "16px", borderRadius: "12px", }}
                    >
                      <img
                        src={coinbase}
                        width={40}
                        height={40}
                        alt=""
                      />
                      <span className="flex-1 ml-3 whitespace-nowrap text-lg pl-2" style={{ display: "flex 1 1 0%", marginLeft: "12px", whiteSpace: "nowrap", paddingLeft: "8px", fontSize: "18px" }}>
                        Coinbase Wallet
                      </span>
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => wallet.connect("walletconnect")}
                      style={{ display: "flex", alignItems: "center", padding: "12px", fontWeight: "bold", fontSize: "16px", borderRadius: "12px", }}
                      className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    >
                      <img
                        src={mobile}
                        width={40}
                        height={40}
                        alt=""
                      />
                      <span className="flex-1 ml-3 whitespace-nowrap text-lg pl-2"
                        style={{ display: "flex 1 1 0%", marginLeft: "12px", whiteSpace: "nowrap", paddingLeft: "8px", fontSize: "18px" }}>
                        WalletConnect
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
