
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  BarChart3,
  Building2,
  CalendarDays,
  Lightbulb,
  Clock3,
} from "lucide-react";

import api from "../services/api";
import "./Insights.css";

function getInsightIcon(category = "") {
  const value = category.toLowerCase();

  if (value.includes("technology") || value.includes("software")) {
    return Code2;
  }

  if (value.includes("economics") || value.includes("finance")) {
    return BarChart3;
  }

  if (value.includes("urban") || value.includes("city")) {
    return Building2;
  }

  return Lightbulb;
}

function formatDate(insight) {
  if (insight.publishedAt) {
    const date = new Date(insight.publishedAt);

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }

  if (insight.date) return insight.date;

  return "Coming Soon";
}

function getReadTime(insight) {
  if (insight.readTime) return insight.readTime;

  const content = insight.content || insight.body || "";
  const wordCount = content.trim()
    ? content.trim().split(/\s+/).length
    : 0;

  return wordCount
    ? `${Math.max(1, Math.ceil(wordCount / 200))} min read`
    : "Article";
}

function Insights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedInsight, setExpandedInsight] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadInsights() {
      try {
        setLoading(true);
        setError("");

        // Public endpoint: admin authentication is not required.
        const response = await api.get("/insights");
        const result = response.data;

        const insightList = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
            ? result.data
            : Array.isArray(result?.insights)
              ? result.insights
              : [];

        if (isMounted) {
          setInsights(insightList);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load insights. Please try again later."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadInsights();

    return () => {
      isMounted = false;
    };
  }, []);

  const publishedInsights = useMemo(() => {
    return insights.filter((insight) => {
      // If the API already returns only public articles, show them.
      // Otherwise, exclude records explicitly marked as drafts.
      const status = String(insight.status || "").toLowerCase();

      return (
        insight.isPublished !== false &&
        insight.published !== false &&
        status !== "draft" &&
        status !== "unpublished"
      );
    });
  }, [insights]);

  return (
    <section className="insights" id="insights">
      <div className="insights-container">
        {/* Header */}
        <div className="insights-header">
          <div>
            <div className="section-label">
              <span></span>
              INSIGHTS & IDEAS
            </div>

            <h2>
              Thinking beyond
              <br />
              <strong>the code.</strong>
            </h2>
          </div>

          <div className="insights-intro">
            <p>
              Ideas, observations and practical lessons from the
              intersection of technology, economics, urban management
              and development.
            </p>

            <a href="#contact" className="insights-link">
              Discuss an idea
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        {/* Loading and error states */}
        {loading && (
          <div className="insights-message">
            Loading insights...
          </div>
        )}

        {!loading && error && (
          <div className="insights-message error-message" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && publishedInsights.length === 0 && (
          <div className="insights-message">
            New articles and research notes will appear here soon.
          </div>
        )}

        {/* Insights from the backend */}
        {!loading && !error && publishedInsights.length > 0 && (
          <div className="insights-grid">
            {publishedInsights.map((insight, index) => {
              const title =
                insight.title || insight.name || "Untitled Insight";

              const category = insight.category || "General";
              const Icon = getInsightIcon(category);

              const articleContent =
                insight.content ||
                insight.body ||
                insight.articleContent ||
                "";

              const isExpanded =
                expandedInsight === (insight._id || insight.id || title);

              const insightId =
                insight._id || insight.id || title;

              return (
                <article className="insight-card" key={insightId}>
                  <div className="insight-card-top">
                    <div className="insight-icon">
                      <Icon size={19} />
                    </div>

                    <span className="insight-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="insight-meta">
                    <span>{category}</span>
                  </div>

                  <h3>{title}</h3>

                  <p>
                    {insight.description ||
                      insight.excerpt ||
                      "Read this article for more insights and practical ideas."}
                  </p>

                  {isExpanded && (
                    <div className="insight-expanded-content">
                      {articleContent ? (
                        <p>{articleContent}</p>
                      ) : (
                        <p>
                          The full article is not available yet.
                          Please check back soon.
                        </p>
                      )}

                      {insight.articleUrl && (
                        <a
                          href={insight.articleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open full article
                          <ArrowUpRight size={15} />
                        </a>
                      )}
                    </div>
                  )}

                  <div className="insight-footer">
                    <div className="insight-date">
                      <CalendarDays size={14} />
                      <span>{formatDate(insight)}</span>
                    </div>

                    <span className="insight-read-time">
                      <Clock3 size={14} />
                      {getReadTime(insight)}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="insight-read"
                    aria-expanded={isExpanded}
                    onClick={() =>
                      setExpandedInsight(
                        isExpanded ? null : insightId
                      )
                    }
                  >
                    {isExpanded ? "Close Insight" : "Read Insight"}
                    <ArrowUpRight size={16} />
                  </button>
                </article>
              );
            })}
          </div>
        )}

        <div className="insights-bottom">
          <BookOpen size={22} />

          <p>
            More articles and research notes will be published here
            as the portfolio grows.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Insights;
