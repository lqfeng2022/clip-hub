import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import useExpressionQueryStore from '@/expressionStore'
import useLanguageStore from '@/languageStore'
import expressionPage from '@/data/expressionPage'

const ExpressionSortSelector = () => {
  const lang = useLanguageStore(s => s.language)
  const sortOrders = lang === 'en' 
    ? expressionPage.en.sortOrders : expressionPage.zh.sortOrders

  const sortOrder = useExpressionQueryStore((s) => s.expressionQuery.sortOrder)
  const setSortOrder = useExpressionQueryStore((s) => s.setSortOrder)

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  )

  const header = lang === 'en' 
    ? `${expressionPage.en.sort_prefix}: ${currentSortOrder?.label || expressionPage.en.sort_surfix}`
    : `${expressionPage.zh.sort_prefix}: ${currentSortOrder?.label || expressionPage.zh.sort_surfix}`

  return (
    <Menu>
      <MenuButton size='sm' as={Button} rightIcon={<BsChevronDown />}>
        {header}
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