import axios from 'axios'
import qs from 'qs'
import { Message } from "iview"
import res from '../static/config'
import resOnline from '../static/configOnline'

import store from './store/store.js'
import router from './routes'
import utils from './utils'
import langVm from './langVue'

import validation from '../static/lang/validation'
import validindex from '../static/lang/validindex'

const tempEngine = (function () {
    var pattern = /\:(\w*[:]*[=]*\w+)(?!})/g;
    return function (template, json) {
        return template.replace(pattern, function (match, key, value) {
            return typeof json[key] == 'undefined' ? ':' + key : json[key];
        });
    }
})();

// axios初始化配置
axios.defaults.timeout = 10000;
const domain = window.location.origin;
if (domain.indexOf('localhost') == -1) {
    axios.defaults.baseURL = resOnline.url;
} else {
    axios.defaults.baseURL = res.url;
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// if (!utils.isLogin()) {
//     axios.defaults.headers['Authorization'] = 'Bearer';
// } else {
//     axios.defaults.headers['Authorization'] = 'Bearer' + utils.getCookie('token');
// }

// axios.defaults.headers['Appname'] = 'pc'


// 请求状态拦截
axios.interceptors.request.use(
    (request) => {
        request.headers['Authorization'] = 'Bearer' + utils.getCookie('token');
        if (request.method === 'get') {
            request.data = request.data
        } else if (request.method === 'post' && request.headers.hasOwnProperty('Content-Type')) {
            request.data = qs.stringify(request.data)
        } else {
            request.data = qs.stringify(request.data)
        }
        return request
    }, (error) => {
        return Promise.reject(error)
    });

// 返回状态拦截
axios.interceptors.response.use(
    response => {
        if (response.data.status_code === 200) {
            // Message.success('成功！');
        } else if (response.data.status_code === 4049) {
            Message.error('银行卡输入有误，请重新输入');
        } else if (response.data.status_code === 5000) {
            Message.error(langVm.$t('message.Reject.UserExist'));
        } else if (response.data.status_code === 5001) {
            Message.error(langVm.$t('message.Reject.EmailExist'));
        } else if (response.data.status_code === 5002) {
            Message.error(langVm.$t('message.Reject.CreateFailed'));
        } else if (response.data.status_code === 5003) {
            Message.error('验证码错误');
        } else if (response.data.status_code === 5004) {
            Message.error(langVm.$t('message.Reject.InvalidUserNot'));
        } else if (response.data.status_code === 5005) {
            Message.error(langVm.$t('message.Reject.WrongPassword'));
        } else if (response.data.status_code === 5006) {
            Message.error(langVm.$t('message.Reject.OperationTryLater'));
        } else if (response.data.status_code === 5007) {
            Message.error(langVm.$t('message.Reject.SendFailedAgain'));
        } else if (response.data.status_code === 5008) {
            Message.error(langVm.$t('message.Reject.ModifyFailedTry'));
        } else if (response.data.status_code === 5009) {
            Message.error(langVm.$t('message.Reject.InformaObtainFailed'));
        } else if (response.data.status_code === 5010) {
            console.log(5010)
            console.log(response)
            if (utils.isLogin()) {
                Message.error(langVm.$t('message.LoginFailReLogin'));
            }
            let params = {
                isLogin: false
            };
            store.commit('LOGOUT', params);
            router.replace({
                path: '/login'
            });
        } else if (response.data.status_code === 5011) {
            Message.error(langVm.$t('message.Reject.AuthorizeFailed'));
        } else if (response.data.status_code === 5012) {
            Message.error(langVm.$t('message.LoginFail'));
        } else if (response.data.status_code === 5013) {
            Message.error(langVm.$t('message.Reject.CreationLimited'));
        } else if (response.data.status_code === 5014) {
            Message.error(langVm.$t('message.Reject.DelectFailed'));
        } else if (response.data.status_code === 5015) {
            Message.error(langVm.$t('message.Reject.Verifieds'));
        } else if (response.data.status_code === 5016) {
            Message.error('未设置资金密码!');
        } else if (response.data.status_code === 5017) {
            Message.error('资金密码错误!');
        } else if (response.data.status_code === 5018) {
            Message.error(langVm.$t('message.Reject.GetFileFailed'));
        } else if (response.data.status_code === 5020) {
            Message.error(langVm.$t('message.Reject.InvalidInvitationCode'));
        } else if (response.data.status_code === 5021) {
            Message.error(langVm.$t('message.Reject.UnboundS'));
        } else if (response.data.status_code === 5022) {
            Message.error(langVm.$t('message.Reject.CanNotEmpty'));
        } else if (response.data.status_code === 5023) {
            Message.error(langVm.$t('message.Reject.Bonds'));
        } else if (response.data.status_code === 5024) {
            Message.error(langVm.$t('message.Reject.CellVerifiFailed'));
        } else if (response.data.status_code === 5025) {
            Message.error(langVm.$t('message.Reject.RegistraCloseGoogle'));
        } else if (response.data.status_code === 5026) {
            Message.error(langVm.$t('message.Reject.GAuthenLinkFailed'));
        } else if (response.data.status_code === 5027) {
            Message.error(langVm.$t('message.Reject.FailedGetVeCode'));
        } else if (response.data.status_code === 5028) {
            Message.error(langVm.$t('message.Reject.IllegalRegister'));
        } else if (response.data.status_code === 5029) {
            Message.error(langVm.$t('message.Reject.PleaseEnterCellNum'));
        } else if (response.data.status_code === 5030) {
            Message.error(langVm.$t('message.Reject.AccountNotExist'));
        } else if (response.data.status_code === 5031) {
            Message.error(langVm.$t('message.Reject.PaymentQRCodeExist'));
        } else if (response.data.status_code === 5032) {
            Message.error('证件号已存在');
        } else if (response.data.status_code === 5034) {
            Message.error('证件信息错误，请检查')
        } else if (response.data.status_code === 5035) {
            Message.error('登录超时，请重新登录')
        } else if (response.data.status_code === 5038) {
            Message.error('新密码与旧密码不能相同！')
        } else if (response.data.status_code === 5039) {
            Message.error('原始密码错误，请重新输入！')
        } else if (response.data.status_code === 6001) {
            // Message.error('需要进行二次验证!');
        } else if (response.data.status_code === 6002) {
            Message.error(langVm.$t('message.Reject.TextTypeNoExist'));
        } else if (response.data.status_code === 6003) {
            Message.error(langVm.$t('message.Reject.ErrorParameter'));
        } else if (response.data.status_code === 6004) {
            Message.error(langVm.$t('message.Reject.OrdersDontExist'));
        } else if (response.data.status_code === 6005) {
            Message.error(langVm.$t('message.Reject.PaymentMethodNoExist'));
        } else if (response.data.status_code === 6006) {
            Message.error(langVm.$t('message.Reject.PhoneUnbound'));
        } else if (response.data.status_code === 6007) {
            Message.error(langVm.$t('message.Reject.UnverifiedS'));
        } else if (response.data.status_code === 6008) {
            Message.error(langVm.$t('message.Reject.UnverifiedNo'));
        } else if (response.data.status_code === 6009) {
            Message.error(langVm.$t('message.Reject.EmaiLPhoneNoEmpty'));
        } else if (response.data.status_code === 6010) {
            Message.error(langVm.$t('message.Reject.InvalidVerifiCode'));
        } else if (response.data.status_code === 6011) {
            Message.error(langVm.$t('message.Reject.ThePhoneExist'));
        } else if (response.data.status_code === 6012) {
            Message.error(langVm.$t('message.Reject.EnterEmailA'));
        } else if (response.data.status_code === 6013) {
            Message.error(langVm.$t('message.Reject.AreaCodeNoEmpty'));
        } else if (response.data.status_code === 6014) {
            Message.error(langVm.$t('message.Reject.EnterCellNumber'));
        } else if (response.data.status_code === 6015) {
            Message.error(langVm.$t('message.Reject.UserNameExist'));
        } else if (response.data.status_code === 6016) {
            Message.error(langVm.$t('message.Reject.SendSMSVerifiCode'));
        } else if (response.data.status_code === 6017) {
            Message.error(langVm.$t('message.Reject.SendEmailVerifiC'));
        } else if (response.data.status_code === 6018) {
            Message.error(langVm.$t('message.Reject.VerifySMSVeriC'));
        } else if (response.data.status_code === 6019) {
            Message.error(langVm.$t('message.NetworkAnomaly'));
        } else if (response.data.status_code === 6020) {
            Message.error(langVm.$t('message.Reject.WrongUserName'));
        } else if (response.data.status_code === 6021) {
            Message.error(langVm.$t('message.Register.PleaseGecurityVer'));
        } else if (response.data.status_code === 6022) {
            // Message.error('请先进行高级认证'); 
        } else if (response.data.status_code === 6023) {
            // Message.error('高级认证审核中请耐心等待');
        } else if (response.data.status_code === 6024) {
            // Message.error('请先进行实名认证');
        } else if (response.data.status_code === 6025) {
            // Message.error('您已是广告主');
        } else if (response.data.status_code === 6026) {
            // Message.error('您申请的广告主正在审核中，请耐心等待');
        } else if (response.data.status_code === 6027) {
            Message.error('申请失败请重试！');
        } else if (response.data.status_code === 6028) {
            // Message.error('请先申请成为广告主');
        } else if (response.data.status_code === 6029) {
            Message.error('添加黑名单失败！');
        } else if (response.data.status_code === 6030) {
            Message.error('黑名单中用户已存在！');
        } else if (response.data.status_code === 7001) {
            Message.error('资产信息为空！');
        } else if (response.data.status_code === 7002) {
            Message.error('提现余额不足！');
        } else if (response.data.status_code === 7003) {
            Message.error('数据不存在！');
        } else if (response.data.status_code === 7004) {
            // Message.error('币种已禁用或限制提币！');
        } else if (response.data.status_code === 7005) {
            Message.error('提现值大于单次提现额度！');
        } else if (response.data.status_code === 7006) {
            Message.error('转至账户不存在该币种！');
        } else if (response.data.status_code === 7007) {
            Message.error('该币种禁止划转！');
        } else if (response.data.status_code === 7008) {
            Message.error('划转失败！');
        } else if (response.data.status_code === 7009) {
            Message.error('划转金额大于可用金额！');
        } else if (response.data.status_code === 7010) {
            Message.error('验证方式错误！');
        } else if (response.data.status_code === 7011) {
            Message.error('提现操作失败！');
        } else if (response.data.status_code === 7012) {
            Message.error('获取充值地址失败！');
        } else if (response.data.status_code === 7013) {
            Message.error('钱包地址不能相同！')
        } else if (response.data.status_code === 7014) {
            Message.error('重置登录密码后24小时内禁止提币！')
        } else if (response.data.status_code === 7015) {
            Message.error('提现地址不合法！')
        } else if (response.data.status_code === 7017) {
            Message.error('请输入正确的划转金额！')
        } else if (response.data.status_code === 7018) {
            Message.error('系统内测中！')
        } else if (response.data.status_code === 7019) {
            Message.error('禁止转入自己账户！')
        } else if (response.data.status_code === 8001) {
            // Message.error('请绑定并激活支付方式');
        } else if (response.data.status_code === 8002) {
            Message.error('至少要选择一种支付方式');
        } else if (response.data.status_code === 8003) {
            Message.error('广告位不存在');
        } else if (response.data.status_code === 8004) {
            Message.error('该广告位已是下架状态');
        } else if (response.data.status_code === 8005) {
            Message.error('操作失败');
        } else if (response.data.status_code === 8006) {
            Message.error('不能添加自己到黑名单');
        } else if (response.data.status_code === 8007) {
            Message.error('获取广告主信息失败');
        } else if (response.data.status_code === 8008) {
            Message.error('支付方式和广告主的支付方式不匹配，请先绑定相应的支付方式');
        } else if (response.data.status_code === 8009) {
            Message.error('交易信息不存在');
        } else if (response.data.status_code === 8010) {
            Message.error('不能交易本人的订单');
        } else if (response.data.status_code === 8011) {
            Message.error('广告主不存在');
        } else if (response.data.status_code === 8012) {
            Message.error('出价范围最小值不能大于最大值');
        } else if (response.data.status_code === 8014) {
            // Message.error('钱包KT可用余额不足，请先完成充值');
        } else if (response.data.status_code === 8016) {
            Message.error('申请广告位失败请重试');
        } else if (response.data.status_code === 8017) {
            Message.error('广告位申请失败,资金冻结取消失败,请联系管理员');
        } else if (response.data.status_code === 8018) {
            Message.error('金额要大于等于最小限额');
        } else if (response.data.status_code === 8024) {
            Message.error('申请提币失败');
        } else if (response.data.status_code === 8027) {
            if (response.request.responseURL.indexOf('noMessage=true') === -1) Message.error('实名认证审核中');
        } else if (response.data.status_code === 8028) {
            // Message.error('广告主申请被拒绝,请重新申请');
        } else if (response.data.status_code === 8030) {
            // Message.error('广告主已被禁用,请重新申请广告主');
        } else if (response.data.status_code === 8031) {
            Message.error('币数量不能小于0');
        } else if (response.data.status_code === 8032) {
            Message.error('24小时内已累计取消超过限制，请稍后进行交易');
        } else if (response.data.status_code === 8034) {
            Message.error('请填写资金密码');
        } else if (response.data.status_code === 8035) {
            Message.error('您还有未完成的交易,请先完成交易');
        } else if (response.data.status_code === 8026) {
            console.log(8026)
            console.log(response)
            let params = {
                isLogin: false
            };
            store.commit('LOGOUT', params);
            router.replace({
                path: '/login'
            });
            Message.error('不是你的订单，不能进行查看');
        } else if (response.data.status_code === 8037) {
            // Message.error('商户审核通过后，30天内禁止提币');
        } else if (response.data.status_code === 8038) {
            Message.error('您还有交易中的广告，暂时不允许解冻保证金');
        } else if (response.data.status_code === 8039) {
            Message.error('当前订单已完成');
        }
        else if (response.data.status_code === 9001) {
            Message.error('获取币币交易购买列表失败');
        } else if (response.data.status_code === 9002) {
            Message.error('获取币币交易购买详情失败');
        } else if (response.data.status_code === 9003) {
            Message.error('取消购买币币交易失败');
        } else if (response.data.status_code === 9004) {
            Message.error('创建币币交易买失败');
        } else if (response.data.status_code === 9005) {
            Message.error('请填写币币交易买入价格');
        } else if (response.data.status_code === 9006) {
            Message.error('实名认证审核中');
        } else if (response.data.status_code === 9007) {
            Message.error('请先进行高级实名认证');
        } else if (response.data.status_code === 9008) {
            Message.error('高级实名认证审核中');
        } else if (response.data.status_code === 9009) {
            Message.error('获取用户PIN失败');
        } else if (response.data.status_code === 9011) {
            Message.error('获取用户邮箱失败');
        } else if (response.data.status_code === 9012) {
            Message.error('发送邮件失败');
        } else if (response.data.status_code === 9014) {
            Message.error('用户余额不足');
        } else if (response.data.status_code === 9015) {
            Message.error('获取用户手机号失败');
        } else if (response.data.status_code === 9016) {
            Message.error('用户手机号为空');
        } else if (response.data.status_code === 9017) {
            Message.error('用户邮箱地址为空');
        } else if (response.data.status_code === 9018) {
            Message.error('发送邮件失败');
        } else if (response.data.status_code === 9020) {
            Message.error('交易对不存在');
        } else if (response.data.status_code === 9021) {
            Message.error('未绑定google');
        } else if (response.data.status_code === 9022) {
            // Message.error('google验证码填写错误');
        } else if (response.data.status_code === 9023) {
            Message.error('请填写币币交易卖出价格');
        } else if (response.data.status_code === 9024) {
            Message.error('创建币币交易卖失败');
        } else if (response.data.status_code === 9025) {
            Message.error('获取币币交易出售列表失败');
        } else if (response.data.status_code === 9026) {
            Message.error('取消出售币币交易失败');
        } else if (response.data.status_code === 9027) {
            Message.error('获取用户资产列表失败');
        } else if (response.data.status_code === 9028) {
            Message.error('获取用户资产详情失败');
        } else if (response.data.status_code === 9029) {
            Message.error('获取交易对列表失败');
        } else if (response.data.status_code === 9030) {
            Message.error('获取币币交易买交易单详情列表失败');
        } else if (response.data.status_code === 9031) {
            Message.error('获取币币交易卖交易单详情列表失败');
        } else if (response.data.status_code === 9032) {
            Message.error('获取所有币列表失败');
        } else if (response.data.status_code === 9033) {
            Message.error('获取币信息失败');
        } else if (response.data.status_code === 9034) {
            Message.error('该币种不存在');
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
            case 500:
                {
                    if (typeof (error.response.data.status_code) == 'object')
                    {
                        var res = error.response.data.status_code;
                        for (let key in res)
                        {
                            // console.log(localStorage.getItem('lang'));
                            // 存在message
                            if (typeof (validation[key]) != 'undefined')
                            {
                                var data;
                                var message;
                                var template = validation[key];
                                for (let name in res[key])
                                {
                                    data = JSON.parse(res[key][name]);
                                    data['attribute'] = typeof (validindex[name]) != 'undefined' ? validindex[name] : '';
                                }
                                message = tempEngine(template, data);
                                // Message.error(message);
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return Promise.reject(error)
    }
);

function filter_url_nocache (url) {
    const index = url.indexOf('?') >= 0
    const query = index ? '&_=' : '?_='
    return url + query + new Date().getTime();
}

// post请求
const post = (url, params) => {
    return new Promise((resolve, reject) => {
        url.indexOf('?')
        axios.post(filter_url_nocache(url), params)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
};

// get请求
const get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(filter_url_nocache(url), { params })
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
};

// patch请求
const patch = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.patch(filter_url_nocache(url), params)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
};


// delete请求
const del = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.delete(filter_url_nocache(url), { params })
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
};

export default {
    get,
    post,
    del,
    patch
}
