import { Link, useParams } from "react-router-dom";
import { HomePageProps, Login } from "../types/types";
import { formatDate } from "./MyAppointments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const AppointmentDetails = ({
  profile,
  users,
}: {
  profile: Login[];
  users: HomePageProps[];
}) => {
  const { appointmentId } = useParams<{ appointmentId: any }>();
  const selectedEmployee = localStorage.getItem("selectedEmployee");

  const viewProfile = profile.find((appointment) =>
    appointment.appointments.some((el) => el.appointmentId === +appointmentId)
  );

  const selectedApp = viewProfile?.appointments.find(
    (app) => app.appointmentId === +appointmentId
  );
  if (!selectedApp) {
    return <div>Selected appointment details not found.</div>;
  }

  const selectedInfo = JSON.parse(selectedApp?.checked);
  const serviceCounter = Object.keys(selectedInfo).filter(
    (key) => selectedInfo[key]
  );

  let totalCheckedTreatmentTime = 0;
  let totalCheckedTreatmentPrice = 0;
  const loggedInUser = localStorage.getItem("loggedUser");

  return (
    <>
      <div className="container">
        <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
          <Link to={`/login/my-appointments/${loggedInUser}`}>
            <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
          </Link>
        </div>
        <h3 className="m-0">
          {formatDate(selectedApp.selectedDate)} at {selectedApp.selectedTime}
        </h3>
        <p>{selectedApp.place}</p>
        <a href="#" className="linkDarkPink">
          {selectedApp.address}
        </a>
        <Link
          to={`/login/my-appointments/${viewProfile?.id}/details/${appointmentId}/manage-appointments`}
        >
          <button className="w-100 mt-3 mb-3 btn btnTransparent">
            Manage appointment
          </button>
        </Link>
        <Link
          to={`/login/my-appointments/${viewProfile?.id}/details/${appointmentId}/give-reviews`}
        >
          <button className="w-100 mt-3 mb-3 btn btnTransparent">
            Give reviews
          </button>
        </Link>
        <h5>Appointment details</h5>
        {users.map((use) => {
          const selectedTreat = use.type.filter((treat) =>
            serviceCounter.includes(treat.id.toString())
          );

          if (selectedTreat.length > 0) {
            return (
              <div key={use.id}>
                {selectedTreat.map((u) => {
                  const isTreatmentChecked = selectedInfo[u.id.toString()];

                  if (isTreatmentChecked) {
                    totalCheckedTreatmentTime += Number(u.time);
                    totalCheckedTreatmentPrice += u.price;
                  }

                  return (
                    <div key={u.id}>
                      <h5 className="m-0 mb-1">{u.typeOfTreatment}</h5>
                      <p className="greyText m-0 mb-1">
                        With {selectedEmployee}
                      </p>
                      <div className="d-flex justify-content-between">
                        <p className="greyText m-0">{u.time} min</p>
                        <p className="linkDarkPink m-0">{u.price} EUR</p>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </div>
            );
          } else {
            return null;
          }
        })}
        <div>
          <p className="greyText">
            Total treatment time is {totalCheckedTreatmentTime} min
          </p>
          <div className="d-flex justify-content-between mb-3">
            <h5>Total</h5>
            <p className="linkDarkPink">{totalCheckedTreatmentPrice} EUR</p>
          </div>
        </div>
      </div>
      <div className="bg-white buttonsEdit justify-content-around">
        <Link
          className="w-100"
          to={`/login/my-appointments/${viewProfile?.id}/details/${appointmentId}/manage-appointments/rebook`}
        >
          <button className="btn w-100">Rebook</button>
        </Link>
      </div>
    </>
  );
};
