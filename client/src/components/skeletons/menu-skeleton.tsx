import { Skeleton } from '@/components/ui/skeleton';

export function MenuSkeleton() {
  return (
    <div className='p-4'>
      {/* Main layout */}
      <div className='flex space-x-4'>
        {/* Sidebar */}
        <div className='w-full space-y-4'>
          {/* Appbar name */}
          <Skeleton className='h-8 w-40' />

          {/* Filters */}
          <div className='space-y-2'>
            <Skeleton className='h-6 w-40' />
            <div className='space-y-1'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-4 w-36' />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='flex-1 space-y-6'>
          {/* Header */}
          <Skeleton className='h-8 w-64' />
          {/* Menu Item cards */}
          <div className='grid grid-cols-3 gap-4'>
            <Skeleton className='h-24 w-full rounded-lg' />
            <Skeleton className='h-24 w-full rounded-lg' />
            <Skeleton className='h-24 w-full rounded-lg' />
          </div>
        </div>
      </div>
    </div>
  );
}
