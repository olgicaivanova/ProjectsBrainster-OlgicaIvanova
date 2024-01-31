import { Link, useParams } from "react-router-dom";
import { HomePageProps, Login } from "../types/types";
import { formatDate } from "./MyAppointments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const GiveReviews = ({
  users,
  profile,
}: {
  users: HomePageProps[];
  profile: Login[];
}) => {
  const { appointmentId } = useParams<{ appointmentId: any }>();

  const viewProfile1 = profile.find((appointment) => appointment.id);
  const selectedEmployee = localStorage.getItem("selectedEmployee");
  const [ambienceStars, setAmbienceStars] = useState<number | null>(0);
  const [cleanlinessStars, setCleanlinessStars] = useState<number | null>(0);
  const [staffStars, setStaffStars] = useState<number | null>(0);
  const [descRating, setDescRating] = useState<string | number>();

  const [value, setValue] = useState({
    name: viewProfile1?.name,
    ambience: ambienceStars,
    cleanliness: cleanlinessStars,
    staff: staffStars,
    id: new Date().valueOf(),
    date: new Date().toISOString(),
    user: viewProfile1?.name,
    desc: descRating,
  });

  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      name: viewProfile1?.name || "",
      ambience: ambienceStars || 0,
      cleanliness: cleanlinessStars || 0,
      staff: staffStars || 0,
      id: new Date().valueOf(),
      date: new Date().toISOString(),
      user: viewProfile1?.imgP || "",
      desc: descRating || "",
    }));
  }, [
    viewProfile1?.name,
    ambienceStars,
    cleanlinessStars,
    staffStars,
    descRating,
  ]);
  const viewProfile = profile.find((appointment) =>
    appointment.appointments.some((el) => el.appointmentId === +appointmentId)
  );
  if (!viewProfile) {
    return <div>Appointment details not found.</div>;
  }

  const selectedApp = viewProfile.appointments.find(
    (app) => app.appointmentId === +appointmentId
  );
  if (!selectedApp) {
    return <div>Selected appointment details not found.</div>;
  }

  const selectedSalonId = selectedApp.id;
  console.log(selectedSalonId);

  const selectedSalon = users.find((use) => use.id === selectedSalonId);

  const handleAddNew = async () => {
    try {
      if (!selectedSalon) {
        console.error("Salon not found.");
        return;
      }

      const updatedAppointments = [...selectedSalon.ratingOfSalon, value];

      const updatedUser = {
        ...selectedSalon,
        ratingOfSalon: updatedAppointments,
      };

      console.log("selectedSalon:", selectedSalon);
      console.log("updatedUser:", updatedUser);

      const response = await axios.put(
        `http://localhost:5000/users/${selectedSalon.id}`,
        updatedUser
      );

      console.log("Axios Response:", response.data);

      console.log("Review updated successfully:", response.data);
      alert("Review updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };
  const loggedInUser = localStorage.getItem("loggedUser");

  return (
    <>
      <div className="container">
        <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
          <Link
            to={`/login/my-appointments/${loggedInUser}/details/${appointmentId}`}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
          </Link>
        </div>
        <h2>Give feedback for {selectedApp.place}</h2>
        <div className="d-flex">
          <p>
            <FontAwesomeIcon icon={faCalendar} />
            {formatDate(selectedApp.selectedDate)}, {selectedApp.selectedTime}
          </p>
          <p>{selectedEmployee}</p>
        </div>

        <div className="d-flex justify-content-between">
          <p>Ambience</p>
          <Rating
            className="star"
            name="simple-controlled"
            value={ambienceStars}
            onChange={(event, value) => {
              setAmbienceStars(value);
            }}
          />
        </div>
        <div className="d-flex justify-content-between">
          <p>Cleanliness</p>
          <Rating
            className="star"
            name="simple-controlled"
            value={cleanlinessStars}
            onChange={(event, value) => {
              setCleanlinessStars(value);
            }}
          />
        </div>

        <div className="d-flex justify-content-between">
          <p>Staff</p>
          <Rating
            className="star"
            name="simple-controlled"
            value={staffStars}
            onChange={(event, value) => {
              setStaffStars(value);
            }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <textarea
            value={descRating}
            cols={50}
            rows={10}
            placeholder={"Write a comment here"}
            onChange={(e) => setDescRating(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="bg-white buttonsEdit justify-content-around">
        <button className="btn w-100" onClick={handleAddNew}>
          Confirm
        </button>
      </div>
    </>
  );
};
