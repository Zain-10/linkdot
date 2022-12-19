import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Explore } from "@/components/beta/explore";
import { Main } from "@/components/beta/main";
import { ApiRoutes } from "@/config/betaApis";
import { StatusCodes } from "@/constants";
import { useUserState } from "@/context/global.context";

interface PageProps {
  query: {
    query: string;
  };
}

const ExplorePage: NextPage<PageProps> = ({ query }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const address = useAddress();
  const currentUser = useUserState();
  const router = useRouter();

  const fetchUsers = async (query: string) => {
    let queryParams = "";
    if (query && query.length === 42) {
      queryParams = `?walletId=${query}`;
    } else if (query) {
      queryParams = `?name=${query}`;
    }
    // TODO: Add search by badge and name
    await axios.get(`${ApiRoutes.SEARCH_USER}/${queryParams}`).then((res) => {
      if (res.status === StatusCodes.OK) {
        setUsers(res.data);
        setLoaded(true);
      }
    });
  };

  useEffect(() => {
    if (!address) {
      router.push("/connect");
    }

    fetchUsers(query.query);
  }, [address]);

  useEffect(() => {
    fetchUsers(query.query);
  }, [query.query]);

  if (address) {
    return (
      <Main address={address} user={currentUser}>
        <Explore
          users={users}
          address={address}
          currentUser={currentUser}
          loaded={loaded}
        />
      </Main>
    );
  }

  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: { query },
  };
};

export default ExplorePage;
