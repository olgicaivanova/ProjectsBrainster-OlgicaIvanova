import { Switch } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Login } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const NotificationSettings = ({ profile }: { profile: Login[] }) => {
  const { name } = useParams<{ name: string }>();
  const viewProfile = profile.find((prof) => prof.name === name);
  const [notificationSettings, setNotificationSettings] = useState({
    email: false,
    sms: false,
    rebookReminders: false,
    newsletter: false,
  });

  const handleToggleNotificationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    notificationType: string
  ) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [notificationType]: event.target.checked,
    }));
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
        <Link to={`/view-profile/${viewProfile?.name}/edit`}>
          <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" />
        </Link>
      </div>
      <h2>Notifications</h2>
      <p>Velnes only sends notifications about appointments you have booked</p>
      <div className="notifications">
        <div>
          <p className="m-0 p-0">Email appointment</p>
          <p className="m-0 p-0">reminders</p>
        </div>
        <Switch
          checked={notificationSettings.email}
          onChange={(e) => handleToggleNotificationChange(e, "email")}
        />
      </div>
      <div className="notifications">
        <div>
          <p className="m-0 p-0">SMS appointment</p>
          <p className="m-0 p-0">reminders</p>
        </div>
        <Switch
          checked={notificationSettings.sms}
          onChange={(e) => handleToggleNotificationChange(e, "sms")}
        />
      </div>
      <div className="notifications">
        <div>
          <p className="m-0 p-0">Rebook reminders</p>
        </div>
        <Switch
          checked={notificationSettings.rebookReminders}
          onChange={(e) => handleToggleNotificationChange(e, "rebookReminders")}
        />
      </div>
      <div className="notifications">
        <div>
          <p className="m-0 p-0">Newsletter</p>
        </div>
        <Switch
          checked={notificationSettings.newsletter}
          onChange={(e) => handleToggleNotificationChange(e, "newsletter")}
        />
      </div>
    </div>
  );
};
