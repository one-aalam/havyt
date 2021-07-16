export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: string
}

export type Recipe = {
  id: number
  name: string
  desc?: string
  imageUrl?: string

  courseId: number // we could've modelled this
  cuisineId: number // and this better, but this designed to support the referential access model popular relatonal DB's use

  serves: number
  prepTime?: number
  cookingTime: number

  ingredients: string[]
  directions: string[]

  source?: string
  tags?: string[]
}
