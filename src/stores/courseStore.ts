import { create } from 'zustand'

interface CourseQuery {
  hostId?: number,
}

interface CourseQueryStore {
  courseQuery: CourseQuery,

  setHostId: (hostId: number) => void,
}

const useCourseQueryStore = create<CourseQueryStore>((set) => ({
  courseQuery: {},

  setHostId: (hostId) => set((store) => ({ 
    courseQuery: { ...store.courseQuery, hostId } 
  })),
}))

export default useCourseQueryStore