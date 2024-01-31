import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useFilterContext, useFilterSliderContext } from "../Context/context";
import { useState } from "react";
import { Filters } from "./Filters";

export const ReusableSliderSearch = () => {
  const { filteredUsers } = useFilterContext();
  const {filters, setFilters} = useFilterSliderContext()
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const [showCardInfo, setShowCardInfo] = useState<boolean>(false);

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index);
    setShowCardInfo(true);
  };

  const handleClosePopup = () => {
    setSelectedCardIndex(null);
    setShowCardInfo(false);
  };
  const handleSearch = () => {
    console.log(filters);
    setFilters(filters);
    handleClosePopup()
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="seachBar w-80 mb-4">
        {Array.from(new Set(filteredUsers.map((user) => user.treatment))).map(
          (treatment, index) => (
            <div className="flexEnd" key={index}>
              <Link to={`/search`}>
                <FontAwesomeIcon
                  className="arrowLeftLong"
                  icon={faArrowLeftLong}
                />
              </Link>
              <h5 className="m-0">{treatment}</h5>

              <FontAwesomeIcon
                className="sliderIcon"
                icon={faSliders}
                onClick={() => handleCardClick(index)}
              />
              {selectedCardIndex === index && showCardInfo && (
                <div className="card-popup filterPopUp ">
                  <div className="seeMore p-2 filterDiv">
                    <h5 className="m-0 filterTitle mt-4">Filters</h5>
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={handleClosePopup}
                      className="faX"
                    />
                    <div className="buttonsEdit">
                      <button className="cancelBtn">Clear all</button>
                      <button className="btn" onClick={handleSearch}>
                        Search
                      </button>
                    </div>
                  </div>
                  <div>
                    <Filters filteredSearch={filteredUsers} />
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};
