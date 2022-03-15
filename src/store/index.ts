import { CommitOptions, createLogger, createStore, DispatchOptions, Store as VuexStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

import mutations from './mutation'
import state from './state'
import * as getters from './getter'
import actions from './action'

type State = typeof state
type Mutations = typeof mutations
type Getters = typeof getters
type Actions = typeof actions

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (stateData: State) => ({
    user: stateData.user,
    loggedIn: stateData.loggedIn,
    permissions: stateData.permissions,
  }),
})

const debug = process.env.NODE_ENV !== 'production'

const store: Store = createStore({
  state,
  getters,
  actions,
  mutations,
  strict: debug,
  plugins: debug ? [vuexLocal.plugin, createLogger()] : [vuexLocal.plugin],
})

// @see https://next.vuex.vuejs.org/zh/guide/hot-reload.html
if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./mutation'], () => {
    // 获取更新后的模块
    const newMutations = mutations
    // 加载新模块
    store.hotUpdate({
      mutations: newMutations,
    })
  })
}

export default store
