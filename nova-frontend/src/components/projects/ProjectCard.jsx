// import React from "react";
// import {
//   CalendarDays,
//   CheckCircle2,
//   Clock3,
//   MoreVertical,
//   Users,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { formatDate } from "../../utils/formatDate";

// export default function ProjectCard({
//   project,
//   onEdit,
//   onDelete,
// }) {
//   const navigate = useNavigate();

//   const totalTasks =
//     project?.taskCount ??
//     project?.tasks?.length ??
//     project?.totalTasks ??
//     0;

//   const completedTasks =
//     project?.completedTasks ??
//     project?.completedTaskCount ??
//     project?.tasks?.filter(
//       (task) => task.status === "completed"
//     ).length ??
//     0;

//   const progress =
//     project?.progress ??
//     (totalTasks > 0
//       ? Math.round((completedTasks / totalTasks) * 100)
//       : 0);

//   const members =
//     project?.members?.length ??
//     project?.memberCount ??
//     0;

//   return (
//     <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
//       {/* Header */}
//       <div className="flex items-start justify-between gap-3">
//         <div className="min-w-0">
//           <button
//             onClick={() =>
//               navigate(`/projects/${project._id || project.id}`)
//             }
//             className="text-left"
//           >
//             <h3 className="truncate text-base font-semibold text-slate-900 hover:text-slate-600">
//               {project?.name || "Untitled Project"}
//             </h3>
//           </button>

//           <p className="mt-1 line-clamp-2 text-sm text-slate-500">
//             {project?.description ||
//               "No project description available."}
//           </p>
//         </div>

//         <div className="relative">
//           <button
//             className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
//             title="Project actions"
//           >
//             <MoreVertical size={18} />
//           </button>

//           <div className="pointer-events-none absolute right-0 top-10 z-10 hidden w-28 rounded-lg border border-slate-200 bg-white p-1 shadow-lg group-focus-within:block">
//             <button
//               onClick={() => onEdit?.(project)}
//               className="block w-full rounded-md px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-100"
//             >
//               Edit
//             </button>

//             <button
//               onClick={() => onDelete?.(project)}
//               className="block w-full rounded-md px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Progress */}
//       <div className="mt-5">
//         <div className="mb-2 flex items-center justify-between">
//           <span className="text-xs font-medium text-slate-500">
//             Progress
//           </span>

//           <span className="text-xs font-semibold text-slate-700">
//             {progress}%
//           </span>
//         </div>

//         <div className="h-2 overflow-hidden rounded-full bg-slate-100">
//           <div
//             className="h-full rounded-full bg-slate-900 transition-all duration-500"
//             style={{
//               width: `${Math.min(
//                 Math.max(progress, 0),
//                 100
//               )}%`,
//             }}
//           />
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="mt-5 grid grid-cols-3 gap-2">
//         <div className="rounded-lg bg-slate-50 p-3">
//           <div className="flex items-center gap-1.5 text-slate-400">
//             <CheckCircle2 size={15} />
//             <span className="text-xs">Tasks</span>
//           </div>

//           <p className="mt-1 text-sm font-semibold text-slate-800">
//             {totalTasks}
//           </p>
//         </div>

//         <div className="rounded-lg bg-slate-50 p-3">
//           <div className="flex items-center gap-1.5 text-slate-400">
//             <Users size={15} />
//             <span className="text-xs">Members</span>
//           </div>

//           <p className="mt-1 text-sm font-semibold text-slate-800">
//             {members}
//           </p>
//         </div>

//         <div className="rounded-lg bg-slate-50 p-3">
//           <div className="flex items-center gap-1.5 text-slate-400">
//             <Clock3 size={15} />
//             <span className="text-xs">Status</span>
//           </div>

//           <p className="mt-1 text-sm font-semibold capitalize text-slate-800">
//             {project?.status || "Active"}
//           </p>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
//         <div className="flex items-center gap-1.5 text-xs text-slate-400">
//           <CalendarDays size={14} />

