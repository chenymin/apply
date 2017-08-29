/**
 * 验证手机号格式是否正确
 * @param mobile
 */
export const validMobile = (mobile) => mobile.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(mobile)
