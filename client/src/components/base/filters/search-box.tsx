import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { useMenuFilters } from '@/hooks/use-menu-filters';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const SearchBox = () => {
  const [filters, setFilters] = useMenuFilters();
  const [searchTerm, setSearchTerm] = useState(filters.keyword || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      keyword: debouncedSearchTerm || null,
      pageNumber: 1,
    }));
  }, [debouncedSearchTerm, setFilters]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className='relative'>
      <div className='relative'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          type='search'
          placeholder='Search menu items...'
          className='w-full pl-8 pr-10 [&::-webkit-search-cancel-button]:hidden'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button
            variant='ghost'
            size='sm'
            className='absolute right-0 top-0 h-full px-3'
            onClick={clearSearch}
          >
            <X className='h-4 w-4' />
            <span className='sr-only'>Clear</span>
          </Button>
        )}
      </div>
    </div>
  );
};
