"use client";

import { useActionState } from "react";
import { createBooking } from "@/actions/booking.actions";
import type { Service } from "@/lib/schema";

type ActionState = Awaited<ReturnType<typeof createBooking>> | null;

type BookingFormProps = {
  salonId: string;
  services: Service[];
};

export function BookingForm({ salonId, services }: BookingFormProps) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    (_prevState, formData) => createBooking(formData),
    null
  );

  const stateError = state && "error" in state ? state.error : undefined;
  const fieldErrors = stateError && typeof stateError !== "string" ? stateError : undefined;
  const formError = typeof stateError === "string" ? stateError : undefined;

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <input type="hidden" name="salonId" value={salonId} />

      <div>
        <label className="block text-sm font-medium">Xizmat</label>
        <select
          name="serviceId"
          required
          className="mt-1 w-full rounded-lg border px-3 py-2"
        >
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {s.price.toLocaleString()} so&apos;m ({s.duration} min)
            </option>
          ))}
        </select>
        {fieldErrors?.serviceId && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.serviceId[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Sana va vaqt</label>
        <input
          type="datetime-local"
          name="date"
          required
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
        {fieldErrors?.date && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.date[0]}</p>
        )}
      </div>

      {formError && <p className="text-sm text-red-600">{formError}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Yuborilmoqda..." : "Bron qilish"}
      </button>
    </form>
  );
}
