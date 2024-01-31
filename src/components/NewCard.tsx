import { TextField } from "@mui/material";
import { Login } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const NewCard = ({ profile }: { profile: Login[] }) => {
  const { name } = useParams<{ name: string }>();
  const navigation = useNavigate();
  const useName = profile.find((prof) => prof.name === name);
  const [addNewCard, setAddnNewCard] = useState({
    cardNumber: "",
    paymentCard: "",
    expiration: "",
    cvv: "",
  });

  const handleAddNew = async () => {
    try {
      if (!useName) {
        return <p>User not found.</p>;
      }
      const data = await axios.put(
        `http://localhost:5000/login/${useName?.id}`,
        {
          ...useName,
          paymentMethods: [...useName?.paymentMethods, addNewCard],
        }
      );

      console.log("Profile updated successfully:", data);
      navigation(`/view-profile/${useName?.name}/payment-methods`);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  const handleCancelBtn = () => {
    navigation(`/view-profile/${useName?.name}/payment-methods`);
  };

  return (
    <>
      <div className="container">
        <h2>Add new card</h2>
        <p>Securely save your card details for hassle-free payments.</p>

        <div>
          <TextField
            id="Card number"
            label="Card number"
            variant="outlined"
            className="w-100"
            value={addNewCard?.cardNumber}
            onChange={(e) =>
              setAddnNewCard({ ...addNewCard, cardNumber: e.target.value })
            }
          />
          <div className="d-flex">
            <TextField
              id="expiration"
              label="Expiration"
              variant="outlined"
              value={addNewCard?.expiration}
              onChange={(e) =>
                setAddnNewCard({ ...addNewCard, expiration: e.target.value })
              }
            />
            <TextField
              id="cvv"
              label="CVV"
              variant="outlined"
              value={addNewCard?.cvv}
              onChange={(e) =>
                setAddnNewCard({ ...addNewCard, cvv: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="buttonsEdit">
        <button onClick={handleCancelBtn} className="cancelBtn">
          Cancel
        </button>
        <button onClick={handleAddNew} className="btn">
          Add
        </button>
      </div>
    </>
  );
};