//           <span>
//             {project?.dueDate
//               ? formatDate(project.dueDate)
//               : "No due date"}
//           </span>
//         </div>

//         <button
//           onClick={() =>
//             navigate(`/projects/${project._id || project.id}`)
//           }
//           className="text-xs font-semibold text-slate-700 hover:text-slate-950"
//         >
//           View project →
//         </button>
//       </div>
//     </div>
//   );
// }



import React from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MoreVertical,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Date formatter
const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  const projectId =
    project?._id || project?.id;

  const totalTasks =
    project?.taskCount ??
    project?.tasks?.length ??
    project?.totalTasks ??
    0;

  const completedTasks =
    project?.completedTasks ??
    project?.completedTaskCount ??
    project?.tasks?.filter(
      (task) => task.status === "completed"
    ).length ??
    0;

  const calculatedProgress =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  const progress = Number(
    project?.progress ?? calculatedProgress
  );

  const members =
    project?.members?.length ??
    project?.memberCount ??
    0;

  const safeProgress = Math.min(
    Math.max(progress, 0),
    100
  );

  const handleViewProject = () => {
    if (!projectId) return;

    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      {/* Header */}
      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0 flex-1">

          <button
            type="button"
            onClick={handleViewProject}
            className="text-left"
          >
            <h3 className="truncate text-base font-semibold text-slate-900 hover:text-slate-600">
              {project?.name ||
                "Untitled Project"}
            </h3>
          </button>

          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
            {project?.description ||
              "No project description available."}
          </p>

        </div>

        {/* Actions */}
        <div className="relative">

          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            title="Project actions"
          >
            <MoreVertical size={18} />
          </button>

          <div className="pointer-events-none absolute right-0 top-10 z-10 hidden w-28 rounded-lg border border-slate-200 bg-white p-1 shadow-lg group-focus-within:pointer-events-auto group-focus-within:block">

            <button
              type="button"
              onClick={() =>
                onEdit?.(project)
              }
              className="block w-full rounded-md px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-100"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() =>
                onDelete?.(project)
              }
              className="block w-full rounded-md px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50"
            >
              Delete
            </button>

          </div>
        </div>

      </div>

      {/* Progress */}
      <div className="mt-5">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-xs font-medium text-slate-500">
            Progress
          </span>

          <span className="text-xs font-semibold text-slate-700">
            {safeProgress}%
          </span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">

          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-500"
            style={{
              width: `${safeProgress}%`,
            }}
          />

        </div>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-3 gap-2">

        {/* Tasks */}
        <div className="rounded-lg bg-slate-50 p-3">

          <div className="flex items-center gap-1.5 text-slate-400">
            <CheckCircle2 size={15} />

            <span className="text-xs">
              Tasks
            </span>
          </div>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {totalTasks}
          </p>

        </div>

        {/* Members */}
        <div className="rounded-lg bg-slate-50 p-3">

          <div className="flex items-center gap-1.5 text-slate-400">
            <Users size={15} />

            <span className="text-xs">
              Members
            </span>
          </div>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {members}
          </p>

        </div>

        {/* Status */}
        <div className="rounded-lg bg-slate-50 p-3">

          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock3 size={15} />

            <span className="text-xs">
              Status
            </span>
          </div>

          <p className="mt-1 truncate text-sm font-semibold capitalize text-slate-800">
            {project?.status ||
              "Active"}
          </p>

        </div>

      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">

        <div className="flex min-w-0 items-center gap-1.5 text-xs text-slate-400">

          <CalendarDays
            size={14}
            className="shrink-0"
          />

          <span className="truncate">
            {project?.dueDate
              ? formatDate(
                  project.dueDate
                )
              : "No due date"}
          </span>

        </div>

        <button
          type="button"
          onClick={handleViewProject}
          disabled={!projectId}
          className="shrink-0 text-xs font-semibold text-slate-700 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
        >
          View project →
        </button>

      </div>

    </div>
  );
}