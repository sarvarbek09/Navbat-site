export interface TransactionRow {
  id: string;
  transactionId: string;
  dateTime: string;
  salonName: string;
  amount: number; // Числовое значение для расчетов
  status: 'Completed' | 'Processing' | 'Failed';
}

export const transactionsData: TransactionRow[] = [
  {
    id: "1",
    transactionId: "TXN-89241",
    dateTime: "Oct 24, 14:30",
    salonName: "Luxe Hair Studio",
    amount: 150.00,
    status: "Completed"
  },
  {
    id: "2",
    transactionId: "TXN-89240",
    dateTime: "Oct 24, 13:15",
    salonName: "Zenith Nail Bar",
    amount: 85.00,
    status: "Completed"
  },
  {
    id: "3",
    transactionId: "TXN-89239",
    dateTime: "Oct 24, 11:45",
    salonName: "Glow Aesthetics",
    amount: 320.00,
    status: "Processing"
  },
  {
    id: "4",
    transactionId: "TXN-89238",
    dateTime: "Oct 24, 09:20",
    salonName: "Urban Cuts",
    amount: 45.00,
    status: "Failed"
  }
];
