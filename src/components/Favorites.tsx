import { useAppContext } from "../Context/context";
import { HomePageProps, Login } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ReusableCard } from "./ReusableCard";

export const Favorites = ({ users }: { users: HomePageProps[] }) => {
  const { fave } = useAppContext();

  const filteredFaves = users.filter((use) => fave.includes(use.id));

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
        <Link to={`/login/profile`}>
          <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
        </Link>
      </div>
      {filteredFaves.length > 0 ? (
        <div className="mb-3">
          <ReusableCard users={filteredFaves} />
        </div>
      ) : (
        <div>There's nothing added in you favorites.</div>
      )}
    </div>
  );
};
