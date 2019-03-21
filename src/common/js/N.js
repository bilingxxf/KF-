/**
 * 
 * 
 */

//小数点后几位
function exchange(num, a) {
    num = scientificToNumber(num)
    num = num + ''
    var arr = num.split('.')
    if (!arr[1]) {
        arr[1] = '0'
    }
    arr[1] += '0000000000'
    if (a) {
        arr[1] = arr[1].substring(0, a)
        if (arr[0] + '.' + arr[1] == 0) {
            return '0.0'
        } else {
            return arr[0] + '.' + arr[1]
        }
    } else {
        return num
    }
}
//科学记数法
//暂时弃用
/** 
function scientificToNumber(oldA) {
    // 判断是否科学计数法,是则进行转换
    var amount = oldA 
    var num = 0;
    var result = [];
    amount = new String(amount);
    if ((amount.indexOf('E') != -1) || (amount.indexOf('e') != -1)) {
        (amount.indexOf('E') != -1) ? num = amount.indexOf('E'): num = amount.indexOf('e');
        var decimal = amount.substr(0, num);
        // devide the sentice efficial number
        var decArr = decimal.split('.', 2);
        // total 10 power
        var power = amount.substr(num + 1, amount.length);
        // symbol + -
        var symbol = power.substr(0, 1);
        power = power.substr(1, power.length);
        power = power * 1.0;
        if ('+' == symbol) {
            // the number of 0 is power - decArr[1]
            power = power - decArr[1].length;
            // the return data
            while (power > 0) {
                result.unshift(0);
                power -= 1;
            }
            result.unshift(decArr[1] * 1.0);
            result.unshift(decArr[0] * 1.0);
        } else {
            if (!decArr[1]) {
                var decArr1 = 1
            } else {
                var decArr1 = decArr[1].length
            }
            power = power - decArr1;
            var result = [0];
            result.push('.');
            while (power > 0) {
                result.push(0);
                power -= 1;
            }
            result.push(decArr);
        }
    }
    result.join("");
    result = result + '';
    amount = result.replace(/,/g, '');
    if (amount) {
        return amount;
    } else {
        return oldA
    }
}*/

function scientificToNumber(num) {

    num = num + ''
    if ((num.indexOf('E') != -1) || (num.indexOf('e') != -1)) {
        num = Number(num) || 0
        var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
        num = num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
    }
    if(num.indexOf("市价") > -1) {
        return num
    }
    return toTest(num)
}

function toTest(el) {
    if (el) {
        el = el + ''
        // el = el.replace(/[^\d+\.?\d*]/g, '')

        el = el.replace(/[^\d\.]/g, '');
        //必须保证第一个为数字而不是.
        el = el.replace(/^\./g, '');
        //保证第一位只能有一个或0个0
        el = el.replace(/^0{2,}/, '0');
        //以0开始的第二位只能为小数点
        el = el.replace(/^0[\d]/, '0');
        //保证只有出现一个.而没有多个.
        el = el.replace(/\.{2,}/g, '.');
        //保证.只出现一次，而不能出现两次以上
        el = el.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        if (el.length > 14) {
            el = el.substring(0, 14)
        }
    }
    return el + ''
}
/**
 * 浮点溢出解决方案 （ 0.1 + 0.2 != 0.3）
 * 
 */
//加法
var accAdd = function (num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var dec1, dec2, times;
    try { dec1 = countDecimals(num1) + 1; } catch (e) { dec1 = 0; }
    try { dec2 = countDecimals(num2) + 1; } catch (e) { dec2 = 0; }
    times = Math.pow(10, Math.max(dec1, dec2));
    // var result = (num1 * times + num2 * times) / times;
    var result = (accMul(num1, times) + accMul(num2, times)) / times;
    return getCorrectResult("add", num1, num2, result);
    // return result;
};
//减法
var accSub = function (num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var dec1, dec2, times;
    try { dec1 = countDecimals(num1) + 1; } catch (e) { dec1 = 0; }
    try { dec2 = countDecimals(num2) + 1; } catch (e) { dec2 = 0; }
    times = Math.pow(10, Math.max(dec1, dec2));
    // var result = Number(((num1 * times - num2 * times) / times);
    var result = Number((accMul(num1, times) - accMul(num2, times)) / times);
    return getCorrectResult("sub", num1, num2, result);
    // return result;
};
//除法
var accDiv = function (num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var t1 = 0,
        t2 = 0,
        dec1, dec2;
    try { t1 = countDecimals(num1); } catch (e) {}
    try { t2 = countDecimals(num2); } catch (e) {}
    dec1 = convertToInt(num1);
    dec2 = convertToInt(num2);
    var result = accMul((dec1 / dec2), Math.pow(10, t2 - t1));
    return getCorrectResult("div", num1, num2, result);
    // return result;
};
//乘法
var accMul = function (num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var times = 0,
        s1 = num1.toString(),
        s2 = num2.toString();
    try { times += countDecimals(s1); } catch (e) {}
    try { times += countDecimals(s2); } catch (e) {}
    var result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times);
    return getCorrectResult("mul", num1, num2, result);
    // return result;
};

var countDecimals = function (num) {
    var len = 0;
    try {
        num = Number(num);
        var str = num.toString().toUpperCase();
        if (str.split('E').length === 2) { // scientific notation
            var isDecimal = false;
            if (str.split('.').length === 2) {
                str = str.split('.')[1];
                if (parseInt(str.split('E')[0]) !== 0) {
                    isDecimal = true;
                }
            }
            let x = str.split('E');
            if (isDecimal) {
                len = x[0].length;
            }
            len -= parseInt(x[1]);
        } else if (str.split('.').length === 2) { // decimal
            if (parseInt(str.split('.')[1]) !== 0) {
                len = str.split('.')[1].length;
            }
        }
    } catch (e) {
        throw e;
    } finally {
        if (isNaN(len) || len < 0) {
            len = 0;
        }
        return len;
    }
};

var convertToInt = function (num) {
    num = Number(num);
    var newNum = num;
    var times = countDecimals(num);
    var temp_num = num.toString().toUpperCase();
    if (temp_num.split('E').length === 2) {
        newNum = Math.round(num * Math.pow(10, times));
    } else {
        newNum = Number(temp_num.replace(".", ""));
    }
    return newNum;
};

var getCorrectResult = function (type, num1, num2, result) {
    var temp_result = 0;
    switch (type) {
    case "add":
        temp_result = num1 + num2;
        break;
    case "sub":
        temp_result = num1 - num2;
        break;
    case "div":
        temp_result = num1 / num2;
        break;
    case "mul":
        temp_result = num1 * num2;
        break;
    }
    if (Math.abs(result - temp_result) > 1) {
        return temp_result;
    }
    return result;
};

export { exchange, scientificToNumber, accAdd, accSub, accDiv, accMul }