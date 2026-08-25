import React from "react";
import { Server, CreditCard } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export function ReportsMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      
      {/* 1. Блок: Tizim Holati (Статус системы) */}
      <div className="bg-white border border-accent rounded-md p-6 flex flex-col gap-8">
        {/* Заголовок */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <Server className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg tracking-tight">Tizim Holati</h3>
        </div>

        {/* Метрики */}
        <div className="space-y-5">
          {/* API Javob Vaqti */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-500 font-normal">API Javob Vaqti</span>
              <span className="text-emerald-500 font-bold">42ms</span>
            </div>
            {/* Шкала прогресса (зеленая) */}
            <Progress 
              value={92} 
              className="h-2 bg-slate-100 [&>div]:bg-emerald-500" 
            />
          </div>

          {/* Ma'lumotlar Bazasi Yuku */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-500 font-normal">Ma'lumotlar Bazasi Yuku</span>
              <span className="text-amber-500 font-bold">28%</span>
            </div>
            {/* Шкала прогресса (оранжевая) */}
            <Progress 
              value={28} 
              className="h-2 bg-slate-100 [&>div]:bg-amber-500" 
            />
          </div>
        </div>
      </div>

      {/* 2. Блок: To'lovlar Hisoboti (Отчет по платежам) */}
      <div className="bg-white border border-accent rounded-md p-6 flex flex-col min-h-[220px]">
        {/* Заголовок */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <CreditCard className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg tracking-tight">To'lovlar Hisoboti</h3>
        </div>

        {/* Списки транзакций */}
        <div className="space-y-3 flex-1">
          {/* Успешные переводы */}
          <div className="flex items-center justify-between p-3.5 bg-violet-50/40 border border-violet-50/60 rounded-xl">
            <span className="text-xs font-semibold text-slate-700 leading-tight max-w-40">
              Muvaffaqiyatli O'tkazmalar
            </span>
            <span className="font-bold text-gray-900 text-sm tracking-tight">14,209</span>
          </div>

          {/* Запросы на возврат */}
          <div className="flex items-center justify-between p-3.5 bg-violet-50/40 border border-violet-50/60 rounded-xl">
            <span className="text-xs font-semibold text-slate-700 leading-tight">
              Qaytarish So'rovlari
            </span>
            <span className="font-bold text-red-600 text-sm tracking-tight">12</span>
          </div>
        </div>

        {/* Кнопка "Подробнее" внизу */}
        <Link href='/admin/reports/payment' className="w-full text-center text-indigo-600 hover:text-indigo-700 font-bold text-xs pt-4 transition-colors mt-auto">
          Batafsil Hisobotni Ko'rish
        </Link>
      </div>

    </div>
  );
}
