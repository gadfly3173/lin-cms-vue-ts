import { ActionContext } from 'vuex'
import * as types from './mutation-type'
import mutations from './mutation'
import state from './state'

type State = typeof state
type Mutations = typeof mutations

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export default {
  setUserAndState({ commit }: AugmentedActionContext, user: typeof state.user) {
    commit(types.SET_USER, user)
    commit(types.SET_LOGGED_IN, true)
  },

  loginOut({ commit }: AugmentedActionContext) {
    localStorage.clear()
    commit(types.REMOVE_LOGGED_IN)
  },

  readMessage({ commit }: AugmentedActionContext, message: typeof state.unreadMessages[0]) {
    commit(types.REMOVE_UNREAD_MESSAGE, message.id)
    commit(types.MARK_READ_MESSAGE, message)
  },
}
