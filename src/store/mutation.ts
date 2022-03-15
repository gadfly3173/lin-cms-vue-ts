import * as types from './mutation-type'
import state from './state'

type State = typeof state

declare interface Permission {
  [key: string]: {
    module: string
    permission: string
  }
}

export default {
  [types.SET_LOGGED_IN](state: State, payload: boolean) {
    state.loggedIn = payload
  },

  [types.REMOVE_LOGGED_IN](state: State) {
    state.loggedIn = false
    state.user = {}
  },

  [types.SET_USER](state: State, payload: typeof state.user) {
    state.user = payload
  },

  [types.MARK_READ_MESSAGE](state: State, payload: typeof state.unreadMessages[0]) {
    state.alreadyReadMessages.push(payload)
  },

  [types.MARK_UNREAD_MESSAGE](state: State, payload: typeof state.unreadMessages[0]) {
    // console.log('===:  ', payload)
    state.unreadMessages.push(payload)
  },

  [types.REMOVE_UNREAD_MESSAGE](state: State, payload: number) {
    // payload => message.id
    const { unreadMessages } = state
    const index = unreadMessages.findIndex(el => el.id === payload)
    unreadMessages.splice(index, 1)
  },

  [types.SET_USER_PERMISSIONS](state: State, permissions: Permission[]) {
    state.permissions = permissions
      .map(permission => Object.values(permission))
      .flat(2)
      .map(p => p.permission)
  },
}
