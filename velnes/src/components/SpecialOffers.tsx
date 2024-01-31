import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { HomePageProps } from "../types/types";
import { Link } from "react-router-dom";
import { calculateTotalSum } from "./ReusableCard";
export const SpecialOffers = ({ users }: { users: HomePageProps[] }) => {
  return (
    <div className="containerX">
      <div className="space">
        {users &&
          users.map((user) => {
            const minDivider = user.ratingOfSalon.length;
            const totalAmbience =
              calculateTotalSum(user.ratingOfSalon || [], "ambience") /
              (minDivider || 1);
            const totalCleanliness =
              calculateTotalSum(user.ratingOfSalon || [], "cleanliness") /
              (minDivider || 1);
            const totalStaff =
              calculateTotalSum(user.ratingOfSalon || [], "staff") /
              (minDivider || 1);
            const combinedRank =
              (totalAmbience + totalCleanliness + totalStaff) / 3;

            return (
              <div className="editCard" key={user.id}>
                <div className="card">
                  <div className="card-body">
                    <div>
                      <h5 className="card-title">
                        {user.type[0].typeOfTreatment}
                      </h5>
                      <p className="card-text">{user.type[0].price} EUR</p>
                    </div>
                    <h5 className="card-title">{user.place}</h5>
                    <div className="reviews">
                      <div className="colorOr">
                        <FontAwesomeIcon icon={faStar} />
                        <span>{combinedRank.toFixed(1)}</span>
                      </div>
                      <span>&bull;</span>
                      <span>{user.ratingOfSalon.length} reviews</span>
                    </div>
                    <Link to={`/search-results/map/salon-page/${user.id}`}>
                      <button className="btn w-100 mt-3" type="button">
                        BOOK
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
