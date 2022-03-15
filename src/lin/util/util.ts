import { cloneDeep, debounce, isEqual, throttle } from 'lodash'
import { CMSRouterNode } from 'typing/router'
import { RouteMeta } from 'vue-router'

/* eslint-disable */
class Utils {
  /** 参数说明：
   * 根据长度截取先使用字符串，超长部分追加…
   * str 对象字符串
   * len 目标字节长度
   * 返回值： 处理结果字符串
   */
  static cutString(str: string, len: number) {
    if (str.length * 2 <= len) {
      return str
    }
    let strlen = 0
    let s = ''
    for (let i = 0; i < str.length; i++) {
      // eslint-disable-line
      s += str.charAt(i)
      if (str.charCodeAt(i) > 128) {
        strlen += 2
        if (strlen >= len) {
          return `${s.substring(0, s.length - 1)}...`
        }
      } else {
        strlen += 1
        if (strlen >= len) {
          return `${s.substring(0, s.length - 2)}...`
        }
      }
    }
    return s
  }

  /**
   * 简单数组的交集
   * @param {Array} a
   * @param {Array} b
   */
  static getIntersect(a: Array<any>, b: Array<any>) {
    if (a.constructor === Array && b.constructor === Array) {
      const set1 = new Set(a)
      const set2 = new Set(b)
      return Array.from(new Set([...set1].filter(x => set2.has(x))))
    }
    return null
  }

  /**
   * 防抖函数
   * @param {*} func 函数体
   * @param {*} wait 延时
   */
  static debounce<T extends (...args: any) => any>(func: T, wait: number = 50) {
    return debounce(func, wait)
  }

  /**
   * 节流函数
   * @param {*} func 函数体
   * @param {*} wait 延时
   */
  static throttle<T extends (...args: any) => any>(func: T, wait: number = 50) {
    return throttle(func, wait)
  }

  /**
   * 返回 n 位的随机字符串
   * @param {Number} n
   */
  static getRandomStr(n: number = 6) {
    let str = ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    for (let i = 0; i < n; i += 1) {
      str += chars.charAt(Math.floor(Math.random() * 62))
    }
    return str
  }

  static getTypeOf(obj: object) {
    const { toString } = Object.prototype
    interface typeMap {
      [index: string]: string
    }
    const map: typeMap = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object',
      '[object Symbol]': 'symbol',
    }
    return map[toString.call(obj)]
  }

  static groupByOrder(source: Array<any>) {
    interface numberMap {
      [order: number]: any[]
    }
    // 有order的放这里
    const map: numberMap = {}
    // 没有order放这里
    const noOrderList = [] as any[]

    source.forEach(s => {
      const { order } = s
      if (typeof order !== 'number') {
        noOrderList.push(s)
        return
      }

      const list = map[order]
      if (list) {
        list.push(s)
      } else {
        map[order] = [s]
      }
    })

    return {
      orderMap: map,
      noOrderList,
    }
  }

  /**
   * 根据数组的 order 字段排序
   * @param {Array} source
   */
  static sortByOrder(source: Array<any> = []) {
    if (!Array.isArray(source)) {
      const message = 'sortByOrder 传入参数不符合要求, 应为数组'
      console.error(message)
      throw new Error(message)
    }

    if (!source.length) {
      return source
    }

    // 1.根据order对数据进行分组
    const { orderMap, noOrderList } = Utils.groupByOrder(source)

    // 2.获取已存在的order
    const orders = Object.keys(orderMap).map(o => Number(o))

    // 对order进行排序
    orders.sort((a, b) => a - b)

    // 小于0的order
    const ltZeroOrders = orders.filter(o => o < 0)

    // 大于等于0的order
    const gteZeroOrders = orders.filter(o => o >= 0)

    const finallyArr = [] as any[]
    const gteZeroItemList = gteZeroOrders.map(o => orderMap[o]).flat()

    finallyArr.push(...gteZeroItemList)
    finallyArr.push(...noOrderList)

    // 如果没有小于0的order，则直接拼接
    if (!ltZeroOrders.length) {
      return finallyArr
    }

    // 将小于0的order的item插入到数组中
    ltZeroOrders.reverse().forEach(o => {
      let index = finallyArr.length + o + 1
      if (index < 0) {
        index = 0
      }

      const arr = orderMap[o]
      finallyArr.splice(index, 0, ...arr)
    })

    return finallyArr
  }

  /**
   * 深度遍历，深拷贝
   * @param {*} data
   * @returns {*} 深度拷贝后的内容
   */
  static deepClone<T>(data: T): T {
    return cloneDeep(data)
  }

  /**
   * 中划线转驼峰
   */
  static came(str: string) {
    return `${str}`.replace(/-\D/g, match => match.charAt(1).toUpperCase())
  }

  /**
   * 判断权限
   */
  static hasPermission(permissions: string[], route: RouteMeta | CMSRouterNode, user: any) {
    // eslint-disable-line
    if (user?.admin) {
      return true
    }
    const routePermissions = route.permission
    if (routePermissions) {
      return permissions.some(permission => routePermissions.indexOf(permission) > -1)
    }
    return true
  }

  /**
   * 获取窗口滚动条大小, From: https://github.com/react-component/util/blob/master/src/getScrollBarSize.js
   * @param {boolean} fresh 强制重新计算
   * @returns {number}
   */
  static getScrollBarSize(fresh: boolean): number {
    let cached!: number
    if (fresh || cached === undefined) {
      const inner = document.createElement('div')
      inner.style.width = '100%'
      inner.style.height = '200px'

      const outer = document.createElement('div')
      const outerStyle = outer.style

      outerStyle.position = 'absolute'
      outerStyle.top = '0'
      outerStyle.left = '0'
      outerStyle.pointerEvents = 'none'
      outerStyle.visibility = 'hidden'
      outerStyle.width = '200px'
      outerStyle.height = '150px'
      outerStyle.overflow = 'hidden'

      outer.appendChild(inner)

      document.body.appendChild(outer)

      const widthContained = inner.offsetWidth
      outer.style.overflow = 'scroll'
      let widthScroll = inner.offsetWidth

      if (widthContained === widthScroll) {
        widthScroll = outer.clientWidth
      }

      document.body.removeChild(outer)

      cached = widthContained - widthScroll
    }
    return cached
  }

  /**
   * 比较两个数据是否完全相同
   *
   * @param {*} source 第一个要比较的数据
   * @param {*} target 第二个要比较的数据
   * @returns {boolean} 是否相同
   */
  static isEqual(source: any, target: any): boolean {
    return isEqual(source, target)
  }
}

export default Utils
