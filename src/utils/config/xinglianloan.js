const info = [
  {
    label: '申请金额',
    value: '',
    modal: 'amount',
    unit: '万元'
  },
  {
    label: '申请时间',
    value: '',
    modal: 'createTime'
  }
]
const xingLianLoanData = {
  title: {
    label: '星链贷',
    value: 'xingLianLoan'
  },
  basicinfo: {
    imgPath: ''
  },
  applyinfo: [
    {
      type: 'myLable',
      props: {
        label: '贷款信息'
      }
    },
    {
      type: 'myInput',
      props: {
        label: '申请金额',
        type: 'tel',
        placeholder: '请输入申请金额',
        unit: '万元',
        value: '',
        isBorder: true,
        maxValue: 50,
        rules: {
          required: {
            message: '申请金额是必填项'
          },
          number: {
            message: '申请金额是必填项'
          },
          max: {
            message: '申请金额大于最大值',
            value: 50
          }
        }
      },
      model: 'amount'
    },
    {
      type: 'myLable',
      props: {
        label: '用户信息'
      }
    },
    {
      type: 'myInput',
      props: {
        label: '联系地址',
        type: 'text',
        placeholder: '请填写您的联系地址',
        isBorder: true,
        value: ''
      },
      model: 'contactAddress'
    },
    {
      type: 'myInput',
      props: {
        label: '紧急联系人姓名',
        type: 'text',
        placeholder: '请填写您的紧急联系人姓名',
        value: ''
      },
      model: 'contactName'
    },
    {
      type: 'myInput',
      props: {
        label: '紧急联系人手机号',
        type: 'tel',
        placeholder: '请填写紧急联系人手机号',
        value: ''
      },
      model: 'contactNumber'
    }
  ],
  applycomplete: {
    imgPath: 'icon-xinglian.png'
  },
  loandetail: {
    info: info
  },
  prepaymentapply: {
    imgPath: 'icon-xinglian.png',
    info: info
  }
}
export default xingLianLoanData
