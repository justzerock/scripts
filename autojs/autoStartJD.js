/* 
  author: @justzerock
  desc: 个人使用，自动启动
  date: 2022-04-21
  update: 2022-04-21
*/

let dw = 1173;  //预设设备宽度
let dh = 2532; //预设设备高度
setScreenMetrics(dw, dh); // 坐标按1080p屏幕分辨率调整

if (!device.isScreenOn()) {
  device.wakeUp();
  sleep(1000);
}
auto.waitFor()
let appName = "京东"
let packageName = app.getPackageName(appName)
app.launchApp(appName)
waitForPackage(packageName)
let homePage = text('首页').findOne(2000)
if (homePage) {
  click(1054, 2449)
  sleep(2000)
}
text('红包天天分').waitFor();
//sleep(500)
//click(973, 1855)
//sleep(2000)
////swipe(540, 1430, 510, 833, 1500)
//sleep(1000)
let hb = text('红包天天分').findOne()
let click_hb = click(hb.bounds().centerX(), hb.bounds().centerY())

if (click_hb) {

  log('打开瓜分红包')

  text('下拉页面有惊喜').waitFor();

  click(1097, 588)

  sleep(1000)

  //swipe(540, 1640, 510, 1200, 1000)

  let coin = className("android.view.View").textContains('后满').findOne()

  let click_coin = click(coin.bounds().centerX(), coin.bounds().centerY())

  if (click_coin) {
    log('收取金币')
    let btn = className("android.view.View").textContains('消耗').findOne()
    sleep(1000)
    let click_team = click(155, btn.bounds().centerY() - 60)
    //sleep(500)
    //click(130, btn.bounds().centerY() - 50)
    if (click_team) {
      log('进入组队')
      textContains('早8点组队').waitFor();
      sleep(5000)
      back()
      text('下拉页面有惊喜').waitFor();
      back()
      sleep(1000)
      home()
    }
  }

  /* className("android.view.View").find().forEach(function (tv) {
    if (tv.text()) {
      log(tv.text());
    }
  }); */
}
//text('下拉页面有惊喜').waitFor();



// sleep(500)
// click(110,1860)
// sleep(500)
// click(980,1380)
// sleep(1000)
// click(540,1400)
// text('下拉页面有惊喜').waitFor();
// click(150,1860)
// sleep(5000)
// back()
// sleep(1000)
// back()
// sleep(1000)
// home()