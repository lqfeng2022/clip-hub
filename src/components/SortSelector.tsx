import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import useClipQueryStore from '../store'

const SortSelector = () => {
  const sortOrders = [
    { value: '', label: 'Relevance' },
    { value: '-last_update', label: 'Date added' },
    { value: '-release_year', label: 'Release date' },
    { value: 'title', label: 'Name' },
    { value: 'original', label: 'Original' },
    { value: 'platform', label: 'Platform' },
  ]

  const sortOrder = useClipQueryStore((s) => s.clipQuery.sortOrder)
  const setSortOrder = useClipQueryStore((s) => s.setSortOrder)

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  )

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: {currentSortOrder?.label || 'Relevance'}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => setSortOrder(order.value)}
            key={order.value}
            value={order.value}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default SortSelector