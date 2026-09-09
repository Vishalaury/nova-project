import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

const initialForm = {
  name: "",
  description: "",
  dueDate: "",
};

export default function ProjectForm({
  project = null,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name || "",
        description: project.description || "",
        dueDate: project.dueDate
          ? String(project.dueDate).slice(0, 10)
          : "",
      });
    } else {
      setForm(initialForm);
    }

    setErrors({});
  }, [project]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Project name is required.";
    } else if (form.name.trim().length < 2) {
      newErrors.name =
        "Project name must contain at least 2 characters.";
    }

    if (form.description.length > 500) {
      newErrors.description =
        "Description cannot exceed 500 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    await onSubmit?.({
      name: form.name.trim(),
      description: form.description.trim(),
      ...(form.dueDate
        ? { dueDate: form.dueDate }
        : {}),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Project Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="e.g. Website Redesign"
        required
        error={errors.name}
      />

      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the project..."
          rows={4}
          className={`
            w-full resize-none rounded-lg border
            bg-white px-3.5 py-2.5 text-sm
            text-slate-900 outline-none
            placeholder:text-slate-400
            transition
            ${
              errors.description
                ? "border-red-400 focus:border-red-500"
                : "border-slate-300 focus:border-slate-500"
            }
          `}
        />

        <div className="mt-1 flex justify-between">
          {errors.description ? (
            <p className="text-xs text-red-600">
              {errors.description}
            </p>
          ) : (
            <span />
          )}

          <span className="text-xs text-slate-400">
            {form.description.length}/500
          </span>
        </div>
      </div>

      <Input
        label="Due Date"
        name="dueDate"
        type="date"
        value={form.dueDate}
        onChange={handleChange}
      />

      <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={loading}
        >
          {project ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  );
}