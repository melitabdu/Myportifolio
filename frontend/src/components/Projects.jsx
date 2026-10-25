
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Smartphone,
  Globe,
  Database,
  BriefcaseBusiness,
  CheckCircle2,
  Target,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
} from "lucide-react";

import api from "../services/api";
import "./Projects.css";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Applications" },
  { id: "mobile", label: "Mobile Applications" },
  { id: "systems", label: "Business Systems" },
];

function getProjectCategory(project) {
  const value = String(
    project.category || project.type || ""
  ).toLowerCase();

  if (/mobile|android|ios|react native/.test(value)) {
    return "mobile";
  }

  if (/business|system|procurement|management/.test(value)) {
    return "systems";
  }

  return "web";
}

function getCategoryIcon(category) {
  if (category === "mobile") return Smartphone;
  if (category === "systems") return BriefcaseBusiness;
  return Globe;
}

function getImageUrl(image) {
  if (typeof image === "string") return image;

  if (image && typeof image === "object") {
    return image.url || image.secure_url || image.imageUrl || "";
  }

  return "";
}

function getMainImage(project) {
  return getImageUrl(
    project.image ||
      project.mainImage ||
      project.imageUrl ||
      project.coverImage ||
      project.thumbnail
  );
}

function getGalleryImages(project) {
  const gallery =
    project.gallery ||
    project.images ||
    project.additionalImages ||
    [];

  const images = Array.isArray(gallery)
    ? gallery.map(getImageUrl).filter(Boolean)
    : typeof gallery === "string"
      ? [gallery]
      : [];

  const mainImage = getMainImage(project);

  return [...new Set(images)].filter(
    (url) => url !== mainImage
  );
}

function getTechnologies(project) {
  const value =
    project.technologies ||
    project.techStack ||
    project.tech ||
    [];

  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === "string"
          ? item
          : item?.name || item?.title || ""
      )
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function getFeatures(project) {
  const value = project.features || project.keyFeatures || [];

  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === "string"
          ? item
          : item?.title || item?.name || item?.description || ""
      )
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function ImagePlaceholder({ small = false }) {
  return (
    <div
      className={`project-image-placeholder ${
        small ? "small" : ""
      }`}
    >
      <ImageIcon size={small ? 22 : 34} />
      <span>Project preview</span>
    </div>
  );
}

