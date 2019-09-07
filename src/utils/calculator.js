class Calculator {
  constructor(name, descriptionTable) {
    this.name = name
    this.descriptionTable = descriptionTable
  }
  calculateGPA(gradeForAllCourses) {
    let reducer = (accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue['学分'])
    }
    this.totalCredits = gradeForAllCourses.reduce(reducer, 0)

    reducer = (accumulator, currentValue) => {
      let newPoint = this.mapper(parseFloat(currentValue['总成绩']))
      return accumulator + parseFloat(currentValue['学分']) * newPoint
    }
    this.totalGradePoints = gradeForAllCourses.reduce(reducer, 0)

    return this.totalGradePoints / this.totalCredits
  }
  toString(gradeForAllCourses) {
    let res = this.calculateGPA(gradeForAllCourses)
    return `${this.totalGradePoints.toFixed(2)} / ${this.totalCredits.toFixed(
      2
    )} = ${res.toFixed(2)}`
  }
}

class Stand4Calculator extends Calculator {
  constructor() {
    super('标准4.0', [
      {
        成绩: '100～90',
        等级: 'A',
        GPA: 4.0
      },
      {
        成绩: '89～80',
        等级: 'B',
        GPA: 3.0
      },
      {
        成绩: '79～70',
        等级: 'C',
        GPA: 2.0
      },
      {
        成绩: '69～60',
        等级: 'D',
        GPA: 1.0
      },
      {
        成绩: '59～0',
        等级: 'F',
        GPA: 0
      }
    ])
    this.map = {
      90: 4.0,
      80: 3.0,
      70: 2.0,
      60: 1.0,
      0: 0
    }
    this.mapper = orig => {
      let res = 0
      for (let key in this.map) {
        if (orig >= key) {
          res = this.map[key]
        }
      }
      return res
    }
  }
}

class Stand4_1Calculator extends Calculator {
  constructor() {
    super('改进 4.0（1）', [
      {
        成绩: '100～85',
        等级: 'A',
        GPA: 4.0
      },
      {
        成绩: '84～70',
        等级: 'B',
        GPA: 3.0
      },
      {
        成绩: '69～60',
        等级: 'C',
        GPA: 2.0
      },
      {
        成绩: '59～0',
        等级: 'F',
        GPA: 0
      }
    ])
    this.map = {
      85: 4.0,
      70: 3.0,
      60: 2.0,
      0: 0
    }
    this.mapper = orig => {
      let res = 0
      for (let key in this.map) {
        if (orig >= key) {
          res = this.map[key]
        }
      }
      return res
    }
  }
}

class Stand4_2Calculator extends Calculator {
  constructor() {
    super('改进 4.0（2）', [
      {
        成绩: '100～85',
        等级: 'A',
        GPA: 4.0
      },
      {
        成绩: '84～75',
        等级: 'B',
        GPA: 3.0
      },
      {
        成绩: '74～60',
        等级: 'C',
        GPA: 2.0
      },
      {
        成绩: '59～0',
        等级: 'F',
        GPA: 0
      }
    ])
    this.map = {
      85: 4.0,
      75: 3.0,
      60: 2.0,
      0: 0
    }
    this.mapper = orig => {
      let res = 0
      for (let key in this.map) {
        if (orig >= key) {
          res = this.map[key]
        }
      }
      return res
    }
  }
}

class PekingCalculator extends Calculator {
  constructor() {
    super('北大 4.0', [
      {
        成绩: '100～90',
        等级: 'A',
        GPA: 4.0
      },
      {
        成绩: '89～85',
        等级: 'A-',
        GPA: 3.7
      },
      {
        成绩: '84～82',
        等级: 'B+',
        GPA: 3.3
      },
      {
        成绩: '81～78',
        等级: 'B',
        GPA: 3.0
      },
      {
        成绩: '77～75',
        等级: 'B-',
        GPA: 2.7
      },
      {
        成绩: '74～72',
        等级: 'C+',
        GPA: 2.3
      },
      {
        成绩: '71～68',
        等级: 'C',
        GPA: 2.0
      },
      {
        成绩: '67～64',
        等级: 'D+',
        GPA: 1.5
      },
      {
        成绩: '63～60',
        等级: 'D',
        GPA: 1.0
      },
      {
        成绩: '59～0',
        等级: 'F',
        GPA: 0
      }
    ])
    this.map = {
      90: 4.0,
      85: 3.7,
      82: 3.3,
      78: 3.0,
      75: 2.7,
      72: 2.3,
      68: 2.0,
      64: 1.5,
      60: 1.0,
      0: 0
    }
    this.mapper = orig => {
      let res = 0
      for (let key in this.map) {
        if (orig >= key) {
          res = this.map[key]
        }
      }
      return res
    }
  }
}

export default [
  new Stand4Calculator(),
  new Stand4_1Calculator(),
  new Stand4_2Calculator(),
  new PekingCalculator()
]
