let text = String.fromCharCode(8217);

const data = {
  "id": 2362,
      "date": "2022-09-07T05:32:48",
      "date_gmt": "2022-09-07T05:32:48",
      "guid": {
        "rendered": "https://domainhere.com/?p=2362"
      },
      "modified": "2022-09-26T03:34:26",
      "modified_gmt": "2022-09-26T03:34:26",
      "slug": "blog-xxx",
      "status": "publish",
      "type": "post",
      "link": "https://domainhere.com/blog-xxx/",
      "title": {
        "rendered": "Mashwishi&#8217;s Blog Posts"
      },
      "content": {
        "rendered": "<p>Mashwishi&#8217;s Blog Posts.</p>\n",
        "protected": false
      },
      "excerpt": {
        "rendered": "<p>Mashwishi&#8217;s Blog Posts.</p>\n",
        "protected": false
      },
}



const removeUnicodes = (data) => {

  return JSON.parse(
    JSON.stringify(data)
    .split('&')
    .map((ele, idx) => {
      if(idx === 0 || ele.length < 6) {
        return ele
      }
      return String.fromCharCode(ele.substring(1,5)) + ele.slice(6, ele.length)
    })
    .join('')
  )
}

console.log(removeUnicodes(data))
