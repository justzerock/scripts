/**
 * @version v1.0.0
 * @create_at 2023-02-16 23:26:06
 * @title QRabbit扫码登录
 * @description 🐒这个人很懒什么都没有留下。
 * @author jarvis
 * @rule 扫码登录
 * @priority 100000
 * @admin false
 * @public false
 * @encrypt false
 * @disable false
 */
const s = sender
const otto = new Bucket("otto")
const url = otto.get("rabbit_addr")
const token = otto.get("rabbit_token")
let num = ""
let code = ""

function main(){
    if(url == ""){
        s.reply("QRabbit对接地址为空  请先对接  指令：set otto rabbit_addr http://123.123.123.123:12345")
        return
    }

    if(url[url.length-1]=='/'){
        url=url.substring(0,url.length-1)
    }

    s.reply("回复数字:“1”  获取登录二维码,【回复“q”、“Q”即可退出】")
    let newS = s.listen(30000)
    if(newS==null){
        s.reply("超时,已退出")
        return
    }else if(newS.getContent() == "q" || newS.getContent() == "Q"){
        s.reply("已退出")
        return
    }else {
        s.reply("正在获取登录二维码,请耐心等待");
        getRa()
    }
}

function getRa() {
    let GetQRUrl = url + "/api/BeanQrCode"
    console.log(GetQRUrl)
    let result = request({
        "url": GetQRUrl,
        "method": "post", 
        "dataType": "json",
        "timeOut": 60000,
        "token": token
    });
    // Debug(result)
    let QRCodek = result.body.QRCodeKey
    let QrCode = "https://qr.m.jd.com/p?k=" + QRCodek
    // let urla = encodeQR(QrCode)
    s.reply(`${image('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+QrCode)}`)        
    s.reply("扫码登陆后请回复：“1”  【回复“q”、“Q”即可退出】");
    let newS = s.listen(30000)
    if(newS==null){
        s.reply("超时,已退出")
        return
    }else if(newS.getContent() == "q" || newS.getContent() == "Q"){
        s.reply("已退出")
        return
    }else if(newS.getContent() == "1"){
        // 发送登录请求
            LoginQR(QRCodek);
    }else{
        s.reply("请勿乱回复，已自动退出");
        return;
    }
}
function LoginQR(QRCodek) {
    let LoginQRUrl = url + "/api/QrCheck"
    let result = request({
        "url": LoginQRUrl, 
        "method": "post", 
        "dataType": "text",
        "timeOut": 60*1000,
         "body":{
         	token: "",
           qlkey: 1,
           QRCodeKey: QRCodek,		
      },
    });
  	let code = JSON.parse(result.body)
    let msg = code.pin + "  恭喜您登录成功"
    let Type = s.getPlatform()
    let user = s.getUserId()
    const pinDB = new Bucket("pinDB")
    let value = pinDB.get(Type + ":" + user)
    if(value==""){
        value = {
            "Pin": [code.pin],
            "Form": Type,
            "ID": s.getUserId(),
            "Name": "",
            "NotifyCode": {}
        }
        value.NotifyCode[code.pin] = 1
    }else{
        value = JSON.parse(value)
        value["Pin"].push(code.pin)
        value.NotifyCode[code.pin] = 1
    }
    pinDB.set(Type + ":" + user,JSON.stringify(value))
    s.reply(msg)
}

main()
