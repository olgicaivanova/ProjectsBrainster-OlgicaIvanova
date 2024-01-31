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

const skopjeCoordinates: LatLngTuple = [41.9973, 21.428];

export const MapApp = () => {
  const { filteredUsers } = useFilterContext();
  const { fave, addFaveEl, removeFaveEl } = useAppContext();

  const toggleFavorite = (id: any) => {
    if (isFavorite(id)) {
      removeFaveEl(id);
    } else {
      addFaveEl(id);
    }
  };
  
  const isFavorite = (id: any) => {
    return fave.includes(id);
  };
  return (
    <div>
      <ReusableSliderSearch />
      <MapContainer
        center={skopjeCoordinates}
        zoom={11}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredUsers.map((user) => {
          const minDivider = user.ratingOfSalon.length;
          const totalAmbience =
            calculateTotalSum(user.ratingOfSalon || [], "ambience") /
            (minDivider || 1);
          const totalCleanliness =
            calculateTotalSum(user.ratingOfSalon || [], "cleanliness") /
            (minDivider || 1);
          const totalStaff =
            calculateTotalSum(user.ratingOfSalon || [], "staff") /
            (minDivider || 1);
          const combinedRank =
            (totalAmbience + totalCleanliness + totalStaff) / 3;

          return (
            <Marker
              icon={customMarkerIcon}
              key={user.id}
              position={[user.latitude, user.longitude]}
            >
              <Popup>
                <div key={user.id}>
                  <img src={user.img} alt={user.title} width={"100%"} />
                  <Link to={`/search-results/map/salon-page/${user.id}`}>
                    <div className="p-2">
                      <h2>{user.company}</h2>
                      <div className="reviews">
                          <div className="colorOr">
                            <FontAwesomeIcon icon={faStar} />
                            <span>{combinedRank.toFixed(1)}</span>
                          </div>
                        <span>&bull;</span>
                        <span>{user.ratingOfSalon.length} reviews</span>
                      </div>
                      <p className="m-0 mt-2">{user.subtitle}</p>
                    </div>
                  </Link>
                  <FontAwesomeIcon
                    className="fave"
                    icon={isFavorite(user.id) ? faHeartCircleCheck : faHeart}
                    onClick={() => toggleFavorite(user.id)}
                  />
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div className="lengthSalons">
        <div className="borderTop"></div>
        <h2>{filteredUsers.length} salons found</h2>
      </div>
    </div>
  );
};

export const customMarkerIcon = L.divIcon({
  className: "locationIcon",
  html: ReactDOMServer.renderToString(
    <FontAwesomeIcon icon={faMapMarkerAlt} />
  ),
});