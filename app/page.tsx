'use client';

import { useContextMenuStore, MenuItem } from '@/store/contextMenuStore';
import ContextMenu from '@/components/ContextMenu';

interface ListItem {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
}

export default function Home() {
  const openMenu = useContextMenuStore((state) => state.openMenu);
  const selectedItemId = useContextMenuStore((state) => state.selectedItemId);

  // 샘플 리스트 데이터
  const listItems: ListItem[] = [
    { id: '1', title: '첫 번째 항목', description: '이것은 첫 번째 리스트 항목입니다.', status: 'active' },
    { id: '2', title: '두 번째 항목', description: '이것은 두 번째 리스트 항목입니다.', status: 'active' },
    { id: '3', title: '세 번째 항목', description: '이것은 세 번째 리스트 항목입니다.', status: 'pending' },
    { id: '4', title: '네 번째 항목', description: '이것은 네 번째 리스트 항목입니다.', status: 'inactive' },
    { id: '5', title: '다섯 번째 항목', description: '이것은 다섯 번째 리스트 항목입니다.', status: 'active' },
  ];

  const handleContextMenu = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    e.stopPropagation();

    // 메뉴 항목 생성 시 itemId를 활용
    const menuItems: MenuItem[] = [
      {
        id: 'id',
        label: `${itemId}번 아이템 선택`,
        onClick: () => {
          alert(`항목 ID: ${itemId}의 정보를 확인합니다.`);
        },
      },
      {
        id: 'view',
        label: '보기',
        onClick: () => {
          alert(`항목 ID: ${itemId}를 확인합니다.`);
        },
      },
      {
        id: 'edit',
        label: '편집',
        onClick: () => {
          alert(`항목 ID: ${itemId}를 편집합니다.`);
        },
      },
      { id: 'divider1', divider: true },
      {
        id: 'copy',
        label: '복사',
        onClick: () => {
          const item = listItems.find((i) => i.id === itemId);
          alert(`항목 "${item?.title}" (ID: ${itemId})를 복사했습니다.`);
        },
      },
      {
        id: 'delete',
        label: '삭제',
        onClick: () => {
          const item = listItems.find((i) => i.id === itemId);
          if (confirm(`항목 "${item?.title}" (ID: ${itemId})를 삭제하시겠습니까?`)) {
            alert(`항목 ID: ${itemId}가 삭제되었습니다.`);
          }
        },
      },
    ];

    openMenu(e.clientX, e.clientY, menuItems, itemId);
  };

  const getStatusColor = (status: ListItem['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: ListItem['status']) => {
    switch (status) {
      case 'active':
        return '활성';
      case 'pending':
        return '대기';
      case 'inactive':
        return '비활성';
      default:
        return status;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          Context Menu 데모
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-2">
          리스트 항목에서 우클릭하여 Context Menu를 확인하세요
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              리스트 항목
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              각 항목을 우클릭하면 해당 항목의 ID를 활용한 메뉴가 나타납니다.
            </p>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {listItems.map((item) => (
              <div
                key={item.id}
                onContextMenu={(e) => handleContextMenu(e, item.id)}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-context-menu group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {item.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      ID: <span className="font-mono">{item.id}</span>
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      우클릭 →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContextMenu />
    </main>
  );
}

