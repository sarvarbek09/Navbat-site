"use client";
import { DateRangePicker } from "@/components/admin/date-range-picker";
import TotalReports from "./components/total-reports";
import { CustomUserTable } from "./components/users-table";
import { CustomBookingsTable } from "./components/bookings-table";
import { ReportsMetrics } from "./components/reports-metrics";


export interface TableRowData {
  id: string;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  email: string;
  status: {
    label: string;
    type: 'active' | 'system' | 'away' | string;
  };
  lastActivity: string;
}

export interface BookingItem {
  id: string;
  studioName: string;
  location: string;
  submittedTime: string; // Например, "2 soat oldin yuborilgan"
  imageUrl: string;
}

const usersData: TableRowData[] = [
  {
    id: "1",
    user: {
      name: "Marcus Thorne",
      role: "Salon\nEgasi",
      avatar: "https://unsplash.com" // Замените на реальный путь
    },
    email: "m.thorne@glam.com",
    status: {
      label: "Faol",
      type: "active" // Для удобной стилизации цветом (зеленый)
    },
    lastActivity: "2 soat oldin"
  },
  {
    id: "2",
    user: {
      name: "Elena Rodriguez",
      role: "Mutaxassis",
      avatar: "https://unsplash.com"
    },
    email: "elena.rod@styles.co",
    status: {
      label: "Faol",
      type: "active" // Зеленый
    },
    lastActivity: "5 daqiqha oldin"
  },
  {
    id: "3",
    user: {
      name: "Julian Vane",
      role: "Admin",
      avatar: "https://unsplash.com"
    },
    email: "j.vane@salonflow.com",
    status: {
      label: "Tizim",
      type: "system" // Синий/Фиолетовый
    },
    lastActivity: "Onlayn"
  },
  {
    id: "4",
    user: {
      name: "Sarah Jenkins",
      role: "Xizmat\nKo'rsatuvchi",
      avatar: "https://unsplash.com"
    },
    email: "s.jenkins@wellness.uk",
    status: {
      label: "Uzoqda",
      type: "away" // Желтый/Оранжевый
    },
    lastActivity: "1 kun oldin"
  }
];
const bookingsData: BookingItem[] = [
  {
    id: "1",
    studioName: "Lumière Hair Studio",
    location: "London, UK",
    submittedTime: "2 soat oldin\nyuborilgan",
    imageUrl: "https://unsplash.com"
  },
  {
    id: "2",
    studioName: "Zenith Wellness Spa",
    location: "New York, US",
    submittedTime: "5 soat oldin\nyuborilgan",
    imageUrl: "https://unsplash.com"
  },
  {
    id: "3",
    studioName: "The Velvet Blade",
    location: "Berlin, DE",
    submittedTime: "12 soat oldin\nyuborilgan",
    imageUrl: "https://unsplash.com"
  }
];


export default function AdminReports() {
  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold">Asosiy Panel Xulosasi</h1>
            <p className="text-sm text-muted-foreground">
              Xush kelibsiz. Bugun SalonFlow tizimida nimalar sodir bo'lmoqda.
            </p>
          </div>
          <div className="space-x-2">
            <DateRangePicker />
          </div>
        </div>

        <div>
          <TotalReports />
        </div>

        <div className="flex gap-16 relative">

          <div className="flex flex-col gap-6 w-full">
            <div className="border border-accent rounded-md  h-fit">
              <CustomUserTable data={usersData} />
            </div>
            <div>
              <ReportsMetrics />
            </div>
          </div>

          <div className="border border-accent rounded-md w-1/3 h-fit">
            <CustomBookingsTable data={bookingsData} />
          </div>

        </div>



      </div>
    </>
  );
}
