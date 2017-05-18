/**
 * Created by Tiny on 2017/5/15.
 */
module.exports =  {
    formatDateOne: function(strTime){               //格式化时间为yyyy-mm-dd，传入一个时间戳参数
        let date = new Date(strTime);
        let year = date.getFullYear();
        let month = date.getMonth()+1 >= 10 ? date.getMonth()+1 : '0'+(date.getMonth()+1);
        let day = date.getDate();
        return year + "-" + month + "-" + day;
    },
    formatBankMoney: function (str) {     //格式化输入的金额，格式为：100,000.00
        str += '';
        str = str.replace(/,/g, "");
        let patrn = /^\d+(\.\d+)?$/;
        if (!patrn.exec(str)) {
            alert("金额必须为数字！");
            return;
        }
        var newStr = "";
        var count = 0;
        if (str.indexOf(".") == -1) {
            for (var i = str.length - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
            str = newStr + ".00"; //自动补小数点后两位
            console.log(str)
        }
        else {
            for (var i = str.indexOf(".") - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr; //逐个字符相接起来
                }
                count++;
            }
            str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
            console.log(str)
        }
        return str;
    },
    formatBankNum: function (str){          //格式化银行账号：1234****6789
        str += '';
        str = str.replace(/\*/g, "");
        let patrn = /^\d+(\d+)?$/;
        let len = str.length;
        if (!patrn.exec(str)) {
            alert("银行账号必须为数字！");
            return;
        }
        if(len<8){
            alert("银行账号必须大于8位数！");
            return;
        }
        str = str.substr(0,4) + "****" + str.substr(len-4,len-1);
        return str;
    },
    checkBankNum: function(str) {
        str += '';
        let patrn = /^\d{16,19}$/;          //验证16-19位数字
        if (!patrn.exec(str)) {
            alert("银行账号必须是数字且在16-19位之间！");
            return;
        }
        return str;
    }

}