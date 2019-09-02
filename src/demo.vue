<template>
  <div>
    <div>
      {{selected}}
      <w-table :columns="columns" :data-source="dataSource" bordered :orderBy.sync="orderBy"
               :selected-items.sync="selected"></w-table>
    </div>
    <div style="margin-top: 20px;">
      <w-table :columns="columns" :data-source="dataSource" :bordered="true" :compact="true" :striped="false"></w-table>
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
        columns: [
          {text: '姓名', field: 'name'},
          {text: '分数', field: 'score'},
        ],
        orderBy: {
          name: true,
          score: 'desc'
        },
        dataSource: [
          {id: 11, name: 'zjl', score: 100},
          {id: 22, name: 'lzy', score: 99},
          {id: 33, name: 'zjl', score: 98},
          {id: 44, name: 'lzy', score: 97},
          {id: 55, name: 'zjl', score: 96},
          {id: 66, name: 'lzy', score: 95},
        ]
      }
    },
    created () {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  * {margin: 0;padding: 0;box-sizing: border-box}
</style>
