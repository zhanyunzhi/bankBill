/**
 * Created by Tiny on 2017/5/15.
 */
import fetch from './fetch-polyfill';
module.exports =  {
    /**
     * 让fetch也可以timeout
     *  timeout不是请求连接超时的含义，它表示请求的response时间，包括请求的连接、服务器处理及服务器响应回来的时间
     * fetch的timeout即使超时发生了，本次请求也不会被abort丢弃掉，它在后台仍然会发送到服务器端，只是本次请求的响应内容被丢弃而已
     * @param {Promise} fetch_promise    fetch请求返回的Promise
     * @param {number} [timeout=10000]   单位：毫秒，这里设置默认超时时间为10秒
     * @return 返回Promise
     */
    timeoutFetch: function(fetch_promise,timeout = 10000){
        let timeout_fn = null;
        //这是一个可以被reject的promise
        let timeout_promise = new Promise(function(resolve, reject) {
            timeout_fn = function() {           //通过调用timeout_fn触发timeout_promise的reject
                reject('timeout promise');
            };
        });
        //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
        //Promise.race(iterable)方法返回一个promise，这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
        //也就是通过reject  timeout_promise来同时达到reject fetch_promise的目的
        //或者是fetch_promise先resolve了，那么timeout_promise也resolve了，也就不触发超时了
        let abortable_promise = Promise.race([
            fetch_promise,
            timeout_promise
        ]);
        setTimeout(function() {
            timeout_fn();
        }, timeout);
        return abortable_promise ;
    },
    /**
     * @param {string} url 接口地址
     * @param {string} method 请求方法：GET、POST，只能大写
     * @param {JSON} [params=''] body的请求参数，默认为空
     * @return 返回Promise
     * 如何调用GET
     * Request.fetchRequest('thinkphp5.0/public/index/index/rn?id=1','GET','','',10000)
     *  .then(res => {
     *      //成功返回
     *   })
     *  .catch((err) => {
     *      //失败返回
     *   });
     * 如何调用POST
     * let params = {id:'1'}
     * Request.fetchRequest('thinkphp5.0/public/index/index/rn','POST',params,'',10000)
     *  .then(res => {
     *      //成功返回
     *   })
     *  .catch((err) => {
     *      //失败返回
     *   });
     */
    fetchRequest: function(url, method, params='', token='', timeout=10000){
        let common_url = 'http://192.168.31.163/';          //家里
        //let common_url = 'http://192.168.31.163/';        //公司
        //let common_url = 'http://120.25.58.101:8088/';         //线上
        let fetch_param = {};
        let header = {
            "Content-Type": "application/json;charset=UTF-8",
        };
        if(params == ''){   //如果网络请求中带没有参数
            fetch_param = {
                method: method,
                headers: method=='GET'?null:header,
                timeout:timeout
            }
        }else {         //如果网络请求中带有参数
            fetch_param = {
                method: method,
                headers: method=='GET'?null:header,
                body: method=='GET'?null:JSON.stringify(params),   //body参数，通常需要转换成字符串后服务器才能解析
                timeout:timeout
            }
        }
        let promise = new Promise(function(resolve,reject) {            //新建一个promise用于异步返回后的处理
            fetch(common_url + url, fetch_param)
                .then((response) => response && response.json())
                .then((responseData) => {
                    resolve(responseData);
                })
                .catch((err) => {
                    reject(err);
                });
        })
        return promise;
    },
}