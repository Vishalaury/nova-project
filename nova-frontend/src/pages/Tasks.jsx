// import { useEffect, useMemo, useState } from "react";
// import {
//   ClipboardList,
//   Filter,
//   RefreshCw,
//   Search,
// } from "lucide-react";
// import toast from "react-hot-toast";

// import Button from "../components/common/Button";
// import Input from "../components/common/Input";
// import Loader from "../components/common/Loader";
// import EmptyState from "../components/common/EmptyState";
// import ErrorMessage from "../components/common/ErrorMessage";

// import TaskTable from "../components/tasks/TaskTable";
// import TaskForm from "../components/tasks/TaskForm";

// import { getProjects } from "../services/projectService";
// import {
//   createTask,
//   deleteTask,
//   getProjectTasks,
//   updateTask,
// } from "../services/taskService";

// import { getErrorMessage } from "../services/api";

// // --------------------------------------------------
// // Helpers
// // --------------------------------------------------

// const extractProjects = (response) => {
//   if (Array.isArray(response)) {
//     return response;
//   }

//   return (
//     response?.projects ||
//     response?.data?.projects ||
//     response?.data?.data ||
//     response?.data ||
//     []
//   );
// };

// const extractTasks = (response) => {
//   if (Array.isArray(response)) {
//     return response;
//   }

//   return (
//     response?.tasks ||
//     response?.data?.tasks ||
//     response?.data?.data ||
//     response?.data ||
//     []
//   );
// };

// // --------------------------------------------------
// // Tasks Page
// // --------------------------------------------------

// export default function Tasks() {
//   const [projects, setProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Filters
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [priorityFilter, setPriorityFilter] = useState("all");
//   const [projectFilter, setProjectFilter] = useState("all");

//   // Task form
//   const [showTaskForm, setShowTaskForm] = useState(false);
//   const [editingTask, setEditingTask] = useState(null);
//   const [formLoading, setFormLoading] = useState(false);

//   // --------------------------------------------------
//   // Load projects + all tasks
//   // --------------------------------------------------

//   const loadAllTasks = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const projectResponse = await getProjects();
//       const projectList = extractProjects(projectResponse);

//       setProjects(projectList);

//       const taskResponses = await Promise.all(
//         projectList.map(async (project) => {
//           const projectId = project?._id || project?.id;

//           if (!projectId) {
//             return [];
//           }

//           try {
//             const response = await getProjectTasks(projectId);

//             const projectTasks = extractTasks(response);

//             return projectTasks.map((task) => ({
//               ...task,
//               project: task.project || project,
//               projectId,
//             }));
//           } catch {
//             return [];
//           }
//         })
//       );

//       setTasks(taskResponses.flat());
//     } catch (err) {
//       setError(
//         getErrorMessage(err, "Failed to load tasks")
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAllTasks();
//   }, []);

//   // --------------------------------------------------
//   // Filtering
//   // --------------------------------------------------

//   const filteredTasks = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     return tasks.filter((task) => {
//       // Search
//       const matchesSearch =
//         !query ||
//         task?.title?.toLowerCase().includes(query) ||
//         task?.description?.toLowerCase().includes(query);

//       // IMPORTANT:
//       // Backend values:
//       // todo
//       // in_progress
//       // done
//       const matchesStatus =
//         statusFilter === "all" ||
//         task?.status === statusFilter;

//       // Priority
//       const matchesPriority =
//         priorityFilter === "all" ||
//         task?.priority === priorityFilter;

//       // Project
//       const taskProjectId =
//         task?.projectId ||
//         task?.project?._id ||
//         task?.project?.id;

//       const matchesProject =
//         projectFilter === "all" ||
//         taskProjectId === projectFilter;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesPriority &&
//         matchesProject
//       );
//     });
//   }, [
//     tasks,
//     search,
//     statusFilter,
//     priorityFilter,
//     projectFilter,
//   ]);

//   // --------------------------------------------------
//   // Create Task
//   // --------------------------------------------------

//   const handleCreateTask = async (formData) => {
//     const projectId =
//       formData?.projectId ||
//       formData?.project;

//     if (!projectId) {
//       toast.error("Please select a project");
//       return;
//     }

//     try {
//       setFormLoading(true);

//       const payload = {
//         ...formData,
//       };

//       delete payload.projectId;
//       delete payload.project;

//       await createTask(projectId, payload);

//       toast.success("Task created successfully");

//       setShowTaskForm(false);
//       setEditingTask(null);

