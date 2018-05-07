var baseUrl = "http://172.20.55.225:8080/bishe"
let commonMethods = {
  //下载路径
  spliceDownloadUrl(topicname,filename){
    let url=`${baseUrl}/common/download?topicname=${topicname}&filename=${filename}`;
    return url
  },
//  上传文献综述
  uploadLiterature(studentid){
    let url = `${baseUrl}/open/uploadwenxian?studentid=${studentid}`;
    return url
  }
}
export default commonMethods;

