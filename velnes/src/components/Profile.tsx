import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Login } from "../types/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const Profile = ({ profile, id }: { profile: Login[]; id: any}) => {
  const loggedInUser = localStorage.getItem("loggedUser");
  const userId = loggedInUser ? parseInt(loggedInUser) : null;
  const user = userId ? profile.find((u) => u.id === parseInt(id)) : null;

  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmByUser = window.confirm("Are you sure you want to logout?");
    if (confirmByUser) {
      localStorage.removeItem("loggedUser");
      navigate(`/login`);
    }
  };
  return (
    <div className="container text-center">
      <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
        <Link to={`/`}>
          <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
        </Link>
      </div>
      <div key={user?.id}>
        <img src={user?.imgP} alt="" className="borderRadImg" />
        <h3>
          {user?.name} {user?.surname}
        </h3>
        <Link to={`/view-profile/${user?.name}`} className="colorDarkPink">
          View profile
        </Link>
        <div className="profile">
        <Link to={`/login/my-appointments/${user?.id}`}>
          <div className="bg-light-pink mb-3">
            <h6>My appointments </h6>
            <img src="/velnesImages/arrow.png" alt="arrow" />
          </div>
        </Link>
        <div className="bg-light-pink mb-3">
          <h6>Loyalty</h6>
          <img src="/velnesImages/arrow.png" alt="arrow" />
        </div>
        <Link to={`/login/my-memberships/${user?.id}`}>
          <div className="bg-light-pink mb-3">
            <h6>My memberships</h6>
            <img src="/velnesImages/arrow.png" alt="arrow" />
          </div>
        </Link>
        <Link to={`/login/my-favorites/${user?.id}`}>
          <div className="bg-light-pink mb-3">
            <h6>My favorites</h6>
            <img src="/velnesImages/arrow.png" alt="arrow" />
          </div>
        </Link>
        <div className="bg-light-pink mb-3">
          <h6>Settings</h6>
          <img src="/velnesImages/arrow.png" alt="arrow" />
        </div>
        <div className="bg-light-pink mb-3">
          <h6>Language</h6>
          <img src="/velnesImages/arrow.png" alt="arrow" />
        </div>
        <div className="bg-light-pink" onClick={handleLogout}>
          <h6>Log out</h6>
          <img src="/velnesImages/arrow.png" alt="arrow" />
        </div>
        </div>
      </div>
    </div>
  );
};
