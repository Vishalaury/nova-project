// import { useEffect, useState } from "react";
// import {
//   ArrowLeft,
//   Edit,
//   Plus,
//   RefreshCw,
//   Trash2,
// } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";

// import Button from "../components/common/Button";
// import Loader from "../components/common/Loader";
// import ErrorMessage from "../components/common/ErrorMessage";

// import ProjectForm from "../components/projects/ProjectForm";
// import MemberList from "../components/projects/MemberList";
// import TaskForm from "../components/tasks/TaskForm";
// import TaskTable from "../components/tasks/TaskTable";

// import {
//   getProjectById,
//   updateProject,
//   deleteProject,
//   addProjectMember,
//   removeProjectMember,
// } from "../services/projectService";

// import {
//   getProjectTasks,
//   createTask,
//   updateTask,
//   deleteTask,
// } from "../services/taskService";

// import { getErrorMessage } from "../services/api";

// export default function ProjectDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [project, setProject] = useState(null);
//   const [tasks, setTasks] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [tasksLoading, setTasksLoading] = useState(true);
//   const [formLoading, setFormLoading] = useState(false);

//   const [error, setError] = useState("");

//   const [showProjectForm, setShowProjectForm] = useState(false);
//   const [showTaskForm, setShowTaskForm] = useState(false);

//   const [editingTask, setEditingTask] = useState(null);

//   // ---------------------------------------
//   // Extract project from API response
//   // ---------------------------------------
//   const extractProject = (response) => {
//     return (
//       response?.project ||
//       response?.data?.project ||
//       response?.data?.data ||
//       response?.data ||
//       response
//     );
//   };

//   // ---------------------------------------
//   // Extract tasks from API response
//   // ---------------------------------------
//   const extractTasks = (response) => {
//     if (Array.isArray(response)) {
//       return response;
//     }

//     return (
//       response?.tasks ||
//       response?.data?.tasks ||
//       response?.data?.data ||
//       response?.data ||
//       []
//     );
//   };

//   // ---------------------------------------
//   // Load Project
//   // ---------------------------------------
//   const loadProject = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await getProjectById(id);

//       setProject(extractProject(response));
//     } catch (error) {
//       setError(
//         getErrorMessage(
//           error,
//           "Failed to load project"
//         )
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------------------
//   // Load Tasks
//   // ---------------------------------------
//   const loadTasks = async () => {
//     try {
//       setTasksLoading(true);

//       const response = await getProjectTasks(id);

//       setTasks(extractTasks(response));
//     } catch (error) {
//       toast.error(
//         getErrorMessage(
//           error,
//           "Failed to load tasks"
//         )
//       );
//     } finally {
//       setTasksLoading(false);
//     }
//   };

//   // ---------------------------------------
//   // Initial Load
//   // ---------------------------------------
//   useEffect(() => {
//     if (!id) return;

//     loadProject();
//     loadTasks();
//   }, [id]);

//   // ---------------------------------------
//   // Refresh
//   // ---------------------------------------
//   const handleRefresh = async () => {
//     await Promise.all([
//       loadProject(),
//       loadTasks(),
//     ]);
//   };

//   // ---------------------------------------
//   // Update Project
//   // ---------------------------------------
//   const handleProjectUpdate = async (formData) => {
//     try {
//       setFormLoading(true);

//       await updateProject(id, formData);

//       toast.success(
//         "Project updated successfully"
//       );

//       setShowProjectForm(false);

//       await loadProject();
//     } catch (error) {
//       toast.error(
//         getErrorMessage(
//           error,
//           "Failed to update project"
//         )
//       );
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // ---------------------------------------
//   // Delete Project
//   // ---------------------------------------
//   const handleProjectDelete = async () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this project?"
//     );

//     if (!confirmed) return;

//     try {
//       await deleteProject(id);

//       toast.success(
//         "Project deleted successfully"
//       );

//       navigate("/projects");
//     } catch (error) {
//       toast.error(
//         getErrorMessage(
//           error,
//           "Failed to delete project"
//         )
//       );
//     }
//   };

