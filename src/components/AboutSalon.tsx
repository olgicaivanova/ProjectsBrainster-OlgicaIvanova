import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOMServer from "react-dom/server";
import { faStar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAppContext, useFilterContext } from "../Context/context";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { ReusableSliderSearch } from "./ReusableSliderSearch";
import { calculateTotalSum } from "./ReusableCard";
import { PropsSalonPage } from "./MatchingSearch";
import { customMarkerIcon } from "./Map";

export const AboutSalon = ({ userData }: PropsSalonPage) => {
  const skopjeCoordinates: LatLngTuple = [41.9973, 21.428];

  return (
    <div className="mt-5">
        {userData &&
          userData.aboutSalonInfo.map((about, index) => (
            <div key={index}>
              <h2>About salon</h2>
              <p>{about.desc}</p>
              <div>
                <MapContainer
                  center={skopjeCoordinates}
                  zoom={11}
                  style={{ height: "100vh", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    icon={customMarkerIcon}
                    key={userData.id}
                    position={[userData.latitude, userData.longitude]}
                  ></Marker>
                </MapContainer>
              </div>
              <h2>Opening hours</h2>
              {about.openingHours.map((hours) => (
                <div key={index}>
                  <div className="d-flex justify-content-between">
                    <p>Monday</p>
                    <p>{hours.monday}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Tuesday</p>
                    <p>{hours.tuesday}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Wednesday</p>
                    <p>{hours.wednesday}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Thursday</p>
                    <p>{hours.thursday}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Friday</p>
                    <p>{hours.friday}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Saturday</p>
                    <p>{hours.saturday}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Sunday</p>
                    <p>{hours.sunday}</p>
                  </div>
                </div>
              ))}
              <h2>Contact</h2>
              <a href="#" className="linkDarkPink">
                {about.contact}
              </a>

              <h2>Additional informations</h2>
              {about.additionalInfo.map((info) => (
                <div key={index}>
                  <p>{info.pay}</p>
                  <p>{info.parking}</p>
                  <p>{info.wifi}</p>
                  <p>{info.access}</p>
                  <p>{info.child}</p>
                  <p>{info.pets}</p>
                </div>
              ))}
            </div>
          ))}
    </div>
  );
};
