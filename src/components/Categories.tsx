import { Link } from "react-router-dom";

// for now i only made cards for nails and hair
export const Categories = () => {
  return (
    <>
      <div className="categories">
        <Link className="linkBlack" to="/search?category=Hair">
          <div className="editIcons">
            <img src="/velnesImages/hair.jpg" alt="Hair" className="icon" />
            <p>Hair</p>
          </div>
        </Link>
        <Link className="linkBlack" to="/search?category=Face">
          <div className="editIcons">
            <img src="/velnesImages/face.jpg" alt="Face" className="icon" />
            <p>Face</p>
          </div>
        </Link>
        <Link className="linkBlack" to="/search?category=Nails">
          <div className="editIcons">
            <img src="/velnesImages/nails.jpg" alt="Nails" className="icon" />
            <p>Nails</p>
          </div>
        </Link>
        <Link className="linkBlack" to="/search?category=Hair-removal">
          <div className="editIcons">
            <img
              src="/velnesImages/removal.jpg"
              alt="Hair Removal"
              className="icon"
            />
            <p>Hair removal</p>
          </div>
        </Link>
        <Link className="linkBlack" to="/search?category=Massage">
          <div className="editIcons">
            <img
              src="/velnesImages/massage.jpg"
              alt="Massage"
              className="icon"
            />
            <p>Massage</p>
          </div>
        </Link>
      </div>
    </>
  );
};
