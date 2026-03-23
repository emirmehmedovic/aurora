"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : true;
        const metaMatch = shortcut.meta ? e.metaKey : true;
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && metaMatch && shiftMatch && keyMatch) {
          e.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
}

// Predefined shortcuts
export function useGlobalShortcuts() {
  const router = useRouter();

  useKeyboardShortcuts([
    {
      key: "k",
      ctrl: true,
      action: () => {
        // Open quick actions panel
        const event = new CustomEvent("openQuickActions");
        window.dispatchEvent(event);
      },
      description: "Open quick actions",
    },
    {
      key: "/",
      action: () => {
        // Focus search
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      },
      description: "Focus search",
    },
    {
      key: "Escape",
      action: () => {
        // Close modals/panels
        const event = new CustomEvent("closeModals");
        window.dispatchEvent(event);
      },
      description: "Close modals",
    },
  ]);
}

export const KEYBOARD_SHORTCUTS = {
  QUICK_ACTIONS: "Ctrl+K",
  SEARCH: "/",
  NEW_ORDER: "Ctrl+N",
  CLOSE: "Esc",
  SAVE: "Ctrl+S",
  DASHBOARD: "g d",
  ORDERS: "g o",
  LEADS: "g l",
  CUSTOMERS: "g c",
};
