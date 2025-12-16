import { create } from 'zustand';

export interface MenuItem {
  id: string;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

interface ContextMenuState {
  isOpen: boolean;
  position: { x: number; y: number };
  items: MenuItem[];
  selectedItemId: string | null;
  openMenu: (x: number, y: number, items: MenuItem[], itemId?: string) => void;
  closeMenu: () => void;
}

export const useContextMenuStore = create<ContextMenuState>((set) => ({
  isOpen: false,
  position: { x: 0, y: 0 },
  items: [],
  selectedItemId: null,
  openMenu: (x, y, items, itemId) => set({ isOpen: true, position: { x, y }, items, selectedItemId: itemId || null }),
  closeMenu: () => set({ isOpen: false, position: { x: 0, y: 0 }, items: [], selectedItemId: null }),
}));

