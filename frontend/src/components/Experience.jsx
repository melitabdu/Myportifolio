
import React from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  BarChart3,
  Building2,
} from "lucide-react";

import "./Experience.css";

function Experience() {
  const experiences = [
    {
      number: "01",
      period: "PROFESSIONAL",
      icon: <BarChart3 size={21} />,
      title: "Economics & Development",
      organization: "Economic Analysis & Development Practice",
      description:
        "Working with economic thinking, research, development planning and analytical approaches to understand complex development challenges and support practical decision making.",
      skills: [
        "Economic Analysis",
        "Research",
        "Development Planning",
      ],
    },
    {
      number: "02",
      period: "PROFESSIONAL",
      icon: <Building2 size={21} />,
      title: "Urban Management",
      organization: "Urban & Institutional Development",
      description:
        "Developing an understanding of urban systems, institutions, planning processes and the relationship between organizations, communities and development.",
      skills: [
        "Urban Management",
        "Planning",
        "Institutional Systems",
      ],
    },
    {
      number: "03",
      period: "TECHNOLOGY",
      icon: <Code2 size={21} />,
      title: "Full-Stack Development",
      organization: "Web, Mobile & Backend Systems",
      description:
        "Designing and building full-stack applications that connect users, data, organizations and services through modern digital platforms.",
      skills: [
        "React",
        "Node.js",
        "MongoDB",
        "React Native",
      ],
    },
    {
      number: "04",
      period: "SYSTEMS",
      icon: <BriefcaseBusiness size={21} />,
      title: "Digital Business Systems",
      organization: "Organizational Digital Transformation",
      description:
        "Building practical management systems that digitize workflows such as procurement, administration, user management, reporting and service delivery.",
      skills: [
        "Business Systems",
        "Admin Dashboards",
        "APIs",
      ],
    },
  ];

  return (
    <section className="experience" id="experience">
      <div className="experience-container">

        <div className="experience-header">
          <div>
            <div className="section-label">
              <span></span>
              EXPERIENCE
            </div>

            <h2>
              A journey across
              <br />
              <strong>people, systems & technology.</strong>
            </h2>
          </div>

          <p>
            My professional path combines analytical thinking,
            development experience and an understanding of how
            organizations and communities work.
          </p>
        </div>

        <div className="experience-timeline">
          <div className="timeline-line"></div>

          {experiences.map((experience) => (
            <article
              className="experience-item"
              key={experience.number}
            >
              <div className="experience-marker">
                <span>{experience.number}</span>
              </div>

              <div className="experience-card">

                <div className="experience-card-header">
                  <div className="experience-icon">
                    {experience.icon}
                  </div>

                  <span className="experience-period">
                    {experience.period}
                  </span>
                </div>

                <div className="experience-content">
                  <h3>{experience.title}</h3>

                  <h4>{experience.organization}</h4>

                  <p>{experience.description}</p>

                  <div className="experience-skills">
                    {experience.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>

                <ArrowUpRight
                  className="experience-arrow"
                  size={19}
                />

              </div>
            </article>
          ))}
        </div>

        <div className="experience-bottom">
          <span>THE COMMON THREAD</span>

          <p>
            <strong>Understand.</strong> <strong>Design.</strong>{" "}
            <strong>Build.</strong>{" "}
            <span>
              Every stage of my work follows the same principle:
              start with the real problem.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}

export default Experience;
