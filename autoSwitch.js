/* 
  author: @justzerock
  desc: 个人使用，切换小号
  date: 2022-04-18
  update: 2022-04-18
*/
if(!device.isScreenOn()){
    device.wakeUp();
    sleep(1000);
}
auto.waitFor()
toastLog('脚本开始')
let hour = new Date().getHours()
let account = '' // **31\foxmail\gmail
let appName = "支付宝"
let packageName = app.getPackageName(appName)

if (hour >= 0 && hour < 6) {
  killApp()
} else if ((hour >= 6 && hour < 12) || (hour >= 18 && hour < 24)) {
  account = '**31'
  switchAccount()
} else if (hour >= 12 && hour < 15) {
  account = 'foxmail'
  switchAccount()
} else if (hour >= 15 && hour < 18) {
  account = 'gmail'
  switchAccount()
}

function killApp() {
  app.openAppSetting(packageName);
  text(app.getAppName(packageName)).waitFor();
  let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
  if (is_sure.enabled()) {
    textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();
    textMatches(/(.*确.*|.*定.*)/).findOne().click();
    log(app.getAppName(packageName) + "应用已被关闭");
    sleep(1000);
    back();
  } else {
    log(app.getAppName(packageName) + "应用不能被正常关闭或不在后台运行");
    back();
  }
}

function switchAccount() {
  app.launchApp(appName)
  waitForPackage(packageName)
  textContains('我的').waitFor()
  clickCenterContains('我的')
  textContains('设置').waitFor()
  clickCenterContains('设置')
  textContains('账号与安全').waitFor()
  swipe(device.width * 0.5, device.height * 0.8, device.width * 0.5, device.height * 0.2, 50)
  sleep(1000)
  clickCenterContains('换账号登录')
  textContains('***').waitFor()
  clickCenterContains(account)
  sleep(1000)
  if (textContains('我的').exists()) {
    home()
  } else {
    back()
    sleep(1000)
    back()
    sleep(1000)
    back()
  }
}

function clickCenterContains(item) {
  let bounds = textContains(item).findOne().parent().bounds()
  click(bounds.centerX(), bounds.centerY())
}