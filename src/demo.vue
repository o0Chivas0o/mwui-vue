<template>
  <div style="margin: 20px;">
    <w-uploader accept="image/*" action="https://node-server-zjl-1.herokuapp.com/upload/" name="file" methods="POST"
                :parseResponse="parseResponse" :file-list.sync="fileList" @error="alert" :size-limit="2*1024*1024">
      <w-button icon="upload">上传</w-button>
    </w-uploader>
  </div>

</template>

<script>
  import WUploader from '@/uploader/uploader'
  import WButton from '@/button/button'
  
  export default {
    name: 'demo',
    components: {WUploader, WButton},
    data () {
      return {
        fileList: []
      }
    },
    created () {},
    methods: {
      parseResponse (response) {
        let obj = JSON.parse(response) // 反序列化:字符串->对象
        return `https://node-server-zjl-1.herokuapp.com/preview/${obj.id}`
      },
      alert (errorText) {
        window.alert(errorText || '上传失败')
      }
    }
  }
</script>

<style lang="scss" scoped>
  * {margin: 0;padding: 0;box-sizing: border-box}
</style>