//       await loadAllTasks();
//     } catch (err) {
//       toast.error(
//         getErrorMessage(
//           err,
//           "Failed to create task"
//         )
//       );
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // --------------------------------------------------
//   // Update Task
//   // --------------------------------------------------

//   const handleUpdateTask = async (formData) => {
//     const taskId =
//       editingTask?._id ||
//       editingTask?.id;

//     if (!taskId) {
//       toast.error("Task ID not found");
//       return;
//     }

//     try {
//       setFormLoading(true);

//       await updateTask(taskId, formData);

//       toast.success("Task updated successfully");

//       setEditingTask(null);
//       setShowTaskForm(false);

//       await loadAllTasks();
//     } catch (err) {
//       toast.error(
//         getErrorMessage(
//           err,
//           "Failed to update task"
//         )
//       );
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // --------------------------------------------------
//   // Delete Task
//   // --------------------------------------------------

//   const handleDeleteTask = async (task) => {
//     const taskId =
//       task?._id ||
//       task?.id;

//     if (!taskId) {
//       toast.error("Task ID not found");
//       return;
//     }

//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${task?.title}"?`
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       await deleteTask(taskId);

//       setTasks((previous) =>
//         previous.filter(
//           (item) =>
//             (item?._id || item?.id) !== taskId
//         )
//       );

//       toast.success("Task deleted successfully");
//     } catch (err) {
//       toast.error(
//         getErrorMessage(
//           err,
//           "Failed to delete task"
//         )
//       );
//     }
//   };

//   // --------------------------------------------------
//   // Loading
//   // --------------------------------------------------

//   if (loading) {
//     return <Loader />;
//   }

//   // --------------------------------------------------
//   // UI
//   // --------------------------------------------------

//   return (
//     <div className="space-y-6">

//       {/* Header */}
//       <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">
//             Tasks
//           </h1>

//           <p className="mt-1 text-sm text-slate-500">
//             Search, filter and manage your tasks
//           </p>
//         </div>

//         <div className="flex gap-2">
//           <Button
//             variant="secondary"
//             onClick={loadAllTasks}
//           >
//             <RefreshCw size={16} />
//             Refresh
//           </Button>

//           <Button
//             onClick={() => {
//               setEditingTask(null);
//               setShowTaskForm(true);
//             }}
//           >
//             <ClipboardList size={17} />
//             Add Task
//           </Button>
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <ErrorMessage message={error} />
//       )}

//       {/* Filters */}
//       <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//         <div className="mb-4 flex items-center gap-2">
//           <Filter
//             size={18}
//             className="text-slate-600"
//           />

//           <h2 className="font-semibold text-slate-900">
//             Filters
//           </h2>
//         </div>

//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

//           {/* Search */}
//           <Input
//             label="Search"
//             placeholder="Search tasks..."
//             value={search}
//             onChange={(event) =>
//               setSearch(event.target.value)
//             }
//             icon={<Search size={17} />}
//           />

//           {/* Status */}
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-slate-700">
//               Status
//             </label>

//             <select
//               value={statusFilter}
//               onChange={(event) =>
//                 setStatusFilter(event.target.value)
//               }
//               className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-900"
//             >
//               <option value="all">
//                 All Statuses
//               </option>

//               <option value="todo">
//                 To Do
//               </option>

//               <option value="in_progress">
//                 In Progress
//               </option>

//               <option value="done">
//                 Completed
//               </option>
//             </select>
//           </div>

//           {/* Priority */}
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-slate-700">
//               Priority
//             </label>

//             <select
//               value={priorityFilter}
//               onChange={(event) =>
//                 setPriorityFilter(event.target.value)
//               }
//               className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-900"
//             >
//               <option value="all">
//                 All Priorities
//               </option>

//               <option value="low">
//                 Low
//               </option>

//               <option value="medium">
//                 Medium
//               </option>

//               <option value="high">
//                 High
//               </option>
//             </select>
//           </div>

//           {/* Project */}
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-slate-700">
//               Project
//             </label>

//             <select
//               value={projectFilter}
//               onChange={(event) =>
//                 setProjectFilter(event.target.value)
//               }
//               className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-900"
//             >
//               <option value="all">
//                 All Projects
//               </option>

//               {projects.map((project) => {
//                 const projectId =
//                   project?._id ||
//                   project?.id;

//                 if (!projectId) {
//                   return null;
//                 }

//                 return (
//                   <option
//                     key={projectId}
//                     value={projectId}
//                   >
//                     {project?.name || "Unnamed Project"}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>

//         </div>
//       </div>

