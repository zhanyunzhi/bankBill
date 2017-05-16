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
    formatBankNum: function (str) {
        //let strF = 0;
        str += '';
        str = str.replace(/,/g, "");
        let patrn = /^\d+(\.\d+)?$/;
        if (!patrn.exec(str)) {
            alert("金额必须为数字！");
            return;
        }
/*        strF = parseFloat(str);
        if (isNaN(strF)) {
            alert('您的输入有误！');
            return str;
        }*/
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
    }
}