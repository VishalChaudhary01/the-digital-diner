import { categoryLabels, ItemCategory, ItemCategoryEnum } from '@/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { useMenuFilters } from '@/hooks/use-menu-filters';

export const CategoryFilter = () => {
  const [filters, setFilters] = useMenuFilters();
  const category = filters.category ?? [];

  const handleCategoryChange = (value: ItemCategory, checked: boolean) => {
    let updated: ItemCategory[];
    if (checked) {
      updated = [...category, value];
    } else {
      updated = category.filter((cat) => cat !== value);
    }
    setFilters((prev) => ({
      ...prev,
      category: updated.length > 0 ? updated : null,
      pageNumber: 1,
    }));
  };

  return (
    <div className='space-y-2'>
      <h3 className='text-sm font-medium mb-2'>Categories</h3>
      <div className='space-y-2'>
        {Object.entries(ItemCategoryEnum).map(([key, value]) => (
          <div key={value} className='flex items-center space-x-2'>
            <Checkbox
              id={`category-${value}`}
              checked={category.includes(value)}
              onCheckedChange={(checked) =>
                handleCategoryChange(value as ItemCategory, checked === true)
              }
            />
            <label
              htmlFor={`category-${value}`}
              className='text-sm cursor-pointer'
            >
              {categoryLabels[value as ItemCategory] || key}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
