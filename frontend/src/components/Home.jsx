
import React from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Building2,
  BarChart3,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="home" id="home">

      {/* Background Elements */}
      <div className="home-grid"></div>

      <div className="home-glow home-glow-one"></div>
      <div className="home-glow home-glow-two"></div>

      <div className="home-container">

        {/* Left Content */}
        <div className="home-content">

          <div className="home-label">
            <span className="label-dot"></span>
            AVAILABLE FOR SELECTED PROJECTS
          </div>

          <h1>
            Building
            <span> Digital Solutions</span>
            <br />
            for Real-World Problems.
          </h1>

          <p className="home-description">
            I combine economics, urban management and full-stack
            development to design and build practical digital
            solutions for organizations, businesses and communities.
          </p>

          {/* Professional Identity */}
          <div className="identity-list">

            <div className="identity-item">
              <div className="identity-icon">
                <BarChart3 size={17} />
              </div>

              <div>
                <strong>Economist</strong>
                <span>Analysis · Research · Development</span>
              </div>
            </div>

            <div className="identity-item">
              <div className="identity-icon">
                <Building2 size={17} />
              </div>

              <div>
                <strong>Urban Manager</strong>
                <span>Planning · Systems · Development</span>
              </div>
            </div>

            <div className="identity-item">
              <div className="identity-icon">
                <Code2 size={17} />
              </div>

              <div>
                <strong>Full-Stack Developer</strong>
                <span>Web · Mobile · Backend</span>
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div className="home-actions">

            <Link
              to="/projects"
              className="primary-button"
            >
              Explore My Work
              <ArrowUpRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="secondary-button"
            >
              Let's Work Together
            </Link>

          </div>

          {/* Location */}
          <div className="home-location">
            <MapPin size={15} />
            <span>Addis Ababa, Ethiopia</span>
          </div>

        </div>

        {/* Right Visual */}
        <div className="home-visual">

          <div className="visual-orbit orbit-one"></div>
          <div className="visual-orbit orbit-two"></div>

          <div className="visual-card">

            <div className="visual-card-top">
              <span className="visual-status">
                <span></span>
                DIGITAL BUILDER
              </span>

              <Sparkles size={18} />
            </div>

            <div className="visual-main">

              <div className="visual-code">
                <span className="code-number">01</span>
                <span className="code-line"></span>
              </div>

              <h2>
                Ideas
                <br />
                <span>into</span>
                <br />
                Systems.
              </h2>

              <p>
                Strategy, design and technology
                working together.
              </p>

            </div>

            <div className="visual-footer">

              <div className="mini-stat">
                <strong>WEB</strong>
                <span>APPS</span>
              </div>

              <div className="mini-stat">
                <strong>MOBILE</strong>
                <span>APPS</span>
              </div>

              <div className="mini-stat">
                <strong>API</strong>
                <span>SYSTEMS</span>
              </div>

            </div>

          </div>

          <div className="floating-card floating-card-one">
            <Code2 size={18} />
            <div>
              <strong>Full Stack</strong>
              <span>Development</span>
            </div>
          </div>

          <div className="floating-card floating-card-two">
            <BarChart3 size={18} />
            <div>
              <strong>Data Driven</strong>
              <span>Solutions</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll */}
      <button
        className="scroll-indicator"
        onClick={scrollToProjects}
      >
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown size={15} />
      </button>

    </section>
  );
}

export default Home;
