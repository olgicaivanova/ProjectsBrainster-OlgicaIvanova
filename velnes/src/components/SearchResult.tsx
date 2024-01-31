import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMap } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useFilterContext } from "../Context/context";
import { calculateTotalSum } from "./ReusableCard";
import { ReusableSliderSearch } from "./ReusableSliderSearch";
import { useAppContext } from "../Context/context";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";

export const SearchResult = () => {
  const { filteredUsers } = useFilterContext();
  const { fave, addFaveEl, removeFaveEl } = useAppContext();

  const toggleFavorite = (id: any) => {
    if (isFavorite(id)) {
      removeFaveEl(id);
    } else {
      addFaveEl(id);
    }
  };

  const isFavorite = (id: any) => {
    return fave.includes(id);
  };
  return (
    <div className="card-stack searchBg">
      <div className="row">
        <div className="col-md-12">
          <>
            <ReusableSliderSearch />
            {filteredUsers &&
              filteredUsers.map((user) => {
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
                  <div className="container" key={user.id}>
                    <Link
                      className="linkBlack"
                      to={`/search-results/map/salon-page/${user.id}`}
                    >
                      <div className="cardSearch mb-3">
                        <img src={user.img} alt={user.title} className="img" />
                        <h3 className="mt-3">{user.company}</h3>
                        <p>{user.adress}</p>
                        <div className="reviews">
                          <div className="colorOr" key={user.id}>
                            <FontAwesomeIcon icon={faStar} />
                            <span>{combinedRank.toFixed(1)}</span>
                          </div>
                          <span>&bull;</span>
                          <span>{user.ratingOfSalon.length} reviews</span>
                          <FontAwesomeIcon
                            className="fave"
                            icon={
                              isFavorite(user.id) ? faHeartCircleCheck : faHeart
                            }
                            onClick={() => toggleFavorite(user.id)}
                          />
                        </div>
                        <hr />
                        {user.type.map((use, index) => (
                          <div
                            key={index}
                            className="d-flex justify-content-between mb-3"
                          >
                            <h5 className="w-50">{use.typeOfTreatment}</h5>
                            <h5>from {use.price} EUR</h5>
                          </div>
                        ))}
                      </div>
                    </Link>
                  </div>
                );
              })}
          </>
          <div className="d-flex justify-content-center mb-3">
            <Link to="/search-results/map">
              <button className="map">
                Map <FontAwesomeIcon icon={faMap} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
