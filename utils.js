module.exports = {
  // formatDate：按指定的格式字符串输出日期
  // 调用方法：
  // require('date_fmt')
  // formatDate(Date(), "yyyy-MM-dd hh:mm")
  formatDate:  function(date,fmtstr) {
    Date.prototype.format = function(fmt) {
      var o = {
        "q+" : Math.floor((this.getMonth()+3)/3), // 季度
        "M+" : this.getMonth()+1,                 // 月份
        "d+" : this.getDate(),                    // 日
        "h+" : this.getHours(),                   // 小时
        "m+" : this.getMinutes(),                 // 分
        "s+" : this.getSeconds(),                 // 秒
        "S"  : this.getMilliseconds()             // 毫秒
      };
      if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
      }
      for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(
            RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  
        }
      }
      return fmt;
    }
    return new Date(date).format(fmtstr)
  }
}
