import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button } from "@/components/button";
import { LocalRoutes } from "@/config/localRoutes";
import { userService } from "@/helpers/service/users";
import { fallbackToAuthPath } from "@/helpers/utils/getAuthRedirectPage";
import { Base } from "shelf/components/layouts/Base";
import { Footer } from "shelf/components/layouts/Footer";

export default function Success() {
  const [show, setShow] = useState(false);
  const [path, setPath] = useState<string>();
  const router = useRouter();

  const redirect = () => {
    router.push(`${path}`);
  };
  const fetchUser = async () => {
    const user = await userService.getUserData();
    if (user) {
      // @ts-ignore
      const path = fallbackToAuthPath(user, LocalRoutes.dashboard);
      if (path === LocalRoutes.dashboard) {
        router.push(path);
      } else if (path && path !== router.pathname) {
        setShow(true);
        setPath(path);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchUser();
    }, 1000);
  }, []);

  return (
    <Base>
      <div className="m-auto flex h-screen items-center">
        {show ? (
          <div className="bg-white p-4">
            <h1 className=" text-center text-2xl font-bold text-black">
              Please complete your profile and
            </h1>
            <h1 className="text-2xl font-bold text-black">explore linkDOT</h1>
            <div className="float-right w-1/4" onClick={redirect}>
              <Button
                innerBoxShadowColor="#FFFFFF"
                outerBoxShadowColor="#000000"
                textColor="#000000"
                borderColor="#000000"
                boxShadowVariant={2}
                borderWidth={"2px"}
              >
                <span className="p-1 font-medium">OK</span>
              </Button>
            </div>
          </div>
        ) : (
          <Footer />
        )}
      </div>
    </Base>
  );
}
