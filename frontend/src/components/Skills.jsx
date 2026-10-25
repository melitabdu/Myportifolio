
import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Code2,
  Database,
  Globe,
  Layers3,
  Server,
  Smartphone,
  Wrench,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";

import api from "../services/api";
import "./Skills.css";

const categoryIcons = {
  development: Code2,
  "web development": Globe,
  frontend: Globe,
  backend: Server,
  mobile: Smartphone,
  database: Database,
  professional: BarChart3,
  tools: Wrench,
  "tools & platforms": Wrench,
  architecture: Layers3,
  business: BriefcaseBusiness,
};

function getCategoryIcon(category) {
  const normalized = (category || "").trim().toLowerCase();
  return categoryIcons[normalized] || Layers3;
}

function formatCategory(category) {
  if (!category) return "Uncategorized";

  return category
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function Skills() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadSkills = async () => {
      try {
        setLoading(true);
        setError("");

        // Public endpoint: no admin token required.
        const response = await api.get("/skills");

        const responseData = response.data;

        const skillList = Array.isArray(responseData)
          ? responseData
          : Array.isArray(responseData?.data)
            ? responseData.data
            : Array.isArray(responseData?.skills)
              ? responseData.skills
              : [];

        if (isMounted) {
          // The backend public endpoint returns active skills.
          setSkills(skillList);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load skills. Please try again later."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSkills();

    return () => {
      isMounted = false;
    };
  }, []);

  // Build categories dynamically from skills entered in the admin panel.
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        skills.map((skill) => (skill.category || "").trim() || "Uncategorized")
      ),
    ];

    return uniqueCategories.sort((a, b) => a.localeCompare(b));
  }, [skills]);

  // Group the backend skills by category.
  const skillGroups = useMemo(() => {
    return categories.map((category) => ({
      category,
      skills: skills.filter(
        (skill) =>
          ((skill.category || "").trim() || "Uncategorized") === category
      ),
    }));
  }, [skills, categories]);

  const visibleGroups =
    activeCategory === "all"
      ? skillGroups
      : skillGroups.filter(
          (group) => group.category === activeCategory
        );

  return (
    <section className="skills" id="skills">
      <div className="skills-container">
        {/* Header */}
        <div className="skills-header">
          <div>
            <div className="section-label">
              <span></span>
              MY CAPABILITIES
            </div>

            <h2>
              Skills that turn
              <br />
              <strong>ideas into systems.</strong>
            </h2>
          </div>

          <p>
            A combination of technical development skills and
            professional knowledge that helps turn real-world
            problems into practical solutions.
          </p>
        </div>

        {/* Dynamic Category Navigation */}
        {!loading && !error && skills.length > 0 && (
          <div className="skills-tabs">
            <button
              type="button"
              className={
                activeCategory === "all"
                  ? "skill-tab active"
                  : "skill-tab"
              }
              onClick={() => setActiveCategory("all")}
            >
              <Sparkles size={16} />
              All Skills
            </button>

            {categories.map((category) => {
              const Icon = getCategoryIcon(category);

              return (
                <button
                  type="button"
                  key={category}
                  className={
                    activeCategory === category
                      ? "skill-tab active"
                      : "skill-tab"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  <Icon size={16} />
                  {formatCategory(category)}
                </button>
              );
            })}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="skills-message">
            Loading skills...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="skills-message error-message" role="alert">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && skills.length === 0 && (
          <div className="skills-message">
            Skills will be displayed here soon.
          </div>
        )}

        {/* Skills Grid */}
        {!loading && !error && skills.length > 0 && (
          <div className="skills-grid">
            {visibleGroups.map((group) => {
              const Icon = getCategoryIcon(group.category);

              return (
                <div className="skill-card" key={group.category}>
                  <div className="skill-card-top">
                    <div className="skill-icon">
                      <Icon size={21} />
                    </div>

                    <span className="skill-arrow">↗</span>
                  </div>

                  <h3>{formatCategory(group.category)}</h3>

                  <p className="skill-description">
                    Skills and capabilities in{" "}
                    {group.category.toLowerCase()}.
                  </p>

                  <div className="skill-list">
                    {group.skills.map((skill) => (
                      <span
                        key={skill._id || skill.name}
                        title={
                          skill.description ||
                          skill.name
                        }
                      >
                        {skill.name}
                        {skill.level ? ` · ${skill.level}` : ""}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Message */}
        <div className="skills-bottom">
          <div className="skills-bottom-line"></div>

          <p>
            Technology is the tool.
            <strong>
              {" "}Understanding the problem is the skill.
            </strong>
          </p>

          <div className="skills-bottom-line"></div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
