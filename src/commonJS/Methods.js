let commonMethods = {
  //下载路径
  spliceDownloadUrl(topicname,filename){
    let url="http://172.20.55.146:8080/bishe/common/download?topicname="+topicname+"&filename="+filename+"";
    return url
  }
}
export default commonMethods;

