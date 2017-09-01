const xinYuLoanData = {
  title: {
    label: '星渔贷',
    value: 'xingYuLoan'
  },
  basicinfo: {
    imgPath: 'xingyu-pei.jpg'
  },
  applycomplete: {
    imgPath: 'icon-fish.png',
    materialnfo: {
      title: '申请星渔贷，需要准备以下材料',
      list: [
        '1.营业执照等经营性证明材料',
        '2.公司章程、验资报告、财务报表',
        '3.法人身份证',
        '4.存货权属证明材料（购销合同、发票、支付凭证等）',
        '5.其他相关资料'
      ]
    },
    info: [
      {
        label: '企业名称',
        value: '',
        modal: 'comName'
      },
      {
        label: '申请金额',
        value: '',
        modal: 'amount',
        unit: '万元'
      },
      {
        label: '借款期限',
        value: '',
        modal: 'loanPerods'
      },
      {
        label: '申请时间',
        value: '',
        modal: 'createTime'
      }
    ]
  },
  province: [
    {
      label: '北京',
      value: 1
    },
    {
      label: '上海',
      value: 2
    },
    {
      label: '天津',
      value: 3
    },
    {
      label: '重庆',
      value: 4
    },
    {
      label: '河北',
      value: 5
    }
  ]
}
export default xinYuLoanData
