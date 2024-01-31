import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HomePageProps } from "../types/types";
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MatchingSearch } from "./MatchingSearch";
import { OurTeam } from "./OurTeam";
import { AboutSalon } from "./AboutSalon";
import { AccordionApp } from "./Accordion";
import { Footer } from "./Footer";
import { SalonReviews } from "./SalonReviews";
import { ProgressBars } from "./ProgressBars";
import { CardApp } from "./Card";
import { useAppContext, useFilterContext } from "../Context/context";
import { calculateTotalSum } from "./ReusableCard";
import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";



 export const SalonPage = ({ users }: { users: HomePageProps[] }) => {
  const { id } = useParams<{ id: any }>();
  const salonPage = users.find((user) => user.id === +id);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { fave, addFaveEl, removeFaveEl } = useAppContext();
 
  const minDivider = salonPage?.ratingOfSalon.length; 
  const {filteredUsers} = useFilterContext()
  
  const totalAmbience =
  calculateTotalSum(salonPage?.ratingOfSalon || [], "ambience") / (minDivider || 1);
const totalCleanliness =
  calculateTotalSum(salonPage?.ratingOfSalon || [], "cleanliness") / (minDivider || 1);
const totalStaff =
  calculateTotalSum(salonPage?.ratingOfSalon || [], "staff") / (minDivider || 1);


  const combinedRank =
    (totalAmbience + totalCleanliness + totalStaff) / 3; // beacuse of three categories

  if (!salonPage) {
    return <div>Salon page not found</div>;
  }

  const handleCarouselChange = (index: number) => {
    setCurrentSlide(index);
  };

  
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
    <>
      <div className="salonPage">
        <div className="icons-container">
          <Link className="linkBlack" to={`/search-results/map`} >
          <FontAwesomeIcon className="arrowSalon" icon={faArrowLeft} />
          </Link>
          <FontAwesomeIcon className="shareIcon" icon={faShareSquare} />
          <FontAwesomeIcon
                className="heartIcon"
                icon={
                  isFavorite(salonPage.id) ? faHeartCircleCheck : faHeart
                }
                onClick={() => toggleFavorite(salonPage.id)}
              />
        </div>
        <div className="d-flex align-items-center p-3">
          <Link to={`/`}>
            <p className="m-0 m-2 linkBlack">Home</p>
          </Link>
          <span>&bull;</span>
          <Link to={`/search`}>
            <p className="m-0 m-2 linkBlack">Search</p>
          </Link>
          <span>&bull;</span>
          <h6 className="m-0 m-2">{salonPage.company}</h6>
        </div>
        {salonPage.moreImages && (
          <div className="carousel-container">
            <Carousel
              showThumbs={false}
              onChange={handleCarouselChange}
              selectedItem={currentSlide}
            >
              {salonPage.moreImages.map((img, index) => (
                <div key={index}>
                  <img src={img.url} alt={img.caption} className="imgCarousel" />
                </div>
              ))}
            </Carousel>

            <div className="carousel-count">
              <p>
                {currentSlide + 1}/{salonPage.moreImages.length}
              </p>
            </div>
          </div>
        )}
        <div className="m-3 infoBoxSalon">
          <h2>{salonPage.company}</h2>
          <div className="reviews">
              <div className="colorOr">
                <FontAwesomeIcon icon={faStar} />
                <span>{combinedRank.toFixed(1)}</span>
              </div>
            <span>&bull;</span>
            {/* Replace "#" with the proper link */}
            <Link to={`/reviews`} className="linkDarkPink">
              <span>{salonPage.ratingOfSalon.length} reviews</span>
            </Link>
          </div>
          <p>{salonPage.subtitle}</p>
          {/* Replace "#" with the proper link */}
          <Link to={`/address`} className="linkDarkPink">
        
          </Link>
          <h2>Services</h2>
          <MatchingSearch userData={salonPage} />
          <OurTeam userData={salonPage} />
          <ProgressBars userData={salonPage} />
          <SalonReviews userData={salonPage} />
          <Link to={`/search-results/map/salon-page/${salonPage.id}/reviews`}>
            <button className="btnTransparent btn w-100">
              See all {salonPage.ratingOfSalon.length} reviews
            </button>
          </Link>
          <AboutSalon userData={salonPage} />
          <AccordionApp userData={salonPage} />
        </div>
      </div>
      <div className="bg-white buttonsEdit justify-content-around">
        <p className="text-muted m-0">{salonPage.type.length} services</p>
        <Link to={`/search-results/map/salon-page/all-services/${salonPage.title}`}>
          <button className="btn">Book</button>
        </Link>
      </div>
      <div className="recommended">
      <h2>Recommended</h2>
      <CardApp users={filteredUsers} />
      </div>
      <Footer />
    </>
  );
};

