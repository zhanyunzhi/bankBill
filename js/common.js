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
}