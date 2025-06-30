import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import useClipQueryStore from '@/clipStore'
import useLanguageStore from '@/languageStore'

const ClipSortSelector = () => {
  const sortOrders = [
    { value: '', label: 'Relevance', label_ch: '默认序列' },
    { value: '-last_update', label: 'Date added', label_ch: '更新时间' },
    { value: '-release_year', label: 'Release date', label_ch: '发布日期' },
    { value: 'title', label: 'Name', label_ch: '视频名称' },
    { value: 'original', label: 'Original', label_ch: '视频原名' },
    { value: 'platform', label: 'Platform', label_ch: '视频出处' },
  ]

  const sortOrder = useClipQueryStore((s) => s.clipQuery.sortOrder)
  const setSortOrder = useClipQueryStore((s) => s.setSortOrder)

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  )

  const lang = useLanguageStore(s => s.language)
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

export default ClipSortSelector