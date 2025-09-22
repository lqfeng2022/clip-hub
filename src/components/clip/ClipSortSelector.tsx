import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import useClipQueryStore from '@/clipStore'
import useLanguageStore from '@/languageStore'
import { clipPage } from '@/data/clipPage'

const ClipSortSelector = () => {
  const lang = useLanguageStore(s => s.language)

  const sortOrders = lang === 'en' 
    ? clipPage.en.sortOrders : clipPage.zh.sortOrders

  const sortOrder = useClipQueryStore((s) => s.clipQuery.sortOrder)
  const setSortOrder = useClipQueryStore((s) => s.setSortOrder)

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder)

  const header = lang === 'en' 
    ? `${clipPage.en.sort_prefix}: ${currentSortOrder?.label || clipPage.en.sort_surfix}`
    : `${clipPage.zh.sort_prefix}: ${currentSortOrder?.label || clipPage.zh.sort_surfix}`

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

export default ClipSortSelector