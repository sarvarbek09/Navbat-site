// XIZMATLAR MODULI (masalan: "Soch olish — 50 000 so'm — 30 daqiqa").
// ESLATMA: bu faylda "service" so'zi ikki xil ma'noda ishlatiladi —
//   1) `services` jadvali/entity (schema.ts dagi salon xizmatlari),
//   2) umumiy Node.js konvensiyasi bo'yicha "*.service.ts = biznes-mantiq qatlami".
// Adashtirmaslik uchun quyida entity har doim to'liq nomi bilan (masalan
// `serviceEntity`) emas, kontekstdan aniq bo'ladigan tarzda yozilgan.
import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { services } from "../../db/schema";
import { AppError, ForbiddenError, NotFoundError } from "../../lib/errors";
import { getSalonByOwnerOrThrow } from "../salons/salons.service";
import type { CreateServiceInput, UpdateServiceInput } from "../../schemas/service.schema";
import type { Service } from "../../db/schema";

/** Bitta salonning xizmatlar ro'yxati — public (mijoz bron qilishdan oldin ko'radi) */
export async function listServicesBySalon(salonId: string): Promise<Service[]> {
  return db.select().from(services).where(eq(services.salonId, salonId));
}

async function getServiceOrThrow(id: string): Promise<Service> {
  const [service] = await db.select().from(services).where(eq(services.id, id)).limit(1);
  if (!service) throw NotFoundError("Xizmat topilmadi");
  return service;
}

/** Xizmatning egasi haqiqatan ham shu owner ekanini tekshiradi (salonId orqali) */
async function assertOwnsService(ownerId: string, service: Service) {
  const salon = await getSalonByOwnerOrThrow(ownerId);
  if (service.salonId !== salon.id) {
    throw ForbiddenError("Bu xizmat sizning salonizga tegishli emas");
  }
}

/** POST /api/services — owner o'z saloniga yangi xizmat qo'shadi */
export async function createService(ownerId: string, input: CreateServiceInput): Promise<Service> {
  const salon = await getSalonByOwnerOrThrow(ownerId);
  if (input.salonId !== salon.id) {
    throw ForbiddenError("Faqat o'z salonizga xizmat qo'sha olasiz");
  }

  const [service] = await db.insert(services).values(input).returning();
  return service;
}

export async function updateService(
  ownerId: string,
  serviceId: string,
  input: UpdateServiceInput
): Promise<Service> {
  const service = await getServiceOrThrow(serviceId);
  await assertOwnsService(ownerId, service);

  const [updated] = await db
    .update(services)
    .set(input)
    .where(eq(services.id, serviceId))
    .returning();

  if (!updated) throw new AppError("Xizmatni yangilab bo'lmadi", 500);
  return updated;
}

export async function deleteService(ownerId: string, serviceId: string): Promise<void> {
  const service = await getServiceOrThrow(serviceId);
  await assertOwnsService(ownerId, service);

  await db.delete(services).where(eq(services.id, serviceId));
}
