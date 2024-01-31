import { useAppContext } from "../Context/context";
import { HomePageProps } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export  const calculateTotalSum = (ratings: any[], key: string) => {
  return ratings.reduce((total, use) => total + use[key], 0);
};

export const ReusableCard = ({ users }: { users: HomePageProps[] }) => {
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
    <div>
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

          const combinedRank = (totalAmbience + totalCleanliness + totalStaff) / 3;

          return (
            <div key={user.id} className="editCard w-100 mb-3 mt-3">
              <div className="card">
                <img
                  src={user.img}
                  className="card-img-top"
                  alt={user.title}
                />
                <Link className="linkBlack" to={`/search-results/map/salon-page/${user.id}`}>
                  <div className="caption">
                    <h2>{user.title}</h2>
                    <div className="reviews">
                        <div className="colorOr">
                          <FontAwesomeIcon icon={faStar} />
                          <span>{combinedRank.toFixed(1)}</span>
                        </div>
                      <span>&bull;</span>
                      <span>{user.ratingOfSalon.length} reviews</span>
                    </div>
                    <h4>{user.subtitle}</h4>
                  </div>
                </Link>
              </div>
              <FontAwesomeIcon
                className="fave"
                icon={
                  isFavorite(user.id) ? faHeartCircleCheck : faHeart
                }
                onClick={() => toggleFavorite(user.id)}
              />
            </div>
          );
        })}
    </div>
  );
};
