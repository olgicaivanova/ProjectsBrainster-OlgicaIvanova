import { Link, useParams } from "react-router-dom";
import { HomePageProps, Login } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useBooking } from "../hooks/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
export function calculateTotalTime(selectedTreat: any) {
  let totalMinutes = 0;

  selectedTreat.forEach((el: any) => {
    totalMinutes += parseInt(el.time);
  });

  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  return `${hours}h ${minutes}min`;
}

export const ConfirmAppointment = ({
  users,
  profile,
}: {
  users: HomePageProps[];
  profile: Login[];
}) => {
  const loggedInUser = localStorage.getItem("loggedUser");
  const userId = loggedInUser ? parseInt(loggedInUser) : null;
  const user = userId ? profile.find((u) => u.id === userId) : null;

  let { totalPrice, checked } = useBooking();
  const { title } = useParams<{ title: string }>();
  const salonPage = users.find((use) => use.title === title);
  const selectedDate = localStorage.getItem("selectedDate");
  const selectedTime = localStorage.getItem("selectedTime");
  const selectedEmployee = localStorage.getItem("selectedEmployee");
  const [isInitialRender, setIsInitialRender] = useState(true);

  const appointmentId = new Date().valueOf();
  const [addNewCard, setAddNewCard] = useState({
    checked: JSON.stringify(checked),
    place: salonPage?.title,
    id: salonPage?.id,
    address: salonPage?.adress,
    image: salonPage?.img,
    totalPrice: totalPrice,
    selectedEmployee: selectedEmployee,
    selectedDate: selectedDate || "",
    selectedTime: selectedTime || "",
    appointmentId: appointmentId || 0,
  });
  
  useEffect(() => {
    setAddNewCard((prev) => ({
      ...prev,
      selectedEmployee: selectedEmployee,
      place: salonPage?.title || "",
      id: salonPage?.id || 0,
      address: salonPage?.adress || "",
      image: salonPage?.img,
      selectedDate: selectedDate || "",
      selectedTime: selectedTime || "",
      appointmentId: appointmentId || 0,
    }));
  }, [isInitialRender]);
  
  const handleAddNew = async () => {
    try {
      if (!user) {
        console.error("User not found.");
        return;
      }
      localStorage.removeItem("selectedDate");
      localStorage.removeItem("selectedTime");
      localStorage.removeItem("selectedEmployee");
      localStorage.removeItem("bookingData");
      const updatedAppointments = [...user.appointments, addNewCard];

      const updatedUser = {
        ...user,
        appointments: updatedAppointments,
      };

      const response = await axios.put(
        `http://localhost:5000/login/${user?.id}`,
        updatedUser
      );

      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  let totalMinutes = 0;
  users.map((use) => {
    const selectedTreat = use.type.filter((u) => checked[u.id]);

    selectedTreat.forEach((el) => {
      totalMinutes += parseInt(el.time);
    });
  });

  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  const totalTimeFormatted = `${hours}h ${minutes}min`;

  const dateObject = selectedDate ? new Date(selectedDate) : null;
  let dayName = "";
  let date = "";
  let monthName = "";

  if (dateObject) {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    dayName = dayNames[dateObject.getDay()];
    date = dateObject.getDate().toString();
    monthName = monthNames[dateObject.getMonth()];
  }

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-4">
        <Link
          to={`/search-results/map/salon-page/all-services/${salonPage?.title}/booking`}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
        </Link>
        <h2>Review and confirm</h2>
      </div>
      {salonPage && (
        <>
          <p>{salonPage.title}</p>
          <Link
            to={`/search-results/map/salon-page/all-services/${title}/booking`}
          >
            <div className="d-flex greyText align-items-center">
              <FontAwesomeIcon className="mb-3" icon={faCalendar} />
              <p>{`${dayName} ${date} ${monthName}`}</p>
              <p>{selectedTime}</p>
              <FontAwesomeIcon className="mb-3" icon={faPencil} />
            </div>
          </Link>
          <p className="textInfo">{salonPage.info}</p>
        </>
      )}
      {users.map((use) => {
        const selectedTreat = use.type.filter((treat) => checked[treat.id]);

        return selectedTreat ? (
          <div key={use.id}>
            {selectedTreat.map((u) => (
              <div key={use.id}>
                <h5 className="m-0 mb-1">{u.typeOfTreatment}</h5>
                <p className="greyText m-0 mb-1">With {selectedEmployee}</p>
                <div className="d-flex justify-content-between">
                  <p className="greyText m-0">{u.time} min</p>
                  <p className="linkDarkPink m-0">{u.price} EUR</p>
                </div>
                <hr />
              </div>
            ))}
          </div>
        ) : null;
      })}
      <p className="greyText">Total treatment time is {totalTimeFormatted}</p>
      <div className="d-flex justify-content-between mb-3">
        <h5>Total</h5>
        <p className="linkDarkPink">{totalPrice} EUR</p>
      </div>

      <Link to={`/login`}>
        <button
          onClick={handleAddNew}
          className="btnTransparent btn w-100 mb-3"
        >
          Sign in
        </button>
      </Link>
      {/* add link */}
      <a href="#">
        <p className="text-center greyText">Or continue as quest</p>
      </a>
    </div>
  );
};
