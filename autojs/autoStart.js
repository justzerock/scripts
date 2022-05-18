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
app.launchApp(appName)
waitForPackage(packageName)
home()