//   // ---------------------------------------
//   // Add Member
//   // ---------------------------------------
//   const handleAddMember = async (userId) => {
//     try {
//       await addProjectMember(id, userId);

//       toast.success(
//         "Member added successfully"
//       );

//       await loadProject();
//     } catch (error) {
//       toast.error(
//         getErrorMessage(
//           error,
//           "Failed to add member"
//         )
//       );
//     }
//   };

//   // ---------------------------------------
//   // Remove Member
//   // ---------------------------------------
//   const handleRemoveMember = async (userId) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to remove this member?"
//     );

//     if (!confirmed) return;

//     try {
//       await removeProjectMember(
//         id,
//         userId
//       );

//       toast.success(
//         "Member removed successfully"
//       );

//       await loadProject();
//     } catch (error) {
//       toast.error(
//         getErrorMessage(
//           error,
//           "Failed to remove member"
//         )
//       );
//     }
//   };

//   // ---------------------------------------
//   // Create Task
//   // ---------------------------------------
//   const handleCreateTask = async (formData) => {
//     try {
//       setFormLoading(true);

//       await createTask(id, formData);

//       toast.success(
//         "Task created successfully"
//       );

//       setShowTaskForm(false);

//       await loadTasks();
//       await loadProject();
//     } catch (error) {
//       toast.error(
//         getErrorMessage(
//           error,
//           "Failed to create task"
//         )
//       );
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // ---------------------------------------
//   // Update Task
//   // ---------------------------------------
//   const handleUpdateTask = async (formData) => {
//     const taskId =
//       editingTask?._id ||
//       editingTask?.id;

//     if (!taskId) return;

//     try {
//       setFormLoading(true);

//       await updateTask(
//         taskId,
//         formData
//       );

//       toast.success(
//         "Task updated successfully"
//       );

//       setEditingTask(null);
//       setShowTaskForm(false);

//       await loadTasks();
//       await loadProject();
//     } catch (error) {
//       toast.error(
//         getErrorMessage(
//           error,
//           "Failed to update task"
//         )
//       );
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // ---------------------------------------
//   // Delete Task
//   // ---------------------------------------
//   const handleDeleteTask = async (task) => {
//     const taskId =
//       task?._id ||
//       task?.id;

//     if (!taskId) return;

//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${task.title}"?`
//     );

//     if (!confirmed) return;

//     try {
//       await deleteTask(taskId);

//       toast.success(
//         "Task deleted successfully"
//       );

//       await loadTasks();
//       await loadProject();
//     } catch (error) {
//       toast.error(
//         getErrorMessage(
//           error,
//           "Failed to delete task"
//         )
//       );
//     }
//   };

//   // ---------------------------------------
//   // Edit Task
//   // ---------------------------------------
//   const handleEditTask = (task) => {
//     setEditingTask(task);
//     setShowTaskForm(true);
//   };

//   // ---------------------------------------
//   // Loading
//   // ---------------------------------------
//   if (loading) {
//     return <Loader />;
//   }

//   // ---------------------------------------
//   // Error
//   // ---------------------------------------
//   if (error || !project) {
//     return (
//       <div className="space-y-4">
//         <Button
//           variant="secondary"
//           onClick={() =>
//             navigate("/projects")
//           }
//         >
//           <ArrowLeft size={17} />
//           Back to Projects
//         </Button>

//         <ErrorMessage
//           message={
//             error ||
//             "Project not found"
//           }
//         />
//       </div>
//     );
//   }

//   // ---------------------------------------
//   // Project Data
//   // ---------------------------------------
//   const members =
//     project.members || [];

//   const completedTasks =
//     tasks.filter(
//       (task) =>
//         task.status === "completed"
//     ).length;

//   const progress =
//     tasks.length > 0
//       ? Math.round(
//           (completedTasks /
//             tasks.length) *
//             100
//         )
//       : Number(
//           project.progress || 0
//         );

//   // ---------------------------------------
//   // UI
//   // ---------------------------------------
//   return (
//     <div className="space-y-6">

//       {/* Header */}
//       <div className="flex flex-col gap-4">

