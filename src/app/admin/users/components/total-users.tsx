import React from 'react';
import { Users, UserPlus, Flame, TrendingUp } from 'lucide-react';

export function TotalUsers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      
      {/* Карточка 1: Total Users */}
      <div className="bg-white border border-accent rounded-md p-6 flex flex-col justify-between min-h-40">
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-full bg-indigo-50 text-indigo-600">
            <Users className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50/60 text-indigo-600">
            <TrendingUp className="h-3 w-3" strokeWidth={3} />
            +12%
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
            12,450
          </span>
          <span className="text-xs font-semibold text-gray-400 mt-1">
            Total Users
          </span>
        </div>
      </div>

      {/* Карточка 2: New This Month */}
      <div className="bg-white border border-accent rounded-md p-6 flex flex-col justify-between min-h-40">
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-full bg-indigo-50 text-indigo-600">
            <UserPlus className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50/60 text-indigo-600">
            <TrendingUp className="h-3 w-3" strokeWidth={3} />
            +5%
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
            342
          </span>
          <span className="text-xs font-semibold text-gray-400 mt-1">
            New This Month
          </span>
        </div>
      </div>

      {/* Карточка 3: Active Today */}
      <div className="bg-white border border-accent rounded-md p-6 flex flex-col justify-between min-h-40">
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-full bg-orange-50 text-orange-600">
            <Flame className="h-5 w-5" strokeWidth={2.5} />
          </div>
          {/* Тренд отсутствует на макете для этой карточки */}
        </div>
        <div className="mt-4 flex flex-col">
          <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
            1,890
          </span>
          <span className="text-xs font-semibold text-gray-400 mt-1">
            Active Today
          </span>
        </div>
      </div>

    </div>
  );
}
