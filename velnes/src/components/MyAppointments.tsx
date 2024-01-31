import { Link, useParams } from "react-router-dom";
import { HomePageProps, Login } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const formatDate = (date: string) => {
  const dateObject = new Date(date);

  const dayName = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
  }).format(dateObject);
  const dateName = dateObject.getDate();
  const monthName = new Intl.DateTimeFormat(undefined, {
    month: "long",
  }).format(dateObject);

  return `${dayName}, ${dateName} ${monthName} ${dateObject.getFullYear()}`;
};

export const MyAppointments = ({
  profile,
  users,
}: {
  profile: Login[];
  users: HomePageProps[];
}) => {
  const { id } = useParams<{ id: any }>();
  const viewProfile = id ? profile.find((prof) => prof.id === +id) : undefined;
  const currentDate = new Date();

  const upcomingAppointments = viewProfile
    ? viewProfile.appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.selectedDate);
        return appointmentDate.getTime() >= currentDate.getTime();
      })
    : [];

  const pastAppointments = viewProfile
    ? viewProfile.appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.selectedDate);
        return appointmentDate.getTime() < currentDate.getTime();
      })
    : [];

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
        <Link to={`/login/profile`}>
          <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
        </Link>
      </div>
      <h2>My appointments</h2>
      <h5>Upcoming appointments</h5>
      {upcomingAppointments.map((appointment, index) => {
        const parsedChecked = JSON.parse(appointment.checked);
        const selectedServiceCount =
          Object.values(parsedChecked).filter(Boolean).length;

        return (
          <div key={index}>
          <Link className="linkBlack"
            to={`/login/my-appointments/${viewProfile?.id}/details/${appointment.appointmentId}`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex  mb-3" >
                <div>
                  <img
                    className="appointmentImg"
                    src={appointment.image}
                    alt={appointment.place}
                  />
                </div>
                <div>
                  <p className="m-0">
                    {formatDate(appointment.selectedDate)} at{" "}
                    {appointment.selectedTime}
                  </p>
                  <h6 className="m-0">{appointment.place}</h6>
                  <p>{selectedServiceCount} services</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </Link>
          </div>
        );
      })}

      <h5>Past appointments</h5>
      {pastAppointments.map((appointment, index) => {
        const parsedChecked = JSON.parse(appointment.checked);
        const selectedServiceCount =
          Object.values(parsedChecked).filter(Boolean).length;

        return (
          <div key={index}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex  mb-3">
              <div>
                <img
                  className="appointmentImg"
                  src={appointment.image}
                  alt={appointment.place}
                />
              </div>
              <div>
                <p className="m-0">
                  {formatDate(appointment.selectedDate)} at{" "}
                  {appointment.selectedTime}
                </p>
                <h6 className="m-0">{appointment.place}</h6>
                <p>{selectedServiceCount} services</p>
              </div>
            </div>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
          </div>
        );
      })}
    </div>
  );
};
