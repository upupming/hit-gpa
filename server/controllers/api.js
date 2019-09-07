const Nightmare = require('nightmare')
const cheerio = require('cheerio')

function tableToArray(table) {
  const $ = cheerio.load(table)
  const labels = []
  $('th').each((index, element) => {
    labels.push($(element).text())
  })
  const gradeForAllCourses = []
  const noGradeCourses = []
  $('tr')
    .slice(1)
    .each((index, element) => {
      let oneRow = $(element).children('td')
      let row = {}
      oneRow.each((index, element) => {
        row[labels[index]] = $(element).text()
      })
      if (isNaN(row['总成绩'])) {
        noGradeCourses.push(row)
      } else {
        gradeForAllCourses.push(row)
      }
    })
  return {
    labels,
    gradeForAllCourses,
    noGradeCourses
  }
}

const getGrade = async ctx => {
  let { username, password } = ctx.request.body

  let gradeTable

  const nightmare = Nightmare({
    openDevTools: false,
    show: false
  })
  await nightmare
    .viewport(1000, 1000)
    .goto('http://jwes.hit.edu.cn/')
    .click('.login_but')
    .wait('#casLoginForm')
    .type('#username', username)
    .type('#password', password)
    .click('.auth_login_btn')
    .wait('.sm_yy')
    .click('.sm_yy')
    .wait('#pageSize_value')
    .type('#pageSize_value', '1000')
    .type('#pageSize_value', '\u000d')
    // https://stackoverflow.com/questions/44060214/get-nightmare-to-wait-for-next-page-load-after-clicking-link
    .wait('tr:nth-child(22)')
    // 等到最后一个元素加载完毕
    .wait('#setting')
    .evaluate(() => document.querySelector('.list table').outerHTML)
    .end()
    .then(res => {
      gradeTable = res
    })
    .catch(error => {
      console.error('Search failed:', error)
    })

  ctx.body = tableToArray(gradeTable)
}

// const getGrade = ctx => {
//   // 测试用例
//   ctx.body = {
//     "labels": [
//       "序号",
//       "学年学期",
//       "开课院系",
//       "课程代码",
//       "课程名称",
//       "课程性质",
//       "课程类别",
//       "学分",
//       "是否考试课",
//       "参与学分绩",
//       "补考重修标记",
//       "总成绩",
//       "成绩备注",
//       "教学班排名",
//       "操作"
//     ],
//     "gradeForAllCourses": [
//       {
//         "序号": "1",
//         "学年学期": "2016秋季",
//         "开课院系": "武装部",
//         "课程代码": "AD11001",
//         "课程名称": "军训及军事理论",
//         "课程性质": "必修",
//         "课程类别": "其他",
//         "学分": "3.0",
//         "是否考试课": " ",
//         "参与学分绩": "是",
//         "补考重修标记": "\n\t\t \t\t\t   \n\t \t\t\t\t\t \n\t \t\t\t\t\t \n\t \t\t\t\t\t \n\t\t\t\t\t    \t\t            \n \t\t            ",
//         "总成绩": "75",
//         "成绩备注": "",
//         "教学班排名": "",
//         "操作": "\n\t\t            \t\n\t\t             \t\t\n\t\t             \t     \n\t\t       \t\t "
//       },
//       {
//         "序号": "3",
//         "学年学期": "2016秋季",
//         "开课院系": "计算机科学与技术学院",
//         "课程代码": "CS13101",
//         "课程名称": "计算机专业导论",
//         "课程性质": "必修",
//         "课程类别": "其他",
//         "学分": "2.0",
//         "是否考试课": " ",
//         "参与学分绩": "是",
//         "补考重修标记": "\n\t\t \t\t\t   \n\t \t\t\t\t\t \n\t \t\t\t\t\t \n\t \t\t\t\t\t \n\t\t\t\t\t    \t\t            \n \t\t            ",
//         "总成绩": "89",
//         "成绩备注": "",
//         "教学班排名": "36",
//         "操作": "\n\t\t            \t\n\t\t             \t\t\n\t\t             \t     \n\t\t       \t\t "
//       }
//     ],
//     "noGradeCourses": [
//       {
//         "序号": "2",
//         "学年学期": "2016秋季",
//         "开课院系": "武装部",
//         "课程代码": "AD11001",
//         "课程名称": "军训及军事理论",
//         "课程性质": "必修",
//         "课程类别": "其他",
//         "学分": "3.0",
//         "是否考试课": " ",
//         "参与学分绩": "是",
//         "补考重修标记": "\n\t\t \t\t\t   \n\t \t\t\t\t\t \n\t \t\t\t\t\t \n\t \t\t\t\t\t \n\t\t\t\t\t    \t\t            \n \t\t            ",
//         "总成绩": "缓考",
//         "成绩备注": "缓考",
//         "教学班排名": "226",
//         "操作": "\n\t\t            \t\n\t\t             \t\t\n\t\t             \t     \n\t\t       \t\t "
//       },
//       {
//         "序号": "35",
//         "学年学期": "2017秋季",
//         "开课院系": "机电工程学院",
//         "课程代码": "ME12113",
//         "课程名称": "影视广告视听语言",
//         "课程性质": "任选",
//         "课程类别": "素质选修",
//         "学分": "1.0",
//         "是否考试课": " ",
//         "参与学分绩": " ",
//         "补考重修标记": "\n\t\t \t\t\t   \n\t \t\t\t\t\t \n\t \t\t\t\t\t \n\t \t\t\t\t\t \n\t\t\t\t\t    \t\t            \n \t\t            ",
//         "总成绩": "旷考",
//         "成绩备注": "旷考",
//         "教学班排名": "41",
//         "操作": "\n\t\t            \t\n\t\t             \t\t\n\t\t             \t     \n\t\t       \t\t "
//       }
//     ]
//   }
// }

module.exports = {
  getGrade
}
