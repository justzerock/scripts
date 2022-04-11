/* 
  author: 礼右六
  desc: 自动刷视频，仅在小米6测试，自动点赞和不感兴趣，关键字可自行修改
*/
auto.waitFor();//判断和等待开启无障碍
let isRun = false;
let isLog = false;
let isPref = false;
let appName = '快手极速版'
let total = rawInput('准备刷多少个视频呢？', '5000');
let size = device.width > 1080 || device.width == 1080 ? 1080 : 720;
let likeCount = 0;
let dislikeCount = 0;
let videoCount = 0;
let durStart = 4;
let durEnd = 8;
// let dw = device.width;  //获取设备宽度
// let dh = device.height; //获取设备高度
let dw = 1080;  //预设设备宽度
let dh = 1920; //预设设备高度
setScreenMetrics(dw, dh); // 坐标按1080p屏幕分辨率调整

// 点赞关键词
let likeReg = /(.*塞尔达.*|.*portal.*|.*求生之路.*|.*卡卡罗特.*|.*泰拉瑞亚.*|.*vscode.*|.*flutter.*|.*macOS.*)/
// 不感兴趣关键词
let dislikeReg = /(.*摇摆舞.*|.*痞帅.*|.*养生.*|.*小鸡恰恰舞.*|.*男人.*|.*女人.*|.*手创作者.*|.*集结吧.*|.*光合作创作.*|.*光合作者.*|.*光合创作者.*|.*百家姓.*|.*摇摆舞.*|.*姓氏.*|.*假发.*|.*美妆.*|.*靓号.*|.*书单.*|.*正能量.*|.*书语.*|.*单身.*|.*内衣.*|.*爱我.*|.*娶我.*|.*身材.*|.*人美歌甜.*|.*时尚.*|.*传奇.*|.*零食.*|.*靓号.*|.*老铁.*|.*唯美.*|.*忧郁.*|.*古风.*)/
// 错误页面返回
let errorBack = /(.*页面出错.*|.*填充拼图.*)/
// 图片直播页面
let picPage = /(.*查看长图.*|.*查看原图.*|.*点击查看.*|.*查看图集.*|.*进入直播间.*)/

// 悬浮按钮
// <text id="total" gravity="center" margin="10" text="👉 手动打开app后再点开始"  textColor="#123456"/>
var floatBtn = floaty.window(
  <vertical h="auto" w="auto" gravity="center" padding="10" bg="#efefef">
      <horizontal gravity="center">
        <button id="pref" style="Widget.AppCompat.Button.Colored" text="开启偏好" />
        <button id="ctl" style="Widget.AppCompat.Button.Colored" text="开始" />
        <button id="log" style="Widget.AppCompat.Button.Colored" text="显示通知" />
      </horizontal>
      <horizontal gravity="center">
        <button id="ks" bg="#cdcdcd" textColor="#ffffff" text="快手" />
        <button id="jsb" bg="#09A9F5" textColor="#ffffff" text="极速版" />
        <button id="cus" bg="#cdcdcd" textColor="#ffffff" text="手动" />
      </horizontal>
      <horizontal gravity="center">
        <text id="durTip" text="随机秒数: " textColor="#123456" />
        <button id="subDurStart" w="40" h="40" style="Widget.AppCompat.Button.Colored" text="-" />
        <text id="durStart" w="18"  gravity="center" text="4" textColor="#123456" />
        <button id="addDurStart" w="40" h="40" style="Widget.AppCompat.Button.Colored" text="+" />
        <text id="durTip"  text="至" textColor="#123456" />
        <button id="subDurEnd" w="40" h="40" style="Widget.AppCompat.Button.Colored" text="-" />
        <text id="durEnd" w="18"  gravity="center" text="8" textColor="#123456" />
        <button id="addDurEnd" w="40" h="40"  style="Widget.AppCompat.Button.Colored" text="+" />
      </horizontal>
  </vertical>
);
// <text id="tip" gravity="center" margin="10" text="悬浮窗内容只会在点击时刷新 ☝️" textColor="#123456" />
floatBtn.setPosition(60, 150)   //设置位置（x，y）
floatBtn.setAdjustEnabled(true)   //显示三个按钮
floatBtn.exitOnClose()    //关闭悬浮窗时自动结束脚本运行

