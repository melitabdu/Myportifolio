
import React from "react";
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  Code2,
  Database,
  Globe2,
  Lightbulb,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./About.css";

function About() {
  const focusAreas = [
    {
      icon: <BarChart3 size={22} />,
      title: "Economics",
      text: "Economic analysis, research, development planning and data-driven decision making.",
    },
    {
      icon: <Building2 size={22} />,
      title: "Urban Management",
      text: "Understanding cities, institutions, development systems and the people they serve.",
    },
    {
      icon: <Code2 size={22} />,
      title: "Technology",
      text: "Designing and developing modern web, mobile and backend applications.",
    },
  ];

  return (
    <section className="about" id="about">
      <div className="about-container">

        {/* Section Heading */}
        <div className="section-heading about-heading">
          <div className="section-label">
            <span></span>
            ABOUT ME
          </div>

          <h2>
            Different disciplines.
            <br />
            <strong>One practical mindset.</strong>
          </h2>
        </div>

        <div className="about-main">

          {/* Left - Story */}
          <div className="about-story">

            <p className="about-intro">
              I am an economist, urban management professional and
              full-stack developer interested in one simple question:
              <strong> how can we turn complex problems into practical
              solutions?</strong>
            </p>

            <p>
              My background in economics and urban management has given
              me experience looking at organizations, communities,
              development challenges and systems from a broader
              perspective.
            </p>

            <p>
              Technology became another way for me to solve those
              problems. Today, I design and develop digital platforms
              that connect people, information, processes and services.
            </p>

            <div className="about-highlight">
              <Lightbulb size={23} />

              <div>
                <strong>My approach</strong>
                <p>
                  Understand the problem first. Design the right
                  solution. Then build technology that makes it work.
                </p>
              </div>
            </div>

            <Link to="/contact" className="about-link">
              Let's discuss an idea
              <ArrowUpRight size={17} />
            </Link>

          </div>

          {/* Right - Professional Cards */}
          <div className="about-focus">

            {focusAreas.map((item, index) => (
              <div className="focus-card" key={item.title}>

                <div className="focus-number">
                  0{index + 1}
                </div>

                <div className="focus-icon">
                  {item.icon}
                </div>

                <div className="focus-content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>

                <ArrowUpRight
                  className="focus-arrow"
                  size={18}
                />

              </div>
            ))}

          </div>
        </div>

        {/* Stats */}
        <div className="about-stats">

          <div className="about-stat">
            <div className="stat-icon">
              <Globe2 size={19} />
            </div>

            <div>
              <strong>Web & Mobile</strong>
              <span>Digital Applications</span>
            </div>
          </div>

          <div className="about-stat">
            <div className="stat-icon">
              <Database size={19} />
            </div>

            <div>
              <strong>Backend Systems</strong>
              <span>APIs & Databases</span>
            </div>
          </div>

          <div className="about-stat">
            <div className="stat-icon">
              <Users size={19} />
            </div>

            <div>
              <strong>Human Centered</strong>
              <span>Solutions & Experiences</span>
            </div>
          </div>

          <div className="about-stat">
            <div className="stat-icon">
              <Code2 size={19} />
            </div>

            <div>
              <strong>Full Stack</strong>
              <span>End-to-End Development</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;
