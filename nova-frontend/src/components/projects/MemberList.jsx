import React, { useState } from "react";
import {
  Mail,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";

export default function MemberList({
  members = [],
  onAddMember,
  onRemoveMember,
  loading = false,
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleAdd = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Email is required.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    try {
      await onAddMember?.(trimmedEmail);
      setEmail("");
    } catch {
      // Parent handles API error/toast.
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">
              Project Members
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Manage people working on this project.
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
            <User
              size={18}
              className="text-slate-600"
            />
          </div>
        </div>
      </div>

      {/* Add member */}
      <div className="border-b border-slate-200 p-5">
        <form
          onSubmit={handleAdd}
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <Input
              label="Add member by email"
              name="memberEmail"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              placeholder="member@example.com"
              error={error}
            />
          </div>

          <Button
            type="submit"
            loading={loading}
            className="sm:mb-0.5"
          >
            <Plus size={17} />
            Add Member
          </Button>
        </form>
      </div>

      {/* Members */}
      <div className="divide-y divide-slate-100">
        {members.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <User
                size={22}
                className="text-slate-400"
              />
            </div>

            <p className="mt-3 text-sm font-medium text-slate-700">
              No members yet
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add a member using their email address.
            </p>
          </div>
        ) : (
          members.map((member) => {
            const memberId =
              member._id ||
              member.id ||
              member.userId;

            const memberName =
              member.name ||
              member.username ||
              "Unknown User";

            const memberEmail =
              member.email || "No email available";

            return (
              <div
                key={memberId}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {memberName
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {memberName}
                    </p>

                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                      <Mail size={13} />

                      <span className="truncate">
                        {memberEmail}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onRemoveMember?.(member)
                  }
                  className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  title="Remove member"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}