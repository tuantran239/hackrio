import { atom } from 'recoil'
import { User } from '../types/user'

export const userState = atom<User | null>({
  key: 'user',
  default: null
})
