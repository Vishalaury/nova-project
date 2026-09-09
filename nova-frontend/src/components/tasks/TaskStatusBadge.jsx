// import React from "react";

// const statusConfig = {
//   todo: {
//     label: "To Do",
//     className: "bg-slate-100 text-slate-700",
//   },
//   pending: {
//     label: "Pending",
//     className: "bg-amber-100 text-amber-700",
//   },
//   in_progress: {
//     label: "In Progress",
//     className: "bg-blue-100 text-blue-700",
//   },
//   completed: {
//     label: "Completed",
//     className: "bg-emerald-100 text-emerald-700",
//   },
//   cancelled: {
//     label: "Cancelled",
//     className: "bg-red-100 text-red-700",
//   },
// };

// export default function TaskStatusBadge({ status }) {
//   const config =
//     statusConfig[status] || {
//       label: status
//         ? String(status)
//             .replaceAll("_", " ")
//             .replace(/\b\w/g, (char) =>
//               char.toUpperCase()
//             )
//         : "Unknown",
//       className: "bg-slate-100 text-slate-600",
//     };

//   return (
//     <span
//       className={`
//         inline-flex items-center rounded-full
//         px-2.5 py-1 text-xs font-medium
//         ${config.className}
//       `}
//     >
//       <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

//       {config.label}
//     </span>
//   );
// }


// import React from "react";

// const statusConfig = {
//   todo: {
//     label: "To Do",
//     className: "bg-slate-100 text-slate-700",
//   },

//   in_progress: {
//     label: "In Progress",
//     className: "bg-blue-100 text-blue-700",
//   },

//   done: {
//     label: "Completed",
//     className: "bg-emerald-100 text-emerald-700",
//   },
// };

// export default function TaskStatusBadge({ status }) {
//   const config = statusConfig[status] || {
//     label: status
//       ? String(status)
//           .replaceAll("_", " ")
//           .replace(/\b\w/g, (char) => char.toUpperCase())
//       : "Unknown",
//     className: "bg-slate-100 text-slate-600",
//   };

//   return (
//     <span
//       className={`
//         inline-flex items-center rounded-full
//         px-2.5 py-1 text-xs font-medium
//         ${config.className}
//       `}
//     >
//       <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

//       {config.label}
//     </span>
//   );
// }



import React from "react";

const statusConfig = {
  todo: {
    label: "To Do",
    className: "bg-slate-100 text-slate-700",
  },

  in_progress: {
    label: "In Progress",
    className: "bg-blue-100 text-blue-700",
  },

  done: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-700",
  },
};

export default function TaskStatusBadge({ status }) {
  const config = statusConfig[status] || {
    label: status
      ? String(status)
          .replaceAll("_", " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      : "Unknown",
    className: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}