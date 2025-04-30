import { useGetAllMenuItems } from '@/hooks/react-query';

const MenuItemPage = () => {
  const { data } = useGetAllMenuItems({});
  console.log(data);

  return <div>MenuItemPage</div>;
};

export default MenuItemPage;
