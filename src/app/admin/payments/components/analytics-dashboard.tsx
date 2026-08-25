"use client";

import React from 'react';
import { ChevronDown, Flower, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { revenueChartData, payoutQueueData, PayoutItem } from '../lib/dashboard-data';

// Стилизация баджей для очереди выплат
const payoutStatusStyles: Record<PayoutItem['statusType'], string> = {
  pending: 'bg-purple-50 text-purple-500 border-purple-100',
  urgent: 'bg-red-50 text-red-500 border-red-100',
  processing: 'bg-emerald-50 text-emerald-500 border-emerald-100',
};

export function AnalyticsDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full p-1 bg-slate-50/20">
      
      {/* ============================================================ */}
      {/* КОМПОНЕНТ 1: REVENUE TRENDS (ГРАФИК)                         */}
      {/* ============================================================ */}
      <Card className="lg:col-span-2 bg-white border border-accent rounded-md py-4 px-3 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold text-gray-900 tracking-tight">
            Revenue Trends
          </CardTitle>
          
          {/* Селектор периода времени */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs font-semibold text-gray-600 border-gray-200 rounded-xl px-3 h-9">
                Last 30 Days
                <ChevronDown className="ml-1.5 h-3.5 w-3.5 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </CardHeader>

        {/* Кастомная легенда графика */}
        <div className="flex justify-end items-center gap-4 px-6 text-xs font-bold text-slate-400 mt-1">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full border-2 border-indigo-600 bg-white" />
            Total GMV
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full border-2 border-indigo-400 border-dashed bg-white" />
            Platform Revenue
          </div>
        </div>

        {/* Область графика Recharts */}
        <CardContent className="flex-1 min-h-[300px] pt-6 pl-0 pr-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                {/* Градиент заливки для верхней сплошной линии */}
                <linearGradient id="colorGmv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f1f5f9" strokeWidth={1.5} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                tickFormatter={(value) => `$${value / 1000}k`}
                domain={[0, 30000]}
                ticks={[0, 5000, 10000, 15000, 20000, 25000, 30000]}
              />
              <Tooltip formatter={(value) => [`$${value}`, '']} />
              
              {/* Область 1: Total GMV (Сплошная линия с заливкой) */}
              <Area 
                type="monotone" 
                dataKey="totalGmv" 
                stroke="#4f46e5" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorGmv)"
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, fill: '#4f46e5' }}
                dot={{ r: 4, stroke: '#4f46e5', strokeWidth: 2, fill: '#fff' }}
              />
              
              {/* Область 2: Platform Revenue (Пунктирная вспомогательная линия) */}
              <Area 
                type="monotone" 
                dataKey="platformRevenue" 
                stroke="#4f46e5" 
                strokeWidth={2}
                strokeDasharray="4 4"
                fill="none"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ============================================================ */}
      {/* КОМПОНЕНТ 2: PAYOUT QUEUE (СПИСОК ОЧЕРЕДИ)                   */}
      {/* ============================================================ */}
      <Card className="bg-white border border-accent rounded-md py-4 px-3 flex flex-col justify-between">
        <div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle className="text-xl font-bold text-gray-900 tracking-tight">
              Payout Queue
            </CardTitle>
            <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              View All
            </button>
          </CardHeader>

          {/* Список элементов очереди */}
          <CardContent className="space-y-5">
            {payoutQueueData.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                
                {/* Левая сторона: Аватар + Описание */}
                <div className="flex items-center gap-3">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.studioName} 
                      className="h-11 w-11 rounded-full object-cover border border-gray-100 bg-gray-50"
                    />
                  ) : (
                    // Заглушка для спа/салона эстетики с иконкой
                    <div className="h-11 w-11 rounded-full bg-violet-50 text-indigo-600 border border-violet-100 flex items-center justify-center">
                      <Flower className="h-5 w-5" strokeWidth={2} />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-sm leading-tight">{item.studioName}</span>
                    <span className="text-xs font-medium text-gray-400 mt-0.5">{item.statusText}</span>
                  </div>
                </div>

                {/* Правая сторона: Сумма + Статус */}
                <div className="flex flex-col items-end gap-1">
                  <span className="font-extrabold text-gray-900 text-sm">
                    ${item.amount.toLocaleString('en-US')}
                  </span>
                  <span className={`inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-md border ${payoutStatusStyles[item.statusType]}`}>
                    {item.statusLabel}
                  </span>
                </div>

              </div>
            ))}
          </CardContent>
        </div>

        {/* Нижняя кнопка управления очередью */}
        <div className="px-6 pb-4 pt-2">
          <Button 
            variant="outline" 
            className="w-full border-gray-200 text-gray-800 font-bold text-xs py-2.5 h-10 rounded-xl hover:bg-gray-50/50 transition-colors"
          >
            Manage Queue
          </Button>
        </div>
      </Card>

    </div>
  );
}
