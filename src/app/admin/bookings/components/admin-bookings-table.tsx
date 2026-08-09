"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";

import { DetailedBookingRow } from '../types'; // Импортируйте интерфейс данных

interface AdvancedBookingsTableProps {
  data: DetailedBookingRow[];
}

// Маппинг стилей под статусы из макета
const statusBadgeStyles: Record<DetailedBookingRow['status'], string> = {
  CONFIRMED: 'bg-emerald-50 text-emerald-600 border-emerald-100 text-[10px]',
  PENDING: 'bg-amber-50 text-amber-500 border-amber-100 text-[10px]',
  CANCELLED: 'bg-red-50 text-red-400 border-red-100 text-[10px]',
};

// Функция генерации заглушки-инициалов, если у клиента нет фото аватара
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export function AdvancedBookingsTable({ data }: AdvancedBookingsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalEntries = 142; // Общее количество записей для текста в футере

  return (
    <div className="w-full bg-white border border-accent rounded-md overflow-hidden">
      
      {/* Шапка таблицы (Table Header) */}
      <div className="flex items-center justify-between bg-violet-50/40 border-b border-gray-100 px-6 py-3.5 text-[11px] font-extrabold text-slate-400 tracking-wider uppercase">
        <div className="w-[120px] shrink-0">Booking ID</div>
        <div className="w-[240px] shrink-0 px-2">Customer</div>
        <div className="flex-1 px-4">Service Details</div>
        <div className="w-[160px] shrink-0 px-4">Date & Time</div>
        <div className="w-[100px] shrink-0 text-right px-4">Amount</div>
        <div className="w-[120px] shrink-0 text-right">Status</div>
      </div>

      {/* Строки таблицы (Table Body) */}
      <div className="divide-y divide-gray-100">
        {data.map((row) => (
          <div 
            key={row.id} 
            className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/20 transition-colors"
          >
            {/* 1. Блок ID заказа */}
            <div className="w-[120px] shrink-0 font-medium text-gray-400 text-sm">
              {row.bookingId}
            </div>

            {/* 2. Блок Клиента (Аватар или Заглушка + Текст) */}
            <div className="w-[240px] shrink-0 flex items-center gap-3 px-2">
              {row.customer.avatarUrl ? (
                <img 
                  src={row.customer.avatarUrl} 
                  alt={row.customer.name} 
                  className="h-9 w-9 rounded-full object-cover bg-gray-50 border border-gray-100"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {getInitials(row.customer.name)}
                </div>
              )}
              <div className="flex flex-col truncate">
                <span className="font-semibold text-gray-800 text-sm leading-tight">{row.customer.name}</span>
                <span className="text-xs text-gray-400 font-medium mt-0.5">{row.customer.email}</span>
              </div>
            </div>

            {/* 3. Блок Деталей Сервиса */}
            <div className="flex-1 flex flex-col justify-center px-4 truncate">
              <span className="font-bold text-gray-800 text-sm leading-tight">{row.service.name}</span>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mt-0.5">
                <span>{row.service.studio}</span>
                <span className="text-gray-300">•</span>
                <span>{row.service.staff}</span>
              </div>
            </div>

            {/* 4. Блок Даты и Времени */}
            <div className="w-[160px] shrink-0 flex flex-col justify-center px-4">
              <span className="font-semibold text-gray-800 text-sm leading-tight">{row.dateTime.day}</span>
              <div className="flex items-center gap-1 text-xs text-gray-400 font-medium mt-0.5">
                <span>{row.dateTime.time}</span>
                <span className="text-gray-400 font-normal">{row.dateTime.duration}</span>
              </div>
            </div>

            {/* 5. Блок Суммы (Правое выравнивание) */}
            <div className="w-[100px] shrink-0 text-right font-extrabold text-gray-900 text-sm px-4">
              ${row.amount}
            </div>

            {/* 6. Блок Статуса (Правое выравнивание) */}
            <div className="w-[120px] shrink-0 flex justify-end">
              <span className={`inline-flex items-center justify-center px-2.5 py-0.5 font-black tracking-wide rounded-md border ${statusBadgeStyles[row.status]}`}>
                {row.status}
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Пагинация в подвале (Table Footer) */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
        {/* Текст отображения страниц слева */}
        <div className="text-sm font-medium text-slate-400">
          Showing 1 to {data.length} of {totalEntries} entries
        </div>

        {/* Навигационные кнопки пагинации */}
        <div>
          <Pagination>
            <PaginationContent className="gap-1">
              
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-gray-200"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-3.5 w-3.5 text-gray-500" />
                </Button>
              </PaginationItem>

              {[1, 2, 3].map((pageNumber) => {
                const isActive = currentPage === pageNumber;
                return (
                  <PaginationItem key={pageNumber}>
                    <Button
                      variant={isActive ? "default" : "outline"}
                      className={`h-8 w-8 font-bold text-xs p-0 border-gray-200 ${
                        isActive 
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white border-transparent" 
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-gray-200"
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
                </Button>
              </PaginationItem>

            </PaginationContent>
          </Pagination>
        </div>
      </div>

    </div>
  );
}
