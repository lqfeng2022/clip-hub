import { Product } from '@/entities/Product'
import { useEffect, useMemo, useState } from 'react'
import useListItemMultDelete from './interact/useListItemMultDelete'
import useListItemPost from './interact/useListItemPost'
import useListPost from './interact/useListPost'
import useLists from './interact/useLists'
import useListProducts from './interact/useListProducts'
import { useParams } from 'react-router-dom'
import useList from './interact/useList'
import { useQueryClient } from '@tanstack/react-query'

const useListsManager = (
  product: Product, 
  onClose: () => void, 
  onBookmarkChange: (bookmarked: boolean) => void
) => {
  const queryClient = useQueryClient()
  
  const { slug } = useParams<{ slug?: string }>()
  const { data: list } = slug ? useList(slug) : { data: undefined }
  const listId = list?.id

  // only call useListProducts if listId exists
  const { refetch: refetchList } = useListProducts(listId ?? 0, { enabled: !!listId })
  
  const { data, refetch } = useLists() 

  const { mutate: addList } = useListPost()
  const { mutate: addListItem } = useListItemPost()
  const { mutate: deleteListItems } = useListItemMultDelete()

  // get the first page of playlist, if it's null, return [] for safe fallback
  const lists = data?.pages[0]?.results ?? []

  // Compute initial selected lists based on **fresh data**
  // `useMemo` cash the reslut to get rid of the expensive computation
  const initialSelected = useMemo(() => lists
    .filter(list => list.items.some(item => item.product.id === product.id))
    .map(list => list.id), 
    [lists, product.id]
  )

  // then set `selectedListIds` state variable and initialize it..
  const [selectedListIds, setSelectedListIds] = useState<number[]>(initialSelected)

  // Update local state when lists or bookmarks data change (to keep icon consistent)
  useEffect(() => {
    const isBookmarked = lists.some(list => 
      list.items.some(i => i.product.id === product.id)
    )

    // Only update when truly different
    setSelectedListIds(prev => {
      const same =
        prev.length === initialSelected.length &&
        prev.every(id => initialSelected.includes(id))

      return same ? prev : initialSelected
    })
    onBookmarkChange(isBookmarked)
  }, [lists, initialSelected, product.id])
    
  const handleListAdd = (title: string) => {
    addList({ title }, { onSuccess: () => refetch() })
  }

  const handleListItemUpdate = () => {
    // get added/removed listIds
    const added = selectedListIds.filter(id => !initialSelected.includes(id))
    const removed = initialSelected.filter(id => !selectedListIds.includes(id))

    const promises: Promise<any>[] = []

    // if we have added list, add exp to the lists
    if (added.length > 0) {
      promises.push(new Promise(resolve =>
        addListItem({ product_id: product.id, listIds: added }, { 
          onSuccess: resolve
        })
      ))
    }

    // if we have removed list, remove the exp from the lists
    if (removed.length > 0) {
      const deleteTargets = removed.map((listId) => {
        const list = lists.find(l => l.id === listId)
        const item = list?.items.find(i => i.product.id === product.id)
        return item ? { listId, listItemId: item.id } : null
      }).filter(Boolean) as { listId: number, listItemId: number }[]
      
      promises.push(
        new Promise(resolve =>
          deleteListItems(deleteTargets, { onSuccess: resolve }
        ))
      )
    }

    // Wait until all mutations finish
    Promise.all(promises).then(() => {
      // Invalidate queries to force fresh data
      refetch() // refetch lists page
      queryClient.invalidateQueries(['bookmarkedposts']) // refresh bookmark page
      if (listId) refetchList()  // refresh list detail page

      // update bookmark icon
      const bookmarked = selectedListIds.length > 0
      onBookmarkChange(bookmarked)

      // finally close the modal
      onClose()
    })
  }
  
  return {
    lists,
    selectedListIds,
    setSelectedListIds,
    handleListAdd,
    handleListItemUpdate,
  }
}

export default useListsManager