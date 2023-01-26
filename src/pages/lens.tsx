import { ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { authenticate, challenge, client } from "@/api";

const Lens: NextPage = () => {
  const [address, setAddress] = useState<string>();
  const [token, setToken] = useState();

  console.log({ address, token });
  async function checkConnection(): Promise<void> {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    if (accounts.length) {
      setAddress(accounts[0]);
    }
  }
  useEffect(() => {
    /* when the app loads, check to see if the user has already connected their wallet */
    checkConnection();
  }, []);

  async function connect() {
    /* this allows the user to connect their wallet */
    // @ts-ignore
    const account = await window.ethereum.send("eth_requestAccounts");
    if (account.result.length) {
      setAddress(account.result[0]);
    }
  }
  async function login() {
    try {
      /* first request the challenge from the API server */
      const challengeInfo = await client.query({
        query: challenge,
        variables: { address },
      });
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      /* ask the user to sign a message with the challenge info returned from the server */
      const signature = await signer.signMessage(
        challengeInfo.data.challenge.text
      );
      /* authenticate the user */
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address,
          signature,
        },
      });
      /* if user authentication is successful, you will receive an accessToken and refreshToken */
      const {
        data: {
          authenticate: { accessToken },
        },
      } = authData;
      console.log({ accessToken });
      setToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
    } catch (err) {
      console.log("Error signing in: ", err);
    }
  }

  return (
    <div>
      {/* if the user has not yet connected their wallet, show a connect button */}
      {!address && <button onClick={connect}>Connect</button>}
      {/* if the user has connected their wallet but has not yet authenticated, show them a login button */}
      {address && !token && (
        <div onClick={login}>
          <button>Login</button>
        </div>
      )}
      {/* once the user has authenticated, show them a success message */}
      {address && token && <h2>Successfully signed in!</h2>}
    </div>
  );
};

export default Lens;
