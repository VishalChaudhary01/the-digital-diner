import { useQueryState } from 'nuqs';

export const useItemDialog = () => {
  const [itemId, setItemId] = useQueryState('itemId');

  const isOpen = !!itemId;

  const onOpen = (id: string) => {
    setItemId(id);
  };

  const onClose = () => {
    setItemId(null);
  };

  return {
    itemId,
    isOpen,
    onOpen,
    onClose,
  };
};
