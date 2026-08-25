export interface ChartDataPoint {
  date: string;
  totalGmv: number;
  platformRevenue: number;
}

export interface PayoutItem {
  id: string;
  studioName: string;
  statusText: string; // Например, "Due in 2 days", "Processing"
  amount: number;
  statusType: 'pending' | 'urgent' | 'processing';
  statusLabel: string;
  imageUrl?: string; // Если нет картинки, отобразим иконку-заглушку
}

export const revenueChartData: ChartDataPoint[] = [
  { date: "Oct 1", totalGmv: 12000, platformRevenue: 2000 },
  { date: "Oct 5", totalGmv: 19000, platformRevenue: 3000 },
  { date: "Oct 10", totalGmv: 15000, platformRevenue: 2500 },
  { date: "Oct 15", totalGmv: 22000, platformRevenue: 3800 },
  { date: "Oct 20", totalGmv: 18000, platformRevenue: 3200 },
  { date: "Oct 25", totalGmv: 25000, platformRevenue: 4200 },
  { date: "Oct 30", totalGmv: 28000, platformRevenue: 4800 },
];

export const payoutQueueData: PayoutItem[] = [
  {
    id: "1",
    studioName: "Luxe Hair Studio",
    statusText: "Due in 2 days",
    amount: 3240,
    statusType: "pending",
    statusLabel: "Pending",
    imageUrl: "https://unsplash.com"
  },
  {
    id: "2",
    studioName: "Zenith Nail Bar",
    statusText: "Due today",
    amount: 1850,
    statusType: "urgent",
    statusLabel: "Urgent",
    imageUrl: "https://unsplash.com"
  },
  {
    id: "3",
    studioName: "Glow Aesthetics",
    statusText: "Processing",
    amount: 4120,
    statusType: "processing",
    statusLabel: "Processing",
    // Без картинки — отобразит фиолетовый лотос/иконку из макета
  }
];
