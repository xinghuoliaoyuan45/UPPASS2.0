/**
 * Created by guangqiang on 2017/11/15.
 */
import { AsyncStorage } from 'react-native'
import Storage from 'react-native-storage'

let storage = undefined
let defaultExpires = null
let size = 2000

const createStorage = () => {

  storage = new Storage({
    // 最大容量，默认值2000条数据循环存储
    size: size,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认永不过期
    defaultExpires: defaultExpires,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: false,
  })
}

const initStorage = () => {
  if (!storage) {
    createStorage()
  }
}

export const save = (key, obj) => {
  initStorage()
  storage.save({
    key: key,  // 注意: 请不要在key中使用_下划线符号!
    data: obj,
    // 如果不指定过期时间，则会使用defaultExpires参数
    // 如果设为null，则永不过期
    expires: defaultExpires
  })
}
export const load = (key, defaultValue) => {
  initStorage()
  return new Promise((resolve) => {
    storage.load({
      key: key,
      autoSync: false,
      syncInBackground: false,
    }).then(ret => {
      resolve(ret)
    }).catch(() => {
      resolve(defaultValue)
    })
  })
}
export const remove = (key) => {
  initStorage()
  storage.remove({
    key: key
  })
}