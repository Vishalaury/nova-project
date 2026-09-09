import { useEffect, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import ProjectForm from "../components/projects/ProjectForm";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectTable from "../components/projects/ProjectTable";

import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../services/projectService";
import { getErrorMessage } from "../services/api";

const extractProjects = (response) => {
  if (Array.isArray(response)) return response;

  return (
    response?.projects ||
    response?.data?.projects ||
    response?.data?.data ||
    response?.data ||
    []
  );
};

export default function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewMode, setViewMode] = useState("cards");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProjects();
      setProjects(extractProjects(response));
    } catch (err) {
      const message = getErrorMessage(
        err,
        "Failed to load projects"
      );

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (formData) => {
    try {
      setFormLoading(true);

      const response = await createProject(formData);

      const newProject =
        response?.project ||
        response?.data?.project ||
        response?.data ||
        response;

      setProjects((prev) => [newProject, ...prev]);

      setShowForm(false);

      toast.success("Project created successfully");

      await fetchProjects();
    } catch (err) {
      toast.error(
        getErrorMessage(err, "Failed to create project")
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    if (!editingProject?._id && !editingProject?.id) return;

    const projectId = editingProject._id || editingProject.id;

    try {
      setFormLoading(true);

      await updateProject(projectId, formData);

      toast.success("Project updated successfully");

      setEditingProject(null);
      setShowForm(false);

      await fetchProjects();
    } catch (err) {
      toast.error(
        getErrorMessage(err, "Failed to update project")
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (project) => {
    const projectId = project?._id || project?.id;

    if (!projectId) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteProject(projectId);

      setProjects((prev) =>
        prev.filter(
          (item) => (item._id || item.id) !== projectId
        )
      );

      toast.success("Project deleted successfully");
    } catch (err) {
      toast.error(
        getErrorMessage(err, "Failed to delete project")
      );
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    if (formLoading) return;

    setShowForm(false);
    setEditingProject(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Projects
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and manage your projects
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={fetchProjects}
          >
            <RefreshCw size={16} />
            Refresh
          </Button>

          <Button onClick={() => setShowForm(true)}>
            <Plus size={17} />
            New Project
          </Button>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      {/* View Controls */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {projects.length}{" "}
          {projects.length === 1 ? "project" : "projects"}
        </p>

        <div className="flex rounded-lg border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setViewMode("cards")}
            className={`rounded-md px-3 py-1.5 text-sm ${
              viewMode === "cards"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Cards
          </button>

          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`rounded-md px-3 py-1.5 text-sm ${
              viewMode === "table"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Projects */}
      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          message="Create your first project to get started."
          action={
            <Button onClick={() => setShowForm(true)}>
              <Plus size={17} />
              Create Project
            </Button>
          }
        />
      ) : viewMode === "cards" ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project._id || project.id}
              project={project}
              onView={() =>
                navigate(
                  `/projects/${project._id || project.id}`
                )
              }
              onEdit={() => handleEdit(project)}
              onDelete={() => handleDelete(project)}
            />
          ))}
        </div>
      ) : (
        <ProjectTable
          projects={projects}
          onView={(project) =>
            navigate(
              `/projects/${project._id || project.id}`
            )
          }
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <ProjectForm
              project={editingProject}
              onSubmit={
                editingProject
                  ? handleUpdate
                  : handleCreate
              }
              onCancel={handleCloseForm}
              loading={formLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}