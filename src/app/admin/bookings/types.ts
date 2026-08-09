export interface DetailedBookingRow {
  id: string;
  bookingId: string;
  customer: {
    name: string;
    email: string;
    avatarUrl?: string; // Если аватара нет, сгенерируем инициалы
  };
  service: {
    name: string;
    studio: string;
    staff: string;
  };
  dateTime: {
    day: string;
    time: string;
    duration: string;
  };
  amount: number;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
}

export const bookingsTableData: DetailedBookingRow[] = [
  {
    id: "1",
    bookingId: "#BK-9024",
    customer: {
      name: "Emma Richardson",
      email: "emma.r@example.com",
      avatarUrl: "https://unsplash.com"
    },
    service: {
      name: "Balayage & Cut",
      studio: "Luxe Studio",
      staff: "Stylist: Sarah"
    },
    dateTime: {
      day: "Today",
      time: "2:30 PM",
      duration: "(2h)"
    },
    amount: 240,
    status: "CONFIRMED"
  },
  {
    id: "2",
    bookingId: "#BK-9023",
    customer: {
      name: "Marcus Johnson",
      email: "marcus.j@example.com"
      // Без аватара — проверим отображение инициалов "MJ"
    },
    service: {
      name: "Deep Tissue Massage",
      studio: "Zen Spa",
      staff: "Therapist: David"
    },
    dateTime: {
      day: "Today",
      time: "4:00 PM",
      duration: "(1h)"
    },
    amount: 120,
    status: "PENDING"
  },
  {
    id: "3",
    bookingId: "#BK-9020",
    customer: {
      name: "Sophia Martinez",
      email: "s.martinez@example.com",
      avatarUrl: "https://unsplash.com"
    },
    service: {
      name: "Signature Facial",
      studio: "Glow Beauty Bar",
      staff: "Esthetician: Chloe"
    },
    dateTime: {
      day: "Today",
      time: "11:00 AM",
      duration: "(1h)"
    },
    amount: 150,
    status: "CANCELLED"
  }
];
