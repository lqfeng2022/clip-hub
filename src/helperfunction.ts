import Expression from '@/entities/Expression'

export const parseTimeline = (timeline: string): number => {
    const [minStr, secStr] = timeline.split(':').map(s => s.trim())
    const minutes = parseInt(minStr, 10)
    const seconds = parseInt(secStr, 10)
    return minutes * 60 + seconds
  }


// `[...data]`: to avoid mutating the original array
// `-`: is a simple way to tell TS how to order two items
export const sortExpressionsByTimeline = (data: Expression[]) => {
  return [...data].sort((a, b) => 
   parseTimeline(a.timeline) - parseTimeline(b.timeline))

}

// expression formality tags
export const formality = [
  { id: 0, name: '', title: 'All', title_ch: 'All' },
  { id: 1, name: 'FORMAL', title: 'Formal', title_ch: '正式的' },
  { id: 2, name: 'NEUTRAL', title: 'Neutral', title_ch: '中性的' },
  { id: 3, name: 'CASUAL', title: 'Casual', title_ch: '随意的' },
]