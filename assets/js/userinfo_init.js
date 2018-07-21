const userInfoKey = 'cnloop'


export function saveUserInfo(userInfo = {}) {
  window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
}


export function getUserInfo() {
  return window.localStorage.getItem(userInfoKey)
}


export function getToken() {
  try {
    // 本地存储中的 user-info 可能不是一个有效的 JSON 格式字符串
    // 所以我们这里为了避免程序出错，使用了 try-catcher 来捕获转换失败的异常
    return JSON.parse(getUserInfo()).token
  } catch (err) {
    return ''
  }
}


export function removeUserInfo() {
  window.localStorage.removeItem(userInfoKey)
}

export function skipHome(){
    window.location.href='/'
}
