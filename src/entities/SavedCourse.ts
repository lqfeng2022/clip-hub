import Course from './Course'

export default interface SavedCourse {
  id: number,
  course: Course,
  saved_at: string,
}