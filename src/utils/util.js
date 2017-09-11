const IDValidator = require('id-validator')

/**
 * 验证手机号格式是否正确
 * @param mobile
 */
export const validMobile = (mobile) => {
  mobile = mobile && mobile.replace(/\D/g, '')
  return mobile.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(mobile)
}

/**
 * 设置光标的位置
 * @param node input节点
 * @param pos 光标的位置
 */
export const setCaretPosition = (node, pos) => {
  if (node.setSelectionRange) {
    // IE Support
    node.focus()
    node.setSelectionRange(pos, pos)
  } else if (node.createTextRange) {
    // Firefox support
    var range = node.createTextRange()
    range.collapse(true)
    range.moveEnd('character', pos)
    range.moveStart('character', pos)
    range.select()
  }
}

/**
 * 获取图片相对url
 * @param name 图片名称
 */
export const getImgPath = (name) => {
  if (!name) return
  return require(`../assets/${name}`)
}

/**
 * 手机格式化13088889999-> 130 8888 9999
 * @param mobile 手机号
 */
export const formatPhone = (mobile) => {
  return mobile && mobile.replace(/\B(?=(?:\d{4})+$)/g, ' ')
}

/**
 * 校验身份证是否合法
 * @param idNo 身份证号
 */
export const validIdCard = (idNo) => {
  const idValidator = new IDValidator()
  return idValidator.isValid(idNo)
}

/**
 * 设置title
 */
export const setTitle = (title) => {
  if (!title) return
  document.title = title
}

/**
 * 获取产品类型title
 */
export const getTitle = (key) => {
  if (!key) return
  const myTitle = {'02': '星渔贷', '01': '房金融'}
  return myTitle[key]
}

