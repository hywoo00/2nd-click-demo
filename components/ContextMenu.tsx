'use client';

import { useEffect, useRef } from 'react';
import { useContextMenuStore } from '@/store/contextMenuStore';

export default function ContextMenu() {
  const { isOpen, position, items, closeMenu, selectedItemId } = useContextMenuStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeMenu]);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const menu = menuRef.current;
      const { x, y } = position;
      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = menu;

      // 화면 밖으로 나가지 않도록 조정
      let adjustedX = x;
      let adjustedY = y;

      if (x + offsetWidth > innerWidth) {
        adjustedX = innerWidth - offsetWidth - 10;
      }
      if (y + offsetHeight > innerHeight) {
        adjustedY = innerHeight - offsetHeight - 10;
      }

      menu.style.left = `${adjustedX}px`;
      menu.style.top = `${adjustedY}px`;
    }
  }, [isOpen, position]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 min-w-[200px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {items.map((item, index) => {
        if (item.divider) {
          return (
            <div
              key={`divider-${index}`}
              className="my-1 border-t border-gray-200 dark:border-gray-700"
            />
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => {
              item.onClick?.();
              closeMenu();
            }}
            disabled={item.disabled}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

