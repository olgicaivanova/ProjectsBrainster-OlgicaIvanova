import { useNavigate, useParams } from "react-router";
import { HomePageProps, Login } from "../types/types";
import { formatDate } from "./MyAppointments";
import axios from "axios";

export const CancelAppointment = ({
  users,
  profile,
}: {
  users: HomePageProps[];
  profile: Login[];
}) => {
  const { appointmentId } = useParams<{ appointmentId: any }>();
  const navigate = useNavigate();

  const viewProfile = profile.find((appointment) =>
    appointment.appointments.find((el) => el.appointmentId === +appointmentId)
  );

  const selectedApp = viewProfile?.appointments.find(
    (app) => app.appointmentId === +appointmentId
  );
  if (!selectedApp) {
    return <div>Selected appointment details not found.</div>;
  }

  const handleCancel = () => {
    navigate(
      `/login/my-appointments/${viewProfile?.id}/details/${appointmentId}/manage-appointments`
    );
  };

  const handleConfirm = () => {
    const updatedAppointments = viewProfile?.appointments.filter(
      (app) => app.appointmentId !== +appointmentId
    );

    const updatedProfile = {
      ...viewProfile,
      appointments: updatedAppointments,
    };

    axios
      .put(`http://localhost:5000/login/${viewProfile?.id}`, updatedProfile)
      .then((res) => {
        console.log(res);
        alert("Appointment canceled successfully");
        navigate(`/login/my-appointments/${viewProfile?.id}`);
      })
      .catch((error) => {
        console.error("Error canceling appointment: ", error);
        alert("An error occurred while canceling the appointment");
      });
  };

  const parsedChecked = JSON.parse(selectedApp.checked);
  const selectedServiceCount =
    Object.values(parsedChecked).filter(Boolean).length;

  return (
    <>
      <div className="container">
        <h2 className="mb-4">Are you sure you want to cancel?</h2>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex  mb-3" key={selectedApp.appointmentId}>
            <div>
              <img
                className="appointmentImg"
                src={selectedApp.image}
                alt={selectedApp.place}
              />
            </div>
            <div>
              <p className="m-0">
                {formatDate(selectedApp.selectedDate)} at{" "}
                {selectedApp.selectedTime}
              </p>
              <h6 className="m-0">{selectedApp.place}</h6>
              <p>{selectedServiceCount} services</p>
            </div>
          </div>
        </div>
        <p>
          If you want to change the appointment time, you can reschedule your
          appointment.
        </p>
      </div>
      <div className="bg-white buttonsEdit justify-content-around">
        <button className="cancelBtn" onClick={handleCancel}>
          Skip
        </button>
        <button className="btn" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </>
  );
};
