import { useState, useEffect } from "react";
import {
  Trash2,
  Mail,
  Download,
  BarChart3,
  RefreshCw,
  LogOut,
} from "lucide-react";

export default function AdminDashboard() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [tab, setTab] = useState("messages");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [projectForm, setProjectForm] = useState({
    name: "",
    tagline: "",
    description: "",
    tech: "",
    achievements: "",
    image: "",
    live: "",
    repo: "",
    featured: false,
    order: 0,
  });

  const [editingId, setEditingId] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("adminToken", data.token);
      setAuth(true);
      fetchData();
    } else {
      alert("Incorrect password");
    }
  }

  async function fetchData() {
    setLoading(true);
    try {
      const [msgRes, dlRes, projectRes] = await Promise.all([
        fetch("/api/contact"),
        fetch("/api/resume-download"),
        fetch("/api/projects"),
      ]);
      if (projectRes.ok) {
        setProjects(await projectRes.json());
      }
      if (msgRes.ok) setMessages(await msgRes.json());
      if (dlRes.ok) setDownloads(await dlRes.json());
    } catch {
      console.error("Failed to fetch admin data");
    } finally {
      setLoading(false);
    }
  }

  async function deleteMessage(id) {
    if (!confirm("Delete this message?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages((m) => m.filter((x) => x._id !== id));
    } catch {
      alert("Failed to delete");
    }
  }

  async function saveProject(e) {
    console.log("PROJECT FORM =", projectForm);
    console.log("IMAGE =", projectForm.image);
    e.preventDefault();

    const payload = {
      ...projectForm,
      tech: projectForm.tech
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),

      achievements: projectForm.achievements
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    };

    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";

      const method = editingId ? "PUT" : "POST";

      const token = localStorage.getItem("adminToken");

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(payload),
      });

      fetchData();

      setShowProjectForm(false);

      setEditingId(null);

      setProjectForm({
        name: "",
        tagline: "",
        description: "",
        tech: "",
        achievements: "",
        image: "",
        live: "",
        repo: "",
        featured: false,
        order: 0,
      });
    } catch {
      alert("Failed");
    }
  }

  async function deleteProject(id) {
    if (!confirm("Delete project?")) return;

    const token = localStorage.getItem("adminToken");

    await fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchData();
  }

  function editProject(project) {
    setEditingId(project._id);

    setProjectForm({
      ...project,
      tech: project.tech?.join(", ") || "",
      achievements: project.achievements?.join(", ") || "",
    });

    setShowProjectForm(true);
  }

  async function uploadImage(file) {
    const formData = new FormData();

    formData.append("image", file);

    setUploading(true);

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      console.log("UPLOAD STATUS =", res.status);
      console.log("UPLOAD RESPONSE =", data);

      if (data.success) {
        setProjectForm((prev) => ({
          ...prev,
          image: data.url,
        }));
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      setAuth(true);
      fetchData();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/";
  };

  if (!auth) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        <div className="glass-strong rounded-3xl p-10 w-full max-w-sm">
          <h1 className="font-display text-2xl font-semibold mb-6">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="grid gap-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-2xl glass px-4 py-3 text-sm outline-none"
              style={{ color: "var(--foreground)" }}
            />
            <button
              type="submit"
              className="rounded-full px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, var(--electric), var(--violet))",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <header className="glass-strong sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="grid size-8 place-items-center rounded-lg text-[11px] font-bold text-white"
            style={{
              background:
                "linear-gradient(135deg, var(--electric), var(--violet))",
            }}
          >
            DK
          </span>
          <h1 className="font-display text-lg font-semibold">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            className="p-2 rounded-xl glass transition-colors hover:bg-white/[0.08]"
          >
            <RefreshCw className="size-4" />
          </button>
          <button
            onClick={logout}
            className="p-2 rounded-xl glass transition-colors hover:bg-white/[0.08]"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-3">
          {[
            { icon: Mail, label: "Total Messages", value: messages.length },
            {
              icon: Download,
              label: "Resume Downloads",
              value: downloads.length,
            },
            {
              icon: BarChart3,
              label: "Unread Messages",
              value: messages.filter((m) => !m.read).length,
            },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <s.icon
                  className="size-4"
                  style={{ color: "var(--electric)" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {s.label}
                </span>
              </div>
              <div className="font-display text-3xl font-semibold text-gradient">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["messages", "downloads", "projects"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors"
              style={{
                background:
                  tab === t
                    ? "linear-gradient(135deg, var(--electric), var(--violet))"
                    : "rgba(255,255,255,0.04)",
                color: tab === t ? "white" : "var(--muted-foreground)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {loading && (
          <div
            className="text-center py-12 text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            Loading...
          </div>
        )}

        {/* Messages */}
        {tab === "messages" && !loading && (
          <div className="grid gap-4">
            {messages.length === 0 ? (
              <p
                className="text-center py-12 text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                No messages yet.
              </p>
            ) : (
              messages.map((msg) => (
                <div key={msg._id} className="glass rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-medium">{msg.name}</span>
                        <span
                          className="text-sm"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {msg.email}
                        </span>
                        <span
                          className="text-xs font-mono px-2 py-0.5 rounded-full glass"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p
                        className="mt-1 text-sm font-medium"
                        style={{ color: "var(--electric)" }}
                      >
                        {msg.subject}
                      </p>
                      <p
                        className="mt-2 text-sm leading-relaxed"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {msg.message}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="p-2 rounded-xl transition-colors hover:bg-red-500/10 flex-shrink-0"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Downloads */}
        {tab === "downloads" && !loading && (
          <div className="glass rounded-2xl overflow-hidden">
            {downloads.length === 0 ? (
              <p
                className="text-center py-12 text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                No downloads tracked yet.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Name", "Email", "Purpose", "Date"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {downloads.map((d, i) => (
                    <tr
                      key={d._id}
                      style={{
                        borderBottom:
                          i < downloads.length - 1
                            ? "1px solid var(--border)"
                            : "none",
                      }}
                    >
                      <td className="px-4 py-3">{d.name}</td>
                      <td className="px-4 py-3">{d.email}</td>
                      <td className="px-4 py-3">{d.purpose}</td>
                      <td className="px-4 py-3">
                        {new Date(d.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Projects */}
        {tab === "projects" && !loading && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Projects ({projects.length})
              </h2>

              <button
                onClick={() => {
                  setEditingId(null);
                  setProjectForm({
                    name: "",
                    tagline: "",
                    description: "",
                    tech: "",
                    achievements: "",
                    image: "",
                    live: "",
                    repo: "",
                    featured: false,
                    order: 0,
                  });
                  setShowProjectForm(true);
                }}
                className="px-4 py-2 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg,var(--electric),var(--violet))",
                }}
              >
                Add Project
              </button>
            </div>

            {showProjectForm && (
              <div className="glass rounded-2xl p-6 mb-6">
                <form onSubmit={saveProject} className="grid gap-4">
                  <input
                    placeholder="Project Name"
                    value={projectForm.name}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        name: e.target.value,
                      })
                    }
                    className="glass p-3 rounded-xl"
                  />

                  <input
                    placeholder="Tagline"
                    value={projectForm.tagline}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        tagline: e.target.value,
                      })
                    }
                    className="glass p-3 rounded-xl"
                  />

                  <textarea
                    placeholder="Description"
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        description: e.target.value,
                      })
                    }
                    className="glass p-3 rounded-xl"
                  />

                  <input
                    placeholder="Tech (React, Node, MongoDB)"
                    value={projectForm.tech}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        tech: e.target.value,
                      })
                    }
                    className="glass p-3 rounded-xl"
                  />

                  <input
                    placeholder="Achievements (comma separated)"
                    value={projectForm.achievements}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        achievements: e.target.value,
                      })
                    }
                    className="glass p-3 rounded-xl"
                  />

                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => uploadImage(e.target.files[0])}
                      className="glass p-3 rounded-xl w-full"
                    />

                    {uploading && (
                      <p className="mt-2 text-sm">Uploading image...</p>
                    )}

                    {projectForm.image && (
                      <img
                        src={projectForm.image}
                        alt="preview"
                        className="mt-3 w-40 rounded-xl border"
                      />
                    )}
                  </div>

                  <input
                    placeholder="Live Demo URL (optional)"
                    value={projectForm.live}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        live: e.target.value,
                      })
                    }
                    className="glass p-3 rounded-xl"
                  />

                  <input
                    placeholder="GitHub Repo URL"
                    value={projectForm.repo}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        repo: e.target.value,
                      })
                    }
                    className="glass p-3 rounded-xl"
                  />

                  <button
                    type="submit"
                    className="px-4 py-3 rounded-xl text-white"
                    style={{
                      background:
                        "linear-gradient(135deg,var(--electric),var(--violet))",
                    }}
                  >
                    {editingId ? "Update Project" : "Create Project"}
                  </button>
                </form>
              </div>
            )}

            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project._id} className="glass rounded-2xl p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{project.name}</h3>

                      <p
                        style={{
                          color: "var(--muted-foreground)",
                        }}
                      >
                        {project.tagline}
                      </p>

                      <p className="mt-2">{project.description}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => editProject(project)}
                        className="px-3 py-1 rounded-lg glass"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProject(project._id)}
                        className="px-3 py-1 rounded-lg bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
