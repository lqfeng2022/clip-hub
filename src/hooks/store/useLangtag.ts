import useLangtags from './useLangtags'

export const useLangtag = (id? : number) => {
  const { data: langtags } = useLangtags()
  return langtags?.results.find((l) => l.id == id)
}
