import { FiSearch } from "react-icons/fi";

interface PostFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortOrder: "newest" | "oldest";
  onSortChange: (order: "newest" | "oldest") => void;
}

export default function PostFilters({
  search,
  onSearchChange,
  sortOrder,
  onSortChange,
}: PostFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      <div className="relative flex-1">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777777] pointer-events-none"
          size={16}
        />
        <input
          type="text"
          placeholder="Search by title or username..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full border border-[#CCCCCC] rounded-lg pl-9 pr-3 h-9 text-sm placeholder-[#CCCCCC] outline-none focus:border-[#7695EC] transition-colors"
        />
      </div>
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as "newest" | "oldest")}
        className="border border-[#CCCCCC] rounded-lg px-3 h-9 text-sm text-[#777777] outline-none focus:border-[#7695EC] transition-colors cursor-pointer w-full sm:w-auto"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
}
