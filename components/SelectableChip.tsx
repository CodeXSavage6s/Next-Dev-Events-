// components/SelectableChip.tsx
import { X } from 'lucide-react';

interface SelectableChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  onRemove?: () => void;
  isCustom?: boolean;
}

export default function SelectableChip({
  label,
  selected,
  onToggle,
  onRemove,
  isCustom = false,
}: SelectableChipProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
        cursor-pointer transition-all duration-200 border select-none
        ${selected
          ? 'bg-indigo-700 text-white border-indigo-600 shadow-md scale-105'
          : 'bg-gray-300 text-gray-950 border-gray-300 hover:border-indigo-400 hover:text-indigo-500'
        }
        ${isCustom ? 'italic' : ''}
      `}
    >
      {label}
      {isCustom && onRemove && (
        <X
          size={12}
          className="ml-0.5 opacity-70 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        />
      )}
    </button>
  );
}