function ProjectGallery({ project, title }) {
  const mainImage = getMainImage(project);
  const galleryImages = getGalleryImages(project).slice(0, 2);

  return (
    <div className="project-gallery">
      <div className="project-gallery-main">
        {mainImage && (
          <img
            src={mainImage}
            alt={`${title} main preview`}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              const fallback = event.currentTarget.nextElementSibling;
              if (fallback) fallback.style.display = "flex";
            }}
          />
        )}

        <div
          className="project-main-fallback"
          style={{ display: mainImage ? "none" : "flex" }}
        >
          <ImagePlaceholder />
        </div>

        <div className="project-main-overlay">
          <span>PROJECT SHOWCASE</span>
        </div>
      </div>

      <div className="project-gallery-side">
        {[0, 1].map((position) => {
          const image = galleryImages[position];

          return (
            <div
              className="project-gallery-small"
              key={`${project._id || project.id || title}-image-${position}`}
            >
              {image && (
                <img
                  src={image}
                  alt={`${title} preview ${position + 2}`}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    const fallback =
                      event.currentTarget.nextElementSibling;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
              )}

              <div
                className="project-small-fallback"
                style={{ display: image ? "none" : "flex" }}
              >
                <ImagePlaceholder small />
              </div>

              <span className="project-gallery-index">
                0{position + 2}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProjectDetails({ project, technologies }) {
  const fullDescription =
    project.details ||
    project.fullDescription ||
    project.overview ||
    project.longDescription ||
    project.caseStudy ||
    project.description ||
    "Detailed information about this project will be added soon.";

  const challenge = project.challenge || project.problem || "";
  const solution = project.solution || "";
  const outcome = project.outcome || project.impact || "";
  const features = getFeatures(project);

  return (
    <div className="project-details-panel">
      <div className="project-details-heading">
        <span className="project-details-eyebrow">
          BEHIND THE PROJECT
        </span>

        <h4>A closer look at the work</h4>

        <p>
          Explore the project's purpose, approach, features and
          practical value.
        </p>
      </div>

      <section className="project-detail-block">
        <div className="project-detail-icon">
          <Lightbulb size={20} />
        </div>

        <div className="project-detail-text">
          <h5>Project overview</h5>
          <p className="project-full-description">
            {fullDescription}
          </p>
        </div>
      </section>

      {challenge && (
        <section className="project-detail-block">
          <div className="project-detail-icon">
            <Target size={20} />
          </div>

          <div className="project-detail-text">
            <h5>The challenge</h5>
            <p>{challenge}</p>
          </div>
        </section>
      )}

      {solution && (
        <section className="project-detail-block">
          <div className="project-detail-icon">
            <CheckCircle2 size={20} />
          </div>

          <div className="project-detail-text">
            <h5>The solution</h5>
            <p>{solution}</p>
          </div>
        </section>
      )}

      {outcome && (
        <section className="project-detail-highlight">
          <span>THE IMPACT</span>
          <p>{outcome}</p>
        </section>
      )}

      {features.length > 0 && (
        <section className="project-features">
          <h5>Key features</h5>

          <ul>
            {features.map((feature, index) => (
              <li key={`${feature}-${index}`}>
                <CheckCircle2 size={17} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {technologies.length > 0 && (
        <section className="project-details-tech">
          <h5>Built with</h5>

          <div className="project-technologies">
            {technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/projects");
        const result = response.data;

        const projectList = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
            ? result.data
            : Array.isArray(result?.projects)
              ? result.projects
              : [];

        if (isMounted) {
          setProjects(
            projectList.map((project) => ({
              ...project,
              displayCategory: getProjectCategory(project),
            }))
          );
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load projects. Please try again later."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;

    return projects.filter(
      (project) => project.displayCategory === activeCategory
    );
  }, [projects, activeCategory]);

  function toggleDetails(projectId) {
    setExpandedProject((current) =>
      current === projectId ? null : projectId
    );
  }

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <header className="projects-header">
          <div>
            <div className="section-label">
              <span />
              SELECTED WORK
            </div>

            <h2>
              Projects built
              <br />
              <strong>for real-world impact.</strong>
            </h2>
          </div>

          <div className="projects-header-right">
            <p>
              A selection of digital platforms and systems designed
              to solve practical problems for businesses,
              organizations and communities.
            </p>

            <div className="project-count">
              <strong>{projects.length}</strong>
              <span>SELECTED PROJECTS</span>
            </div>
          </div>
        </header>

        {!loading && !error && projects.length > 0 && (
          <div className="projects-tabs">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                className={
                  activeCategory === category.id
                    ? "project-tab active"
                    : "project-tab"
                }
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="projects-message">
            Loading projects...
          </div>
        )}

        {!loading && error && (
          <div className="projects-message error-message" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="projects-message">
            Projects will be displayed here soon.
          </div>
        )}

        {!loading && !error && filteredProjects.length > 0 && (
          <div className="projects-list">
            {filteredProjects.map((project) => {
              const category = project.displayCategory;
              const Icon = getCategoryIcon(category);
              const technologies = getTechnologies(project);

              const title =
                project.title || project.name || "Untitled Project";

              const projectId = project._id || project.id || title;

              const liveUrl =
                project.liveUrl ||
                project.demoUrl ||
                project.projectUrl ||
                "";

              const status = project.status || "Completed";
              const isExpanded = expandedProject === projectId;

              const categoryLabel =
                categories.find((item) => item.id === category)?.label ||
                "Project";

              return (
                <article
                  className={`project-card ${
                    (project.featured ?? project.isFeatured)
                      ? "featured"
                      : ""
                  } ${isExpanded ? "details-open" : ""}`}
                  key={projectId}
                >
                  {/* Top row: images and summary */}
                  <ProjectGallery
                    project={project}
                    title={title}
                  />

                  <div className="project-content">
                    <div className="project-content-top">
                      <span className="project-category">
                        <Icon size={15} />
                        {project.type || categoryLabel}
                      </span>

                      <span
                        className={`project-status status-${String(status)
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        <span className="project-status-dot" />
                        {status}
                      </span>
                    </div>

                    <h3>{title}</h3>

                    <p className="project-description">
                      {project.description ||
                        "More details about this project will be available soon."}
                    </p>

                    {technologies.length > 0 && (
                      <div className="project-technologies">
                        {technologies.map((technology) => (
                          <span key={technology}>
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="project-actions">
                      <button
                        type="button"
                        className="project-view-button"
                        aria-expanded={isExpanded}
                        onClick={() => toggleDetails(projectId)}
                      >
                        {isExpanded
                          ? "Close Overview"
                          : "Project Overview"}

                        {isExpanded ? (
                          <ChevronUp size={17} />
                        ) : (
                          <ChevronDown size={17} />
                        )}
                      </button>

                      {liveUrl && (
                        <a
                          className="project-live-link"
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View live ${title}`}
                          title="View live project"
                        >
                          <ExternalLink size={17} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bottom row: overview spans the full card width */}
                  {isExpanded && (
                    <div className="project-details-wrapper">
                      <ProjectDetails
                        project={project}
                        technologies={technologies}
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {!loading &&
          !error &&
          projects.length > 0 &&
          filteredProjects.length === 0 && (
            <div className="projects-message">
              No projects found in this category.
            </div>
          )}

        <div className="projects-bottom">
          <div className="projects-bottom-text">
            <span>HAVE A PROJECT IN MIND?</span>

            <h3>
              Let's build something
              <strong> useful.</strong>
            </h3>
          </div>

          <a href="#contact" className="projects-cta">
            Start a Conversation
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
