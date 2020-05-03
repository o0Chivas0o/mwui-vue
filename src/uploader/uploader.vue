<template>
  <div class="w-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <slot name="tips"></slot>
    <ol class="w-uploader-fileList">
      <li v-for="file in fileList" :key="file.name">
        <template v-if="file.status === 'uploading'">
          <w-icon name="loading" class="w-uploader-spin"></w-icon>
        </template>
        <template v-else-if="file.type.indexOf('image') === 0">
          <img class="w-uploader-image" :src="file.url" width="32" height="32" alt="">
        </template>
        <template v-else>
          <div class="w-uploader-defaultImage"></div>
        </template>
        <span class="w-uploader-name" :class="{[file.status]:file.status}">{{file.name}}</span>
        <button class="w-uploader-remove" @click="onRemoveFile(file)">x</button>
      </li>
    </ol>
    <div ref="temp" style="width: 0;height: 0;overflow: hidden;"></div>
  </div>
</template>

<script>
  import WIcon from '@/icon/icon'
  
  export default {
    name: 'WUploader',
    components: {WIcon},
    props: {
      name: {type: String, required: true},
      action: {type: String, required: true},
      methods: {type: String, default: 'POST'},
      parseResponse: {type: Function, required: true},
      fileList: {type: Array, default: () => []},
      sizeLimit: {type: Number}
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
        this.$refs.temp.innerHTML = ''
        let input = document.createElement('input')
        input.type = 'file'
        this.$refs.temp.appendChild(input)
        return input
      },
      uploadFile (rawFile) {
        let newName = this.generateName(name)
        if (!this.beforeUploadFile(rawFile, newName)) {return}
        let formData = new FormData()
        formData.append(this.name, rawFile)
        this.doUploadFile(formData,
            (response) => {
              let url = this.parseResponse(response)
              this.url = url
              this.afterUploadFile(rawFile, newName, url)
            },
            (xhr) => {
              this.uploadError(xhr, newName)
            })
        
      },
      uploadError (xhr, newName) {
        let file = this.fileList.filter(f => f.name === newName)[0]
        let index = this.fileList.indexOf(file)
        let fileCopy = JSON.parse(JSON.stringify(file))
        fileCopy.status = 'fail'
        let fileListCopy = [...this.fileList]
        fileListCopy.splice(index, 1, fileCopy)
        let error = ''
        if (xhr.status === 0) {
          error = '当前无网络连接'
        }
        this.$emit('update:fileList', fileListCopy)
        this.$emit('error', error)
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
      beforeUploadFile (rawFile, newName) {
        let {size, type} = rawFile
        if (size > this.sizeLimit) {
          this.$emit('error', '文件大于2MB')
        } else {
          this.$emit('update:fileList', [...this.fileList, {name: newName, status: 'uploading', size, type}])
        }
      },
      afterUploadFile (rawFile, newName, url) {
        let file = this.fileList.filter(f => f.name === name)[0]
        let index = this.fileList.indexOf(file)
        let fileCopy = JSON.parse(JSON.stringify(file))
        fileCopy.url = url
        fileCopy.status = 'success'
        let fileListCopy = [...this.fileList]
        fileListCopy.splice(index, 1, fileCopy)
        this.$emit('update:fileList', fileListCopy)
      },
      doUploadFile (formData, success, fail) {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', this.action)
        xhr.onload = () => {success(xhr.response)}
        xhr.onerror = () => {fail(xhr, xhr.status)}
        xhr.send(formData)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/var';
  .w-uploader {
    &-fileList {
      list-style: none;
      > li {display: flex;align-items: center;margin: 8px 0;border: 1px solid darken($grey, 10%);}
    }
    &-defaultImage {width: 32px; height: 32px;margin-right: 8px;}
    &-image {margin-right: 8px;border: none}
    &-name {
      margin-right: auto;
      &.success {color: green;}
      &.fail {color: $red;}
    }
    &-remove {width: 32px;height: 32px;}
    &-spin {@include spin;width: 32px;height: 32px;}
  }
</style>
