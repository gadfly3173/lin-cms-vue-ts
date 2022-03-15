const childProcess = require('child_process')

// 执行命令
function exec(cmd) {
  return new Promise((resolve, reject) => {
    childProcess.exec(cmd, (error, stdout) => {
      if (error) {
        reject(error)
      }
      resolve(stdout)
    })
  })
}

module.exports = exec
