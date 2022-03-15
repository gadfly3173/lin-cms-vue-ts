import moment from 'moment'

// 设置语言为中文
moment.locale('zh-cn')

/**
 * @param {number} hours
 */
export function getDateAfterHours(hours: number) {
  const now = new Date()
  return new Date(now.setHours(now.getHours() + hours))
}
/**
 * @param {number} days
 */
export function getDateAfterDays(days: number) {
  const now = new Date()
  return new Date(now.setHours(now.getHours() + days * 24))
}
