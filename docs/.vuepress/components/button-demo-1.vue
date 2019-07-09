<template>
  <div>
    <m-button>默认按钮</m-button>
    <m-button icon="settings">设置按钮</m-button>
    <m-button :loading='true'>加载中按钮</m-button>
    <m-button disabled>禁用按钮</m-button>
    <pre><code>{{content}}</code></pre>
  </div>
</template>

<script>
  import Button from '../../../src/button'
  
  export default {
    name: 'button-demos',
    components: {'m-button': Button},
    data () {
      return {
        content: `
         <m-button>默认按钮</m-button>
         <m-button icon="settings">默认按钮</m-button>
         <m-button :loading="true">加载中按钮</m-button>
         <m-button disabled>禁用按钮</m-button>
        `.replace(/\t+| +/g, '').trim()
      }
    }
  }
</script>

