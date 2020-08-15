<template>
  <div>
    <div>
      <w-table :data-source="dataSource" bordered :orderBy.sync="orderBy" @update:orderBy="order"
               expend-field="description" :height="200" :selected-items.sync="selected" :loading="loading">
        <w-table-column text="姓名" field="name" :width="100">
          <template slot-scope="props">
            <a href="#">{{ props.value }}</a>
          </template>
        </w-table-column>
        <w-table-column text="分数" field="score" :width="100"></w-table-column>
      </w-table>
    </div>
    <div style="display:flex;justify-content: center;margin: 20px auto;">
      <w-pagination :total-page="10" :current-page.sync="currentPage"></w-pagination>
    </div>
  </div>
</template>

<script>
import WPagination from '@/pagination/pagination'
import WTableColumn from '@/table/table-column'
import WTable from '@/table/table'
import WButton from '@/button/button'

export default {
  name: 'demo',
  components: { WPagination, WTable, WButton, WTableColumn },
  data() {
    return {
      currentPage: 1,
      selected: [],
      loading: false,
      orderBy: {
        name: true,
        score: 'desc'
      },
      dataSource: [
        { id: 11, name: 'zjl', score: 100, description: 'xxx' },
        { id: 22, name: 'lzy', score: 99, description: 'yyy' },
        { id: 33, name: 'zjl', score: 98 },
        { id: 44, name: 'lzy', score: 97 },
        { id: 55, name: 'zjl', score: 96 },
        { id: 66, name: 'lzy', score: 95 },
        { id: 77, name: 'zjl', score: 100 },
        { id: 88, name: 'lzy', score: 99 },
        { id: 99, name: 'zjl', score: 98 },
        { id: 12, name: 'lzy', score: 97 },
        { id: 13, name: 'zjl', score: 96 },
        { id: 14, name: 'lzy', score: 95 },
        { id: 15, name: 'zjl', score: 100 },
        { id: 16, name: 'lzy', score: 99 },
        { id: 17, name: 'zjl', score: 98 },
        { id: 18, name: 'lzy', score: 97 },
        { id: 19, name: 'zjl', score: 96 },
        { id: 21, name: 'lzy', score: 95 },
      ]
    }
  },
  created() {},
  methods: {
    order() {
      this.loading = true
      setTimeout(() => {
        this.dataSource.sort((a, b) => {return a.score - b.score})
        this.loading = false
      }, 1000)
    },
    edit(item) {
      alert(`${JSON.stringify(item)},编辑`)
    },
    view(item) {
      alert(`${JSON.stringify(item)},查看 `)
    }
  }
}
</script>

<style lang="scss" scoped>
* {margin: 0;padding: 0;box-sizing: border-box}
</style>
