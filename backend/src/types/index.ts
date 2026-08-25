// Modullar orasida bo'lishiladigan umumiy tiplar shu yerda turadi.

/** Sessiyadagi (cookie orqali autentifikatsiya qilingan) foydalanuvchi shakli */
export type SessionUser = {
  id: string;
  name: string;
  phone: string;
  role: "client" | "owner";
};