//指定确定按钮点击时要执行的动作
floatBtn.ctl.click(function () {
  let ctl = floatBtn.ctl.getText();
  ui.run(function () {
    if (ctl == "开始" || ctl == "继续" ) { 
      floatBtn.ctl.setText("暂停");
      //floatBtn.total.setText("☕️ 总次数" + total + ", 已刷: " + videoCount );
      //isPref ? floatBtn.tip.setText("👍 点赞: " + likeCount + ", 不喜欢: " + dislikeCount ) : floatBtn.tip.setText("开启偏好可自动点赞或点不感兴趣");
      isRun = true;
    } else {
      floatBtn.ctl.setText("继续");
      //floatBtn.total.setText("☕️ 总次数" + total + ", 已刷: " + videoCount );
      //isPref ? floatBtn.tip.setText("👍 点赞: " + likeCount + ", 不喜欢: " + dislikeCount ) : floatBtn.tip.setText("悬浮窗内容只会在点击时刷新☝️");
      isRun = false;
      toastLog("暂停 🤚");
    }
  });
});

floatBtn.pref.click(function () {
  let pref = floatBtn.pref.getText();
  ui.run(function () {
    if (pref == "开启偏好") {
      floatBtn.pref.setText("关闭偏好");
      isPref = true;
      //floatBtn.tip.setText("👍 点赞: " + likeCount + ", 不喜欢: " + dislikeCount )
      toastLog("将会自动点赞 👍 或点不感兴趣 😒");
    } else {
      floatBtn.pref.setText("开启偏好");
      isPref = false;
      //floatBtn.tip.setText("开启偏好可自动点赞或点不感兴趣");
      toastLog("偏好已关闭");
    }
  });
});

floatBtn.log.click(function () {
  let log = floatBtn.log.getText();
  ui.run(function () {
    if (log == "显示通知") {
      floatBtn.log.setText("隐藏通知");
      isLog = true;
      toastLog("刷每条视频都会显示详情 📝");
    } else {
      floatBtn.log.setText("显示通知");
      isLog = false;
      toastLog("通知已关闭");
    }
  });
});

floatBtn.subDurStart.click(function () {
  ui.run(function () {
    durStart -= 1;
    durStart < 1 ? durStart = 0 : null;
    floatBtn.durStart.setText(durStart.toString());
  })
})
floatBtn.addDurStart.click(function () {
  ui.run(function () {
    durStart += 1;
    durStart < durEnd ? null : durStart -= 1;
    floatBtn.durStart.setText(durStart.toString());
  })
})

floatBtn.subDurEnd.click(function () {
  ui.run(function () {
    durEnd -= 1;
    durEnd > durStart ? null : durEnd += 1;
    floatBtn.durEnd.setText(durEnd.toString());
  })
})
floatBtn.addDurEnd.click(function () {
  ui.run(function () {
    durEnd += 1;
    if (durEnd > 15) {
      durEnd = 15;
      toastLog("建议最大时长为15秒, 不爽改代码 😏");
    }
    floatBtn.durEnd.setText(durEnd.toString());
  })
})

let colorOn = colors.parseColor("#09A9F5");
let colorOff = colors.parseColor("#cdcdcd");

floatBtn.ks.click(function () {
  ui.run(function () {
    if (isRun) {
      toastLog("若要切换 app 请先暂停 😒");
    } else if (appName != '快手') {
      appName = '快手';
      floatBtn.ks.setBackgroundColor(colorOn); 
      floatBtn.jsb.setBackgroundColor(colorOff); 
      floatBtn.cus.setBackgroundColor(colorOff); 
    }
  })
})
floatBtn.jsb.click(function () {
  ui.run(function () {
    if (isRun) {
      toastLog("若要切换 app 请先暂停 😒");
    } else if (appName != '快手极速版') {
      appName = '快手极速版';
      floatBtn.ks.setBackgroundColor(colorOff); 
      floatBtn.jsb.setBackgroundColor(colorOn); 
      floatBtn.cus.setBackgroundColor(colorOff); 
    }
  })
})
floatBtn.cus.click(function () {
  ui.run(function () {
    if (isRun) {
      toastLog("若要切换 app 请先暂停 😒");
    } else if (appName != '手动') {
      appName = '手动';
      floatBtn.ks.setBackgroundColor(colorOff); 
      floatBtn.jsb.setBackgroundColor(colorOff); 
      floatBtn.cus.setBackgroundColor(colorOn); 
    }
  })
})

