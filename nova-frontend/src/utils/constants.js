export const TASK_STATUSES = [
  {
    value: "todo",
    label: "To Do",
  },
  {
    value: "in-progress",
    label: "In Progress",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

export const TASK_PRIORITIES = [
  {
    value: "low",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "high",
    label: "High",
  },
];

export const PROJECT_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  ON_HOLD: "on-hold",
};

export const getStatusLabel = (status) => {
  const item = TASK_STATUSES.find((item) => item.value === status);
  return item?.label || status || "Unknown";
};

export const getPriorityLabel = (priority) => {
  const item = TASK_PRIORITIES.find((item) => item.value === priority);
  return item?.label || priority || "Unknown";
};