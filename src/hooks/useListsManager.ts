import { useMemo, useState } from 'react'
import useListItemMultDelete from './interact/useListItemMultDelete'
import useListItemPost from './interact/useListItemPost'
import useListPost from './interact/useListPost'
import useLists from './interact/useLists'
import Expression from '@/entities/Expression'

const useListsManager = (exp: Expression, onClose: () => void) => {
  const { data, refetch } = useLists() 
  const { mutate: addList } = useListPost()
  const { mutate: addListItem } = useListItemPost()
  const { mutate: deleteListItems } = useListItemMultDelete()

  // get the first page of playlist, if it's null, return [] for safe fallback
  const lists = data?.pages[0]?.results ?? []

  // filter initial selected playlists and map it to a list of numbers
  // `useMemo` cash the reslut to get rid of the expensive computation
  //  and it will be updated on the `lists` and `exp.id`
  const initialSelected = useMemo(() => lists
    .filter(list => list.items.some(item => item.expression.id === exp.id))
    .map(list => list.id), 
    [lists, exp.id]
  )

  // then set `selectedListIds` state variable and initialize it..
  const [selectedListIds, setSelectedListIds] = useState<number[]>(initialSelected)

  const handleListAdd = (title: string) => {
    addList({ title }, { onSuccess: () => refetch() })
  }

  const handleListItemUpdate = () => {
    // get added/removed listId lists using filter()
    const added = selectedListIds.filter(id => !initialSelected.includes(id))
    const removed = initialSelected.filter(id => !selectedListIds.includes(id))

    // if we have added list, add exp to the lists
    if (added.length > 0)
      addListItem({ expression_id: exp.id, listIds: added })

    // if we have removed list, remove the exp from the lists
    if (removed.length > 0) {
      const deleteTargets = removed.map((listId) => {
        const list = lists.find(l => l.id === listId)
        const item = list?.items.find(i => i.expression.id === exp.id)
        return item ? { listId, listItemId: item.id } : null
      }).filter(Boolean) as { listId: number, listItemId: number }[]
      // `filter(Boolean)`: a quick way to remove the falsy objs
      deleteListItems(deleteTargets)
    }

    onClose()
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