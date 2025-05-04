import { SortBy, SortByEnum } from '@/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMenuFilters } from '@/hooks/use-menu-filters';

export const SortByFilter = () => {
  const [filters, setFilters] = useMenuFilters();

  const handleSortChange = (value: SortBy) => {
    setFilters((prev) => ({ ...prev, sortBy: value, pageNumber: 1 }));
  };

  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium'>Sort By</label>
      <Select
        value={filters.sortBy || ''}
        onValueChange={(value) => handleSortChange(value as SortBy)}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select sort order' />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(SortByEnum).map(([key, value]) => (
            <SelectItem key={value} value={value}>
              {key.replace(/_/g, ' ')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
