import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "../types"

interface UserState {
  currentUser: User
}

const initialState: UserState = {
  currentUser: {
    name: "Albert John",
    email: "albert@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
  },
})

export const { setUser } = userSlice.actions
