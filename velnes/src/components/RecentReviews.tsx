import { HomePageProps } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { calculateTotalSumForPerson } from "./SalonReviews";
import { Link } from "react-router-dom";

//get all the recent reviews from the last week/always update on time

export const RecentReviews = ({ users }: { users: HomePageProps[] }) => {
  const isLastWeekReview = (dateString: string) => {
    const reviewDate = new Date(dateString);

    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(currentDate.getDate() - 7);

    return reviewDate >= oneMonthAgo && reviewDate <= currentDate;
  };
  const recentReviews = users
    .map((user) => ({
      ...user,
      ratingOfSalon: user.ratingOfSalon.filter((review) =>
        isLastWeekReview(review.date)
      ),
    }))
    .filter((user) => user.ratingOfSalon.length > 0);

  return (
    <div className="containerX">
      <div className="space">
        {recentReviews &&
          recentReviews.map((user) =>
            user.ratingOfSalon.map((review, index) => (
              <div className="editCard" key={index}>
                <div className="card">
                  <div className="">
                    <div className="recentReviews">
                      <img
                        src={review.user}
                        alt={review.user}
                        className="user"
                      />
                      <div className="reviewInfo">
                        <h6 className="m-0">{review.name}</h6>
                        <p className="text-muted">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="stars">
                        <div className="colorOr">
                          <FontAwesomeIcon icon={faStar} />
                          <span>
                            {calculateTotalSumForPerson(
                              user.ratingOfSalon,
                              review.name
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="descWidth card-body">
                      <p className="m-0">{review.desc}</p>
                      <Link
                        className="linkBlack"
                        to={`/search-results/map/salon-page/${user.id}`}
                      >
                        <p className="m-0">Go to salon</p>
                      </Link>
                      <p className="text-muted">
                        <FontAwesomeIcon icon={faLocationDot} />
                        {user.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
      </div>
    </div>
  );
};
