<template>
  <div class="w-pager">
    <span v-for="page in pages" class="w-pager-item" :class="{active:currentPage === page,separator:page === '...'}">
      {{page}}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'WPagination',
    props: {
      totalPage: {type: Number, required: true},
      currentPage: {type: Number, required: true},
      hidIfOnePage: {type: Boolean, default: true}
    },
    data () {
      let pages = unique([
        1, this.currentPage - 2, this.currentPage - 1, this.currentPage,
        this.currentPage + 1, this.currentPage + 2, this.totalPage].sort((a, b) => a - b)).reduce((prev, current, index, array) => {
        prev.push(current)
        array[index + 1] !== undefined && array[index + 1] - array[index] > 1 && prev.push('...')
        return prev
      }, [])
      return {
        pages
      }
    }
  }
  
  function unique (array) {
    // return [...new Set(array)] 兼容性太差
    const object = {}
    array.map(number => {
      object[number] = true
    })
    return Object.keys(object).map(s => parseInt(s, 10))
  }
</script>

<style lang="scss" scoped>
  @import '../style/_var.scss';
  .w-pager {
    &-item {
      border: 1px solid #e1e1e1;border-radius: $border-radius;padding: 0 4px;font-size: 12px;margin: 4px;
      display: inline-flex;justify-content: center;align-items: center;min-width: 20px;height: 20px;cursor: pointer;
      &.active, &:hover {border-color: $blue;cursor: default;}
      &.separator {border: none;}
    }
  }
</style>
