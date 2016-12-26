const request = require('request')
const $apikey = document.querySelector('#apikey')
const $content = document.querySelector('#content')
const $mobiles = document.querySelector('#mobiles')

if (localStorage.apikey) {
  $apikey.value = localStorage.apikey
}

if (localStorage.content) {
  $content.value = localStorage.content
}

if (localStorage.mobiles) {
  $mobiles.value = localStorage.mobiles
}

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
  const apikey = $apikey.value
  const content = $content.value
  const mobiles = $mobiles.value.match(/(\d{11})/g)

  localStorage.apikey = apikey
  localStorage.content = content
  localStorage.mobiles = $mobiles.value

  if (confirm(`总共${mobiles.length}个号码，预计花费${0.05*mobiles.length}元，确定发送？`)) {
    request.post({
      url: 'https://sms.yunpian.com/v2/sms/batch_send.json',
      form: {
        apikey: apikey,
        mobile: mobiles.join(','),
        text: content,
      }
    }, (error, response, body) => {
      if (error) {
        alert('请求失败')
      }
      alert(JSON.stringify(JSON.parse(body), null, 2))
    })
  }
})
