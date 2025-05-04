import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useMenuFilters } from '@/hooks/use-menu-filters';

export const AvailabilityFilter = () => {
  const [filters, setFilters] = useMenuFilters();

  const handleAvailabilityChange = (value: string) => {
    let availability = null;
    if (value === 'available') availability = true;
    if (value === 'unavailable') availability = false;

    setFilters((prev) => ({
      ...prev,
      available: availability,
      pageNumber: 1,
    }));
  };

  const currentValue =
    filters.available === null ? 'all' : filters.available.toString();

  return (
    <div className='space-y-2'>
      <h3 className='text-sm font-medium mb-2'>Availability</h3>
      <ToggleGroup
        type='single'
        value={currentValue}
        onValueChange={handleAvailabilityChange}
        className='w-full'
        variant='outline'
      >
        <ToggleGroupItem value='all' className='text-xs'>
          All
        </ToggleGroupItem>
        <ToggleGroupItem value='available' className='text-xs'>
          Available
        </ToggleGroupItem>
        <ToggleGroupItem value='unavailable' className='text-xs'>
          Unavailable
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
