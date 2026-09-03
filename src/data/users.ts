import { User } from '@/types/pos';

export const DEMO_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Sajood Ali',
    role: 'Store Manager',
    email: 'sajood@shoeshop.pos',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    terminalId: 'POS-TERM-01',
  },
  {
    id: 'user-2',
    name: 'Emma Watson',
    role: 'Cashier',
    email: 'emma.cashier@shoeshop.pos',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    terminalId: 'POS-TERM-02',
  },
  {
    id: 'user-3',
    name: 'Alex Rivera',
    role: 'Admin',
    email: 'admin@shoeshop.pos',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    terminalId: 'POS-ADMIN-HQ',
  },
];
