import { Link, useParams } from "react-router-dom";
import { HomePageProps, Login } from "../types/types";
import { useEffect, useState } from "react";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const Rebook = ({
  users,
  profile,
}: {
  users: HomePageProps[];
  profile: Login[];
}) => {
  const [data, setData] = useState<{
    selectedEmployee: any | '';
    selectedDate: any | null;
    selectedTime: any | null;
  }>({
    selectedEmployee: '',
    selectedDate: null,
    selectedTime: null,
  });

  const { appointmentId } = useParams<{ appointmentId: any }>();
  const { id } = useParams<{ id: any }>();
  const booking = users.find((use) => use.id === +id);

  const viewProfile = profile.find((appointment) =>
    appointment.appointments.find((el) => el.appointmentId === +appointmentId)
  );

  useEffect(() => {
    axios
      .get(`http://localhost:5000/login/${viewProfile?.id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [viewProfile]);

  const handleClick = () => {
    const updatedProfile = [...profile];

    const profileIndex = updatedProfile.findIndex((appointment) =>
      appointment.appointments.find((el) => el.appointmentId === +appointmentId)
    );

    if (profileIndex !== -1) {
      const appointmentIndex = updatedProfile[
        profileIndex
      ].appointments.findIndex((el) => el.appointmentId === +appointmentId);

      if (appointmentIndex !== -1) {
        const selectedDateAsString = data.selectedDate
          ? data.selectedDate.toISOString()
          : null;
        const selectedTimeAsString = data.selectedTime
          ? data.selectedTime.toString()
          : null;
        const selectedEmployeeAsString = data.selectedEmployee
          ? data.selectedEmployee.toString()
          : null;

        updatedProfile[profileIndex].appointments[
          appointmentIndex
        ].selectedDate = selectedDateAsString;
        updatedProfile[profileIndex].appointments[
          appointmentIndex
        ].selectedTime = selectedTimeAsString;
        updatedProfile[profileIndex].appointments[
          appointmentIndex
        ].selectedEmployee = selectedEmployeeAsString;
      }
    }

    axios
      .put(
        `http://localhost:5000/login/${viewProfile?.id}`,
        updatedProfile[profileIndex]
      )
      .then((res) => {
        console.log("Appointment updated successfully:", res.data);

        alert("Appointment updated successfully");
      })
      .catch((err) => {
        console.log("Error updating appointment:", err);
        alert("Error updating appointment. Please try again.");
      });
  };

  if (!viewProfile) {
    return <div>Appointment not found.</div>;
  }
  const loggedInUser = localStorage.getItem("loggedUser");

  return (
    <>
      <div className="container">
        <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
          <Link
            to={`/login/my-appointments/${loggedInUser}/details/${appointmentId}/manage-appointments`}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
          </Link>
        </div>
        <h2>Select staff</h2>
        <select
  className="w-100"
  onChange={(e) =>
    setData({ ...data, selectedEmployee: e.target.value })
  }
  value={data.selectedEmployee}
>
  <option value="No preference">No preference</option>
  {booking &&
    booking.team.map((employee, index) => (
      <option key={index} value={employee.name}>
        {employee.name}
      </option>
    ))}
</select>

        <h2 className="mt-3">Select date and time</h2>
        <DatePicker
          className="input inputSearch date"
          selected={data.selectedDate}
          onChange={(date) => setData({ ...data, selectedDate: date })}
          dateFormat="dd.MM.yyyy"
          placeholderText="Select a date"
        />
        <TimePicker
          onChange={(time) => setData({ ...data, selectedTime: time })}
          value={data.selectedTime}
          className="input inputSearch"
        />
      </div>
      <div className="bg-white buttonsEdit justify-content-around">
        <button onClick={handleClick} className="btn w-100">
          Confirm
        </button>
      </div>
    </>
  );
};
