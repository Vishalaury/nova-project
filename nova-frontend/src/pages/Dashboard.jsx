import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  ListTodo,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import toast from "react-hot-toast";

import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import Button from "../components/common/Button";
import { getErrorMessage } from "../services/api";
import api from "../services/api";

const getStatsObject = (response) => {
  const data = response?.data;

  if (Array.isArray(data)) {
    return {};
  }

  return data?.stats || data?.data || data || {};
};

const numberValue = (...values) => {
  for (const value of values) {
    const number = Number(value);

    if (!Number.isNaN(number)) {
      return number;
    }
  }

  return 0;
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await api.get("/dashboard/stats");
      setStats(getStatsObject(response));
    } catch (err) {
      const message = getErrorMessage(
        err,
        "Failed to load dashboard statistics"
      );

      setError(message);

      if (showRefresh) {
        toast.error(message);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const values = useMemo(() => {
    const totalProjects = numberValue(
      stats?.totalProjects,
      stats?.projectsCount,
      stats?.projectCount,
      stats?.projects?.total
    );

    const totalTasks = numberValue(
      stats?.totalTasks,
      stats?.tasksCount,
      stats?.taskCount,
      stats?.tasks?.total
    );

    const completedTasks = numberValue(
      stats?.completedTasks,
      stats?.completed,
      stats?.tasks?.completed
    );

    const inProgressTasks = numberValue(
      stats?.inProgressTasks,
      stats?.inProgress,
      stats?.tasks?.inProgress
    );

    const pendingTasks = numberValue(
      stats?.pendingTasks,
      stats?.todoTasks,
      stats?.pending,
      stats?.todo,
      stats?.tasks?.pending,
      stats?.tasks?.todo
    );

    const overdueTasks = numberValue(
      stats?.overdueTasks,
      stats?.overdue,
      stats?.tasks?.overdue
    );

    const completionRate =
      totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    return {
      totalProjects,
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      overdueTasks,
      completionRate,
    };
  }, [stats]);

  const taskChartData = [
    {
      name: "To Do",
      value: values.pendingTasks,
    },
    {
      name: "In Progress",
      value: values.inProgressTasks,
    },
    {
      name: "Completed",
      value: values.completedTasks,
    },
  ];

  const overviewData = [
    {
      name: "Projects",
      value: values.totalProjects,
    },
    {
      name: "Tasks",
      value: values.totalTasks,
    },
    {
      name: "Completed",
      value: values.completedTasks,
    },
    {
      name: "Overdue",
      value: values.overdueTasks,
    },
  ];

  if (loading) {
    return <Loader />;
  }

  if (error && !stats) {
    return (
      <div className="space-y-4">
        <ErrorMessage message={error} />

        <Button onClick={() => fetchStats()}>
          Try Again
        </Button>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Projects",
      value: values.totalProjects,
      icon: FolderKanban,
      description: "Projects you are working on",
    },
    {
      title: "Total Tasks",
      value: values.totalTasks,
      icon: ClipboardList,
      description: "Tasks across your projects",
    },
    {
      title: "Completed Tasks",
      value: values.completedTasks,
      icon: CheckCircle2,
      description: `${values.completionRate}% completion rate`,
    },
    {
      title: "Pending Tasks",
      value: values.pendingTasks,
      icon: ListTodo,
      description: "Tasks waiting to be completed",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Overview of your projects and tasks
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => fetchStats(true)}
          disabled={refreshing}
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin" : ""}
          />
          Refresh
        </Button>
      </div>

      {/* Error */}
      {error && stats && <ErrorMessage message={error} />}

      {/* Stats Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {card.value}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                  <Icon size={22} />
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Completion */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-slate-900">
              Overall Task Progress
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Completed tasks compared with total tasks
            </p>
          </div>

          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <TrendingUp size={18} />
            {values.completionRate}%
          </div>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-slate-900 transition-all"
            style={{
              width: `${Math.min(values.completionRate, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Task Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current task distribution
          </p>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {taskChartData.map((_, index) => (
                    <Cell key={index} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Distribution
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Projects and task summary
          </p>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {taskChartData.map((_, index) => (
                    <Cell key={index} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Overview Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900">
          Quick Summary
        </h2>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 font-medium">Metric</th>
                <th className="pb-3 font-medium">Count</th>
              </tr>
            </thead>

            <tbody>
              {overviewData.map((item) => (
                <tr
                  key={item.name}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-3 text-slate-700">
                    {item.name}
                  </td>

                  <td className="py-3 font-semibold text-slate-900">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}