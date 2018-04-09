const info = [
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
const kaiSiLoanData = {
  title: {
    label: '星车贷',
    value: 'kaisiLoan'
  },
  basicinfo: {
    imgPath: 'xingchebase.jpg'
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
      type: 'mySelect',
      props: {
        title: '贷款期限',
        defaultVal: '90天',
        selectType: 'term',
        isShowSelect: false,
        isTriggerClick: false,
        isBorder: false,
        label: 'label',
        value: 'value',
        isNoArrow: true,
        list: [
          {
            label: '90天',
            value: 1
          }
        ]
      },
      model: 'loanPerods'
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
      type: 'myInput',
      props: {
        label: '营业执照号',
        type: 'text',
        placeholder: '营业执照号/社会统一信用代码',
        value: ''
      },
      model: 'comLicense'
    },
    {
      type: 'myLable',
      props: {
        label: '经营地址'
      }
    },
    {
      type: 'myDistPicker',
      props: {
        isAll: true,
        needDist: {
          110000: '北京市',
          310000: '上海市'
        },
        defaultVal: '北京市-市辖区-朝阳区'
      },
      province: '北京市',
      city: '市辖区',
      area: '朝阳区',
      model: 'city'
    },
    {
      type: 'myInput',
      props: {
        label: '详细地址',
        type: 'text',
        placeholder: '请填写详细经营地址',
        value: ''
      },
      model: 'address'
    }
  ],
  applycomplete: {
    imgPath: 'icon-car.png',
    info: info
  },
  loandetail: {
    info: info
  },
  prepaymentapply: {
    imgPath: 'icon-fish.png',
    info: info
  }
}
export default kaiSiLoanData

