import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface BookingItem {
  id: string;
  studioName: string;
  location: string;
  submittedTime: string;
  imageUrl: string;
}

interface CustomBookingsTableProps {
  data: BookingItem[];
}

export function CustomBookingsTable({ data }: CustomBookingsTableProps) {
  return (
    <div className="w-full flex flex-col bg-slate-50/40 ">
      
      {/* Шапка панели */}
      <div className="flex items-center justify-between p-6 pb-4 bg-white rounded-t-md">
        <h2 className="text-xl font-semibold">
          Tasdiqlash Navbati
        </h2>
        {/* Бадж-счетчик в стиле вашего дизайна */}
        <span className="inline-flex flex-col items-center justify-center px-3.5 py-1 text-center text-xs font-bold rounded-full bg-red-50 text-red-600 border border-red-100">
          <span className="text-[10px] uppercase tracking-wider font-extrabold leading-none">4 <span className="text-[9px] font-medium leading-none mt-0.5">Kutilmoqda</span></span>
        </span>
      </div>

      {/* Список карточек-заявок */}
      <div className="flex-1 my-3 px-6 space-y-4 overflow-y-auto">
        {data.map((item) => (
          <div 
            key={item.id} 
            className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col gap-4"
          >
            {/* Верхний блок: Инфо о студии */}
            <div className="flex gap-4">
              <img 
                src={item.imageUrl} 
                alt={item.studioName} 
                className="h-16 w-16 rounded-xl object-cover border border-gray-100 bg-gray-50 shrink-0"
              />
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-gray-900 text-sm leading-snug">{item.studioName}</h3>
                <p className="text-xs font-medium text-gray-400 mt-0.5">{item.location}</p>
                <p className="text-[11px] text-gray-400 font-normal mt-1 whitespace-pre-line leading-tight">
                  {item.submittedTime}
                </p>
              </div>
            </div>

            {/* Нижний блок: Кнопки действий */}
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 h-9 rounded-lg transition-colors"
                onClick={() => console.log(`Approved: ${item.id}`)}
              >
                Tasdiqlash
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-gray-200 text-gray-800 font-bold text-xs py-2 h-9 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => console.log(`Reviewing: ${item.id}`)}
              >
                Ko'rib chiqish
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Нижняя кнопка "Смотреть все" */}
      <div className="p-6 bg-white border-t border-gray-100 mt-auto rounded-b-md">
        <Button 
          variant="secondary" 
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 h-10 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          Barcha Arizalarni Ko'rish
          <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
        </Button>
      </div>

    </div>
  );
}
