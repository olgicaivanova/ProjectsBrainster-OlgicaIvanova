import { Link, useParams } from "react-router-dom";
import { HomePageProps } from "../types/types";
import { Categories } from "./Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useBooking } from "../hooks/hooks";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const AllServices = ({ users }: { users: HomePageProps[] }) => {
  const [openCloseDetails, setOpenCloseDetails] = useState<number[]>([]);
  const { title } = useParams<{ title: string }>();
  const salonPage = users.find((use) => use.title === title);
  const [search, setSearch] = useState<string>("");
  const { checked, totalPrice, handleAddToBook } = useBooking();

  const handleToggleDetails = (index: number) => {
    if (openCloseDetails.includes(index)) {
      setOpenCloseDetails(openCloseDetails.filter((i) => i !== index));
    } else {
      setOpenCloseDetails([...openCloseDetails, index]);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredServices = salonPage
    ? salonPage.type.filter((el) =>
        el.typeOfTreatment.toLowerCase().includes(search.toLowerCase())
      )
    : [];
  return (
    <>
      <div className="container">
        {salonPage && (
          <>
            <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
              <Link to={`/search-results/map/salon-page/${salonPage?.id}`}>
                <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
              </Link>
              <h5 className="m-0"> {salonPage.company}</h5>
            </div>
            <Categories />
            <div className="form-outline mb-4 relativeArrorDiv">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="faMagnifyingGlass"
              />
              <input
                type="search"
                value={search}
                onChange={handleSearch}
                className="form-control"
                id="datatable-search-input"
                placeholder="Search"
              />
            </div>

            <div>
              {filteredServices.map((use) => (
                <div className="treatmentsBox" key={use.id}>
                  <div className="treatmentsSearch">
                    <div>
                      <h6>{use.typeOfTreatment}</h6>
                      <p className="text-muted">{use.time} min</p>
                      <h6>from {use.price} EUR</h6>
                      <a
                        href="#"
                        className="linkDarkPink"
                        onClick={() => handleToggleDetails(use.id)}
                      >
                        {openCloseDetails.includes(use.id)
                          ? "Close details"
                          : "Open details"}
                      </a>
                    </div>
                    {openCloseDetails.includes(use.id) && <p>{use.details}</p>}
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
          </>
        )}
      </div>
      <div className="bg-white buttonsEdit justify-content-around">
        <p className="text-muted m-0">{totalPrice}EUR</p>

        <Link
          to={`/search-results/map/salon-page/all-services/${salonPage?.title}/booking`}
        >
          <button className="btn">Next</button>
        </Link>
      </div>
    </>
  );
};
