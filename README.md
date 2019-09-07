# hit-gpa

> 哈工大本科生 GPA 计算器。使用统一身份一键登录，即可计算自己的 GPA 信息。

测试结果：

| hit-gpa                                                                                                | [chasedream GPA 计算器](https://apps.chasedream.com/gpa/#)                                             |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| <img src="https://picgo-1256492673.cos.ap-chengdu.myqcloud.com/img/20190907172053.png" width="1000px"> | <img src="https://picgo-1256492673.cos.ap-chengdu.myqcloud.com/img/20190907172124.png" width="1000px"> |

## Feature

- 哈工大统一身份认证登录
- 记住账号、密码
- 多种 GPA 算法
- 成绩导出成 Excel 表格

## 本地运行

```bash
yarn
yarn start:dev
yarn serve
```

打开 http://localhost:8080/

## 开发资源

本项目将原来的 [jwes](http://jwes.hit.edu.cn) 数据整理成 API 形式：

POST `/api/grade`

```json
{
  "username": "1160300625",
  "password": "**********"
}
```

将会得到如下格式的信息：

```json
{
  "labels": [...
  ],
  "gradeForAllCourses": [...
  ],
  "noGradeCourses": [...
  ]
}
```

## 致谢

### GPA 计算器

1. https://github.com/sndnyang/superbGPACalculator
2. https://apps.chasedream.com/gpa

### 参考项目

1. Vue & Koa: https://github.com/Molunerfinn/node-github-profile-summary
2. Nightmare: https://github.com/segmentio/nightmare
3. Cheerio: https://github.com/cheeriojs/cheerio

### 参考文章

1. https://juejin.im/post/5b4f007fe51d4519277b9707
2. https://medium.com/of-all-things-tech-progress/introduction-to-webcrawling-with-javascript-and-node-js-f5a3798ee8ac
