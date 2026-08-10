export interface UserRecord {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'Client' | 'Specialist' | 'Owner' | string;
  status: 'Active' | 'Blocked' | string;
  joinedDate: string;
}

export const usersData: UserRecord[] = [
  {
    id: "1",
    name: "Eleanor Pena",
    email: "eleanor.pena@example.com",
    avatarUrl: "https://unsplash.com",
    role: "Client",
    status: "Active",
    joinedDate: "Oct 24, 2023"
  },
  {
    id: "2",
    name: "Cameron Williamson",
    email: "cameron.w@example.com",
    avatarUrl: "https://unsplash.com",
    role: "Specialist",
    status: "Active",
    joinedDate: "Sep 12, 2023"
  },
  {
    id: "3",
    name: "Wade Warren",
    email: "wade.warren@example.com",
    // Без аватара — отобразится стандартная иконка пользователя
    role: "Client",
    status: "Blocked",
    joinedDate: "Aug 05, 2023"
  },
  {
    id: "4",
    name: "Dianne Russell",
    email: "dianne.r@example.com",
    avatarUrl: "https://unsplash.com",
    role: "Owner",
    status: "Active",
    joinedDate: "Jan 15, 2023"
  }
];
