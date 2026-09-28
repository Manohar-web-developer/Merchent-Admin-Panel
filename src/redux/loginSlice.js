// redux/loginSlice.js

import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const token = Cookies.get('user_token')

export const loginSlice = createSlice({
    name: 'login',

    initialState: {
        token: token ?? ''
    },

    reducers: {
        login: (state, action) => {
            console.log(action);

            state.token = action.payload
        }
    }
})

export const { login } = loginSlice.actions

export default loginSlice.reducer