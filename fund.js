const request = require('request');
var schedule = require('node-schedule');

const isWorkDays = () => new Date().getDay() < 6 && new Date().getDay() > 0;
const isSupportHours = () => {
  return new Date().getHours() === 12 || new Date().getHours() === 15;
}
const getNotifyBody = (str) => {
  return {
    tag: 'text',
    text: {
      content: str
    }
  }
}
const requestForFund = () => {
  const fundUrl = 'https://matf5.github.io/matt-blog/fund.json';

  request(fundUrl, (error, response, body) => {
    console.log('fundArray', body);
    const codeReq = JSON.parse(body).join(',');
    request(`https://api.doctorxiong.club/v1/fund?code=${codeReq}`, (error, response, body) => {
      console.log('body:', body);
      const resultArr = JSON.parse(body).data;
      const content = resultArr.map((data) => {
        return `${data.name}: 净值估算${data.expectWorth}, 昨日涨跌：${data.dayGrowth}%, 当前预期涨跌：${data.expectGrowth}%`;
      }).join('\n');
      request({
        url: 'https://openapi.seatalk.io/webhook/group/TUQjtWZuRLCQDaX92HVVgw',
        method: 'POST',
        body: JSON.stringify(getNotifyBody(content))
      })
    });
  });
}
const requestForRank = () => {
  request('https://api.doctorxiong.club/v1/stock/industry/rank', (error, response, body) => {
    const resultArr = JSON.parse(body).data;
    let content = '';
    const upContent = resultArr.slice(0,5).map((data) => {
      return `${data.name}: 涨跌幅度：${data.changePercent}%`;
    }).join('\n');
    const offContent = resultArr.slice(-5).map((data) => {
      return `${data.name}: 涨跌幅度：${data.changePercent}%`;
    }).join('\n');
    content = `板块涨幅top5\n${upContent}\n\n板块跌幅top5\n${offContent}`;
    request({
      url: 'https://openapi.seatalk.io/webhook/group/TUQjtWZuRLCQDaX92HVVgw',
      method: 'POST',
      body: JSON.stringify(getNotifyBody(content))
    });
  });
}
requestForFund();
requestForRank();
schedule.scheduleJob('0 30 11 * * *', function(){
  if (!isWorkDays()) {
    return;
  }
  requestForFund();
  requestForRank();
});
schedule.scheduleJob('0 0 15 * * *', function(){
  if (!isWorkDays()) {
    return;
  }
  requestForFund();
  requestForRank();
});