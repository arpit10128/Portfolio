import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
//immer middleware let's us write mutating code in our setters while actually it keeps state immutable under the hook

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),

    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        win.zIndex = state.nextZIndex++;
      }),

    minWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];

        win.isMinimized = true;
      }),

    maxWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];

        win.isMinimized = false;
        win.zIndex = state.nextZIndex++;
      }),
  })),
);

export default useWindowStore;
