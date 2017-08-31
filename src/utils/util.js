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
  return require(`../assets/${name}`)
}
