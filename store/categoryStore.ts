import { create } from 'zustand';

interface CategoryStore {
  selectedCategory: string | null;
  setCategory: (category: string) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategory: null,
  setCategory: (category) => set({ selectedCategory: category }),
}));
