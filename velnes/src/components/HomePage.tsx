import { Link } from "react-router-dom";
import { Benefit, HomePageProps } from "../types/types";
import { Categories } from "./Categories";
import { RecentReviews } from "./RecentReviews";
import { SpecialOffers } from "./SpecialOffers";
import { Benefits } from "./Benefits";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { CardApp } from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const HomePage = ({
  users,
  benefit,
}: {
  users: HomePageProps[];
  benefit: Benefit[];
}) => {
  return (
    <div className="homePageBackground">
      <Header />
      <main className="posRel">
        <h1 className="h1HP">Book beauty and wellness services in Skopje</h1>
        <div className="searchContainer">
          <Link to="/search">
            <FontAwesomeIcon
              className="magnifyGlass"
              icon={faMagnifyingGlass}
            />
            <h6 className="h6HP">Any treatment or venue</h6>
            <div className="d-flex venueHP">
              <p>Anywhere</p>
              <span>&bull;</span>
              <p>Any date</p>
              <span>&bull;</span>
              <p>Any time</p>
            </div>
            <input type="text" className="seachBar" />
          </Link>
        </div>

        <Categories />

        <div className="arrow">
          <img src="/velnesImages/arrow.jpg" alt="" className="icon" />
        </div>
      </main>
      <div className="div">
        <div className="recommended">
          <h2>Recommended</h2>
          {users.length > 0 ? <CardApp users={users} /> : <p>Loading...</p>}
        </div>

        <div className="recommended">
          <h2>Recent Reviews</h2>
          {users.length > 0 ? (
            <RecentReviews users={users} />
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="recommended">
          <h2>Special Offers</h2>
          {users.length > 0 ? (
            <SpecialOffers users={users} />
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="recommended">
          <h2>Benefits of Velnes</h2>
          {<Benefits benefits={benefit} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};
