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
const yiHangLoanData = {
  title: {
    label: '星企贷',
    value: 'yiHangFinance'
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
        placeholder: '最高可申请50万',
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
      type: 'myInput',
      props: {
        label: '借款利率',
        type: 'tel',
        placeholder: '',
        value: '0.05%',
        isBorder: true,
        readonly: true,
        unit: '/天'
      },
      model: 'loanDayRate'
    },
    {
      type: 'mySelect',
      props: {
        title: '还款方式',
        defaultVal: '到期一次性还本付息',
        selectType: 'term',
        isShowSelect: false,
        isTriggerClick: false,
        isBorder: false,
        label: 'label',
        value: 'value',
        isNoArrow: true,
        list: [
          {
            label: '等额本息',
            value: 1
          },
          {
            label: '按月付息，到期还本',
            value: 2
          },
          {
            label: '到期一次性还本付息',
            value: 3
          }
        ]
      },
      model: 'repayType'
    },
    {
      type: 'myInput',
      props: {
        label: '起息日',
        type: 'tel',
        value: '以实际放款日为准',
        isBorder: true,
        readonly: true
      },
      model: 'startDate'
    },
    {
      type: 'myLable',
      props: {
        label: '企业信息'
      }
    },
    {
      type: 'myInput',
      props: {
        label: '企业名称',
        type: 'text',
        placeholder: '请填写您企业的名称',
        isBorder: true,
        value: ''
      },
      model: 'comName'
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
    imgPath: 'icon_business.png'
  },
  loandetail: {
    info: info
  },
  prepaymentapply: {
    imgPath: 'icon_business.png',
    info: info
  }
}
export default yiHangLoanData