//         <button
//           type="button"
//           onClick={() =>
//             navigate("/projects")
//           }
//           className="flex w-fit items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
//         >
//           <ArrowLeft size={16} />
//           Back to Projects
//         </button>

//         <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">

//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               {project.name}
//             </h1>

//             <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
//               {project.description ||
//                 "No project description available."}
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-2">

//             <Button
//               variant="secondary"
//               onClick={handleRefresh}
//             >
//               <RefreshCw size={16} />
//               Refresh
//             </Button>

//             <Button
//               variant="secondary"
//               onClick={() =>
//                 setShowProjectForm(true)
//               }
//             >
//               <Edit size={16} />
//               Edit
//             </Button>

//             <Button
//               variant="danger"
//               onClick={
//                 handleProjectDelete
//               }
//             >
//               <Trash2 size={16} />
//               Delete
//             </Button>

//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//           <p className="text-sm text-slate-500">
//             Total Tasks
//           </p>

//           <p className="mt-2 text-3xl font-bold text-slate-900">
//             {tasks.length}
//           </p>
//         </div>

//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//           <p className="text-sm text-slate-500">
//             Completed
//           </p>

//           <p className="mt-2 text-3xl font-bold text-slate-900">
//             {completedTasks}
//           </p>
//         </div>

//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//           <p className="text-sm text-slate-500">
//             Members
//           </p>

//           <p className="mt-2 text-3xl font-bold text-slate-900">
//             {members.length}
//           </p>
//         </div>

//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//           <p className="text-sm text-slate-500">
//             Progress
//           </p>

//           <p className="mt-2 text-3xl font-bold text-slate-900">
//             {Math.min(
//               progress,
//               100
//             )}
//             %
//           </p>
//         </div>

//       </div>

//       {/* Progress */}
//       <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//         <div className="flex items-center justify-between">

//           <div>
//             <h2 className="font-semibold text-slate-900">
//               Project Progress
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Based on completed tasks
//             </p>
//           </div>

//           <span className="font-bold text-slate-900">
//             {Math.min(
//               progress,
//               100
//             )}
//             %
//           </span>

//         </div>

//         <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">

//           <div
//             className="h-full rounded-full bg-slate-900 transition-all duration-500"
//             style={{
//               width: `${Math.min(
//                 progress,
//                 100
//               )}%`,
//             }}
//           />

//         </div>
//       </div>

//       {/* Members */}
//       <MemberList
//         members={members}
//         onAddMember={
//           handleAddMember
//         }
//         onRemoveMember={
//           handleRemoveMember
//         }
//       />

//       {/* Tasks */}
//       <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

//         <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

//           <div>
//             <h2 className="text-lg font-semibold text-slate-900">
//               Project Tasks
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Manage all tasks for this project
//             </p>
//           </div>

//           <Button
//             onClick={() => {
//               setEditingTask(null);
//               setShowTaskForm(true);
//             }}
//           >
//             <Plus size={17} />
//             Add Task
//           </Button>

//         </div>

//         {tasksLoading ? (
//           <Loader />
//         ) : tasks.length === 0 ? (
//           <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">

//             <p className="font-medium text-slate-700">
//               No tasks yet
//             </p>

//             <p className="mt-1 text-sm text-slate-500">
//               Create a task to start working on this project.
//             </p>

//             <div className="mt-4">
//               <Button
//                 onClick={() => {
//                   setEditingTask(null);
//                   setShowTaskForm(true);
//                 }}
//               >
//                 <Plus size={17} />
//                 Create Task
//               </Button>
//             </div>

//           </div>
//         ) : (
//           <TaskTable
//             tasks={tasks}
//             onEdit={handleEditTask}
//             onDelete={
//               handleDeleteTask
//             }
//           />
//         )}

//       </div>

//       {/* Edit Project Modal */}
//       {showProjectForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

//             <ProjectForm
//               project={project}
//               onSubmit={
//                 handleProjectUpdate
//               }
//               onCancel={() =>
//                 setShowProjectForm(false)
//               }
//               loading={formLoading}
//             />

//           </div>
//         </div>
//       )}

