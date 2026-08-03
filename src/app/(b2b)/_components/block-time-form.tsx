"use client";

import { useActionState } from "react";
import { blockTimeSlot } from "@/actions/availability.actions";

type ActionState = Awaited<ReturnType<typeof blockTimeSlot>> | null;

export function BlockTimeForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    (_prevState, formData) => blockTimeSlot(formData),
    null
  );

  const stateError = state && "error" in state ? state.error : undefined;
  const fieldErrors = stateError && typeof stateError !== "string" ? stateError : undefined;
  const formError = typeof stateError === "string" ? stateError : undefined;

  return (
    <form
      action={formAction}
      className="mt-6 space-y-3 rounded-lg border bg-white p-4 sm:p-5"
    >
      <h2 className="font-semibold">Band vaqt belgilash</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-gray-500">Boshlanish</label>
          <input
            type="datetime-local"
            name="startTime"
            required
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
          />
          {fieldErrors?.startTime && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.startTime[0]}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-500">Tugash</label>
          <input
            type="datetime-local"
            name="endTime"
            required
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
          />
          {fieldErrors?.endTime && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.endTime[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-500">Sabab (ixtiyoriy)</label>
        <input
          type="text"
          name="reason"
          placeholder="Masalan: tushlik tanaffusi"
          className="mt-1 w-full rounded border px-3 py-2 text-sm"
        />
        {fieldErrors?.reason && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.reason[0]}</p>
        )}
      </div>

      {formError && <p className="text-sm text-red-600">{formError}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50 sm:w-auto"
      >
        {isPending ? "Saqlanmoqda..." : "Band qilish"}
      </button>
    </form>
  );
}
