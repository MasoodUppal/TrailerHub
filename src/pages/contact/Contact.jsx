import React from "react";
import "./contact.scss";

import profilePic from '../../Assets/profile-pic.png'

import emailIcon from "../../Assets/social-icons/mail.svg";
import linkedinIcon from "../../Assets/social-icons/linkedin.svg";


const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Me</h1>
      <img src={profilePic} alt="profile pic"/>
      <p className="intro">
        Hi, I'm Qadeer Masood, a passionate front-end developer specializing in React, JavaScript, and modern web technologies.
        This project was entirely built by me, from designing components and routes to integrating APIs. 
      </p>
      <p>
        Have questions or feedback? I'd love to hear from you! Reach out to me 
        using the links below.
      </p>
      <p>Email: <a href="mailto:qadeermasooduppal@gmail.com">qadeermasooduppal@gmail.com</a></p>
      <div className="contact-icons">
        {/* Email Icon */}
        <a href="mailto:qadeermasooduppal@gmail.com" className="icon-link" title="Email">
          <img src={emailIcon} alt="Email" className="social-icon" />
        </a>
        {/* LinkedIn Icon */}
        <a
          href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQH2ImYNbbi7XgAAAZNGlCgYvFCnEz8RiF0IcBeNsZW67lz3CHiQ8vYzoYgbZ_Wx_uTrF1zTWoW0OtWsDFDL9hISdJhH3wzyb5aaERBJlqK6GmsmrvYIVr39naRvS220WdFOksM=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fqadeer-masood-30682529a%3Flipi%3Durn%253Ali%253Apage%253Ad_flagship3_profile_view_base_contact_details%253BlcNHr6s6RAem8CC7v8d3Cg%253D%253D"
          className="icon-link"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
        </a>
      </div>
    </div>
  );
};

export default Contact;
