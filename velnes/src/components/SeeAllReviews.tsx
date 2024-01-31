import { Link, useParams } from "react-router-dom";
import { HomePageProps } from "../types/types";
import { ProgressBars } from "./ProgressBars";
import { SalonReviews } from "./SalonReviews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const SeeAllReviews = ({ users }: { users: HomePageProps[] }) => {
  const { id } = useParams<{ id: any }>();
  const selectedUser = users.find((user) => user.id === +id);
  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
        <Link to={`/search-results/map/salon-page/${selectedUser?.id}`}>
        <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
        </Link>
        <h5 className="m-0">All reviews</h5>
      </div>
      {selectedUser && (
        <>
          <ProgressBars key={selectedUser.id} userData={selectedUser} />
          {/* <h2>filter</h2> */}
          <SalonReviews userData={selectedUser} />
        </>
      )}
    </div>
  );
};
