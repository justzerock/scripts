/* 
  author: 礼右六
  desc: 自动刷视频，仅在小米6测试，自动点赞和不感兴趣，关键字可自行修改
*/
auto.waitFor();//判断和等待开启无障碍
let isRun = false;
let isLog = false;
let total = rawInput('准备刷多少个视频呢？', '5000');
let size = device.width > 1080 || device.width == 1080 ? 1080 : 720;
let likeCount = 0;
let dislikeCount = 0;
let videoCount = 0;
// let dw = device.width;  //获取设备宽度
// let dh = device.height; //获取设备高度
let dw = 1080;  //预设设备宽度
let dh = 1920; //预设设备高度
setScreenMetrics(dw, dh); // 坐标按1080p屏幕分辨率调整

// 点赞关键词
let likeReg = /(.*塞尔达.*|.*portal.*|.*求生之路.*|.*卡卡罗特.*|.*泰拉瑞亚.*|.*vscode.*|.*flutter.*|.*macOS.*)/
// 不感兴趣关键词
let dislikeReg = /(.*摇摆舞.*|.*小鸡恰恰舞.*|.*男人.*|.*女人.*|.*手创作者.*|.*集结吧.*|.*光合作创作.*|.*光合作者.*|.*光合创作者.*|.*百家姓.*|.*摇摆舞.*|.*姓氏.*|.*假发.*|.*美妆.*|.*靓号.*|.*书单.*|.*正能量.*|.*书语.*|.*单身.*|.*内衣.*|.*爱我.*|.*娶我.*|.*身材.*|.*人美歌甜.*|.*时尚.*|.*传奇.*|.*零食.*|.*靓号.*|.*老铁.*|.*唯美.*|.*忧郁.*|.*古风.*)/
// 错误页面返回
let errorBack = /(.*页面出错.*|.*填充拼图.*)/
// 图片直播页面
let picPage = /(.*查看长图.*|.*查看原图.*|.*查看图集.*|.*进入直播间.*)/

// 悬浮按钮
var floatBtn = floaty.window(
  <vertical h="auto" w="auto" gravity="center" bg="#efefef">
      <text id="total" gravity="center" margin="10" text="手动打开app后再点开始"  textColor="#123456"/>
      <horizontal>
        <button id="cs" style="Widget.AppCompat.Button.Colored" text="手动刷新" />
        <button id="ctl" style="Widget.AppCompat.Button.Colored" text="开始" />
        <button id="log" style="Widget.AppCompat.Button.Colored" text="显示通知" />
      </horizontal>
      <text id="tip" gravity="center" margin="10" text="视频: 0, 点赞: 0, 不喜欢: 0" textColor="#123456" />
  </vertical>
);
floatBtn.setPosition(40, 100)   //设置位置（x，y）
floatBtn.setAdjustEnabled(true)   //显示三个按钮
floatBtn.exitOnClose()    //关闭悬浮窗时自动结束脚本运行

//指定确定按钮点击时要执行的动作
floatBtn.ctl.click(function () {
  let ctl = floatBtn.ctl.getText();
  ui.run(function () {
    if (ctl == "开始" || ctl == "继续" ) { 
      floatBtn.ctl.setText("暂停");
      floatBtn.total.setText("总次数" + total  );
      floatBtn.tip.setText("视频: " + videoCount + ", 点赞: " + likeCount + ", 不喜欢: " + dislikeCount );
      isRun = true;
    } else {
      floatBtn.ctl.setText("继续");
      floatBtn.total.setText("总次数" + (total - videoCount) );
      floatBtn.tip.setText("视频: " + videoCount + ", 点赞: " + likeCount + ", 不喜欢: " + dislikeCount );
      isRun = false;
      total = total - videoCount;
    }
  });
});

floatBtn.cs.click(function () {
  ui.run(function () {
    floatBtn.tip.setText("视频: " + videoCount + ", 点赞: " + likeCount + ", 不喜欢: " + dislikeCount );
  });
});

floatBtn.log.click(function () {
  let log = floatBtn.log.getText();
  ui.run(function () {
    if (log == "显示通知") {
      floatBtn.log.setText("隐藏通知");
      isLog = true;
    } else {
      floatBtn.log.setText("显示通知");
      isLog = false;
    }
  });
});

setInterval(()=>{
  let ctl = floatBtn.ctl.getText();
  if(ctl == "暂停" && isRun){
    autoSwipe();
  }
}, 500);

// 自动刷视频
function autoSwipe() {
  for (var i = 1; i < total; i++) {
    if (!isRun) {
      break;
    } else if(isRun) {
      showToast("开始第" + i + "次，剩余" + (total - i) + "次");
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
      } else if (keyDislike) { // 不感兴趣
        if (keyDislike.visibleToUser()) { 
          dislike();
          showToast('不感兴趣: '+keyDislike.text());
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
        showToast("任务完成，关闭");
      }
      videoCount += 1;
    }
  }
}

// 长按并点击不感兴趣
function dislike() {
  press(dw * 0.5, dh * 0.55, 1000);
  sleep(500);
  let dislike = textContains("不感兴趣").findOnce();
  if (dislike) {
    let dbounds = dislike.parent().bounds();
    size == 1080 ? click(dbounds.centerX(), dbounds.centerY()) : dislike.parent().click();
    dislikeCount += 1;
  } else {
    click(dw * 0.5, dh * 0.55);
    delaySwipe();
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
  let delayTime = random(4000, 8000);
  showToast(delayTime/1000 + "秒后滑动");
  if (keyLike) {
    if (keyLike.visibleToUser()) {
      like()
      likeCount += 1;
      showToast('感兴趣：' + keyLike.text());
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
  let delayTime = random(2000, 3500);
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
