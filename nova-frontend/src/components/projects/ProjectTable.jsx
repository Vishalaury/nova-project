// import React from "react";
// import {
//   CalendarDays,
//   Edit3,
//   Eye,
//   Trash2,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { formatDate } from "../../utils/formatDate";

// export default function ProjectTable({
//   projects = [],
//   onEdit,
//   onDelete,
// }) {
//   const navigate = useNavigate();

//   return (
//     <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[760px] text-left">
//           <thead className="border-b border-slate-200 bg-slate-50">
//             <tr>
//               <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Project
//               </th>

//               <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Tasks
//               </th>

//               <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Members
//               </th>

//               <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Progress
//               </th>

//               <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Due Date
//               </th>

//               <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-slate-100">
//             {projects.map((project) => {
//               const id = project._id || project.id;

//               const totalTasks =
//                 project.taskCount ??
//                 project.tasks?.length ??
//                 project.totalTasks ??
//                 0;

//               const completedTasks =
//                 project.completedTasks ??
//                 project.completedTaskCount ??
//                 0;

//               const progress =
//                 project.progress ??
//                 (totalTasks
//                   ? Math.round(
//                       (completedTasks / totalTasks) * 100
//                     )
//                   : 0);

//               const memberCount =
//                 project.memberCount ??
//                 project.members?.length ??
//                 0;

//               return (
//                 <tr
//                   key={id}
//                   className="transition hover:bg-slate-50"
//                 >
//                   {/* Project */}
//                   <td className="px-5 py-4">
//                     <button
//                       onClick={() =>
//                         navigate(`/projects/${id}`)
//                       }
//                       className="text-left"
//                     >
//                       <p className="font-medium text-slate-900 hover:text-slate-600">
//                         {project.name}
//                       </p>

//                       <p className="mt-0.5 max-w-xs truncate text-xs text-slate-400">
//                         {project.description ||
//                           "No description"}
//                       </p>
//                     </button>
//                   </td>

//                   {/* Tasks */}
//                   <td className="px-5 py-4">
//                     <span className="text-sm text-slate-700">
//                       {totalTasks}
//                     </span>
//                   </td>

//                   {/* Members */}
//                   <td className="px-5 py-4">
//                     <span className="text-sm text-slate-700">
//                       {memberCount}
//                     </span>
//                   </td>

//                   {/* Progress */}
//                   <td className="px-5 py-4">
//                     <div className="flex min-w-[120px] items-center gap-3">
//                       <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
//                         <div
//                           className="h-full rounded-full bg-slate-900"
//                           style={{
//                             width: `${Math.min(
//                               Math.max(progress, 0),
//                               100
//                             )}%`,
//                           }}
//                         />
//                       </div>

//                       <span className="text-xs font-medium text-slate-600">
//                         {progress}%
//                       </span>
//                     </div>
//                   </td>

//                   {/* Due date */}
//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-2 text-sm text-slate-600">
//                       <CalendarDays size={15} />

//                       {project.dueDate
//                         ? formatDate(project.dueDate)
//                         : "—"}
//                     </div>
//                   </td>

//                   {/* Actions */}
//                   <td className="px-5 py-4">
//                     <div className="flex justify-end gap-1">
//                       <button
//                         onClick={() =>
//                           navigate(`/projects/${id}`)
//                         }
//                         title="View"
//                         className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
//                       >
//                         <Eye size={17} />
//                       </button>

//                       <button
//                         onClick={() => onEdit?.(project)}
//                         title="Edit"
//                         className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
//                       >
//                         <Edit3 size={17} />
//                       </button>

//                       <button
//                         onClick={() => onDelete?.(project)}
//                         title="Delete"
//                         className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
//                       >
//                         <Trash2 size={17} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




import React from "react";
import {
  CalendarDays,
  Edit,
  Eye,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export default function ProjectTable({
  projects = [],
  onView,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  const handleView = (project) => {
    if (onView) {
      onView(project);
      return;
    }

    const id = project?._id || project?.id;

    if (id) {
      navigate(`/projects/${id}`);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Project
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Progress
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tasks
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Members
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Due Date
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {projects.map((project) => {
              const projectId =
                project?._id || project?.id;

              const totalTasks =
                project?.taskCount ??
                project?.totalTasks ??
                project?.tasks?.length ??
                0;

              const completedTasks =
                project?.completedTasks ??
                project?.completedTaskCount ??
                project?.tasks?.filter(
                  (task) =>
                    task.status === "completed"
                ).length ??
                0;

              const progress = Math.min(
                Math.max(
                  Number(
                    project?.progress ??
                      (totalTasks > 0
                        ? Math.round(
                            (completedTasks /
                              totalTasks) *
                              100
                          )
                        : 0)
                  ),
                  0
                ),
                100
              );

              const members =
                project?.memberCount ??
                project?.members?.length ??
                0;

              return (
                <tr
                  key={projectId}
                  className="transition hover:bg-slate-50"
                >
                  {/* Project */}
                  <td className="px-5 py-4">
                    <div className="max-w-xs">
                      <button
                        type="button"
                        onClick={() =>
                          handleView(project)
                        }
                        className="text-left font-semibold text-slate-900 hover:text-slate-600"
                      >
                        {project?.name ||
                          "Untitled Project"}
                      </button>

                      {project?.description && (
                        <p className="mt-1 truncate text-sm text-slate-500">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                      {project?.status ||
                        "active"}
                    </span>
                  </td>

                  {/* Progress */}
                  <td className="px-5 py-4">
                    <div className="w-32">
                      <div className="mb-1 flex justify-between">
                        <span className="text-xs text-slate-500">
                          Progress
                        </span>

                        <span className="text-xs font-semibold text-slate-700">
                          {progress}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-slate-900 transition-all"
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Tasks */}
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-slate-700">
                      {completedTasks}/{totalTasks}
                    </span>
                  </td>

                  {/* Members */}
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-slate-700">
                      {members}
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CalendarDays size={16} />

                      <span>
                        {project?.dueDate
                          ? formatDate(
                              project.dueDate
                            )
                          : "No due date"}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          handleView(project)
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        title="View project"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onEdit?.(project)
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        title="Edit project"
                      >
                        <Edit size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete?.(project)
                        }
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50 hover:text-red-700"
                        title="Delete project"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {projects.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-12 text-center"
                >
                  <p className="font-medium text-slate-700">
                    No projects found
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Create a project to get started.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}