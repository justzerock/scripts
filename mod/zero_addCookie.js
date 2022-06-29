const fs = require('fs');
let envPath = '/ql/data/scripts/envs.json'
let cookiesPath = '/ql/data/scripts/cookie.txt'
let envExist = fs.existsSync(envPath);
let cookies = ''
if (envExist) {
    let rawEnvs = fs.readFileSync(envPath)
    let envs = JSON.parse(rawEnvs)
    if (envs) {
        if (envs.length > 0) {
            console.log('开始写入COOKIE')
            envs.forEach((env, idx) => {
                if (env.name == 'JD_COOKIE' && env.status == '0' && env.value.indexOf('804452987') == -1) {
                    cookies += env.value + '\n'
                }
                if (idx == envs.length - 1) {
                    fs.writeFileSync(cookiesPath, cookies)
                    console.log('完成 ✅')
                }
            })
        }
    }
}