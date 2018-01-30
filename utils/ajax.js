const {Base64} = require('./tools/base64.js');
const md5 = require('./tools/md5.min.js');
const config = require('./config.js')


const baseUrl = config.baseUrl;

// 版本信息
console.log(config);
let AppVersion = config.AppVersion;
let Channel = config.Channel;

// 系统信息
var res = {};
try {
  res = wx.getSystemInfoSync();
} catch (e) {
}
let Model = res.model;
let OS = res.platform;
let OSVersion = res.system;


// 生成Signature
const createSignature = ({method, headers, url, data}) => {
  let Signature = ''
  let HTTPMethod = method.toUpperCase() + '\n'
  // Header
  let Headers = ''
  for (let key in headers) {
    Headers += key + ':' + headers[key] + '\n'
  }
  // URL
  let URL = url;
  let dataStr = '';
  for (let key in data) {
    let value = data[key];
    if (typeof(value) !== 'string') {
      value = JSON.stringify(value)
    }
    dataStr += key + '=' + value + '&'
  }
  if (dataStr !== '') {
    URL += '?' + dataStr.slice(0, -1);
  }
  URL = encodeURIComponent(URL) + '\n';

  // 盐值
  let secret = Base64.encode(headers.AppVersion + 'amluZ2ppcmVuamlheW91');
  Signature = HTTPMethod + Headers + URL;
  Signature = md5(Signature + secret);
  return Signature
}

const request = (method, dataMap) => {
  try {
    var Token = wx.getStorageSync('token');
  } catch (e) {
  }
  if (!Token) {
    // token不存在
  }
  Token = 'cca3239169f71756501c2cfadbabbfc3';

  let url = baseUrl + dataMap.url;
  let data = dataMap.data;
  let headers = {
    'AppVersion': AppVersion,
    'Channel': Channel,
    'Model': Model,
    'OS': OS,
    'OSVersion': OSVersion,
    'Timestamp': Number(new Date()),
    'Token': Token
  };
  let sign = createSignature({
    headers: headers,
    url: url,
    method: method,
    data: data
  })
  headers['Signature'] = sign;


  return wx.request({
    url: url,
    data: dataMap.data,
    header: headers,
    method: method,
    dataType: 'json',
    complete: (data) => {
      if (data.statusCode === 200) {
        dataMap.success(data.data);
      } else {
        dataMap.fail(data.errMsg);
      }
      dataMap.complete(data);
    }
  });
}

const get = (dataMap) => {
  return request('GET', dataMap);
}
const post = (dataMap) => {
  return request('POST', dataMap);
}


module.exports = {
  get: get,
  post: post
};