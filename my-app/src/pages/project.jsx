
import React, { useEffect, useState } from "react";
import api from "../api";
import "./project.css";

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  details: "",
  image: "",
  gallery: "",
  technologies: "",
  githubUrl: "",
  liveUrl: "",
  category: "",
  isFeatured: false,
  status: "draft",
  order: 0,
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  // Attach the saved admin JWT to protected requests.
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

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/projects/admin/all",
        getAuthConfig()
      );

      const data = response.data;

      setProjects(
        Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.projects)
              ? data.projects
              : []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      order: Number(form.order),
      gallery: form.gallery
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const config = getAuthConfig();

      if (editingId) {
        await api.put(`/projects/${editingId}`, payload, config);
      } else {
        await api.post("/projects", payload, config);
      }

      setForm({ ...emptyForm });
      setEditingId(null);

      await loadProjects();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to save project."
      );
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);

    setForm({
      title: project.title || "",
      slug: project.slug || "",
      description: project.description || "",
      details: project.details || "",
      image: project.image || "",
      gallery: Array.isArray(project.gallery)
        ? project.gallery.join("\n")
        : "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      category: project.category || "",
      isFeatured: project.isFeatured ?? false,
      status: project.status || "draft",
      order: project.order ?? 0,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    setError("");

    try {
      await api.delete(`/projects/${id}`, getAuthConfig());
      await loadProjects();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete project."
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
      <h1>Projects Management</h1>
      <p>Create and manage your portfolio projects.</p>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Project" : "Add New Project"}</h2>

        <label>
          Project Title
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
            placeholder="e.g. my-portfolio"
          />
        </label>

        <label>
          Short Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            required
          />
        </label>

        <label>
          Project Details
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            rows={5}
          />
        </label>

        <label>
          Main Image URL
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </label>

        <label>
          Gallery Image URLs (one URL per line)
          <textarea
            name="gallery"
            value={form.gallery}
            onChange={handleChange}
            rows={3}
          />
        </label>

        <label>
          Technologies (separated by commas)
          <input
            name="technologies"
            value={form.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
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
          GitHub URL
          <input
            type="url"
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
          />
        </label>

        <label>
          Live Project URL
          <input
            type="url"
            name="liveUrl"
            value={form.liveUrl}
            onChange={handleChange}
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

        <label>
          Display Order
          <input
            type="number"
            name="order"
            value={form.order}
            onChange={handleChange}
          />
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
          />
          Featured Project
        </label>

        <div className="form-actions">
          <button type="submit">
            {editingId ? "Update Project" : "Add Project"}
          </button>

          {editingId && (
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2>Existing Projects</h2>

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="admin-list">
          {projects.map((project) => (
            <div className="admin-item" key={project._id}>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p>Status: {project.status}</p>
                <p>
                  Technologies:{" "}
                  {Array.isArray(project.technologies)
                    ? project.technologies.join(", ")
                    : "None"}
                </p>
              </div>

              <div className="item-actions">
                <button
                  type="button"
                  onClick={() => handleEdit(project)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(project._id)}
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
