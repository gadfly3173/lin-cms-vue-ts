import Utils from '../util/util'
/*
 * 全局的过滤函数
 * */
export function checkAddZone(num: number) {
  return num < 10 ? `0${num.toString()}` : num
}

export function checkAddZone3(i: number) {
  if (i < 100 && i > 9) {
    return `0${ i}`
  }
  if (i < 10) {
    return `00${ i}`
  }
  return i.toString()
}

export const filters = {
  /**
   * 过滤地址
   */
  filterAddress(value: any) {
    if (!value) return value
    const obj = value
    return `${obj.provinceName}${obj.cityName}${obj.countyName} ${obj.detailInfo}`
  },

  /**
   * 过滤时间戳，返回值yyyy-mm-dd
   */
  filterTime(value: number) {
    if (!value) {
      return value
    }
    const date = new Date(value * 1000)
    const y = date.getFullYear()
    const m = `0${date.getMonth() + 1}`
    const d = `0${date.getDate()}`
    const val = `${y}-${m.substring(m.length - 2, m.length)}-${d.substring(d.length - 2, d.length)}`
    return val
  },

  /**
   * 过滤时间戳，返回值yyyy-mm-dd ss
   */
  filterTimeYmdHms(value: number) {
    if (!value) {
      return value
    }
    const date = new Date(value * 1000)
    const y = date.getFullYear()
    const m = `0${date.getMonth() + 1}`
    const d = `0${date.getDate()}`
    const hh = date.getHours()
    const mm = `${date.getMinutes()}`
    const ss = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    const val = `${y}-${m.substring(m.length - 2, m.length)}-${d.substring(d.length - 2, d.length)}  ${hh}:${mm}:${ss}`
    return val
  },

  filterTimeYear(value: number) {
    // 过滤时间戳, 返回值 今年:mm-dd 往年:yyyy-mm-dd
    const jy = new Date().getFullYear()
    const date = new Date(value * 1000)
    const y = date.getFullYear()
    const m = `0${date.getMonth() + 1}`
    const d = `0${date.getDate()}`
    const val = `${y}-${m.substring(m.length - 2, m.length)}-${d.substring(d.length - 2, d.length)}`
    const thisYear = `${m.substring(m.length - 2, m.length)}-${d.substring(d.length - 2, d.length)}`
    if (jy === y) {
      return thisYear
    }
    return val
  },

  dateFormatter(nows: number | string | Date) {
    if (!nows) return ''
    const now = new Date(nows)
    const year = now.getFullYear()

    const monthTemp = now.getMonth() + 1
    const month = checkAddZone(monthTemp)

    const dateTemp = now.getDate()
    const date = checkAddZone(dateTemp)
    return `${year}-${month}-${date}`
  },

  dateTimeFormatter(t: number | string | Date) {
    if (!t) return ''
    const dateObj = new Date(t)
    const year = dateObj.getFullYear()
    const monthTemp = dateObj.getMonth() + 1
    const month = checkAddZone(monthTemp)

    const dateTemp = dateObj.getDate()
    const date = checkAddZone(dateTemp)

    const hourTemp = dateObj.getHours()
    const hour = checkAddZone(hourTemp)

    const minTemp = dateObj.getMinutes()
    const min = checkAddZone(minTemp)

    const seTemp = dateObj.getSeconds()
    const se = checkAddZone(seTemp)

    const milliTemp = dateObj.getMilliseconds()
    const milli = checkAddZone3(milliTemp)

    return `${year}-${month}-${date} ${hour}:${min}:${se}.${milli}`
  },

  filterTitle(value: string, len = 9) {
    return Utils.cutString(value, len)
  },

  /**
   * 获取媒体类型
   * @param value type
   * @returns type text
   */
  filterMediaType(value: number) {
    return {
      0: '图片',
      1: '视频',
    }[value]
  },

  numberToPercentage(number: number, scale = 2): string {
    return `${(number * 100).toFixed(scale)}%`
  },
}
