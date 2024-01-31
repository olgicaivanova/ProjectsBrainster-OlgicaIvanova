import { Link, useParams } from "react-router-dom";
import { Login } from "../types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { MenuItem, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

export const EditPersonalInfo = ({ profile }: { profile: Login[] }) => {
  const { name } = useParams<{ name: string }>();
  const viewProfile = profile.find((prof) => prof.name === name);
  const genderChoice = [
    {
      gender: "Female",
    },
    {
      gender: "Male",
    },
    {
      gender: "Prefer not to say",
    },
  ];
  const [data, setData] = useState({
    name: "",
    surname: "",
    birthDate: "",
    gender: "",
    number: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/login/${viewProfile?.id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/login/${viewProfile?.id}`, data)
      .then((res) => {
        console.log("Profile updated successfully:", res.data);
        alert("Data updated successfully");
      })
      .catch((err) => {
        console.log("Error updating profile:", err);
        alert("Error updating profile. Please try again.");
      });
  };

  return (
    <div className="container">
       <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
              <Link to={`/view-profile/${viewProfile?.name}/edit`}>
                <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
              </Link>
            </div>
      <h2 className="mb-3">Edit personal info</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setData({ ...data, name: e.target.value })}
          id="outlined-basic"
          label="First name"
          variant="outlined"
          className="w-100 mb-3"
        />
        <TextField
          onChange={(e) => setData({ ...data, surname: e.target.value })}
          id="outlined-basic"
          label="Last name"
          variant="outlined"
          className="w-100 mb-3"
        />
        <TextField
          onChange={(e) => setData({ ...data, birthDate: e.target.value })}
          id="outlined-basic"
          label="Birthday (mm/dd/yyyy)"
          variant="outlined"
          className="w-100 mb-3"
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Select gender"
          defaultValue={viewProfile?.gender}
          className="w-100 mb-3"
          onChange={(e) => setData({ ...data, birthDate: e.target.value })}
        >
          {genderChoice.map((option) => (
            <MenuItem key={option.gender} value={option.gender}>
              {option.gender}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          onChange={(e) => setData({ ...data, email: e.target.value })}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className="w-100 mb-3"
        />
        <TextField
          onChange={(e) => setData({ ...data, number: e.target.value })}
          id="outlined-basic"
          label="Phone number"
          variant="outlined"
          className="w-100 mb-3"
        />
        <TextField
          onChange={(e) => setData({ ...data, address: e.target.value })}
          id="outlined-basic"
          label="Address"
          variant="outlined"
          className="w-100"
        />
        <button type="submit" className="deleteProfile mt-5">
          Submit
        </button>
      </form>
    </div>
  );
};
