var schedule = require('node-schedule');
const request = require('request');

const foodyBody = {
  tag: 'text',
  text: {
    content: '可以点外卖啦',
    at_all: true
  }
}
const meicanBody = {
  tag: 'text',
  text: {
    content: '可以点加班餐啦，https://meican.com',
    at_all: true
  }
}
const eatBody = {
  tag: 'text',
  text: {
    content: '可以去吃饭啦',
    at_all: true
  }
}
const goHomeBody = {
  tag: 'text',
  text: {
    content: '9点了！快打车或刷加班券！',
    at_all: true
  }
}
const serviceSuccess = {
  tag: 'text',
  text: {
    content: '通知服务启动成功' + new Date()
  }
}
const notify = (obj) => {
  request({
    url: 'https://openapi.seatalk.io/webhook/group/TUQjtWZuRLCQDaX92HVVgw',
    method: 'POST',
    body: JSON.stringify(obj)
  })
}
const isWorkDays = () => new Date().getDay() < 6 && new Date().getDay() > 0;
// 外卖
schedule.scheduleJob('0 0 11 * * *', function(){
  isWorkDays() && notify(foodyBody);
});
// 加班餐
schedule.scheduleJob('0 30 11 * * *', function(){
  isWorkDays() && notify(meicanBody);
});
// 吃饭
schedule.scheduleJob('0 0 19 * * *', function(){
  isWorkDays() && notify(eatBody);
});
// 吃饭
schedule.scheduleJob('0 0 21 * * *', function(){
  isWorkDays() && notify(goHomeBody);
});
notify(serviceSuccess);
