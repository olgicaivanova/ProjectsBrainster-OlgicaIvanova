import { Link, useParams } from "react-router-dom";
import { HomePageProps } from "../types/types";
import { useBooking } from "../hooks/hooks";
import { useEffect, useState } from "react";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const Booking = ({ users }: { users: HomePageProps[] }) => {
  const { title } = useParams<{ title: string }>();
  const booking = users.find((use) => use.title === title);
  const { totalPrice } = useBooking();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  const day = new Date();
  const month = day.toLocaleString("default", { month: "long" });
  useEffect(() => {
    const storedDate = localStorage.getItem("selectedDate");
    const storedTime = localStorage.getItem("selectedTime");
    const storedEmployee = localStorage.getItem("selectedEmployee");
    if (storedDate) setSelectedDate(new Date(storedDate));
    if (storedTime) setSelectedTime(storedTime);
    if (storedEmployee) setSelectedEmployee(storedEmployee);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem("selectedDate", selectedDate.toISOString());
    }
    if (selectedTime) localStorage.setItem("selectedTime", selectedTime);
  }, [selectedDate, selectedTime]);
  if (selectedEmployee) {
    localStorage.setItem("selectedEmployee", selectedEmployee);
  }
  return (
    <>
      <div className="container">
        <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-4">
          <Link
            to={`/search-results/map/salon-page/all-services/${booking?.title}`}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
          </Link>
        </div>
        <h2>Select employee</h2>
        <select
          className="w-100"
          name=""
          id=""
          onChange={(e) => setSelectedEmployee(e.target.value)}
          value={selectedEmployee}
        >
          <option value="No preference">No preference</option>
          {booking &&
            booking.team.map((name, index) => (
              <option
                key={index}
                value={name.name}
                onChange={() => setSelectedEmployee(name.name)}
              >
                {name.name}
              </option>
            ))}
        </select>
        <h2 className="mt-2">Select date and time</h2>
        <DatePicker
          className="input inputSearch date"
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          dateFormat="dd.MM.yyyy"
          placeholderText="Select a date"
        />
        <TimePicker
          onChange={(time: any) => setSelectedTime(time)}
          value={selectedTime}
          className="input inputSearch"
        />
      </div>
      <div className="bg-white buttonsEdit justify-content-around">
        <p className="text-muted m-0">{totalPrice} EUR</p>

        <Link
          to={`/search-results/map/salon-page/all-services/${title}/booking/appointment`}
        >
          <button className="btn">Book</button>
        </Link>
      </div>
    </>
  );
};
