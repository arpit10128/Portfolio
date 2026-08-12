import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { create } from "zustand";
import {
  persist,
  createJSONStorage,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
// immer middleware lets us write mutating code in our setters while actually it keeps state immutable under the hook

const useWindowStore = create(
  persist(
    immer((set) => ({
      windows: WINDOW_CONFIG,
      nextZIndex: INITIAL_Z_INDEX + 1,

      openWindow: (windowKey, data = null) =>
        set((state) => {
          const win = state.windows[windowKey];
          if (!win) return;
          win.isOpen = true;
          win.zIndex = state.nextZIndex;
          win.data = data ?? win.data;
          state.nextZIndex++;
        }),

      closeWindow: (windowKey) =>
        set((state) => {
          const win = state.windows[windowKey];
          if (!win) return;
          win.isOpen = false;
          win.zIndex = INITIAL_Z_INDEX;
          win.data = null;
        }),

      focusWindow: (windowKey) =>
        set((state) => {
          const win = state.windows[windowKey];
          if (!win) return;
          win.zIndex = state.nextZIndex++;
        }),
    })),
    {
      name: "window-state",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        windows: state.windows,
        nextZIndex: state.nextZIndex,
      }),
    },
  ),
);

export default useWindowStore;
