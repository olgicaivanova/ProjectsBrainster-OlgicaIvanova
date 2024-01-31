import { HomePageProps, Login } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const Memberships = ({
  profile,
}: {
  profile: Login[];
}) => {
  const { id } = useParams<{ id: any }>();
  const profileMember = profile.find((el) => el.id === +id);
  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
        <Link to={`/login/profile`}>
          <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
        </Link>
      </div>
      {profileMember &&
        profileMember.activeMemberships.map((mem, index) => (
          <div key={index}>
            <h2 className="mb-4">Active memberships</h2>
            <div className="p-4 membershipCard">
              <div className="d-flex linkDarkPink justify-content-between mb-4">
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faClock} />
                  <p className="m-0">{mem.time}</p>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p className="m-0">{mem.place}</p>
                </div>
              </div>
              <h5 className="mb-4">{mem.treatment}</h5>

              <div className="d-flex  justify-content-between">
                <div className="d-flex">
                  <p>{mem.sessions} sessions</p>
                  <span>&bull;</span>
                  <p>{mem.service} services</p>
                </div>
                <div className="d-flex">
                  <h6>{mem.price} EUR</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
