/**
 * Created by Tiny on 2017/5/15.
 */
module.exports =  {
    formatDateOne: function(strTime){               //��ʽ��ʱ��Ϊyyyy-mm-dd������һ��ʱ�������
        let date = new Date(strTime);
        let year = date.getFullYear();
        let month = date.getMonth()+1 >= 10 ? date.getMonth()+1 : '0'+(date.getMonth()+1);
        let day = date.getDate();
        return year + "-" + month + "-" + day;
    },
}