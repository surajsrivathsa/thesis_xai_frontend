import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us">
      <div className="header-section">
        <h1>About Us</h1>
        <p>
          Welcome to our comic book search system! We are passionate about
          helping comic book enthusiasts find the books they love. We understand
          the challenges of finding the perfect book. We've created a search
          engine that takes into account not only genre and theme, but also more
          nuanced factors such as story pace and comic book cover art. We
          believe that every comic book reader has unique tastes, and our system
          is designed to help personalize the search experience for each user.
          User acts as co-pilot of the system and can take over the
          personalization from the system to tune it as they like. We also
          attempt to provide you with answers on "Why did i get these search
          results?" through local and global explanations. We welcome feedback
          from our users and are always open to suggestions for how we can
          better serve the comic book community. Thank you for using our search
          system and we hope you find your next favorite comic book!
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
          <li>Email: suraj.shashidhar@st.ovgu.de</li>
          <li>Phone: 123-456-7890</li>
          <li>Address: Ovgu, Magdeburg</li>
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
