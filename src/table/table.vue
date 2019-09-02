<template>
  <div class="w-table-wrapper">
    {{areAllItemsSelected}}
    <table class="w-table" :class="{bordered,compact,striped}">
      <thead>
      <tr>
        <th>
          <input ref="allChecked" type="checkbox" @change="onChangeAllItems"
                 :checked="areAllItemsSelected">
        </th>
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