function startSwipe() {
  let ctl = floatBtn.ctl.getText();
  if(ctl == "暂停" && isRun){
    if (appName == '手动') {
      toastLog('请手动打开程序, 脚本将在 10 秒后自动开始');
      sleep(10000);
      toastLog('开始刷 🦾');
      autoSwipe();
    } else {
      let packageName = getPackageName(appName);
      toastLog('即将启动程序, 稍等⏱')
      app.launchApp(appName);
      waitForPackage(packageName);
      toastLog('开始刷 🦾');
      autoSwipe();
    }
  }
}

setInterval(()=>{
  startSwipe()
}, 100);

// 自动刷视频
function autoSwipe() {
  for (var i = videoCount; i < total; i++) {
    if (!isRun) {
      break;
    } else if(isRun) {
      showToast("开始第" + (i+1) + "次，剩余" + (total - (i+1)) + "次");
      let back = textMatches(errorBack).boundsInside(0, 0, dw, dh ).findOnce();
      if (back) {
        if (back.visibleToUser()) {
          // 坐标根据屏幕分辨率调整
          click(80, 140);
          //size == 1080 ? click(80,140) : click(50,90);
          showToast(back.text()) //错误页面返回
        } else {
          return;
        }
      }
      let clickTip = textContains("继续看视频").boundsInside(0, 0, dw, dh ).findOnce();
      if (clickTip) {
        clickTip.click();
        showToast("点击继续看视频"); //点击继续看视频
      }
      let pic = textMatches(picPage).boundsInside(0, 0, dw, dh ).findOnce();
      let keyDislike = textMatches(dislikeReg).boundsInside(0, 0, dw, dh ).findOnce();
      if (pic) {
        directSwipe(); // 宁误刷，不停留
        showToast('滑走: '+pic.text());
      } else if (keyDislike && isPref) { // 不感兴趣
        if (keyDislike.visibleToUser()) { 
          dislike();
          showToast('第' + dislikeCount + '个不感兴趣 👎: '+keyDislike.text());
        } else {
          delaySwipe();
        }
      } else {
        delaySwipe();
      }
      
      if ( i== total-1) {
        setTimeout(()=>{
          exit();
        }, 5000);
        toastLog("任务完成，关闭");
      }
      videoCount += 1;
    }
  }
}

// 长按并点击不感兴趣
function dislike() {
  press(dw * 0.5, dh * 0.6, 1000);
  sleep(500);
  let dislike = textContains("不感兴趣").findOnce();
  if (dislike) {
    let dbounds = dislike.parent().bounds();
    size == 1080 ? click(dbounds.centerX(), dbounds.centerY()) : dislike.parent().click();
    dislikeCount += 1;
  }
}

// 直接滑动
function directSwipe() {
  let startX = random(dw * 0.4, dw * 0.42);
  let endX = random(dw * 0.5, dw * 0.6);
  let startY = random(dh * 0.69, dh * 0.72);
  let endY = random(dh * 0.22, dh * 0.27) ;
  let dur = random(10, 15);
  if (isRun) {
    swipe(startX, startY, endX, endY, dur);
  }
}

// 延时滑动
function delaySwipe() {
  let keyLike = textMatches(likeReg).boundsInside(0, 0, dw, dh ).findOnce();
  let mid = durStart
  if (mid > durEnd) {
    durStart = durEnd
    durEnd = mid
  }
  let delayTime = random(durStart*1000, durEnd*1000);
  showToast(delayTime/1000 + "秒后滑动");
  if (keyLike && isPref) {
    if (keyLike.visibleToUser()) {
      like()
      likeCount += 1;
      showToast('第'+ likeCount +'个点赞 👍：' + keyLike.text());
      sleep(delayTime);
      directSwipe();
    } else {
      sleep(delayTime);
      directSwipe();
    }
  } else {
    sleep(delayTime);
    directSwipe();
  }
}

// 双击点赞
function like() {
  let delayTime = random(1000, 3000);
  showToast( delayTime/1000 + "秒后点赞");
  sleep(delayTime);
  click(dw * 0.5, dh * 0.55);
  sleep(50);
  click(dw * 0.5, dh * 0.55);
  //showToast( '点赞：' + keyLike.text());
  //size == 1080 ? click(990, 750) : click(660, 440)
}

// 显示通知日志
function showToast(msg) {
  isLog ? toastLog(msg) : null;
}
