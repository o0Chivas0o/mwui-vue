<template>
  <div>
    <div>
      <w-table :columns="columns" :data-source="dataSource" bordered :orderBy.sync="orderBy"
               expend-field="description" :height="200" @update:orderBy="order"
               :selected-items.sync="selected" :loading="loading">
        <template slot-scope="item">
          <button @click="edit(item)">编辑</button>
          <button @click="view(item)">查看</button>
        </template>
      </w-table>
    </div>
    <div style="display:flex;justify-content: center;margin: 20px auto;">
      <w-pagination :total-page="10" :current-page.sync="currentPage"></w-pagination>
    </div>
  </div>
</template>

<script>
  import WPagination from '@/pagination/pagination'
  import WTable from '@/table/table'
  
  export default {
    name: 'demo',
    components: {WPagination, WTable},
    data () {
      return {
        currentPage: 1,
        selected: [],
        loading: false,
        columns: [
          {text: '姓名', field: 'name', width: 100},
          {text: '分数', field: 'score'},
        ],
        orderBy: {
          name: true,
          score: 'desc'
        },
        dataSource: [
          {id: 11, name: 'zjl', score: 100, description: 'xxx'},
          {id: 22, name: 'lzy', score: 99, description: 'yyy'},
          {id: 33, name: 'zjl', score: 98},
          {id: 44, name: 'lzy', score: 97},
          {id: 55, name: 'zjl', score: 96},
          {id: 66, name: 'lzy', score: 95},
          {id: 77, name: 'zjl', score: 100},
          {id: 88, name: 'lzy', score: 99},
          {id: 99, name: 'zjl', score: 98},
          {id: 12, name: 'lzy', score: 97},
          {id: 13, name: 'zjl', score: 96},
          {id: 14, name: 'lzy', score: 95},
          {id: 15, name: 'zjl', score: 100},
          {id: 16, name: 'lzy', score: 99},
          {id: 17, name: 'zjl', score: 98},
          {id: 18, name: 'lzy', score: 97},
          {id: 19, name: 'zjl', score: 96},
          {id: 21, name: 'lzy', score: 95},
        ]
      }
    },
    created () {},
    methods: {
      order () {
        this.loading = true
        setTimeout(() => {
          this.dataSource.sort((a, b) => {return a.score - b.score})
          this.loading = false
        }, 1000)
      },
      edit (item) {
        alert(`${JSON.stringify(item)},编辑`)
      },
      view (item) {
        alert(`${JSON.stringify(item)},查看 `)
      }
    }
  }
</script>

<style lang="scss" scoped>
  * {margin: 0;padding: 0;box-sizing: border-box}
</style>
