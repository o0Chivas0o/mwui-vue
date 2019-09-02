<template>
  <div class="w-table-wrapper">
    <table class="w-table" :class="{bordered,compact,striped}">
      <thead>
      <tr>
        <th>
          <input ref="allChecked" type="checkbox" @change="onChangeAllItems"
                 :checked="areAllItemsSelected">
        </th>
        <th v-if="numberVisible">#</th>
        <th v-for="column in columns" :key="column.field">
          <div class="w-table-header">
            {{column.text}}
            <span v-if="column.field in orderBy" class="w-table-sorter" @click="changeOrderBy(column.field)">
              <w-icon name="asc" :class="{active:orderBy[column.field] === 'asc'}"></w-icon>
              <w-icon name="desc" :class="{active:orderBy[column.field] === 'desc'}"></w-icon>
            </span>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for=" (item,index) in dataSource" :key="item.id">
        <th>
          <input type="checkbox" @change="onChangeItem(item,index,$event)"
                 :checked="inSelectedItems(item)">
        </th>
        <td v-if="numberVisible">{{index+1}}</td>
        <template v-for="column in columns">
          <td :key="column.field">{{item[column.field]}}</td>
        </template>
      </tr>
      </tbody>
    </table>
    <div class="w-table-loading" v-if="loading">
      <w-icon name="loading"></w-icon>
    </div>
  </div>
</template>

<script>
  import WIcon from '../icon/icon'
  
  export default {
    name: 'WTable',
    components: {WIcon},
    props: {
      selectedItems: {type: Array, default: () => []},
      loading: {type: Boolean, default: false},
      compact: {type: Boolean, default: false},
      striped: {type: Boolean, default: true},
      columns: {type: Array, required: true},
      numberVisible: {type: Boolean, default: false},
      bordered: {type: Boolean, default: false},
      orderBy: {type: Object, default: () => ({})},
      dataSource: {
        type: Array,
        required: true,
        validator (array) {
          return !(array.filter(item => item.id === undefined).length > 0)
        }
      }
    },
    computed: {
      areAllItemsSelected () {
        const a = this.dataSource.map(item => item.id).sort()
        const b = this.selectedItems.map(item => item.id).sort()
        if (a.length !== b.length) {
          return false
        }
        let equal = true
        for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) {
          equal = false
          break
        }
        return equal
      }
    },
    watch: {
      selectedItems () {
        this.$refs.allChecked.indeterminate = !(this.selectedItems.length === this.dataSource.length || this.selectedItems.length === 0)
      }
    },
    methods: {
      changeOrderBy (key) {
        const copy = JSON.parse(JSON.stringify(this.orderBy))
        let oldValue = copy[key]
        if (oldValue === 'asc') {
          copy[key] = 'desc'
        } else if (oldValue === 'desc') {
          copy[key] = true
        } else {
          copy[key] = 'asc'
        }
        this.$emit('update:orderBy', copy)
      },
      inSelectedItems (item) {
        return this.selectedItems.filter((i) => i.id === item.id).length > 0
      },
      onChangeItem (item, index, e) {
        let selected = e.target.checked
        let copy = JSON.parse(JSON.stringify(this.selectedItems))
        if (selected) {
          copy.push(item)
        } else {
          copy = copy.filter(i => i.id !== item.id)
        }
        this.$emit('update:selectedItems', copy)
      },
      onChangeAllItems (e) {
        let selected = e.target.checked
        this.$emit('update:selectedItems', selected ? this.dataSource : [])
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/var';
  
  .w-table {
    width: 100%;border-collapse: collapse;border-spacing: 0;border-bottom: 1px solid darken($grey, 10%);
    &-wrapper { position: relative;}
    &.compact {
      td, th { padding: 4px;}
    }
    &.bordered {
      border: 1px solid $grey;
      td, th {border: 1px solid $grey;}
    }
    td, th {border-bottom: 1px solid darken($grey, 10%);text-align: left;padding: 8px;}
    &.striped {
      tbody {
        > tr {
          &:nth-child(odd) {
            background: white;
          }
          &:nth-child(even) {
            background: lighten($grey, 5%);
          }
        }
      }
    }
    &-header {display: flex;align-items: center;}
    &-sorter {
      display: inline-flex;flex-direction: column;margin: 0 4px;cursor: pointer;user-select: none;
      svg {
        width: 10px;height: 10px;fill: $grey;
        &.active {fill: red;}
        &:first-child {position: relative;bottom: -1px;}
        &:nth-child(2) {position: relative;top: -1px;}
      }
    }
    &-loading {
      position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;
      background: rgba(255, 255, 255, .9);
      svg {@include spin;width: 50px;height: 50px;}
    }
  }
</style>
