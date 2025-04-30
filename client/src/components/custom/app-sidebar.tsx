import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from '../ui/sidebar';

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <h3 className='text-2xl font-bold text-foreground/80'>
          The Digital <span className='text-primary'>Diner</span>
        </h3>
      </SidebarHeader>
      <SidebarContent className='flex flex-col gap-0 h-[calc(100vh-8rem)] overflow-y-hidden'>
        <SidebarGroup className='flex-shrink-0'>
          <SidebarGroupContent>
            <div>Filters</div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
