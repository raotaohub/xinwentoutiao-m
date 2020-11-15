// 本地存储模块

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    // 尝试把 data 转换成 JS 对象
    return JSON.parse(data)
  } catch (err) {
    // 若 data 不是JSON格式的字符串 直接返回
    return data
  }
}

export const setItem = (name, val) => {
  // 如果val是对象 需要转换成字符串
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  window.localStorage.setItem(name, val)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
