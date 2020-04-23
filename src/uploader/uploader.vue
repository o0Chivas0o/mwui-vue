<template>
  <div class="w-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <div ref="temp" style="width: 0;height: 0;overflow: hidden;"></div>
    <ol>
      <li v-for="file in fileList" :key="file.name">
        <template v-if="file.status === 'uploading'">
          菊花
        </template>
        <img :src="file.url" width="100" height="100" alt="">{{file.name}}
        <button @click="onRemoveFile(file)">x</button>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'WUploader',
    props: {
      name: {type: String, required: true},
      action: {type: String, required: true},
      methods: {type: String, default: 'POST'},
      parseResponse: {type: Function, required: true},
      fileList: {type: Array, default: () => []}
    },
    data () {
      return {
        url: 'about:blank'
      }
    },
    methods: {
      onClickUpload () {
        let input = this.createInput()
        input.addEventListener('change', () => {
          let file = input.files[0]
          this.uploadFile(file)
          input.remove()
        })
        input.click()
      },
      onRemoveFile (file) {
        let answer = window.confirm('确定删除')
        if (answer) {
          let copy = [...this.fileList]
          let index = copy.indexOf(file)
          copy.splice(index, 1)
          this.$emit('update:fileList', copy)
        }
      },
      createInput () {
        let input = document.createElement('input')
        input.type = 'file'
        this.$refs.temp.appendChild(input)
        return input
      },
      beforeUploadFile (rawFile, newName) {
        this.$emit('update:fileList', [...this.fileList, {name: newName, status: 'uploading'}])
      },
      uploadFile (rawFile) {
        let newName = this.generateName(name)
        this.beforeUploadFile(rawFile, newName)
        let formData = new FormData()
        formData.append(this.name, rawFile)
        this.doUploadFile(formData, (response) => {
          let url = this.parseResponse(response)
          this.url = url
          this.afterUploadFile(rawFile, newName, url)
        })
      },
      generateName (name) {
        while (this.fileList.filter(f => f.name === name).length > 0) {
          let dotIndex = name.lastIndexOf('.')
          let nameWithoutExtension = name.substring(0, dotIndex)
          let extension = name.substring(dotIndex)
          name = nameWithoutExtension + '(1)' + extension
        }
        return name
      },
      afterUploadFile (rawFile, newName, url) {
        let file = this.fileList.filter(f => f.name === name)[0]
        let index = this.fileList.indexOf(file)
        let fileCopy = JSON.parse(JSON.stringify(file))
        fileCopy.url = url
        fileCopy.status = 'success'
        let fileListCopy = [...this.fileList]
        fileListCopy.splice(index, 1, copy)
        this.$emit('update:fileList', fileListCopy)
      },
      doUploadFile (formData, success) {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', this.action)
        xhr.onload = () => {success(xhr.response)}
        xhr.send(formData)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/var';
  .w-uploader {
    border: 1px solid red;
  }
</style>
