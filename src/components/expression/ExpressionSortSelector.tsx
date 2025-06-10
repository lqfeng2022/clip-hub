import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import useExpressionQueryStore from '../../expressionStore'

const ExpressionSortSelector = () => {
  const sortOrders = [
    { value: '', label: 'Relevance' },
    { value: '-last_update', label: 'Date added' },
    { value: 'title', label: 'Name' },
  ]

  const sortOrder = useExpressionQueryStore((s) => s.expressionQuery.sortOrder)
  const setSortOrder = useExpressionQueryStore((s) => s.setSortOrder)

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  )

  return (
    <Menu>
      <MenuButton size='sm' as={Button} rightIcon={<BsChevronDown />}>
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

export default ExpressionSortSelector