import { HomePageProps } from "../types/types";
import { ReusableCard } from "./ReusableCard";

export const CardApp = ({ users }: { users: HomePageProps[] }) => {
  
  return (
    <>
      <div className="containerX">
      <div className="space">
        <ReusableCard users={users} />
      </div>
    </div> 
    </>
  );
};
