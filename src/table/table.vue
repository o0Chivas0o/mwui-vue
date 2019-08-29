<template>
  <div class="w-table-wrapper">
    <table class="w-table" :class="{bordered,compact,striped}">
      <thead>
      <tr>
        <th><input ref="allChecked" type="checkbox" @change="onChangeAllItems" :checked="selectedItems.length >0"></th>
        <th v-if="numberVisible">#</th>
        <th v-for="column in columns" :key="column.field">{{column.text}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in dataSource" :key="item.id">
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
  </div>
</template>

<script>
  export default {
    name: 'WTable',
    props: {
      selectedItems: {type: Array, default: () => []},
      compact: {type: Boolean, default: false},
      striped: {type: Boolean, default: true},
      columns: {type: Array, required: true},
      numberVisible: {type: Boolean, default: false},
      bordered: {type: Boolean, default: false},
      dataSource: {
        type: Array,
        required: true,
        validator (array) {
          return !(array.filter(item => item.id === undefined).length > 0)
        }
      }
    },
    watch: {
      selectedItems () {
        this.$refs.allChecked.indeterminate = !(this.selectedItems.length === this.dataSource.length || this.selectedItems.length === 0)
      }
    },
    methods: {
      inSelectedItems (item) {
        return this.selectedItems.filter((i) => i.id === item.id).length > 0
      },
      onChangeItem (item, index, e) {
        let selected = e.target.checked
        let copy = JSON.parse(JSON.stringify(this.selectedItems))
        if (selected) {
          copy.push(item)
        } else {
          copy.splice(copy.filter(i => i.id !== item.id), 1)
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
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid darken($grey, 10%);
    &.compact {
      td, th { padding: 4px;}
    }
    &.bordered {
      border: 1px solid $grey;
      td, th {border: 1px solid $grey;}
    }
    td, th {
      border-bottom: 1px solid darken($grey, 10%);
      text-align: left;
      padding: 8px;
    }
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
  }
</style>
