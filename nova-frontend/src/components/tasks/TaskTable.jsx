// import React from "react";
// import {
//   CalendarDays,
//   Edit3,
//   Trash2,
//   User,
// } from "lucide-react";
// import TaskStatusBadge from "./TaskStatusBadge";
// import { formatDate } from "../../utils/formatDate";

// const priorityConfig = {
//   low: "text-slate-600 bg-slate-100",
//   medium: "text-amber-700 bg-amber-100",
//   high: "text-red-700 bg-red-100",
// };

// export default function TaskTable({
//   tasks = [],
//   onEdit,
//   onDelete,
// }) {
//   return (
//     <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[900px] text-left">
//           <thead className="border-b border-slate-200 bg-slate-50">
//             <tr>
//               <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Task
//               </th>

//               <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Status
//               </th>

//               <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Priority
//               </th>

//               <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Assigned To
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
//             {tasks.map((task) => {
//               const id = task._id || task.id;

//               const assignedUser =
//                 task?.assignedTo?.name ||
//                 task?.assignee?.name ||
//                 task?.assignedUser?.name ||
//                 task?.assignedTo?.email ||
//                 task?.assignee?.email ||
//                 "Unassigned";

//               const priority =
//                 task?.priority || "medium";

//               return (
//                 <tr
//                   key={id}
//                   className="transition hover:bg-slate-50"
//                 >
//                   {/* Task */}
//                   <td className="px-5 py-4">
//                     <div className="max-w-sm">
//                       <p className="font-medium text-slate-900">
//                         {task.title}
//                       </p>

//                       <p className="mt-1 truncate text-xs text-slate-400">
//                         {task.description ||
//                           "No description"}
//                       </p>
//                     </div>
//                   </td>

//                   {/* Status */}
//                   <td className="px-5 py-4">
//                     <TaskStatusBadge
//                       status={task.status}
//                     />
//                   </td>

//                   {/* Priority */}
//                   <td className="px-5 py-4">
//                     <span
//                       className={`
//                         inline-flex rounded-full
//                         px-2.5 py-1 text-xs
//                         font-medium capitalize
//                         ${
//                           priorityConfig[priority] ||
//                           "bg-slate-100 text-slate-600"
//                         }
//                       `}
//                     >
//                       {priority}
//                     </span>
//                   </td>

//                   {/* Assignee */}
//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-2">
//                       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
//                         <User
//                           size={15}
//                           className="text-slate-500"
//                         />
//                       </div>

//                       <span className="max-w-[160px] truncate text-sm text-slate-600">
//                         {assignedUser}
//                       </span>
//                     </div>
//                   </td>

//                   {/* Due date */}
//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-2 text-sm text-slate-600">
//                       <CalendarDays size={15} />

//                       {task.dueDate
//                         ? formatDate(task.dueDate)
//                         : "—"}
//                     </div>
//                   </td>

//                   {/* Actions */}
//                   <td className="px-5 py-4">
//                     <div className="flex justify-end gap-1">
//                       <button
//                         onClick={() =>
//                           onEdit?.(task)
//                         }
//                         title="Edit task"
//                         className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
//                       >
//                         <Edit3 size={17} />
//                       </button>

//                       <button
//                         onClick={() =>
//                           onDelete?.(task)
//                         }
//                         title="Delete task"
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



import {
  CalendarDays,
  Edit,
  Trash2,
  User,
} from "lucide-react";

import TaskStatusBadge from "./TaskStatusBadge";

// Date formatter yahin rakha hai
// taaki external formatDate import ki dependency na rahe.
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

const getId = (item) => item?._id || item?.id;

const getUserName = (user) => {
  if (!user) return "Unassigned";

  if (typeof user === "string") {
    return user;
  }

  return (
    user.name ||
    user.fullName ||
    user.email ||
    "Assigned User"
  );
};

const getPriorityClass = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-50 text-red-700 border-red-200";

    case "medium":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "low":
      return "bg-green-50 text-green-700 border-green-200";

    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
};

export default function TaskTable({
  tasks = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Task
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Priority
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Assigned To
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Due Date
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {tasks.map((task) => {
              const taskId = getId(task);

              const assignedUser =
                task.assignedTo ||
                task.assignee ||
                task.assignedUser;

              return (
                <tr
                  key={taskId}
                  className="transition hover:bg-slate-50"
                >
                  {/* Task */}
                  <td className="px-5 py-4">
                    <div className="max-w-xs">
                      <p className="font-semibold text-slate-900">
                        {task.title || "Untitled Task"}
                      </p>

                      {task.description && (
                        <p className="mt-1 truncate text-sm text-slate-500">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <TaskStatusBadge
                      status={task.status}
                    />
                  </td>

                  {/* Priority */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${getPriorityClass(
                        task.priority
                      )}`}
                    >
                      {task.priority || "—"}
                    </span>
                  </td>

                  {/* Assigned User */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                        <User size={15} />
                      </div>

                      <span>
                        {getUserName(assignedUser)}
                      </span>
                    </div>
                  </td>

                  {/* Due Date */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CalendarDays size={16} />

                      <span>
                        {formatDate(task.dueDate)}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onEdit?.(task)
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        title="Edit task"
                      >
                        <Edit size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete?.(task)
                        }
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                        title="Delete task"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {tasks.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-5 py-12 text-center"
                >
                  <p className="font-medium text-slate-700">
                    No tasks found
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    There are no tasks to display.
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