
import React, { useEffect, useState } from "react";
import api from "../api";
import "./skills.css";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    category: "",
    level: 50,
    icon: "",
    description: "",
    order: 0,
    isActive: true,
  };

  const [form, setForm] = useState(emptyForm);

  // Read the saved admin token
  const getAuthConfig = () => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/skills/admin/all",
        getAuthConfig()
      );

      setSkills(
  Array.isArray(response.data)
    ? response.data
    : response.data.data || response.data.skills || []
);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load skills."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
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

    try {
      setError("");

      const payload = {
        ...form,
        level: Number(form.level),
        order: Number(form.order),
      };

      const config = getAuthConfig();

      if (editingId) {
        await api.put(`/skills/${editingId}`, payload, config);
      } else {
        await api.post("/skills", payload, config);
      }

      setForm(emptyForm);
      setEditingId(null);

      await loadSkills();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to save skill."
      );
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);

    setForm({
      name: skill.name || "",
      category: skill.category || "",
      level: skill.level ?? 50,
      icon: skill.icon || "",
      description: skill.description || "",
      order: skill.order ?? 0,
      isActive: skill.isActive ?? true,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) {
      return;
    }

    try {
      setError("");

      await api.delete(`/skills/${id}`, getAuthConfig());

      await loadSkills();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete skill."
      );
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="admin-page">
      <h1>Skills Management</h1>
      <p>Add, update, and manage your portfolio skills.</p>

      {error && <p className="error-message">{error}</p>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Skill" : "Add New Skill"}</h2>

        <label>
          Skill Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. React"
          />
        </label>

        <label>
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Frontend"
          />
        </label>

        <label>
          Proficiency Level: {form.level}%
          <input
            type="range"
            name="level"
            min="0"
            max="100"
            value={form.level}
            onChange={handleChange}
          />
        </label>

        <label>
          Icon
          <input
            name="icon"
            value={form.icon}
            onChange={handleChange}
            placeholder="e.g. code"
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            placeholder="Describe this skill"
          />
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
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Active
        </label>

        <div className="form-actions">
          <button type="submit">
            {editingId ? "Update Skill" : "Add Skill"}
          </button>

          {editingId && (
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2>Existing Skills</h2>

      {loading ? (
        <p>Loading skills...</p>
      ) : skills.length === 0 ? (
        <p>No skills found.</p>
      ) : (
        <div className="admin-list">
          {skills.map((skill) => (
            <div className="admin-item" key={skill._id}>
              <div>
                <h3>{skill.name}</h3>
                <p>{skill.category || "Uncategorized"}</p>
                <p>Level: {skill.level}%</p>
                <p>Status: {skill.isActive ? "Active" : "Inactive"}</p>
              </div>

              <div className="item-actions">
                <button
                  type="button"
                  onClick={() => handleEdit(skill)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(skill._id)}
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
