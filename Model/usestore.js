import { create } from "zustand";

const useLoadingStore = create((set) => ({
  loading: true,
  setLoading: (isLoading) => set({ loading: isLoading }),
}));

export default useLoadingStore;
