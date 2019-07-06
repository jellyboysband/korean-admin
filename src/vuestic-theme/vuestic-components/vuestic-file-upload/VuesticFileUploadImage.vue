<template>
  <div class="file-upload-image">
    <img :src="previewImage" alt class="file-upload-image-image">
    <div class="file-upload-image-overlay">
      <div class="file-upload-image-name" :title="file.name">{{ file.name }}</div>
      <div class="file-upload-image-size">{{ file.size }}</div>
      <button
        type="button"
        class="btn-text btn-text--secondary file-upload-image-button"
        @click="$emit('remove')"
      >{{ $t('fileUpload.deleteFile') }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vuestic-file-upload-image',
  data() {
    return {
      previewImage: '',
    };
  },
  props: {
    file: {
      default: {},
    },
  },
  mounted() {
    this.convertToImg();
  },
  watch: {
    file() {
      this.convertToImg();
    }
  },
  methods: {
    convertToImg() {
      const reader = new FileReader();
      const imageFileTypes = ['/png', '/jpg', '/jpeg', '/gif', '/octet'];
      reader.readAsDataURL(this.file.image);
      reader.onload = e => {
        for (let i = 0; i < imageFileTypes.length; i++) {
          //
          if (e.target.result.indexOf(imageFileTypes[i]) >= 0) {
            this.previewImage = e.target.result;
          }
        }
      };
    },
  },
};
</script>

<style lang='scss'>
$previewWidth: 100%;
.file-upload-image {
  position: relative;
  width: $previewWidth;
  padding-top: 20%;
  margin-bottom: 1rem;

  &:hover {
    .file-upload-image-overlay {
      display: flex;
    }
  }

  &-overlay {
    display: none;
    position: absolute;
    height: 100%;
    width: $previewWidth;
    top: 0;
    left: 0;
    flex-direction: column;
    padding: 0.5rem;
    background: rgba($vue-green, 0.8);
    z-index: 1;
  }

  &-image {
    position: absolute;
    top: 0;
    left: 0;
    width: $previewWidth;
    height: 100%;
    object-fit: scale-down;
  }

  &-name {
    color: $vue-darkest-blue;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &-size {
    color: $vue-darkest-blue;
  }

  &-button {
    margin-top: auto;
    text-align: left;
  }

  &-undo {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.7rem 0 0;
  }
}

.file-upload-image_not-image {
  .file-upload-image-overlay {
    display: flex;
  }
}
</style>
