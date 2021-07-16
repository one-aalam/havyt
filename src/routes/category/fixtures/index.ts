import { Category } from '../types'
export * from './cuisines'
export * from './courses'

export const CATEGORIES: Category[] = [
  {
    id: 1,
    type: 'cuisine',
    name: 'Cuisines',
    desc: ''
  },
  {
    id: 2,
    type: 'course',
    name: 'Courses',
    desc: ''
  },
]
