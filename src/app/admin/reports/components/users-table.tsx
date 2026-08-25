'use client'
import React, { useState } from 'react';
import { Pencil, MoreVertical, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Импортируем компоненты пагинации из shadcn
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { TableRowData } from '../page';



interface UserTableProps {
  data: TableRowData[];
}

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  system: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  away: 'bg-amber-50 text-amber-600 border-amber-100',
};

export function CustomUserTable({ data }: UserTableProps) {
  // Инициализируем состояние текущей страницы
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Количество строк на одной странице

  // Рассчитываем индексы для среза данных
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Обрезаем исходный массив данных для рендера только текущей страницы
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Общее количество страниц
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Статичное значение для текста из вашего дизайна (или замените на data.length)
  const totalItemsCount = 2450;

  return (
    <div >
      <div className="border-b border-accent flex justify-between items-center p-6"><h2 className="text-2xl font-semibold">So'nggi Faoliyatlar</h2><Button variant={"outline"}><Filter /> Filter</Button></div>
      {/* Шапка таблицы (Header) */}
      <div className="flex items-center justify-between bg-(--sidebar-admin) border-b border-accent px-6 py-3.5 text-xs font-semibold text-slate-400 tracking-wider uppercase">
        <div className="w-62.5 shrink-0">Foydalanuvchi & Rol</div>
        <div className="flex-1 px-4">Email</div>
        <div className="w-30 shrink-0 px-4">Holat</div>
        <div className="w-30 shrink-0 px-4">So'nggi Faoliyat</div>
        <div className="w-20 shrink-0 text-right">Amallar</div>
      </div>

      {/* Тело таблицы (Rows) с отрендеренными срезанными данными */}
      <div className="divide-y bg-white">
        {currentItems.map((row) => {
          const currentStatusClass = statusStyles[row.status.type] || 'bg-gray-50 text-gray-600 border-gray-100';

          return (
            <div
              key={row.id}
              className="flex items-center justify-between px-6 py-5 hover:bg-slate-50/30 transition-colors"
            >
              {/* Блок Профиля (Аватар + Имя + Роль) */}
              <div className="flex items-center gap-3 w-62.5 shrink-0">
                <img
                  src={row.user.avatar}
                  alt={row.user.name}
                  className="h-10 w-10 rounded-full object-cover border border-gray-100 bg-gray-50"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 text-sm leading-tight">{row.user.name}</span>
                  <span className="text-xs text-gray-400 font-medium mt-1 whitespace-pre-line leading-normal">
                    {row.user.role}
                  </span>
                </div>
              </div>

              {/* Блок Email */}
              <div className="flex-1 text-sm text-gray-500 font-normal px-4 truncate">
                {row.email}
              </div>

              {/* Блок Статуса (Badge) */}
              <div className="w-30 shrink-0 flex justify-start px-4">
                <span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full border ${currentStatusClass}`}>
                  {row.status.label}
                </span>
              </div>

              {/* Время последней активности */}
              <div className="w-30 shrink-0 text-sm text-gray-500 font-normal px-4">
                {row.lastActivity}
              </div>

              {/* Кнопки действий */}
              <div className="flex items-center justify-end gap-1 w-20 shrink-0 text-gray-400">
                <Button variant={"ghost"} className="p-1.5 h-8 w-8">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant={"ghost"} className="p-1.5 h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Подвал таблицы с пагинацией (Footer) */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-(--sidebar-admin) rounded-b-md">
        {/* Информационный текст слева */}
        <div className="text-sm font-medium text-slate-500">
          {totalItemsCount.toLocaleString('fr-FR')} tadan {currentItems.length} tasi ko'rsatilmoqda
        </div>

        {/* Навигация shadcn справа */}
        <div className="flex items-center">
          <Pagination>
            <PaginationContent className="gap-1">

              {/* Стрелка Назад */}
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-gray-200"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                </Button>
              </PaginationItem>

              {/* Кнопки страниц (соответствуют дизайну 1, 2, 3) */}
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                const pageNumber = i + 1;
                const isActive = currentPage === pageNumber;
                return (
                  <PaginationItem key={pageNumber}>
                    <Button
                      variant={isActive ? "default" : "outline"}
                      className={`h-9 w-9 font-medium text-sm p-0 border-gray-200 ${isActive
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

              {/* Стрелка Вперед */}
              <PaginationItem>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-gray-200"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </Button>
              </PaginationItem>

            </PaginationContent>
          </Pagination>
        </div>
      </div>

    </div>
  );
}
