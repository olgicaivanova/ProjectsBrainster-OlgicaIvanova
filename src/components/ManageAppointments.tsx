import { HomePageProps, Login } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

export const ManageAppointments = ({
  users,
  profile,
}: {
  users: HomePageProps[];
  profile: Login[];
}) => {
  const { appointmentId } = useParams<{ appointmentId: any }>();

  const viewProfile = profile.find((appointment) =>
    appointment.appointments.some((el) => el.appointmentId === +appointmentId)
  );
  const loggedInUser = localStorage.getItem("loggedUser");

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
        <Link
          to={`/login/my-appointments/${loggedInUser}/details/${appointmentId}`}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
        </Link>
      </div>
      <div className="d-flex align-items-center manageDiv mb-3">
        <FontAwesomeIcon icon={faCalendar} /> Add to calendar
      </div>
      <Link
        to={`/login/my-appointments/${viewProfile?.id}/details/${appointmentId}/manage-appointments/rebook`}
      >
        <div className="d-flex align-items-center manageDiv mb-3 linkBlack">
          <FontAwesomeIcon icon={faCalendar} /> Reschedule appointment
        </div>
      </Link>
      <Link
        to={`/login/my-appointments/${viewProfile?.id}/details/${appointmentId}/manage-appointments/cancel`}
      >
        <div className="d-flex align-items-center manageDiv linkBlack">
          <FontAwesomeIcon icon={faCalendar} /> Cancel appointment
        </div>
      </Link>
    </div>
  );
};
