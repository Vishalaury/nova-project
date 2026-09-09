import React from "react";
import {
  CalendarDays,
  Edit3,
  Trash2,
  User,
} from "lucide-react";
import TaskStatusBadge from "./TaskStatusBadge";
import { formatDate } from "../../utils/formatDate";

const priorityConfig = {
  low: "text-slate-500 bg-slate-100",
  medium: "text-amber-700 bg-amber-100",
  high: "text-red-700 bg-red-100",
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}) {
  const priority = task?.priority || "medium";

  const assignedUser =
    task?.assignedTo?.name ||
    task?.assignee?.name ||
    task?.assignedUser?.name ||
    task?.assignedTo?.email ||
    task?.assignee?.email ||
    "Unassigned";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-900">
            {task?.title || "Untitled Task"}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
            {task?.description || "No description"}
          </p>
        </div>

        <TaskStatusBadge status={task?.status} />
      </div>

      {/* Priority */}
      <div className="mt-4">
        <span
          className={`
            inline-flex rounded-full px-2.5 py-1
            text-xs font-medium capitalize
            ${
              priorityConfig[priority] ||
              "bg-slate-100 text-slate-600"
            }
          `}
        >
          {priority}
        </span>
      </div>

      {/* Info */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <User size={16} />

          <span className="truncate">
            {assignedUser}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />

          <span>
            {task?.dueDate
              ? formatDate(task.dueDate)
              : "No due date"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-4">
        <button
          onClick={() => onEdit?.(task)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        >
          <Edit3 size={14} />
          Edit
        </button>

        <button
          onClick={() => onDelete?.(task)}
          className="flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}