//       {/* Task List */}
//       <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//         <div className="mb-5">
//           <h2 className="font-semibold text-slate-900">
//             Task List
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             Showing {filteredTasks.length} of{" "}
//             {tasks.length} tasks
//           </p>
//         </div>

//         {filteredTasks.length === 0 ? (
//           <EmptyState
//             title="No tasks found"
//             message="Try changing your filters or create a new task."
//           />
//         ) : (
//           <TaskTable
//             tasks={filteredTasks}
//             onEdit={(task) => {
//               setEditingTask(task);
//               setShowTaskForm(true);
//             }}
//             onDelete={handleDeleteTask}
//           />
//         )}

//       </div>

//       {/* Task Form */}
//       {showTaskForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

//             <TaskForm
//               task={editingTask}

//               project={
//                 editingTask?.project ||
//                 projects.find(
//                   (project) =>
//                     (project?._id || project?.id) ===
//                     editingTask?.projectId
//                 )
//               }

//               projects={projects}

//               members={
//                 editingTask?.project?.members ||
//                 []
//               }

//               onSubmit={
//                 editingTask
//                   ? handleUpdateTask
//                   : handleCreateTask
//               }

//               onCancel={() => {
//                 setShowTaskForm(false);
//                 setEditingTask(null);
//               }}

