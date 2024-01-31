import { Link, useParams } from "react-router-dom";
import { Login } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const ViewProfile = ({ profile }: { profile: Login[] }) => {
  const { name } = useParams<{ name: string }>();
  const viewProfile = profile.find((prof) => prof.name === name);

  return (
    <>
      {viewProfile && (
        <div key={viewProfile.id} className="container">
           <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
              <Link to={`/login/profile`}>
                <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
              </Link>
            </div>
          <img src={viewProfile.imgP} className="borderRadImg" alt="" />
          <div className="basicInfo">
            <h2>Basic info</h2>
            <Link to={`/view-profile/${viewProfile.name}/edit`} className="colorDarkPink">
              Edit
            </Link>
          </div>
          <div>
            <h6>First name:</h6>
            <p>{viewProfile.name}</p>
          </div>
          <div>
            <h6>Last name:</h6>
            <p>{viewProfile.surname}</p>
          </div>
          <div>
            <h6>Mobile number:</h6>
            <p> {viewProfile.number}</p>
          </div>
          <div>
            <h6>Email:</h6>
            <p> {viewProfile.email}</p>
          </div>
          <div>
            <h6>Date of birth:</h6>
            <p>{viewProfile.birthDate}</p>
          </div>
          <div>
            <h6>Gender:</h6>
            <p>{viewProfile.gender}</p>
          </div>
          <div>
            <h6>Address:</h6>
            <p>{viewProfile.address}</p>
          </div>
          <button className="deleteProfile mt-5">Delete my profile</button>
        </div>
      )}
    </>
  );
};
