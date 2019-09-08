<template>
  <div class="home recol-2" style="margin-bottom:300px;">
    <div class="screen-center" v-if="!gradeData.labels">
      <b-spinner label="正在加载课程信息……"> </b-spinner>
    </div>
    <div v-else>
      <div>
        <b-card-group deck class="my-2">
          <b-card
            v-for="calculator in calculators"
            v-bind:key="calculator.name"
            bg-variant="info"
            text-variant="white"
            :header="'GPA - ' + calculator.name"
            class="text-center"
          >
            <b-card-text>
              <h2>
                {{ calculator.toString(gradeData.gradeForAllCourses) }}
              </h2>
            </b-card-text>
            <b-table dark :items="calculator.descriptionTable"></b-table>
          </b-card>
        </b-card-group>
      </div>
      <div>
        <b-card-group deck class="my-2">
          <b-card
            v-for="card in topCards"
            v-bind:key="card.header"
            :bg-variant="card.color"
            text-variant="white"
            :header="card.header"
            class="text-center"
          >
            <b-card-text>
              <h2>{{ card.text.toFixed(2) }}</h2>
            </b-card-text>
          </b-card>
        </b-card-group>
      </div>
      <h2 class="my-5">有成绩的记录</h2>
      <b-container class="my-3">
        <b-row>
          <b-col lg="6" class="my-1">
            <b-form-group
              label="筛选"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="filterInput"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-input
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="输入内容进行筛选"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''"
                    >清除</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col lg="6" class="my-1">
            <b-form-group
              label="对选中列进行筛选"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              description="全不选时筛选所有数据"
              class="mb-0"
            >
              <b-form-checkbox-group v-model="filterOn" class="mt-1">
                <b-form-checkbox
                  v-for="field in fields"
                  v-bind:key="field.key"
                  :value="field.key"
                  >{{ field.label }}</b-form-checkbox
                >
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
      <b-table
        id="grade-table"
        ref="gradeTable"
        striped
        hover
        responsive
        selectable
        sticky-header
        :items="gradeData.gradeForAllCourses"
        :fields="fields"
        @row-selected="onRowSelected"
        style="max-height: 600px"
        :filter="filter"
        :filterIncludedFields="filterOn"
      >
        <strong
          slot="[课程名称]"
          slot-scope="data"
          v-html="data.value"
        ></strong>
        <strong slot="[学分]" slot-scope="data" v-html="data.value"></strong>
        <strong slot="[总成绩]" slot-scope="data" v-html="data.value"></strong>
      </b-table>

      <h2 class="my-5">没有成绩的记录</h2>
      <b-container class="my-3">
        <b-row>
          <b-col lg="6" class="my-1">
            <b-form-group
              label="筛选"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="filterInput"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-input
                  v-model="filterNoGrades"
                  type="search"
                  id="filterInput2"
                  placeholder="输入内容进行筛选"
                ></b-form-input>
                <b-input-group-append>
                  <b-button
                    :disabled="!filterNoGrades"
                    @click="filterNoGrades = ''"
                    >清除</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col lg="6" class="my-1">
            <b-form-group
              label="对选中列进行筛选"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              description="全不选时筛选所有数据"
              class="mb-0"
            >
              <b-form-checkbox-group v-model="filterOnNoGrades" class="mt-1">
                <b-form-checkbox
                  v-for="field in fields"
                  v-bind:key="field.key"
                  :value="field.key"
                  >{{ field.label }}</b-form-checkbox
                >
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
      <b-table
        id="no-grade-table"
        ref="noGradeTable"
        striped
        hover
        responsive
        selectable
        sticky-header
        :items="gradeData.noGradeCourses"
        :fields="fields"
        @row-selected="onRowSelectedNoGrades"
        style="max-height: 600px"
        :filter="filterNoGrades"
        :filterIncludedFields="filterOnNoGrades"
      >
      </b-table>

      <b-container class="show-button">
        <b-row class="justify-content-md-end">
          <b-col class="text-right" md="auto">
            <b-button size="lg" pill class="my-2" @click="toggleButtons">
              <font-awesome-icon icon="bars" fixed-width />
            </b-button>
          </b-col>
        </b-row>
      </b-container>

      <b-container ref="buttonsContainer" class="bottom-right-button-group">
        <b-row class="justify-content-md-end">
          <b-col class="text-right my-2" md="auto">
            <b-button
              size="lg"
              pill
              variant="primary"
              @click="clearSelected"
              :disabled="selected.length === 0 && selectedNoGrades.length === 0"
              >取消选择</b-button
            >
          </b-col>
          <b-col class="text-right my-2" md="auto">
            <b-button
              size="lg"
              pill
              variant="primary"
              @click="selectAll"
              :disabled="
                selected.length + selectedNoGrades.length === totalRows
              "
              >全选</b-button
            >
          </b-col>
          <b-col class="text-right my-2" md="auto">
            <b-button size="lg" pill variant="primary" @click="reverseSelect()"
              >反选</b-button
            >
          </b-col>
        </b-row>

        <b-row class="justify-content-md-end buttons-second">
          <b-col class="text-right my-2" md="auto">
            <b-button size="lg" pilled v-b-tooltip.hover :title="exportInfo">
              <download-excel
                :data="allData"
                :fields="excelFields"
                :name="excelFilename"
              >
                导出全部
              </download-excel>
            </b-button>
          </b-col>
          <b-col class="text-right my-2" md="auto">
            <b-button size="lg" pilled :disabled="selectedData.length === 0">
              <download-excel
                :data="selectedData"
                :fields="excelFields"
                :name="excelFilename"
              >
                导出已选
              </download-excel>
            </b-button>
          </b-col>
          <b-col class="text-right my-2" md="auto">
            <b-button size="lg" pill @click="toggleButtons">
              <font-awesome-icon icon="times" fixed-width />
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div
      :style="`visibility: ${gradeData.labels ? 'visible' : 'hidden'}`"
      class="social-share text-center my-5"
      data-sites="wechat,weibo,qzone,facebook,twitter"
    ></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import calculators from '../utils/calculator'
