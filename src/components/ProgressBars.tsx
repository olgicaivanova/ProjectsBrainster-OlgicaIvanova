import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { PropsSalonPage } from "./MatchingSearch";

export const ProgressBars = ({ userData }: PropsSalonPage) => {
  const calculateTotalSum = (ratings: any[], key: string) => {
    return ratings.reduce((total, use) => total + use[key], 0);
  };

  const maxDivider = 5;
  const minDivider = userData.ratingOfSalon.length;

  const totalAmbience =
    calculateTotalSum(userData.ratingOfSalon, "ambience") / minDivider;
  const totalCleanliness =
    calculateTotalSum(userData.ratingOfSalon, "cleanliness") / minDivider;
  const totalStaff =
    calculateTotalSum(userData.ratingOfSalon, "staff") / minDivider;

  const combinedRank =
    (totalAmbience + totalCleanliness + totalStaff) / 3; // beacuse of three categories

  return (
    <>
      <div>
        <div className="ratings">
          <div>
            <div className="d-flex align-items-center linkDarkPink fs-5">
              <FontAwesomeIcon icon={faStar} />
              <span>{combinedRank.toFixed(1)}</span>
            </div>
            <div>
              <p>Total Ambience</p>
              <p>{totalAmbience.toFixed(1)}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow={totalAmbience}
                  aria-valuemin={0}
                  aria-valuemax={maxDivider}
                  style={{
                    width: `${(totalAmbience / maxDivider) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <p>Total Cleanliness</p>
              <p>{totalCleanliness.toFixed(1)}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow={totalCleanliness}
                  aria-valuemin={0}
                  aria-valuemax={maxDivider}
                  style={{
                    width: `${(totalCleanliness / maxDivider) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <p>Total Staff</p>
              <p>{totalStaff.toFixed(1)}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow={totalStaff}
                  aria-valuemin={0}
                  aria-valuemax={maxDivider}
                  style={{
                    width: `${(totalStaff / maxDivider) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};
