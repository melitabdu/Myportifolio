
import React from "react";
import {
  ArrowUpRight,
  Code2,
  Smartphone,
  Server,
  Settings2,
  BarChart3,
  Lightbulb,
} from "lucide-react";

import "./Services.css";

function Services() {
  const services = [
    {
      number: "01",
      icon: <Code2 size={23} />,
      title: "Full-Stack Web Development",
      description:
        "Designing and developing modern web applications with responsive interfaces, secure backends and scalable database systems.",
      tags: ["React", "Node.js", "MongoDB", "REST APIs"],
    },
    {
      number: "02",
      icon: <Smartphone size={23} />,
      title: "Mobile App Development",
      description:
        "Building cross-platform mobile applications that connect users with services, information and business processes.",
      tags: ["React Native", "Expo", "Mobile UI", "APIs"],
    },
    {
      number: "03",
      icon: <Server size={23} />,
      title: "Backend & API Development",
      description:
        "Developing reliable backend systems, REST APIs, authentication, databases and integrations for modern applications.",
      tags: ["Node.js", "Express", "MongoDB", "Authentication"],
    },
    {
      number: "04",
      icon: <Settings2 size={23} />,
      title: "Business Management Systems",
      description:
        "Turning organizational workflows into practical digital systems for administration, procurement, users, reporting and operations.",
      tags: ["Admin Systems", "Workflows", "Dashboards", "CRUD"],
    },
    {
      number: "05",
      icon: <Lightbulb size={23} />,
      title: "Digital Transformation",
      description:
        "Helping organizations identify opportunities where technology can simplify processes, improve information flow and strengthen services.",
      tags: ["System Analysis", "Digital Strategy", "Automation"],
    },
    {
      number: "06",
      icon: <BarChart3 size={23} />,
      title: "Economic & Data Analysis",
      description:
        "Applying economic thinking, research and data analysis to support development planning, decision making and practical problem solving.",
      tags: ["Research", "Economics", "Data", "Planning"],
    },
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">

        <div className="services-header">
          <div>
            <div className="section-label">
              <span></span>
              WHAT I DO
            </div>

            <h2>
              From problems
              <br />
              <strong>to practical solutions.</strong>
            </h2>
          </div>

          <p>
            I work across technology, economics and organizational
            systems to create solutions that are useful, maintainable
            and connected to real-world needs.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>

              <div className="service-top">
                <span className="service-number">
                  {service.number}
                </span>

                <div className="service-icon">
                  {service.icon}
                </div>

                <ArrowUpRight
                  className="service-arrow"
                  size={20}
                />
              </div>

              <div className="service-body">
                <h3>{service.title}</h3>

                <p>{service.description}</p>
              </div>

              <div className="service-tags">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

            </article>
          ))}
        </div>

        <div className="services-bottom">
          <div>
            <span>MY APPROACH</span>

            <h3>
              Technology should solve a problem,
              <strong> not create another one.</strong>
            </h3>
          </div>

          <a href="#contact" className="services-cta">
            Discuss Your Project
            <ArrowUpRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}

export default Services;
