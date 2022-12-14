import { EmailModal } from "../email";
import { Header } from "../header";
import { RightSideBar } from "../rightSideBar";
import { SideBar } from "../sideBar";

interface MainProps extends React.PropsWithChildren<{}> {
  address: string;
  user: User;
}

const Main = ({ children, user }: MainProps) => {
  const emailNotComplete = !user.email || !user.emailVerified;
  return (
    <div className="flex bg-white">
      {/* Show email registration modal if not email verified */}
      {emailNotComplete && <EmailModal showModal={true} />}
      <SideBar />
      <div className="w-full ">
        <Header />
        <div className="custom-scrollbar flex pl-4 pr-8">
          {children}
          <RightSideBar currentUser={user} />
        </div>
      </div>
    </div>
  );
};

export { Main };
