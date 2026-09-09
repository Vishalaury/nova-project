import api from "./api";

// Get all tasks of a project
export const getProjectTasks = async (
  projectId,
  filters = {}
) => {
  const response = await api.get(
    `/projects/${projectId}/tasks`,
    {
      params: filters,
    }
  );

  return response.data;
};

// Get single task
export const getTaskById = async (taskId) => {
  const response = await api.get(
    `/tasks/${taskId}`
  );

  return response.data;
};

// Create task
export const createTask = async (
  projectId,
  taskData
) => {
  const response = await api.post(
    `/projects/${projectId}/tasks`,
    taskData
  );

  return response.data;
};

// Update task
export const updateTask = async (
  taskId,
  taskData
) => {
  const response = await api.put(
    `/tasks/${taskId}`,
    taskData
  );

  return response.data;
};

// Delete task
export const deleteTask = async (taskId) => {
  const response = await api.delete(
    `/tasks/${taskId}`
  );

  return response.data;
};