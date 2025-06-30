import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import useExpressionQueryStore from '@/expressionStore'
import useLanguageStore from '@/languageStore'

const ExpressionSortSelector = () => {
  const lang = useLanguageStore(s => s.language)

  const sortOrders = [
    { value: '', label: 'Relevance', label_ch: '默认序列' },
    { value: '-last_update', label: 'Date added', label_ch: '更新顺序' },
    { value: 'title', label: 'Name', label_ch: '名称' },
  ]

  const sortOrder = useExpressionQueryStore((s) => s.expressionQuery.sortOrder)
  const setSortOrder = useExpressionQueryStore((s) => s.setSortOrder)

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  )

  const header = `Order by: ${currentSortOrder?.label || 'Relevance'}`
  const header_ch = `排序: ${currentSortOrder?.label_ch || '默认序列'}`

  return (
    <Menu>
      <MenuButton size='sm' as={Button} rightIcon={<BsChevronDown />}>
        {lang === 'en' ? header : header_ch}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => setSortOrder(order.value)}
            key={order.value}
            value={order.value}
          >
            {lang === 'en' ? order.label : order.label_ch}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default ExpressionSortSelector