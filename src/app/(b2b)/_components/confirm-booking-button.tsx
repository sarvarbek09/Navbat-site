"use client";

import { useActionState } from "react";
import { updateBookingStatus } from "@/actions/booking.actions";

type ActionState = Awaited<ReturnType<typeof updateBookingStatus>> | null;

export function ConfirmBookingButton({ bookingId }: { bookingId: string }) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    (_prevState, formData) => updateBookingStatus(formData),
    null
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={bookingId} />
      <input type="hidden" name="status" value="confirmed" />
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700 disabled:opacity-50"
      >
        {isPending ? "..." : "Tasdiqlash"}
      </button>
      {state && "error" in state && (
        <p className="mt-1 text-xs text-red-600">
          {typeof state.error === "string" ? state.error : "Xatolik yuz berdi"}
        </p>
      )}
    </form>
  );
}
