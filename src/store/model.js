export default {
  baseNotice: [],
  products: [],
  share: {
    url: '',
    contents: []
  },
  user: {
    // 未读消息的数量
    unread_notifications_count: 0,
    // 是否充值过
    has_recharge: false,
    activity: false,
    hash: '',
    name: '',
    parent: {
      name: '',
      created_at: '',
      level: null,
      invite_award: 0,
    },
    id: 0,
    c_id: 0,
    l_id: 0,
    invite: {
      total: 0,
      totao_1: 0,
      totao_2: 0,
      totao_3: 0,
      totao_4: 0,
      totao_5: 0,
      totao_6: 0,
      totao_7: 0,
      totao_8: 0,
      totao_9: 0,
      totao_10: 0,
    },
  },
  // 一天的剩余秒数
  left_secs: 86400,
  product_data: {
    balance: {
      interest: 0,
      property: 0,
      today_estimate: 0
    },
    usdt: {
      interest: 0,
      property: 0,
      today_estimate: 0,
    }
  },
  money_bao: {
    balance: 0, // 法币余额
    give_balance: 0, // 赠送金余额
    usdt_balance: 0, // usdt_余额
    money_bao_count: {
      balance_earnings: 0, // 余额总收益，利息与佣金之和
      balance_interest: 0, // 余额总利息
      give_balance_earnings: 0, // 赠送金_余额总收益
      usdt_balance_earnings: 0, // usdt_余额总收益，利息与佣金之和
      usdt_balance_interest: 0, // usdt_余额总利息
      yesterday_balance_interest: 0, // 昨天余额总利息
      yesterday_give_balance_earnings: 0, // 昨天赠送金_余额总收益
      yesterday_usdt_balance_interest: 0, // 昨天usdt_余额总利息
    }
  },
  // 赚钱宝年化
  money_bao_rate: {
    mb_balance_rate: 0,
    mb_give_rate: 0,
    mb_usdt_rate: 0
  },
  wallet: {
    balance: 0, // 法币余额
    give_balance: 0, // 赠送金余额
    usdt_balance: 0, // usdt_余额
    wallet_count: {
      balance_commission: 0, // 余额总佣金
      balance_earnings: 0, // 余额总收益，利息与佣金之和
      balance_interest: 0, // 余额总利息
      balance_recharge: 0, // 余额总充值
      balance_withdraw: 0, // 余额总提现
      give_balance_award: 0, // 获得的总赠送金
      give_balance_earnings: 0, // 赠送金_余额总收益
      give_balance_recharge: 0, // 赠送金_余额总获得
      usdt_balance_commission: 0, // usdt_余额总佣金
      usdt_balance_earnings: 0, // usdt_余额总收益，利息与佣金之和
      usdt_balance_interest: 0, // usdt_余额总利息
      usdt_balance_recharge: 0, // usdt_余额总充值
      usdt_balance_withdraw: 0 // usdt_余额总提现
    }
  },
  all_property: {
    balance: {
      freeze: 0,
      property: 0,
      usable: 0
    },
    usdt: {
      freeze: 0,
      property: 0,
      usable: 0
    },
    give: {
      freeze: 0,
      property: 0,
      usable: 0
    }
  },
  system: {
    // 语言列表
    lang_list: [
      {
        icon: require('../assets/images/country/CN.png'),
        name: "简体中文",
        slug: "CN"
      },
      {
        icon: require('../assets/images/country/EN.png'),
        name: "English",
        slug: "EN"
      },
      {
        icon: require('../assets/images/country/ID.png'),
        name: "Indonesia",
        slug: "ID"
      },
    ],
    // 默认语言
    default_lang: 'EN',
    // 默认货币符号
    default_currency: '',
    // 汇率(1usdt等于多少的当前货币)
    usdt_money_rate: 1,
    // 时区
    timezone: 'Aisa/Jakarta',
    time_format: 'yyyy-mm-dd HH:MM:SS',
    show_suffix: false,
    // 客服
    service: {},
    // 国家代码
    country_code: [],
    // 谷歌人机验证
    open_recaptcha: true,
    // 短信验证
    is_sms_reg: true,
    web_recaptcha_key: '',
    // 流水类型
    wallet_slug: {
      commission: "commission",
      deposit: "deposit",
      interest: "interest",
      other: "other",
      recharge: "recharge",
      takeOut: "takeOut",
      transform: "transform",
      withdraw: "withdraw",
    },
    wallet_type: [
      {
        key: 'give',
        value: ''
      },
      {
        key: 'balance',
        value: '',
      },
      {
        key: 'usdt',
        value: '',
      },
    ]
  },
  coin_unit: {
    usdt: 8,
    balance: 2
  },
  init: false,
  dynamic_init: false,
};
