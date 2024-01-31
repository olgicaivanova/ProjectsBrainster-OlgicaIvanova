import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';



export const Footer = () => {
  const links1 = ["Company values", "Our team", "Carrers", "Blog"];
  const links2 = ["Privacy policy", "Terms of use"];
  return (
    <footer>
      <div className="flex">
        <div>
          <h3>About Velnes</h3>
          {links1.map((link, index) => (
            <ul className="p-0" key={index}>
              <li>
                <a href="#">{link}</a>
              </li>
            </ul>
          ))}
        </div>
        <div>
          <h3>Legal</h3>
          {links2.map((link, index) => (
            <ul className="p-0" key={index}>
              <li>
                <a href="#">{link}</a>
              </li>
            </ul>
          ))}
        </div>
      </div>

    <div className="ml-3 socials">
      <h3>Find us on socials</h3>
        <span>
          <a href="#">
            <FaFacebook />
          </a>
        </span>
        <span>
          <a href="#">
            <FaInstagram />
          </a>
        </span>
        <span>
          <a href="#">
            <FaTwitterSquare />
          </a>
        </span>
        <span>
          <a href="#">
            <FaLinkedinIn />
          </a>
        </span>
      <p>&copy; 2023 Velnes.mk</p>
      </div>

    </footer>
  );
};
