const fs = require('fs');
let envPath = '/ql/data/scripts/envs.json'
let cookiesPath = '/ql/data/scripts/cookies.txt'
let envExist = fs.existsSync(envPath);
let cookies = ''
if (envExist) {
    let rawEnvs = fs.readFileSync(envPath)
    let envs = JSON.parse(rawEnvs)
    if (envs) {
        if (envs.length > 0) {
            console.log(envs[0])
            envs.forEach((env, idx) => {
                if (env.name == 'JD_COOKIE' && env.status == '0') {
                    cookies += env.value + '\n'
                }
                if (idx == envs.length - 1) {
                    fs.writeFileSync(cookiesPath, cookies)
                }
            })
        }
    }
}