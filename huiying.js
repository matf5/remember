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
    content: '需要加班餐记得点加班餐啦，https://meican.com',
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
    content: '9点了！刷加班券走人啦！',
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
// schedule.scheduleJob('0 30 11 * * 1', () => {
//   notify()
// })
// notify(serviceSuccess);

notify({
  tag: 'text',
  text: {
    content: 'Please attach the PRD link and name here if you want to review in today\'s internal meeting. https://docs.google.com/document/d/1a5QRewc8Am2bkBpj-N6scMlxtajax-IlsMz6rBIDMM0/edit',
    at_all: true
  }
});
