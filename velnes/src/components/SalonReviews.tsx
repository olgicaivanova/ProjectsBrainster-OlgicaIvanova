import { PropsSalonPage } from "./MatchingSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

export const calculateTotalSumForPerson = (ratings: any, name: string) => {
  const personRatings = ratings.filter(
    (rating: { name: string }) => rating.name === name
  );

  const totalSum = personRatings.reduce(
    (total: string, rating: any) =>
      total + rating.ambience + rating.cleanliness + rating.staff,
    0
  );

  const maxPossibleScore = personRatings.length * 15;

  return ((totalSum / maxPossibleScore) * 5).toFixed(1);
};
export const SalonReviews = ({ userData }: PropsSalonPage) => {

  return (
    <>
      <div className="d-flex containerX mt-5 mb-5">
        {userData &&
          userData.ratingOfSalon.map((use) => (
            <div key={use.id} className="editCard">
              <div className="card">
                <div key={use.id}>
                  <div className="recentReviews">
                    <img src={use.user} alt={use.name} className="user" />
                    <div className="reviewInfo">
                      <h6 className="m-0">{use.name}</h6>
                      <p className="text-muted">{use.date}</p>
                    </div>
                    <div className="stars">
                      <div className="colorOr d-flex">
                        <FontAwesomeIcon icon={faStar} />
                        <span>
                          {calculateTotalSumForPerson(
                            userData.ratingOfSalon,
                            use.name
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <p>{use.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
