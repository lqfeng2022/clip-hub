import useLangtags from './useLangtags_shabi'

export const useLangtag = (id? : number) => {
  const { data: langtags } = useLangtags()
  return langtags?.results.find((l) => l.id == id)
}
