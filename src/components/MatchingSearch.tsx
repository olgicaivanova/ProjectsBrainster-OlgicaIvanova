import { useState } from "react";
import { HomePageProps } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useBooking } from "../hooks/hooks";

export interface PropsSalonPage {
  userData: HomePageProps;
}

export const MatchingSearch = ({ userData }: PropsSalonPage) => {
  const [openCloseDetails, setOpenCloseDetails] = useState<number[]>([]);

  const { checked, totalPrice, handleAddToBook } = useBooking();

  const handleToggleDetails = (index: number) => {
    if (openCloseDetails.includes(index)) {
      setOpenCloseDetails(openCloseDetails.filter((i) => i !== index));
    } else {
      setOpenCloseDetails([...openCloseDetails, index]);
    }
  };
  return (
    <div>
      <div>
        {userData.type.map((use, index) => (
          <div key={index} className="treatmentsBox">
            <div className="treatmentsSearch">
              <div>
                <h6>{use.typeOfTreatment}</h6>
                <p className="text-muted">{use.time} min</p>
                <h6>from {use.price} EUR</h6>
                <a
                  className="linkDarkPink"
                  onClick={() => handleToggleDetails(use.id)}
                >
                  {openCloseDetails.includes(use.id)
                    ? "Close details"
                    : "Open details"}
                </a>

                {openCloseDetails.includes(use.id) && <p>{use.details}</p>}
              </div>
              <div>
                <p onClick={() => handleAddToBook(use.id, use.price)}>
                  {checked[use.id] ? (
                    <FontAwesomeIcon
                      className="checkIcon addNewBtn"
                      icon={faCheck}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="addNewBtn plusIcon"
                    />
                  )}
                </p>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="bg-white buttonsEdit justify-content-around">
        <p className="text-muted m-0">{totalPrice}EUR</p>
        <p className="text-muted m-0">services</p>
        <Link
          to={`/search-results/map/salon-page/all-services/${userData.title}/booking`}
        >
          <button className="btn">Next</button>
        </Link>
      </div>
    </div>
  );
};
