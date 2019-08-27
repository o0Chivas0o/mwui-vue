<template>
  <div class="w-pager">
    <span class="w-pager-nav prev" :class="{disable:currentPage === 1}">
      <w-icon name="left"></w-icon>
    </span>
    <template v-for="page in pages">
      <template v-if="page === currentPage">
        <span class="w-pager-item current">{{page}}</span>
      </template>
      <template v-else-if="page === '...'">
        <w-icon class="w-pager-separator" name="dots"></w-icon>
      </template>
      <template v-else>
        <span class="w-pager-item other">{{page}}</span>
      </template>
    </template>
    <span class="w-pager-nav next" :class="{disable:currentPage === totalPage}">
      <w-icon name="right"></w-icon>
    </span>
  </div>
</template>

<script>
  import WIcon from '@/icon/icon'
  
  export default {
    name: 'WPagination',
    components: {WIcon},
    props: {
      totalPage: {type: Number, required: true},
      currentPage: {type: Number, required: true},
      hidIfOnePage: {type: Boolean, default: true}
    },
    data () {
      let pages = unique([
        1, this.currentPage - 2, this.currentPage - 1, this.currentPage,
        this.currentPage + 1, this.currentPage + 2, this.totalPage]
      .filter((n) => n >= 1 && n <= this.totalPage)
      .sort((a, b) => a - b))
      .reduce((prev, current, index, array) => {
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
  
  $width: 20px;
  $height: 20px;
  $font-size: 12px;
  .w-pager {
    display: flex;justify-content: flex-start;align-items: center;
    &-separator {width: $width;font-size: $font-size;margin: 0 4px;}
    &-nav {
      display: inline-flex;justify-content: center;align-items: center;margin: 0 4px;background: $grey;
      min-width: $width;height: $height;border-radius: $border-radius;font-size: $font-size;
      &.disable {
        svg {fill: darken($grey, 30%)}
      }
    }
    &-item {
      border: 1px solid #e1e1e1;border-radius: $border-radius;padding: 0 4px;font-size: $font-size;margin: 4px;
      display: inline-flex;justify-content: center;align-items: center;min-width: $width;height: $height;
      &.current, &:hover {border-color: $blue;cursor: default;}
      &.separator {border: none;}
    }
  }
</style>
