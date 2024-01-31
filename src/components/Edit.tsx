import { Link, useParams } from "react-router-dom";
import { Login } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const Edit = ({ profile }: { profile: Login[] }) => {
  const { name } = useParams<{ name: string }>();
  const viewProfile = profile.find((prof) => prof.name === name);

  return (
    <div>
      {viewProfile && (
        <div className="container">
           <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
              <Link to={`/view-profile/${viewProfile.name}`}>
                <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
              </Link>
            </div>
          <h2 className="text-center">Edit profile</h2>
          <img src={viewProfile.imgP} alt="" />
          <Link className="aHref" to={`/view-profile/${viewProfile.name}/edit-personal-info`}>
            <div className="bg-light-pink mb-3">
              <h6>Personal info</h6>
              <img src="/velnesImages/arrow.png" alt="arrow" />
            </div>
          </Link>
          <Link className="aHref" to={`/view-profile/${viewProfile.name}/notification-settings`}>
          <div className="bg-light-pink mb-3">
            <h6>Notification settings</h6>
            <img src="/velnesImages/arrow.png" alt="arrow" />
          </div>
          </Link>
          <Link className="aHref" to={`/view-profile/${viewProfile.name}/payment-methods`}>
          <div className="bg-light-pink mb-3">
            <h6>Payment methods</h6>
            <img src="/velnesImages/arrow.png" alt="arrow" />
          </div>
          </Link>
        </div>
      )}
    </div>
  );
};
