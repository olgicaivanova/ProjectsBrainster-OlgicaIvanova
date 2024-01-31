import { Link } from "react-router-dom";

export const Header = () => {
    return (
      <header>
        <Link to="/"><img className="imgLogo" src="/velnesImages/logo-velnes.jpg" alt="Velnes Logo" /></Link>
        <div className="editIcon">
        <Link to="/login"><img src="/velnesImages/user.jpg" alt="user" className="icon" /></Link>
        </div>
      </header>
    );
  };
  