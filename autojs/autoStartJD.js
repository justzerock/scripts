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
let appName = "京东"
let packageName = app.getPackageName(appName)
app.launchApp(appName)
waitForPackage(packageName)
text('首页').waitFor();
click(110,1860)
sleep(500)
click(110,1860)
sleep(500)
click(980,1380)
text('下拉页面有惊喜').waitFor();
click(150,1860)
sleep(2000)
home()