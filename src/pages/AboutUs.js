import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us">
      <div className="header-section">
        <h1>About Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="video-section">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/7xL9c39DhjI"
          title="Book Search Project Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="contact-section">
        <h2>Contact Us</h2>
        <ul>
          <li>Email: contact@booksearchproject.com</li>
          <li>Phone: 123-456-7890</li>
          <li>Address: 123 Main St, Anytown, USA</li>
        </ul>
      </div>
      <div className="form-section">
        <h2>Submit Your Feedback</h2>
        <p>
          Have a suggestion or found a bug? Let us know by filling out our
          feedback form.
        </p>
        <a
          href="https://forms.google.com/FORM_LINK_HERE"
          target="_blank"
          rel="noopener noreferrer"
          className="google-form-button"
        >
          Submit Feedback
        </a>
      </div>
    </div>
  );
}

export default AboutUs;
