/* 
  author: @justzerock
  desc: 个人使用，自动启动
  date: 2022-04-21
  update: 2022-04-21
*/
if(!device.isScreenOn()){
  device.wakeUp();
  sleep(1000);
}
auto.waitFor()
let appName = "支付宝"
let packageName = app.getPackageName(appName)
killApp()
sleep(1000)
home()

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