//               loading={formLoading}
//             />

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import {
  ClipboardList,
  Filter,
  RefreshCw,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";

import TaskTable from "../components/tasks/TaskTable";
import TaskForm from "../components/tasks/TaskForm";

import { getProjects } from "../services/projectService";
import {
  createTask,
  deleteTask,
  getProjectTasks,
  updateTask,
} from "../services/taskService";

import { getErrorMessage } from "../services/api";

// --------------------------------------------------
// Helpers
// --------------------------------------------------

const getId = (item) => item?._id || item?.id || null;

const extractProjects = (response) => {
  if (Array.isArray(response)) {
    return response;
  }

  const projects =
    response?.projects ||
    response?.data?.projects ||
    response?.data?.data ||
    response?.data;

  return Array.isArray(projects) ? projects : [];
};

const extractTasks = (response) => {
  if (Array.isArray(response)) {
    return response;
  }

  const tasks =
    response?.tasks ||
    response?.data?.tasks ||
    response?.data?.data ||
    response?.data;

  return Array.isArray(tasks) ? tasks : [];
};

// --------------------------------------------------
// Tasks Page
// --------------------------------------------------

export default function Tasks() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");

  // Task form
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // --------------------------------------------------
  // Load projects + tasks
  // --------------------------------------------------

  const loadAllTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const projectResponse = await getProjects();
      const projectList = extractProjects(projectResponse);

      setProjects(projectList);

      const taskResponses = await Promise.all(
        projectList.map(async (project) => {
          const projectId = getId(project);

          if (!projectId) {
            return [];
          }

          try {
            const response = await getProjectTasks(projectId);
            const projectTasks = extractTasks(response);

            return projectTasks.map((task) => ({
              ...task,

              // Always keep project information
              project:
                task?.project || project,

              // Keep project ID for filtering
              projectId:
                task?.projectId ||
                task?.project?._id ||
                task?.project?.id ||
                projectId,
            }));
          } catch {
            return [];
          }
        })
      );

      setTasks(taskResponses.flat());
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Failed to load tasks"
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllTasks();
  }, []);

  // --------------------------------------------------
  // Filtering
  // --------------------------------------------------

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      // Search
      const title =
        task?.title?.toLowerCase() || "";

      const description =
        task?.description?.toLowerCase() || "";

      const matchesSearch =
        !query ||
        title.includes(query) ||
        description.includes(query);

      // Status
      const matchesStatus =
        statusFilter === "all" ||
        task?.status === statusFilter;

      // Priority
      const matchesPriority =
        priorityFilter === "all" ||
        task?.priority === priorityFilter;

      // Project
      const taskProjectId =
        task?.projectId ||
        task?.project?._id ||
        task?.project?.id;

      const matchesProject =
        projectFilter === "all" ||
        String(taskProjectId) ===
          String(projectFilter);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesProject
      );
    });
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
    projectFilter,
  ]);

  // --------------------------------------------------
  // Create Task
  // --------------------------------------------------

  const handleCreateTask = async (formData) => {
    const projectId =
      formData?.projectId ||
      formData?.project?._id ||
      formData?.project?.id ||
      formData?.project;

    if (!projectId) {
      toast.error("Please select a project");
      return;
    }

    try {
      setFormLoading(true);

      const payload = {
        ...formData,
      };

      // Project ID is used in URL,
      // so don't send it inside task body.
      delete payload.projectId;
      delete payload.project;

      await createTask(
        projectId,
        payload
      );

      toast.success(
        "Task created successfully"
      );

      setShowTaskForm(false);
      setEditingTask(null);

      await loadAllTasks();
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          "Failed to create task"
        )
      );
    } finally {
      setFormLoading(false);
    }
  };

  // --------------------------------------------------
  // Update Task
  // --------------------------------------------------

  const handleUpdateTask = async (formData) => {
    const taskId =
      editingTask?._id ||
      editingTask?.id;

    if (!taskId) {
      toast.error("Task ID not found");
      return;
    }

    try {
      setFormLoading(true);

      const payload = {
        ...formData,
      };

      // Don't send project selector during update
      delete payload.projectId;
      delete payload.project;

      await updateTask(
        taskId,
        payload
      );

      toast.success(
        "Task updated successfully"
      );

      setEditingTask(null);
      setShowTaskForm(false);

      await loadAllTasks();
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          "Failed to update task"
        )
      );
    } finally {
      setFormLoading(false);
    }
  };

  // --------------------------------------------------
  // Delete Task
  // --------------------------------------------------

  const handleDeleteTask = async (task) => {
    const taskId =
      task?._id ||
      task?.id;

    if (!taskId) {
      toast.error("Task ID not found");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${task?.title || "this task"}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(taskId);

      toast.success(
        "Task deleted successfully"
      );

      // Immediately remove from UI
      setTasks((previous) =>
        previous.filter(
          (item) =>
            (item?._id || item?.id) !== taskId
        )
      );

      // Refresh from backend
      await loadAllTasks();
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          "Failed to delete task"
        )
      );
    }
  };

  // --------------------------------------------------
  // Open create form
  // --------------------------------------------------

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  // --------------------------------------------------
  // Open edit form
  // --------------------------------------------------

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  // --------------------------------------------------
  // Close form
  // --------------------------------------------------

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return <Loader />;
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Tasks
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Search, filter and manage your tasks
          </p>
        </div>

        <div className="flex gap-2">

          <Button
            variant="secondary"
            onClick={loadAllTasks}
          >
            <RefreshCw size={16} />
            Refresh
          </Button>

          <Button
            onClick={handleAddTask}
          >
            <ClipboardList size={17} />
            Add Task
          </Button>

        </div>
      </div>

      {/* Error */}
      {error && (
        <ErrorMessage message={error} />
      )}

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center gap-2">

          <Filter
            size={18}
            className="text-slate-600"
          />

          <h2 className="font-semibold text-slate-900">
            Filters
          </h2>

        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          {/* Search */}
          <Input
            label="Search"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            icon={<Search size={17} />}
          />

          {/* Status */}
          <div>

            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-900"
            >
              <option value="all">
                All Statuses
              </option>

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

          </div>

          {/* Priority */}
          <div>

            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Priority
            </label>

            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-900"
            >
              <option value="all">
                All Priorities
              </option>

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

          </div>

          {/* Project */}
          <div>

            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Project
            </label>

            <select
              value={projectFilter}
              onChange={(event) =>
                setProjectFilter(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-900"
            >
              <option value="all">
                All Projects
              </option>

              {projects.map((project) => {
                const projectId =
                  getId(project);

                if (!projectId) {
                  return null;
                }

                return (
                  <option
                    key={projectId}
                    value={projectId}
                  >
                    {project?.name ||
                      "Unnamed Project"}
                  </option>
                );
              })}
            </select>

          </div>

        </div>
      </div>

      {/* Task List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5">

          <h2 className="font-semibold text-slate-900">
            Task List
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Showing{" "}
            {filteredTasks.length}{" "}
            of{" "}
            {tasks.length} tasks
          </p>

        </div>

        {filteredTasks.length === 0 ? (
          <EmptyState
            title="No tasks found"
            message="Try changing your filters or create a new task."
          />
        ) : (
          <TaskTable
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        )}

      </div>

      {/* Task Form */}
      {showTaskForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <TaskForm
              task={editingTask}

              project={
                editingTask?.project ||
                projects.find(
                  (project) =>
                    getId(project) ===
                    (
                      editingTask?.projectId ||
                      editingTask?.project?._id ||
                      editingTask?.project?.id
                    )
                )
              }

              projects={projects}

              members={
                editingTask?.project?.members ||
                []
              }

              onSubmit={
                editingTask
                  ? handleUpdateTask
                  : handleCreateTask
              }

              onCancel={
                handleCloseForm
              }

              loading={formLoading}
            />

          </div>
        </div>
      )}

    </div>
  );
}