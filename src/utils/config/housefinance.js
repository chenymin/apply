const info = [
  {
    label: '房屋地址',
    value: '',
    modal: 'houseAddress'
  },
  {
    label: '申请金额',
    value: '',
    modal: 'amount',
    unit: '万元'
  },
  {
    label: '贷款期数',
    value: '',
    modal: 'loanPerods'
  },
  {
    label: '还款方式',
    value: '',
    modal: 'repayType'
  },
  {
    label: '申请时间',
    value: '',
    modal: 'createTime'
  }
]
const houseFinanceData = {
  title: {
    label: '房金融',
    value: 'houseFinance'
  },
  basicinfo: {
    imgPath: 'house-base.jpg'
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
        placeholder: '最高可申请1000万',
        unit: '万元',
        value: '',
        isBorder: true,
        maxValue: 500,
        rule: 'required|max'
      },
      model: 'amount'
    },
    {
      type: 'mySelect',
      props: {
        title: '贷款期数',
        defaultVal: '3期',
        selectType: 'term',
        isShowSelect: false,
        isTriggerClick: true,
        isBorder: false,
        label: 'label',
        value: 'value',
        list: [
          {
            label: '3期',
            value: 1
          },
          {
            label: '6期',
            value: 2
          },
          {
            label: '9期',
            value: 3
          },
          {
            label: '12期',
            value: 4
          },
          {
            label: '24期',
            value: 5
          },
          {
            label: '36期',
            value: 6
          }
        ]
      },
      model: 'loanPerods'
    },
    {
      type: 'mySelect',
      props: {
        title: '还款方式',
        defaultVal: '等额本息',
        selectType: 'term',
        isShowSelect: false,
        isTriggerClick: true,
        isBorder: false,
        label: 'label',
        value: 'value',
        list: [
          {
            label: '等额本息',
            value: 1
          },
          {
            label: '按月付息，到期还本',
            value: 2
          }
        ]
      },
      model: 'repayType'
    },
    {
      type: 'myLable',
      props: {
        label: '借款人联系方式'
      }
    },
    {
      type: 'myInput',
      props: {
        label: '联系地址',
        type: 'text',
        placeholder: '请填写您居住的详细的地址',
        value: '',
        isBorder: true
      },
      model: 'address'
    },
    {
      type: 'myInput',
      props: {
        label: '联系邮箱',
        type: 'text',
        placeholder: '请填写您的电子邮箱',
        value: '',
        isBorder: true
      },
      model: 'mail'
    },
    {
      type: 'myLable',
      props: {
        label: '房产信息'
      }
    },
    {
      type: 'myDistPicker',
      props: {
        isAll: false,
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
        placeholder: '请填写您的房产详细地址',
        value: '',
        isBorder: true
      },
      model: 'houseAddress'
    },
    {
      type: 'myInput',
      props: {
        label: '产权人姓名',
        type: 'text',
        placeholder: '请填写产权人姓名',
        value: '',
        isBorder: true
      },
      model: 'propertyRights'
    }
  ],
  applycomplete: {
    imgPath: 'icon-house.png',
    materialnfo: {
      title: '申请房抵款，需要准备以下材料',
      list: [
        '1.身份证原件',
        '2.户口本原件',
        '3.房产证原件',
        '4.婚姻证明（结婚证、无配偶承若书、离婚证）',
        '5.征信报告',
        '6.银行流水',
        '7.银行卡'
      ]
    },
    info: info
  },
  loandetail: {
    info: info
  },
  prepaymentapply: {
    imgPath: 'icon-house.png',
    info: info
  }
}
export default houseFinanceData
