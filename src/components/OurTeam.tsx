import { PropsSalonPage } from "./MatchingSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const OurTeam = ({ userData }: PropsSalonPage) => {
  return (
    <div>
      <h2>Meet our team</h2>
      <div className="d-flex containerX">
        {userData &&
          userData.team.map((team, index) => (
            <div key={index}>
              <div  className="ourTeam">
                <div className="teamInfo">
                  <img className="img" src={team.userImg} alt={team.name} />
                  <h2>{team.name}</h2>
                  <p>{team.proffesion}</p>
                  <div className="colorOr">
                    <FontAwesomeIcon icon={faStar} />
                    <span>{team.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