//       {/* Task Modal */}
//       {showTaskForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

//             <TaskForm
//               task={editingTask}
//               project={project}
//               members={members}
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



import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

import ProjectForm from "../components/projects/ProjectForm";
import MemberList from "../components/projects/MemberList";
import TaskForm from "../components/tasks/TaskForm";
import TaskTable from "../components/tasks/TaskTable";

import {
  getProjectById,
  updateProject,
  deleteProject,
  addProjectMember,
  removeProjectMember,
} from "../services/projectService";

import {
  getProjectTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

import { getErrorMessage } from "../services/api";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [error, setError] = useState("");

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  // ---------------------------------------
  // Extract project
  // ---------------------------------------
  const extractProject = (response) => {
    return (
      response?.project ||
      response?.data?.project ||
      response?.data?.data ||
      response?.data ||
      response
    );
  };

  // ---------------------------------------
  // Extract tasks
  // ---------------------------------------
  const extractTasks = (response) => {
    if (Array.isArray(response)) {
      return response;
    }

    const result =
      response?.tasks ||
      response?.data?.tasks ||
      response?.data?.data ||
      response?.data ||
      [];

    return Array.isArray(result) ? result : [];
  };

  // ---------------------------------------
  // Load project
  // ---------------------------------------
  const loadProject = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProjectById(id);

      setProject(extractProject(response));
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Failed to load project"
        )
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // Load tasks
  // ---------------------------------------
  const loadTasks = async () => {
    try {
      setTasksLoading(true);

      const response = await getProjectTasks(id);

      setTasks(extractTasks(response));
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          "Failed to load tasks"
        )
      );
    } finally {
      setTasksLoading(false);
    }
  };

  // ---------------------------------------
  // Initial load
  // ---------------------------------------
  useEffect(() => {
    if (!id) return;

    loadProject();
    loadTasks();
  }, [id]);

  // ---------------------------------------
  // Refresh
  // ---------------------------------------
  const handleRefresh = async () => {
    await Promise.all([
      loadProject(),
      loadTasks(),
    ]);
  };

  // ---------------------------------------
  // Update project
  // ---------------------------------------
  const handleProjectUpdate = async (formData) => {
    try {
      setFormLoading(true);

      await updateProject(id, formData);

      toast.success(
        "Project updated successfully"
      );

      setShowProjectForm(false);

      await loadProject();
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          "Failed to update project"
        )
      );
    } finally {
      setFormLoading(false);
    }
  };

  // ---------------------------------------
  // Delete project
  // ---------------------------------------
  const handleProjectDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project?.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteProject(id);

      toast.success(
        "Project deleted successfully"
      );

      navigate("/projects");
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          "Failed to delete project"
        )
      );
    }
  };

  // ---------------------------------------
  // Add member
  // ---------------------------------------
  const handleAddMember = async (userId) => {
    try {
      await addProjectMember(id, userId);

      toast.success(
        "Member added successfully"
      );

      await loadProject();
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          "Failed to add member"
        )
      );
    }
  };

  // ---------------------------------------
  // Remove member
  // ---------------------------------------
  const handleRemoveMember = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this member?"
    );

    if (!confirmed) return;

    try {
      await removeProjectMember(id, userId);

      toast.success(
        "Member removed successfully"
      );

      await loadProject();
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          "Failed to remove member"
        )
      );
    }
  };

  // ---------------------------------------
  // Create task
  // ---------------------------------------
  const handleCreateTask = async (formData) => {
    try {
      setFormLoading(true);

      await createTask(id, formData);

      toast.success(
        "Task created successfully"
      );

      setShowTaskForm(false);
      setEditingTask(null);

      await Promise.all([
        loadTasks(),
        loadProject(),
      ]);
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

  // ---------------------------------------
  // Update task
  // ---------------------------------------
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

      await updateTask(
        taskId,
        formData
      );

      toast.success(
        "Task updated successfully"
      );

      setEditingTask(null);
      setShowTaskForm(false);

      await Promise.all([
        loadTasks(),
        loadProject(),
      ]);
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

  // ---------------------------------------
  // Delete task
  // ---------------------------------------
  const handleDeleteTask = async (task) => {
    const taskId =
      task?._id ||
      task?.id;

    if (!taskId) {
      toast.error("Task ID not found");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${task?.title}"?`
    );

    if (!confirmed) return;

    try {
      await deleteTask(taskId);

      toast.success(
        "Task deleted successfully"
      );

      await Promise.all([
        loadTasks(),
        loadProject(),
      ]);
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          "Failed to delete task"
        )
      );
    }
  };

  // ---------------------------------------
  // Edit task
  // ---------------------------------------
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  // ---------------------------------------
  // Loading
  // ---------------------------------------
  if (loading) {
    return <Loader />;
  }

  // ---------------------------------------
  // Error
  // ---------------------------------------
  if (error || !project) {
    return (
      <div className="space-y-4">
        <Button
          variant="secondary"
          onClick={() =>
            navigate("/projects")
          }
        >
          <ArrowLeft size={17} />
          Back to Projects
        </Button>

        <ErrorMessage
          message={
            error ||
            "Project not found"
          }
        />
      </div>
    );
  }

  // ---------------------------------------
  // Project data
  // ---------------------------------------
  const members = Array.isArray(project.members)
    ? project.members
    : [];

  // IMPORTANT:
  // Backend status = done
  const completedTasks = tasks.filter(
    (task) => task?.status === "done"
  ).length;

  const progress =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) * 100
        )
      : 0;

  const safeProgress = Math.min(
    Math.max(progress, 0),
    100
  );

  // ---------------------------------------
  // UI
  // ---------------------------------------
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4">

        <button
          type="button"
          onClick={() =>
            navigate("/projects")
          }
          className="flex w-fit items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </button>

        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {project.name}
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              {project.description ||
                "No project description available."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">

            <Button
              variant="secondary"
              onClick={handleRefresh}
            >
              <RefreshCw size={16} />
              Refresh
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                setShowProjectForm(true)
              }
            >
              <Edit size={16} />
              Edit
            </Button>

            <Button
              variant="danger"
              onClick={handleProjectDelete}
            >
              <Trash2 size={16} />
              Delete
            </Button>

          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Tasks
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {tasks.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Completed
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {completedTasks}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Members
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {members.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Progress
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {safeProgress}%
          </p>
        </div>

      </div>

      {/* Progress */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="font-semibold text-slate-900">
              Project Progress
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Based on completed tasks
            </p>
          </div>

          <span className="font-bold text-slate-900">
            {safeProgress}%
          </span>

        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-500"
            style={{
              width: `${safeProgress}%`,
            }}
          />
        </div>

      </div>

      {/* Members */}
      <MemberList
        members={members}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
      />

      {/* Tasks */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Project Tasks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage all tasks for this project
            </p>
          </div>

          <Button
            onClick={() => {
              setEditingTask(null);
              setShowTaskForm(true);
            }}
          >
            <Plus size={17} />
            Add Task
          </Button>

        </div>

        {tasksLoading ? (
          <Loader />
        ) : tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">

            <p className="font-medium text-slate-700">
              No tasks yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Create a task to start working on this project.
            </p>

            <div className="mt-4">
              <Button
                onClick={() => {
                  setEditingTask(null);
                  setShowTaskForm(true);
                }}
              >
                <Plus size={17} />
                Create Task
              </Button>
            </div>

          </div>
        ) : (
          <TaskTable
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        )}

      </div>

      {/* Edit Project Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <ProjectForm
              project={project}
              onSubmit={handleProjectUpdate}
              onCancel={() =>
                setShowProjectForm(false)
              }
              loading={formLoading}
            />

          </div>
        </div>
      )}

      {/* Task Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <TaskForm
              task={editingTask}
              project={project}
              members={members}
              onSubmit={
                editingTask
                  ? handleUpdateTask
                  : handleCreateTask
              }
              onCancel={() => {
                setShowTaskForm(false);
                setEditingTask(null);
              }}
              loading={formLoading}
            />

          </div>
        </div>
      )}

    </div>
  );
}