export default {
  name: 'home',
  data() {
    return {
      filter: '',
      filterOn: [],
      filterNoGrades: '',
      filterOnNoGrades: [],
      selected: [],
      selectedNoGrades: [],
      exportInfo:
        '导出之后需要使用电脑版 Excel 打开表格文件，在第一次打开时会提示文件格式和后缀名不匹配，点击确定开启编辑并另存为 xls 格式，之后打开不会再有此提示。',
      calculators
    }
  },
  computed: {
    ...mapState(['gradeData', 'user']),
    fields() {
      return this.gradeData.labels
        .filter(label => {
          return !(
            label == '操作' ||
            label == '成绩备注' ||
            label == '补考重修标记'
          )
        })
        .map(label => {
          return {
            key: label,
            label: label,
            sortable: true
          }
        })
    },
    excelFields() {
      let res = {}
      this.gradeData.labels.forEach(label => {
        res[label] = label
      })
      return res
    },
    excelFilename() {
      return `成绩表-${this.user.username}@${this.getDateYYMMDD()}`
    },
    totalRows() {
      return (
        this.gradeData.gradeForAllCourses.length +
        this.gradeData.noGradeCourses.length
      )
    },
    selectedData() {
      return this.selected.concat(this.selectedNoGrades)
    },
    allData() {
      return this.gradeData.gradeForAllCourses.concat(
        this.gradeData.noGradeCourses
      )
    },
    totalCredits() {
      const reducer = (accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue['学分'])
      }
      return this.gradeData.gradeForAllCourses.reduce(reducer, 0)
    },
    totalKaoShiCredits() {
      const reducer = (accumulator, currentValue) => {
        return (
          accumulator +
          (currentValue['是否考试课'] === '是'
            ? parseFloat(currentValue['学分'])
            : 0)
        )
      }
      return this.gradeData.gradeForAllCourses.reduce(reducer, 0)
    },
    totalGradePoints() {
      const reducer = (accumulator, currentValue) => {
        return (
          accumulator +
          parseFloat(currentValue['学分']) * parseFloat(currentValue['总成绩'])
        )
      }
      return this.gradeData.gradeForAllCourses.reduce(reducer, 0)
    },
    totalGradePointsAverage() {
      return this.totalGradePoints / this.totalCredits
    },
    topCards() {
      return [
        {
          header: 'Σ 学分',
          text: this.totalCredits,
          color: 'primary'
        },
        {
          header: 'Σ (学分*成绩)',
          text: this.totalGradePoints,
          color: 'primary'
        },
        {
          header: 'Σ (学分*成绩) / Σ 学分',
          text: this.totalGradePointsAverage,
          color: 'primary'
        },
        {
          header: 'Σ (学分*成绩) / Σ 学分 x 4/100',
          text: (this.totalGradePointsAverage * 4) / 100,
          color: 'primary'
        }
      ]
    }
  },
  created() {
    this.$store.dispatch('getGrade', { bvToast: this.$bvToast })
  },
  methods: {
    toggleButtons() {
      this.$refs.buttonsContainer.classList.toggle('open')
    },
    reverseSelect() {
      for (let i = 0; i < this.gradeData.gradeForAllCourses.length; i++) {
        if (this.$refs.gradeTable.isRowSelected(i)) {
          this.$refs.gradeTable.unselectRow(i)
        } else {
          this.$refs.gradeTable.selectRow(i)
        }
      }
      for (let i = 0; i < this.gradeData.noGradeCourses.length; i++) {
        if (this.$refs.noGradeTable.isRowSelected(i)) {
          this.$refs.noGradeTable.unselectRow(i)
        } else {
          this.$refs.noGradeTable.selectRow(i)
        }
      }
    },
    selectAll() {
      this.$refs.gradeTable.selectAllRows()
      this.$refs.noGradeTable.selectAllRows()
    },
    clearSelected() {
      this.$refs.gradeTable.clearSelected()
      this.$refs.noGradeTable.clearSelected()
    },
    onRowSelected(items) {
      this.selected = items
    },
    onRowSelectedNoGrades(items) {
      this.selectedNoGrades = items
    },
    getDateYYMMDD(date) {
      date = date || new Date()
      var mm = date.getMonth() + 1 // getMonth() is zero-based
      var dd = date.getDate()

      return [
        date.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
      ].join('')
    }
  }
}
</script>
