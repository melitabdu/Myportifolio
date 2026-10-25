
import React, { useEffect, useState } from "react";
import api from "../api";
import "./insight.css";

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "",
  tags: "",
  status: "draft",
};

export default function Insights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });

  const getAuthConfig = () => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("token");

    if (!token) {
      throw new Error("Admin token not found. Please log in again.");
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const loadInsights = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/insights/admin/all",
        getAuthConfig()
      );

      const data = response.data;

      setInsights(
        Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.insights)
              ? data.insights
              : []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load insights."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      const config = getAuthConfig();

      if (editingId) {
        await api.put(`/insights/${editingId}`, payload, config);
      } else {
        await api.post("/insights", payload, config);
      }

      setForm({ ...emptyForm });
      setEditingId(null);

      await loadInsights();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to save insight."
      );
    }
  };

  const handleEdit = (insight) => {
    setEditingId(insight._id);

    setForm({
      title: insight.title || "",
      slug: insight.slug || "",
      excerpt: insight.excerpt || "",
      content: insight.content || "",
      coverImage: insight.coverImage || "",
      category: insight.category || "",
      tags: Array.isArray(insight.tags)
        ? insight.tags.join(", ")
        : "",
      status: insight.status || "draft",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this insight?"
      )
    ) {
      return;
    }

    setError("");

    try {
      await api.delete(`/insights/${id}`, getAuthConfig());
      await loadInsights();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete insight."
      );
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError("");
  };

  return (
    <div className="admin-page">
      <h1>Insights Management</h1>
      <p>Write and manage articles, insights, and updates.</p>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Insight" : "Add New Insight"}</h2>

        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Slug
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="e.g. lessons-from-my-project"
          />
        </label>

        <label>
          Excerpt
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows={3}
            required
          />
        </label>

        <label>
          Article Content
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={10}
            required
          />
        </label>

        <label>
          Cover Image URL
          <input
            type="url"
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="https://example.com/cover.jpg"
          />
        </label>

        <label>
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </label>

        <label>
          Tags (separated by commas)
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Technology, React, Development"
          />
        </label>

        <label>
          Status
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>

        <div className="form-actions">
          <button type="submit">
            {editingId ? "Update Insight" : "Add Insight"}
          </button>

          {editingId && (
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2>Existing Insights</h2>

      {loading ? (
        <p>Loading insights...</p>
      ) : insights.length === 0 ? (
        <p>No insights found.</p>
      ) : (
        <div className="admin-list">
          {insights.map((insight) => (
            <div className="admin-item" key={insight._id}>
              <div>
                <h3>{insight.title}</h3>
                <p>{insight.excerpt}</p>
                <p>
                  Category: {insight.category || "Uncategorized"}
                </p>
                <p>Status: {insight.status}</p>
              </div>

              <div className="item-actions">
                <button
                  type="button"
                  onClick={() => handleEdit(insight)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(insight._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
