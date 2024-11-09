import React from 'react';
import { Clock } from 'lucide-react';

interface SearchFiltersProps {
  timeFilter: string;
  setTimeFilter: (time: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ timeFilter, setTimeFilter }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-gray-500" />
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
        >
          <option value="any">Any Time</option>
          <option value="quick">Quick (≤ 30 min)</option>
          <option value="medium">Medium (30-60 min)</option>
          <option value="long">Long (60+ min)</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;