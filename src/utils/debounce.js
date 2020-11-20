// apply() 指定一个
export const debounce = function (fn, wait) {
  var timer = null
  return function () {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this)
    }, wait)
  }
}
