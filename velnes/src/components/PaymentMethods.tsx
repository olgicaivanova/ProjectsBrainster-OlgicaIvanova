import { Link, useParams } from "react-router-dom";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Login } from "../types/types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const PaymentMethods = ({ profile }: { profile: Login[] }) => {
  const { name } = useParams<{ name: string }>();
  const viewProfile = profile.find((prof) => prof.name === name);

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

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
        <Link to={`/view-profile/${viewProfile?.name}/edit`}>
          <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
        </Link>
      </div>
      <h2>Payment methods</h2>
      <p>Securely save your card details for hassle-free payments.</p>

      <Link
        className="aHref"
        to={`/view-profile/${viewProfile?.name}/payment-methods/add-new-card`}
      >
        <div className="d-flex align-items-center">
          <p className="addNewBtn">+</p>
          <h6>Add card</h6>
        </div>
      </Link>

      {viewProfile &&
        viewProfile.paymentMethods &&
        viewProfile.paymentMethods.map((payment, index) => (
          <div className="d-flex paymentCard mb-3" key={index}>
            <p>{payment.paymentCard}</p>
            <p>{payment.cardNumber}</p>
            <FontAwesomeIcon
              icon={faEllipsisH}
              onClick={() => handleCardClick(index)}
            />

            {selectedCardIndex === index && showCardInfo && (
              <div className="card-popup">
                <div className="seeMore p-3">
                  <p>{payment.paymentCard}</p>
                  <p>{payment.cardNumber}</p>
                </div>
                <div className="buttonsEdit">
                  <button onClick={handleClosePopup} className="cancelBtn">
                    Cancel
                  </button>
                  {/* BTN DELETE TO DOOO!!!!! */}
                  <button className="btn">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
