import React from "react";
import "./Home.scss";

export const Home: React.FC = () => {
  return (
    <div className="home">
      <section className="home__hero section section--full-height">
        <div className="container">
          <h1 className="display-1 text-center home__hero-title">
            Cinematic Experience
          </h1>
          <p className="text-center text-large text-light home__hero-subtitle">
            An immersive scroll-driven journey inspired by Wakanda Forever
          </p>
          <div className="text-center home__hero-cta">
            <button className="button-primary">Begin Journey</button>
          </div>
        </div>
      </section>

      <section className="home__section section">
        <div className="container">
          <h2 className="text-center">Scroll-Driven Animations</h2>
          <p className="text-center text-light">
            Experience the power of synchronized scrolling with cinematic
            transitions
          </p>
        </div>
      </section>
    </div>
  );
};
