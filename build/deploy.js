const chalk = require('chalk')
const Sftp = require('sftp-upload')

let remote = '/usr/share/nginx/html'

if (process.argv[2] === '-t') {
  remote += '/t'
} else {
  remote += '/p'
}

new Promise((resolve, reject) => {
  console.log(chalk.cyan('Start deploying...\n'))

  let options = {
      host: 'www.wajiwaji.net',
      username: 'root',
      password: 'IySGtxX@ekEytTHC',
      path: './dist/',
      remoteDir: `${remote}/wms/`
    },
    sftp = new Sftp(options)

  sftp
    .on('error', err => {
      reject()
      throw err
    })
    .on('uploading', pgs => {
      console.log(chalk.red(`${pgs.percent}% `, 'Uploading ', pgs.file))
    })
    .on('completed', () => {
      console.log(chalk.cyan('\nDeploy Completed.'))
      resolve()
    })
    .upload()
})
