let utils = require("./utils.js")

function parseWFDate(wf_date) {
  const alpha = 1000
  const delta = 1373431788 // 此数值来自 WorkFlowy JSON 文件中的 dateJoinedTimestampInSeconds
  const zettel_date = utils.formatDate(new Date(alpha * (wf_date + delta)), "yyyyMMddhhmm")
  return zettel_date
}

function globalSearch(root, kw) {
  let result = []
  let regex = new RegExp(kw, 'i')
  let idx1 = root.nm.search(regex)
  let idx2 = -1
  let matched = ""
  if (-1 != idx1) { 
    matched = parseWFDate(root.lm) + "-" + root.nm
  }
  if ('no' in root) {
    idx2 = root.no.search(regex)
    if (-1 != idx2) {
      if (-1 != idx1) {
        matched += "\n========\n" + root.no
      } else {
        matched += parseWFDate(root.lm) + "-" + root.nm + "\n========\n" + root.no
      }
    }
  }
  if (matched.length != 0) {
    result.push(matched + "\n\n---- ■ ----\n")
  }
  if ('ch' in root) {
    for (let child of root.ch) {
      result = result.concat(globalSearch(child, kw))
    }
  }
  return result
}

function prettyPrint(lines) {
  console.log(lines.join('\n'))
}

function doSearch(kw, root = wroot) {
  prettyPrint(globalSearch(root,kw))
}

const fs = require('fs')
let wf = fs.readFileSync('.local/w.json')
let wfd = JSON.parse(wf)
let tmp = wfd.projectTreeData.mainProjectTreeInfo.rootProjectChildren
let wroot = { 
  "nm": '根节点', 
  "lm": -1373431788, // 对应北京时间 1970-01-01 08:00
  "ch": tmp }

console.log("请输入 doSearch('关键词')\n")
