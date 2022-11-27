import { CoreTeam } from "./coreTeam";
import { TeamMembers } from "./teamMembers";

const RightSideBar = () => {
  return (
    <div className="sticky top-[4.75rem] h-[calc(100vh-76px)] w-[21.875rem] shrink-0 grow-0 overflow-auto">
    <CoreTeam/>
    <TeamMembers/>
  </div>);
};

export { RightSideBar };
