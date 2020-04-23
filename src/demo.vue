<template>
  <div>
    <w-uploader accept="image/*" action="https://node-server-zjl-1.herokuapp.com/upload/" name="file" methods="POST"
                :parseResponse="parseResponse" :file-list.sync="fileList">
      <button>上传</button>
      <template slot="tips">
        <div>只能上传 300kb 以内的 png 、jpeg 文件</div>
      </template>
    </w-uploader>
  </div>

</template>

<script>
  import WUploader from '@/uploader/uploader'
  
  export default {
    name: 'demo',
    components: {WUploader},
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  * {margin: 0;padding: 0;box-sizing: border-box}
</style>
