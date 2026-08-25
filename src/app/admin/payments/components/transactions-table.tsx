"use client";

import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { TransactionRow } from '../lib/transactions-data';

interface RecentTransactionsTableProps {
  data: TransactionRow[];
}

// Конфигурация стилей для статусов транзакций
const statusStyles: Record<TransactionRow['status'], string> = {
  Completed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  Processing: 'bg-purple-50 text-purple-600 border-purple-100',
  Failed: 'bg-red-50 text-red-500 border-red-100',
};

export function RecentTransactionsTable({ data }: RecentTransactionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalEntries = 2451; // Общее количество записей из макета

  return (
    <Card className="w-full bg-white border border-accent rounded-md py-4 px-3">
      
      {/* Заголовок таблицы с кнопкой фильтра */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5 px-6">
        <CardTitle className="text-xl font-bold text-gray-900 tracking-tight">
          Recent Transactions
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {/* Шапка таблицы (Table Header) */}
        <div className="flex items-center justify-between bg-violet-50/40 border-b border-gray-100 px-6 py-3.5 text-[11px] font-extrabold text-slate-400 tracking-wider uppercase">
          <div className="w-[140px] shrink-0">Transaction ID</div>
          <div className="w-[160px] shrink-0 px-2">Date & Time</div>
          <div className="flex-1 px-4">Salon</div>
          <div className="w-[120px] shrink-0 px-4 font-bold">Amount</div>
          <div className="w-[120px] shrink-0 px-4 font-bold">Fee (15%)</div>
          <div className="w-[120px] shrink-0 text-left pl-4">Status</div>
        </div>

        {/* Строки таблицы (Table Body) */}
        <div className="divide-y divide-gray-100">
          {data.map((row) => {
            // Динамический расчет 15% комиссии прямо на фронтенде
            const feeAmount = row.amount * 0.15;

            return (
              <div 
                key={row.id} 
                className="flex items-center justify-between px-6 py-4.5 hover:bg-slate-50/20 transition-colors"
              >
                {/* 1. ID транзакции */}
                <div className="w-[140px] shrink-0 font-medium text-gray-400 text-sm">
                  {row.transactionId}
                </div>

                {/* 2. Дата и время */}
                <div className="w-[160px] shrink-0 text-gray-800 text-sm font-medium px-2">
                  {row.dateTime}
                </div>

                {/* 3. Название салона */}
                <div className="flex-1 text-gray-800 text-sm font-bold px-4 truncate">
                  {row.salonName}
                </div>

                {/* 4. Основная сумма */}
                <div className="w-[120px] shrink-0 font-extrabold text-gray-900 text-sm px-4">
                  ${row.amount.toFixed(2)}
                </div>

                {/* 5. Рассчитанная комиссия платформы (выделена синим цветом) */}
                <div className="w-[120px] shrink-0 font-bold text-indigo-600 text-sm px-4">
                  ${feeAmount.toFixed(2)}
                </div>

                {/* 6. Бадж статуса */}
                <div className="w-[120px] shrink-0 flex justify-start pl-4">
                  <span className={`inline-flex items-center justify-center px-3 py-0.5 text-xs font-semibold rounded-full border ${statusStyles[row.status]}`}>
                    {row.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Подвал таблицы (Table Footer) */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white mt-2">
          {/* Инфо-текст слева */}
          <div className="text-sm font-medium text-slate-400">
            Showing 1 to {data.length} of {totalEntries.toLocaleString('en-US')} entries
          </div>

          {/* Пагинация в стиле макета (Prev, 1, 2, 3, Next) */}
          <div>
            <Pagination>
              <PaginationContent className="gap-1.5">
                
                {/* Кнопка копки назад (Prev) */}
                <PaginationItem>
                  <Button
                    variant="outline"
                    className="h-8 px-3 font-semibold text-xs border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </Button>
                </PaginationItem>

                {/* Цифровые страницы */}
                {[1, 2, 3].map((pageNumber) => {
                  const isActive = currentPage === pageNumber;
                  return (
                    <PaginationItem key={pageNumber}>
                      <Button
                        variant={isActive ? "default" : "outline"}
                        className={`h-8 w-8 font-bold text-xs p-0 border-gray-200 rounded-lg ${
                          isActive 
                            ? "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100/50" 
                            : "text-gray-700 hover:bg-gray-50 bg-white"
                        }`}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    </PaginationItem>
                  );
                })}

                {/* Кнопка вперед (Next) */}
                <PaginationItem>
                  <Button
                    variant="outline"
                    className="h-8 px-3 font-semibold text-xs border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </PaginationItem>

              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </CardContent>

    </Card>
  );
}
