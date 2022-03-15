import storage from 'good-storage'

const LOGIN_KEY = '__login__'

export function setLoggedIn(flag: any) {
  storage.session.set(LOGIN_KEY, flag)
  return flag
}

export function loadLoggedIn() {
  return storage.session.get(LOGIN_KEY, '')
}

export function cleanLoggedIn() {
  storage.session.remove(LOGIN_KEY)
}
