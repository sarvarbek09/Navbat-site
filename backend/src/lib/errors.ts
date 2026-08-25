// Servis qatlamida (modules/*/​*.service.ts) xatolik bo'lsa, oddiy `throw new Error(...)`
// o'rniga shuni tashlang — statusCode HTTP javobiga to'g'ridan-to'g'ri ko'chadi.
// Qarang: ../middleware/error-handler.middleware.ts shuni ushlab, JSON javob qaytaradi.
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

// Tez-tez ishlatiladigan holatlar uchun qisqa yordamchilar:
export const NotFoundError = (message: string) => new AppError(message, 404);
export const ForbiddenError = (message: string) => new AppError(message, 403);
export const UnauthorizedError = (message: string) => new AppError(message, 401);
export const ValidationError = (message: string) => new AppError(message, 400);
