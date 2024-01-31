import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { HomePageProps } from "../types/types";
import { Link, useLocation } from "react-router-dom";
import { useFilterContext } from "../Context/context";

export const Search = ({ users }: { users: HomePageProps[] }) => {
  const [categoriesVisible, setCategoriesVisible] = useState<boolean>(false);
  const [locationVisible, setLocationVisible] = useState<boolean>(false);
  const [dateVisible, setDateVisible] = useState<boolean>(false);
  const [timeVisible, setTimeVisible] = useState<boolean>(false);
  const [categories, setCategories] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>("");
  const [currLocation, setCurrLocation] = useState<any>();
  const [values, setValues] = useState("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [isLastField, setIsLastField] = useState<boolean>(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const { filteredUsers, setFilteredUsers } = useFilterContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const handleSearch = () => {
    const filtered = users.filter((user) => {
      if (
        (category && user.treatment === category) ||
        (selectedCategory && user.treatment === selectedCategory) ||
        (values && user.city.toLowerCase().includes(values.toLowerCase())) ||
        (selectedDate &&
          user.date ===
            selectedDate.toLocaleDateString("en-GB").replace(/\//g, ".")) ||
        (selectedTime && user.time === selectedTime)
      ) {
        return true;
      }
      return false;
    });
    setFilteredUsers(filtered);
  };

  const handleNext = () => {
    if (!categoriesVisible) {
      setCategoriesVisible(true);
    } else if (!locationVisible) {
      setLocationVisible(true);
    } else if (!dateVisible) {
      setDateVisible(true);
    } else if (!timeVisible) {
      setTimeVisible(true);
      setIsLastField(true);
      handleSearch();
    }
  };
  const handleFieldClick = (field: string) => {
    setActiveField((prevField) => (prevField === field ? null : field));
    if (field === "categories") {
      setCategoriesVisible(!categoriesVisible);
    } else if (field === "location") {
      setLocationVisible(!locationVisible);
    } else if (field === "date") {
      setDateVisible(!dateVisible);
    } else if (field === "time") {
      setTimeVisible(!timeVisible);
    }
  };

  const handleSkip = () => {
    setToggle((prevCategories) => !prevCategories);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValues(value);
  };



  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
    setCategories(false);
  };

  return (
    <div className="searchBg pt-4">
      <div className="container">
        <div
          className="inputFlex "
          onClick={() => handleFieldClick("categories")}
        >
          <div className="row">
            <div className="d-flex align-items-center justify-content-between">
              <div className="col-md-6">
                <p className="muted m-0 ">Treatment or venue</p>
              </div>
              <div className="col-md-6 text-right">
                <h6 className="m-0">
                  {selectedCategory
                    ? selectedCategory
                    : category
                    ? category
                    : "Choose a category"}
                </h6>
              </div>
            </div>
          </div>

          {categoriesVisible && (
            <select
              onClick={(e) => e.stopPropagation()}
              onChange={handleCategoryChange}
              value={selectedCategory || ""}
              className="form-select inputSearch input"
            >
              <option value="" disabled hidden>
                Top categories
              </option>
              <option value="Hair">Hair</option>
              <option value="Nails">Nails</option>
            </select>
          )}
        </div>

        <div className="inputFlex mt-3">
          <div className="row" onClick={() => handleFieldClick("location")}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="col-md-6">
                <p className="muted m-0">Where</p>
              </div>
              <div className="col-md-6 text-right">
                {values ? (
                  <h6 className="m-0">{values}</h6>
                ) : (
                  <h6 className="m-0">Nearest</h6>
                )}
              </div>
            </div>
          </div>
          {locationVisible && (
            <input
              type="text"
              value={values}
              onChange={handleInputChange}
              placeholder="Enter your location"
              className="inputSearch"
            />
          )}
        </div>

        <div className="inputFlex mt-3">
          <div className="row" onClick={() => handleFieldClick("date")}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="col-md-6">
                <p className="muted m-0">Date</p>
              </div>
              <div className="col-md-6 text-right">
                {selectedDate ? (
                  <h6 className="m-0">
                    {selectedDate
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, ".")}
                  </h6>
                ) : (
                  <h6 className="m-0">Any date</h6>
                )}
              </div>
            </div>
          </div>
          {dateVisible && (
            <DatePicker
              className="input inputSearch"
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
              dateFormat="dd.MM.yyyy"
              placeholderText="Select a date"
            />
          )}
        </div>

        <div className="inputFlex mt-3">
          <div className="row" onClick={() => handleFieldClick("time")}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="col-md-6">
                <p className="muted m-0">Time</p>
              </div>
              <div className="col-md-6 text-right">
                {selectedTime ? (
                  <h6 className="m-0">{selectedTime}</h6>
                ) : (
                  <h6 className="m-0">Any time</h6>
                )}
              </div>
            </div>
          </div>
          {timeVisible && (
            <TimePicker
              onChange={(time: any) => setSelectedTime(time)}
              value={selectedTime}
              className="inputSearch"
            />
          )}
        </div>
      </div>
      <div className="bg-white buttonsEdit justify-content-around">
        <button className="cancelBtn" onClick={handleSkip}>
          Skip
        </button>
        <button className="btn" onClick={handleNext}>
          {isLastField ? (
            <Link to={"/search-results"} className="search">
              Search
            </Link>
          ) : (
            "Next"
          )}
        </button>
      </div>
    </div>
  );
};
