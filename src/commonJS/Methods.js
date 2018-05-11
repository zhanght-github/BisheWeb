var baseUrl = process.env.BASE_API;
let commonMethods = {
  // 下载路径
  spliceDownloadUrl(topicname, filename) {
    let url = `${baseUrl}/common/download?topicname=${topicname}&filename=${filename}`
    return url
  },
  // 上传任务书
  uploadTask(topicname) {
    let url = `${baseUrl}/select/upload?topicname=${topicname}`
    return url
  },
  //  上传文献综述
  uploadLiterature(studentid) {
    let url = `${baseUrl}/open/uploadwenxian?studentid=${studentid}`
    return url
  },
//  上传开题报告
  uploadreport(studentid){
    let url = `${baseUrl}/open/uploadreport?studentid=${studentid}`;
    return url
  },
//  上传中检报告
  uploadMiddleReport(studentid){
    let url = `${baseUrl}/middle/uploadreport?studentid=${studentid}`;
    return url
  }

}
export default commonMethods
