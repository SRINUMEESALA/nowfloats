import { v4 as uuidv4 } from "uuid";
import "./index.css";

const webSectionsList = [
  { section: "Home", id: uuidv4() },
  { section: "Web Designs", id: uuidv4() },
  { section: "Support", id: uuidv4() },
  { type: "About", id: uuidv4() },
];
const ContactList = [
  { website: "Instagram", id: uuidv4() },
  { website: "Twitter", id: uuidv4() },
  { website: "Facebook", id: uuidv4() },
  { website: "Linkedin", id: uuidv4() },
];
const LegalList = [
  { type: "Terms & use", id: uuidv4() },
  { type: "Privacy policy", id: uuidv4() },
];
const Footer = () => (
  <div
    className="d-flex justify-content-center"
    style={{ backgroundColor: "rgb(0,30,60)" }}>
    <div className="footerParentCon d-flex flex-wrap text-light pt-3 pb-3">
      <div className="col-lg-5 col-6">
        <h1 className="pt-2 pb-2 h2">
          <span className="text-primary">Now</span>Floats
        </h1>
        <ul className="list-unstyled itemsOfFooter">
          <li>
            Address: 1246, Level 1, Vamsirams Jubilee Casa, Rd Number 62, near
            The Future Kid's Playgroup, Jubilee Hills, Hyderabad, Telangana
            500033
          </li>
          <li>@2023 All rights reserved</li>
        </ul>
      </div>
      <div className="col-lg-2 col-5">
        <h1 className="h6">Website</h1>
        <ul className="list-unstyled">
          {webSectionsList.map((obj) => (
            <li key={obj.id}>{obj.section}</li>
          ))}
        </ul>
      </div>
      <div className="col-lg-2 col-6">
        <h1 className="h6">Contact Us</h1>
        <ul className="list-unstyled">
          {ContactList.map((obj) => (
            <li key={obj.id}>{obj.website}</li>
          ))}
        </ul>
      </div>
      <div className="col-lg-3 col-5">
        <h1 className="h6">Legal</h1>
        <ul className="list-unstyled">
          {LegalList.map((obj) => (
            <li key={obj.id}>{obj.type}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default Footer;
