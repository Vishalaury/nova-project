// import React, { useEffect, useState } from "react";
// import Button from "../common/Button";
// import Input from "../common/Input";

// const initialForm = {
//   title: "",
//   description: "",
//   status: "todo",
//   priority: "medium",
//   dueDate: "",
//   assignedTo: "",
// };

// export default function TaskForm({
//   task = null,
//   members = [],
//   onSubmit,
//   onCancel,
//   loading = false,
// }) {
//   const [form, setForm] = useState(initialForm);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (task) {
//       const assignedId =
//         task?.assignedTo?._id ||
//         task?.assignedTo?.id ||
//         task?.assignedTo ||
//         task?.assignee?._id ||
//         task?.assignee?.id ||
//         "";

//       setForm({
//         title: task.title || "",
//         description: task.description || "",
//         status: task.status || "todo",
//         priority: task.priority || "medium",
//         dueDate: task.dueDate
//           ? String(task.dueDate).slice(0, 10)
//           : "",
//         assignedTo: assignedId,
//       });
//     } else {
//       setForm(initialForm);
//     }

//     setErrors({});
//   }, [task]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));

//     setErrors((previous) => ({
//       ...previous,
//       [name]: "",
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!form.title.trim()) {
//       newErrors.title = "Task title is required.";
//     } else if (form.title.trim().length < 2) {
//       newErrors.title =
//         "Task title must contain at least 2 characters.";
//     }

//     if (form.description.length > 1000) {
//       newErrors.description =
//         "Description cannot exceed 1000 characters.";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!validate()) return;

//     const payload = {
//       title: form.title.trim(),
//       description: form.description.trim(),
//       status: form.status,
//       priority: form.priority,
//     };

//     if (form.dueDate) {
//       payload.dueDate = form.dueDate;
//     }

//     if (form.assignedTo) {
//       payload.assignedTo = form.assignedTo;
//     }

//     await onSubmit?.(payload);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-5"
//     >
//       {/* Title */}
//       <Input
//         label="Task Title"
//         name="title"
//         value={form.title}
//         onChange={handleChange}
//         placeholder="e.g. Implement authentication"
//         required
//         error={errors.title}
//       />

//       {/* Description */}
//       <div>
//         <label
//           htmlFor="description"
//           className="mb-1.5 block text-sm font-medium text-slate-700"
//         >
//           Description
//         </label>

//         <textarea
//           id="description"
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           rows={4}
//           placeholder="Describe what needs to be done..."
//           className={`
//             w-full resize-none rounded-lg border
//             bg-white px-3.5 py-2.5 text-sm
//             text-slate-900 outline-none
//             placeholder:text-slate-400
//             ${
//               errors.description
//                 ? "border-red-400"
//                 : "border-slate-300"
//             }
//             focus:border-slate-500
//             focus:ring-2 focus:ring-slate-100
//           `}
//         />

//         <div className="mt-1 flex justify-between">
//           {errors.description ? (
//             <p className="text-xs text-red-600">
//               {errors.description}
//             </p>
//           ) : (
//             <span />
//           )}

//           <span className="text-xs text-slate-400">
//             {form.description.length}/1000
//           </span>
//         </div>
//       </div>

//       {/* Status + Priority */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//         <div>
//           <label
//             htmlFor="status"
//             className="mb-1.5 block text-sm font-medium text-slate-700"
//           >
//             Status
//           </label>

//           <select
//             id="status"
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
//           >
//             <option value="todo">
//               To Do
//             </option>

//             <option value="pending">
//               Pending
//             </option>

//             <option value="in_progress">
//               In Progress
//             </option>

//             <option value="completed">
//               Completed
//             </option>

//             <option value="cancelled">
//               Cancelled
//             </option>
//           </select>
//         </div>

//         <div>
//           <label
//             htmlFor="priority"
//             className="mb-1.5 block text-sm font-medium text-slate-700"
//           >
//             Priority
//           </label>

//           <select
//             id="priority"
//             name="priority"
//             value={form.priority}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
//           >
//             <option value="low">
//               Low
//             </option>

//             <option value="medium">
//               Medium
//             </option>

//             <option value="high">
//               High
//             </option>
//           </select>
//         </div>
//       </div>

//       {/* Assigned user */}
//       <div>
//         <label
//           htmlFor="assignedTo"
//           className="mb-1.5 block text-sm font-medium text-slate-700"
//         >
//           Assign To
//         </label>

//         <select
//           id="assignedTo"
//           name="assignedTo"
//           value={form.assignedTo}
//           onChange={handleChange}
//           className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
//         >
//           <option value="">
//             Unassigned
//           </option>

//           {members.map((member) => {
//             const id =
//               member._id ||
//               member.id ||
//               member.userId;

//             const name =
//               member.name ||
//               member.username ||
//               member.email ||
//               "Unknown User";

//             return (
//               <option key={id} value={id}>
//                 {name}
//                 {member.email
//                   ? ` (${member.email})`
//                   : ""}
//               </option>
//             );
//           })}
//         </select>

//         {members.length === 0 && (
//           <p className="mt-1 text-xs text-slate-400">
//             No project members available.
//           </p>
//         )}
//       </div>

//       {/* Due Date */}
//       <Input
//         label="Due Date"
//         name="dueDate"
//         type="date"
//         value={form.dueDate}
//         onChange={handleChange}
//       />

//       {/* Buttons */}
//       <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
//         <Button
//           type="button"
//           variant="secondary"
//           onClick={onCancel}
//           disabled={loading}
//         >
//           Cancel
//         </Button>

//         <Button
//           type="submit"
//           loading={loading}
//         >
//           {task ? "Update Task" : "Create Task"}
//         </Button>
//       </div>
//     </form>
//   );
// }




// import React, { useEffect, useState } from "react";
// import Button from "../common/Button";
// import Input from "../common/Input";

// const initialForm = {
//   title: "",
//   description: "",
//   status: "todo",
//   priority: "medium",
//   dueDate: "",
//   assignedTo: "",
// };

// export default function TaskForm({
//   task = null,
//   members = [],
//   onSubmit,
//   onCancel,
//   loading = false,
// }) {
//   const [form, setForm] = useState(initialForm);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (task) {
//       const assignedId =
//         task?.assignedTo?._id ||
//         task?.assignedTo?.id ||
//         task?.assignedTo ||
//         task?.assignee?._id ||
//         task?.assignee?.id ||
//         "";

//       setForm({
//         title: task.title || "",
//         description: task.description || "",
//         status: task.status || "todo",
//         priority: task.priority || "medium",
//         dueDate: task.dueDate
//           ? String(task.dueDate).slice(0, 10)
//           : "",
//         assignedTo: assignedId,
//       });
//     } else {
//       setForm(initialForm);
//     }

//     setErrors({});
//   }, [task]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));

//     setErrors((previous) => ({
//       ...previous,
//       [name]: "",
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!form.title.trim()) {
//       newErrors.title = "Task title is required.";
//     } else if (form.title.trim().length < 2) {
//       newErrors.title =
//         "Task title must contain at least 2 characters.";
//     }

//     if (form.description.length > 1000) {
//       newErrors.description =
//         "Description cannot exceed 1000 characters.";
//     }

//     if (!["todo", "in_progress", "done"].includes(form.status)) {
//       newErrors.status = "Invalid task status.";
//     }

//     if (!["low", "medium", "high"].includes(form.priority)) {
//       newErrors.priority = "Invalid task priority.";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!validate()) return;

//     const payload = {
//       title: form.title.trim(),
//       description: form.description.trim(),
//       status: form.status,
//       priority: form.priority,
//     };

//     if (form.dueDate) {
//       payload.dueDate = form.dueDate;
//     }

//     if (form.assignedTo) {
//       payload.assignedTo = form.assignedTo;
//     }

//     await onSubmit?.(payload);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-5">
//       {/* Title */}
//       <Input
//         label="Task Title"
//         name="title"
//         value={form.title}
//         onChange={handleChange}
//         placeholder="e.g. Implement authentication"
//         required
//         error={errors.title}
//       />

//       {/* Description */}
//       <div>
//         <label
//           htmlFor="description"
//           className="mb-1.5 block text-sm font-medium text-slate-700"
//         >
//           Description
//         </label>

//         <textarea
//           id="description"
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           rows={4}
//           maxLength={1000}
//           placeholder="Describe what needs to be done..."
//           className={`w-full resize-none rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 ${
//             errors.description
//               ? "border-red-400"
//               : "border-slate-300"
//           } focus:border-slate-500 focus:ring-2 focus:ring-slate-100`}
//         />

//         <div className="mt-1 flex justify-between">
//           {errors.description ? (
//             <p className="text-xs text-red-600">
//               {errors.description}
//             </p>
//           ) : (
//             <span />
//           )}

//           <span className="text-xs text-slate-400">
//             {form.description.length}/1000
//           </span>
//         </div>
//       </div>

//       {/* Status + Priority */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//         {/* Status */}
//         <div>
//           <label
//             htmlFor="status"
//             className="mb-1.5 block text-sm font-medium text-slate-700"
//           >
//             Status
//           </label>

//           <select
//             id="status"
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none ${
//               errors.status
//                 ? "border-red-400"
//                 : "border-slate-300"
//             } focus:border-slate-500 focus:ring-2 focus:ring-slate-100`}
//           >
//             <option value="todo">To Do</option>
//             <option value="in_progress">In Progress</option>
//             <option value="done">Completed</option>
//           </select>

//           {errors.status && (
//             <p className="mt-1 text-xs text-red-600">
//               {errors.status}
//             </p>
//           )}
//         </div>

//         {/* Priority */}
//         <div>
//           <label
//             htmlFor="priority"
//             className="mb-1.5 block text-sm font-medium text-slate-700"
//           >
//             Priority
//           </label>

//           <select
//             id="priority"
//             name="priority"
//             value={form.priority}
//             onChange={handleChange}
//             className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none ${
//               errors.priority
//                 ? "border-red-400"
//                 : "border-slate-300"
//             } focus:border-slate-500 focus:ring-2 focus:ring-slate-100`}
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>

//           {errors.priority && (
//             <p className="mt-1 text-xs text-red-600">
//               {errors.priority}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Assigned user */}
//       <div>
//         <label
//           htmlFor="assignedTo"
//           className="mb-1.5 block text-sm font-medium text-slate-700"
//         >
//           Assign To
//         </label>

//         <select
//           id="assignedTo"
//           name="assignedTo"
//           value={form.assignedTo}
//           onChange={handleChange}
//           className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
//         >
//           <option value="">Unassigned</option>

//           {members.map((member) => {
//             const id =
//               member?._id ||
//               member?.id ||
//               member?.userId;

//             const name =
//               member?.name ||
//               member?.username ||
//               member?.email ||
//               "Unknown User";

//             if (!id) return null;

//             return (
//               <option key={id} value={id}>
//                 {name}
//                 {member?.email
//                   ? ` (${member.email})`
//                   : ""}
//               </option>
//             );
//           })}
//         </select>

//         {members.length === 0 && (
//           <p className="mt-1 text-xs text-slate-400">
//             No project members available.
//           </p>
//         )}
//       </div>

//       {/* Due Date */}
//       <Input
//         label="Due Date"
//         name="dueDate"
//         type="date"
//         value={form.dueDate}
//         onChange={handleChange}
//       />

//       {/* Buttons */}
//       <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
//         <Button
//           type="button"
//           variant="secondary"
//           onClick={onCancel}
//           disabled={loading}
//         >
//           Cancel
//         </Button>

//         <Button type="submit" loading={loading}>
//           {task ? "Update Task" : "Create Task"}
//         </Button>
//       </div>
//     </form>
//   );
// }




// import React, { useEffect, useState } from "react";
// import Button from "../common/Button";
// import Input from "../common/Input";

// const initialForm = {
//   title: "",
//   description: "",
//   status: "todo",
//   priority: "medium",
//   dueDate: "",
//   assignedTo: "",
// };

// const VALID_STATUSES = ["todo", "in_progress", "done"];
// const VALID_PRIORITIES = ["low", "medium", "high"];

// export default function TaskForm({
//   task = null,
//   members = [],
//   onSubmit,
//   onCancel,
//   loading = false,
// }) {
//   const [form, setForm] = useState(initialForm);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (task) {
//       const assignedId =
//         task?.assignedTo?._id ||
//         task?.assignedTo?.id ||
//         (typeof task?.assignedTo === "string"
//           ? task.assignedTo
//           : "") ||
//         task?.assignee?._id ||
//         task?.assignee?.id ||
//         "";

//       setForm({
//         title: task?.title || "",
//         description: task?.description || "",
//         status: VALID_STATUSES.includes(task?.status)
//           ? task.status
//           : "todo",
//         priority: VALID_PRIORITIES.includes(task?.priority)
//           ? task.priority
//           : "medium",
//         dueDate: task?.dueDate
//           ? String(task.dueDate).slice(0, 10)
//           : "",
//         assignedTo: assignedId,
//       });
//     } else {
//       setForm({ ...initialForm });
//     }

//     setErrors({});
//   }, [task]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));

//     setErrors((previous) => ({
//       ...previous,
//       [name]: "",
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!form.title.trim()) {
//       newErrors.title = "Task title is required.";
//     } else if (form.title.trim().length < 2) {
//       newErrors.title =
//         "Task title must contain at least 2 characters.";
//     } else if (form.title.trim().length > 150) {
//       newErrors.title =
//         "Task title cannot exceed 150 characters.";
//     }

//     if (form.description.length > 1000) {
//       newErrors.description =
//         "Description cannot exceed 1000 characters.";
//     }

//     if (!VALID_STATUSES.includes(form.status)) {
//       newErrors.status = "Invalid task status.";
//     }

//     if (!VALID_PRIORITIES.includes(form.priority)) {
//       newErrors.priority = "Invalid task priority.";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!validate()) {
//       return;
//     }

//     const payload = {
//       title: form.title.trim(),
//       description: form.description.trim(),
//       status: form.status,
//       priority: form.priority,
//     };

//     if (form.dueDate) {
//       payload.dueDate = form.dueDate;
//     }

//     if (form.assignedTo) {
//       payload.assignedTo = form.assignedTo;
//     }

//     await onSubmit?.(payload);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-5"
//     >
//       {/* Task Title */}
//       <Input
//         label="Task Title"
//         name="title"
//         value={form.title}
//         onChange={handleChange}
//         placeholder="e.g. Implement authentication"
//         required
//         error={errors.title}
//       />

//       {/* Description */}
//       <div>
//         <label
//           htmlFor="description"
//           className="mb-1.5 block text-sm font-medium text-slate-700"
//         >
//           Description
//         </label>

//         <textarea
//           id="description"
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           rows={4}
//           maxLength={1000}
//           placeholder="Describe what needs to be done..."
//           className={`w-full resize-none rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 ${
//             errors.description
//               ? "border-red-400"
//               : "border-slate-300"
//           } focus:border-slate-500 focus:ring-2 focus:ring-slate-100`}
//         />

//         <div className="mt-1 flex justify-between">
//           {errors.description ? (
//             <p className="text-xs text-red-600">
//               {errors.description}
//             </p>
//           ) : (
//             <span />
//           )}

//           <span className="text-xs text-slate-400">
//             {form.description.length}/1000
//           </span>
//         </div>
//       </div>

//       {/* Status + Priority */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//         {/* Status */}
//         <div>
//           <label
//             htmlFor="status"
//             className="mb-1.5 block text-sm font-medium text-slate-700"
//           >
//             Status
//           </label>

//           <select
//             id="status"
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none ${
//               errors.status
//                 ? "border-red-400"
//                 : "border-slate-300"
//             } focus:border-slate-500 focus:ring-2 focus:ring-slate-100`}
//           >
//             <option value="todo">To Do</option>
//             <option value="in_progress">In Progress</option>
//             <option value="done">Completed</option>
//           </select>

//           {errors.status && (
//             <p className="mt-1 text-xs text-red-600">
//               {errors.status}
//             </p>
//           )}
//         </div>

//         {/* Priority */}
//         <div>
//           <label
//             htmlFor="priority"
//             className="mb-1.5 block text-sm font-medium text-slate-700"
//           >
//             Priority
//           </label>

//           <select
//             id="priority"
//             name="priority"
//             value={form.priority}
//             onChange={handleChange}
//             className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none ${
//               errors.priority
//                 ? "border-red-400"
//                 : "border-slate-300"
//             } focus:border-slate-500 focus:ring-2 focus:ring-slate-100`}
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>

//           {errors.priority && (
//             <p className="mt-1 text-xs text-red-600">
//               {errors.priority}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Assign To */}
//       <div>
//         <label
//           htmlFor="assignedTo"
//           className="mb-1.5 block text-sm font-medium text-slate-700"
//         >
//           Assign To
//         </label>

//         <select
//           id="assignedTo"
//           name="assignedTo"
//           value={form.assignedTo}
//           onChange={handleChange}
//           className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
//         >
//           <option value="">Unassigned</option>

//           {members.map((member) => {
//             const id =
//               member?._id ||
//               member?.id ||
//               member?.userId;

//             if (!id) {
//               return null;
//             }

//             const name =
//               member?.name ||
//               member?.username ||
//               member?.email ||
//               "Unknown User";

//             return (
//               <option key={id} value={id}>
//                 {name}
//                 {member?.email
//                   ? ` (${member.email})`
//                   : ""}
//               </option>
//             );
//           })}
//         </select>

//         {members.length === 0 && (
//           <p className="mt-1 text-xs text-slate-400">
//             No project members available.
//           </p>
//         )}
//       </div>

//       {/* Due Date */}
//       <Input
//         label="Due Date"
//         name="dueDate"
//         type="date"
//         value={form.dueDate}
//         onChange={handleChange}
//       />

//       {/* Buttons */}
//       <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
//         <Button
//           type="button"
//           variant="secondary"
//           onClick={onCancel}
//           disabled={loading}
//         >
//           Cancel
//         </Button>

//         <Button
//           type="submit"
//           loading={loading}
//         >
//           {task ? "Update Task" : "Create Task"}
//         </Button>
//       </div>
//     </form>
//   );
// }



import { useEffect, useMemo, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

const initialForm = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
  assignedTo: "",
  projectId: "",
};

const VALID_STATUSES = [
  "todo",
  "in_progress",
  "done",
];

const VALID_PRIORITIES = [
  "low",
  "medium",
  "high",
];

const getId = (item) => {
  if (!item) return "";

  if (typeof item === "string") {
    return item;
  }

  return (
    item?._id ||
    item?.id ||
    item?.userId ||
    ""
  );
};

export default function TaskForm({
  task = null,
  project = null,
  projects = [],
  members = [],
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  /*
   * --------------------------------------------------
   * Selected project
   * --------------------------------------------------
   */
  const selectedProject = useMemo(() => {
    if (!form.projectId) {
      return project || null;
    }

    return (
      projects.find(
        (item) =>
          String(getId(item)) ===
          String(form.projectId)
      ) ||
      project ||
      null
    );
  }, [
    form.projectId,
    projects,
    project,
  ]);

  /*
   * --------------------------------------------------
   * Members of selected project
   * --------------------------------------------------
   */
  const availableMembers = useMemo(() => {
    if (members.length > 0) {
      return members;
    }

    if (
      selectedProject &&
      Array.isArray(selectedProject.members)
    ) {
      return selectedProject.members;
    }

    return [];
  }, [
    members,
    selectedProject,
  ]);

  /*
   * --------------------------------------------------
   * Whether project selection is required
   * --------------------------------------------------
   *
   * ProjectDetails already knows the project.
   * Global Tasks page needs project selection.
   */
  const isGlobalForm =
    !project && projects.length > 0;

  /*
   * --------------------------------------------------
   * Initialize form
   * --------------------------------------------------
   */
  useEffect(() => {
    if (task) {
      const assignedId =
        getId(task.assignedTo) ||
        getId(task.assignee) ||
        "";

      const taskProjectId =
        task?.projectId ||
        getId(task?.project) ||
        getId(project) ||
        "";

      setForm({
        title: task?.title || "",

        description:
          task?.description || "",

        status:
          VALID_STATUSES.includes(
            task?.status
          )
            ? task.status
            : "todo",

        priority:
          VALID_PRIORITIES.includes(
            task?.priority
          )
            ? task.priority
            : "medium",

        dueDate: task?.dueDate
          ? String(task.dueDate).slice(0, 10)
          : "",

        assignedTo: assignedId,

        projectId:
          taskProjectId || "",
      });
    } else {
      setForm({
        ...initialForm,

        projectId:
          getId(project) || "",
      });
    }

    setErrors({});
  }, [
    task,
    project,
  ]);

  /*
   * --------------------------------------------------
   * Handle changes
   * --------------------------------------------------
   */
  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,

      [name]: value,

      // Changing project resets assignment
      ...(name === "projectId"
        ? {
            assignedTo: "",
          }
        : {}),
    }));

    setErrors((previous) => ({
      ...previous,

      [name]: "",

      ...(name === "projectId"
        ? {
            assignedTo: "",
          }
        : {}),
    }));
  };

  /*
   * --------------------------------------------------
   * Validation
   * --------------------------------------------------
   */
  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title =
        "Task title is required.";
    } else if (
      form.title.trim().length < 2
    ) {
      newErrors.title =
        "Task title must contain at least 2 characters.";
    } else if (
      form.title.trim().length > 150
    ) {
      newErrors.title =
        "Task title cannot exceed 150 characters.";
    }

    if (
      form.description.length > 1000
    ) {
      newErrors.description =
        "Description cannot exceed 1000 characters.";
    }

    if (
      !VALID_STATUSES.includes(
        form.status
      )
    ) {
      newErrors.status =
        "Invalid task status.";
    }

    if (
      !VALID_PRIORITIES.includes(
        form.priority
      )
    ) {
      newErrors.priority =
        "Invalid task priority.";
    }

    if (
      isGlobalForm &&
      !form.projectId
    ) {
      newErrors.projectId =
        "Please select a project.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  /*
   * --------------------------------------------------
   * Submit
   * --------------------------------------------------
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const payload = {
      title: form.title.trim(),

      description:
        form.description.trim(),

      status: form.status,

      priority: form.priority,
    };

    if (form.dueDate) {
      payload.dueDate =
        form.dueDate;
    }

    if (form.assignedTo) {
      payload.assignedTo =
        form.assignedTo;
    }

    /*
     * Only global Tasks page needs
     * projectId in payload.
     *
     * ProjectDetails already sends
     * project ID through the URL.
     */
    if (
      isGlobalForm &&
      form.projectId
    ) {
      payload.projectId =
        form.projectId;
    }

    await onSubmit?.(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-1"
    >

      {/* ------------------------------------------ */}
      {/* Project */}
      {/* ------------------------------------------ */}

      {isGlobalForm && (
        <div>
          <label
            htmlFor="projectId"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Project
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <select
            id="projectId"
            name="projectId"
            value={form.projectId}
            onChange={handleChange}
            disabled={loading}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none ${
              errors.projectId
                ? "border-red-400"
                : "border-slate-300"
            } focus:border-slate-500 focus:ring-2 focus:ring-slate-100`}
          >
            <option value="">
              Select Project
            </option>

            {projects.map((item) => {
              const projectId =
                getId(item);

              if (!projectId) {
                return null;
              }

              return (
                <option
                  key={projectId}
                  value={projectId}
                >
                  {item?.name ||
                    "Unnamed Project"}
                </option>
              );
            })}
          </select>

          {errors.projectId && (
            <p className="mt-1 text-xs text-red-600">
              {errors.projectId}
            </p>
          )}
        </div>
      )}

      {/* ------------------------------------------ */}
      {/* Task Title */}
      {/* ------------------------------------------ */}

      <Input
        label="Task Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="e.g. Implement authentication"
        required
        error={errors.title}
        disabled={loading}
      />

      {/* ------------------------------------------ */}
      {/* Description */}
      {/* ------------------------------------------ */}

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
          rows={4}
          maxLength={1000}
          disabled={loading}
          placeholder="Describe what needs to be done..."
          className={`w-full resize-none rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 ${
            errors.description
              ? "border-red-400"
              : "border-slate-300"
          } focus:border-slate-500 focus:ring-2 focus:ring-slate-100`}
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
            {form.description.length}/1000
          </span>
        </div>
      </div>

      {/* ------------------------------------------ */}
      {/* Status + Priority */}
      {/* ------------------------------------------ */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            disabled={loading}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none ${
              errors.status
                ? "border-red-400"
                : "border-slate-300"
            } focus:border-slate-500 focus:ring-2 focus:ring-slate-100`}
          >
            <option value="todo">
              To Do
            </option>

            <option value="in_progress">
              In Progress
            </option>

            <option value="done">
              Completed
            </option>
          </select>

          {errors.status && (
            <p className="mt-1 text-xs text-red-600">
              {errors.status}
            </p>
          )}
        </div>

        {/* Priority */}
        <div>
          <label
            htmlFor="priority"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Priority
          </label>

          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            disabled={loading}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none ${
              errors.priority
                ? "border-red-400"
                : "border-slate-300"
            } focus:border-slate-500 focus:ring-2 focus:ring-slate-100`}
          >
            <option value="low">
              Low
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="high">
              High
            </option>
          </select>

          {errors.priority && (
            <p className="mt-1 text-xs text-red-600">
              {errors.priority}
            </p>
          )}
        </div>

      </div>

      {/* ------------------------------------------ */}
      {/* Assign To */}
      {/* ------------------------------------------ */}

      <div>
        <label
          htmlFor="assignedTo"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Assign To
        </label>

        <select
          id="assignedTo"
          name="assignedTo"
          value={form.assignedTo}
          onChange={handleChange}
          disabled={
            loading ||
            (
              isGlobalForm &&
              !form.projectId
            )
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50 disabled:text-slate-400"
        >
          <option value="">
            Unassigned
          </option>

          {availableMembers.map(
            (member) => {
              const memberId =
                getId(member);

              if (!memberId) {
                return null;
              }

              const name =
                member?.name ||
                member?.username ||
                member?.fullName ||
                member?.email ||
                "Unknown User";

              return (
                <option
                  key={memberId}
                  value={memberId}
                >
                  {name}

                  {member?.email
                    ? ` (${member.email})`
                    : ""}
                </option>
              );
            }
          )}
        </select>

        {isGlobalForm &&
          !form.projectId && (
            <p className="mt-1 text-xs text-slate-400">
              Select a project first.
            </p>
          )}

        {form.projectId &&
          availableMembers.length ===
            0 && (
            <p className="mt-1 text-xs text-slate-400">
              No project members available.
            </p>
          )}
      </div>

      {/* ------------------------------------------ */}
      {/* Due Date */}
      {/* ------------------------------------------ */}

      <Input
        label="Due Date"
        name="dueDate"
        type="date"
        value={form.dueDate}
        onChange={handleChange}
        disabled={loading}
      />

      {/* ------------------------------------------ */}
      {/* Buttons */}
      {/* ------------------------------------------ */}

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
          {task
            ? "Update Task"
            : "Create Task"}
        </Button>

      </div>

    </form>
  );
}