<template>
  <div class="app-phone">
    <div class="phone-header">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/vue_gram_logo_cp.png" />
      <a class="cancel-cta"
        v-if="step === 2 || step === 3"
        @click="goToHome">
        Cancel
      </a>
      <a class="next-cta"
        v-if="step === 2"
        @click="step++">
        Next
      </a>
      <a class="next-cta"
        v-if="step === 3"
        @click="sharePost">
        Share
      </a>
    </div>
    <phone-body
      :step="step"
      :posts="posts"
      :filters="filters"
      :image="image"
      :selectedFilter="selectedFilter"
      v-model="caption">
    </phone-body>
    <div class="phone-footer">
      <div class="home-cta" @click="goToHome">
      <i class="fas fa-home fa-lg"></i>
      </div>
        <div class="upload-cta">
          <input type="file"
            id="file"
            name="file"
            class="inputfile"
            @change="uploadImage"
            :disabled="step !== 1"
          />
        <label for="file">
          <i class="far fa-plus-square fa-lg"></i>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PhoneBody from './components/PhoneBody.vue';
import posts from './data/posts';
import filters from './data/filters';
import EventBus from './event-bus';
import IPost from '@/types/post';

@Component({
  components: {
    PhoneBody,
  },
})
export default class App extends Vue {
  step = 1;
  posts = posts;
  filters = filters;
  image = '';
  selectedFilter = '';
  caption = '';

  created() {
    EventBus.$on('filter-selected', (ev: { filter: string}) => {
      this.selectedFilter = ev.filter;
    });
  }

  uploadImage(ev: Event): void {
    if (ev.target === null) { return; }
    const files =  (ev.target as HTMLInputElement).files;
    if (!files || !files.length) { return; }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (progressEvent) => {
      if (!progressEvent.target) { return; }
      this.image = (progressEvent.target as FileReader).result as string;
      this.step = 2;
    };
    const input = document.getElementById('file') as HTMLInputElement;
    input.value = '';
  }

  sharePost(): void {
    const post: IPost = {
      username: 'fullstack_vue',
      userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/vue_lg_bg.png',
      postImage: this.image,
      likes: 0,
      caption: this.caption,
      filter: this.selectedFilter,
      hasBeenLiked: false,
    };
    this.posts.unshift(post);
    this.goToHome();
  }

  goToHome(): void {
    this.image = '';
    this.selectedFilter = '';
    this.caption = '';
    this.step = 1;
  }
}
</script>

<style lang="scss">
$small: 520px;
$medium: 768px;
$large: 1216px;

html,
body,
#app {
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: #e6ecf1;
  font-family: "Roboto", sans-serif;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-phone {
  background-color: white;
  height: 620px;
  width: 375px;
  overflow: hidden;
}

.phone-header {
  height: 50px;
  width: 375px;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  background: #fafafa;
  border-bottom: 1px solid #eeeeee;
  z-index: 99;

  img {
    max-width: 120px;
    display: block;
    margin: 0 auto;
    padding-top: 1px;
  }

  .cancel-cta,
  .next-cta {
    position: absolute;
    top: 12px;
    color: #209cee;
    font-weight: bold;
    cursor: pointer;
  }

  .cancel-cta {
    left: 10px;
  }

  .next-cta {
    right: 10px;
  }
}

.feed {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: -15px;
}

.caption-container {
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;

  textarea {
    border: 0;
    font-size: 1rem;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
  }

  textarea:focus {
    outline: 0;
  }
}

.selected-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 330px;
}

.filter-container {
  height: 210px;
  padding: 30px 10px;
  white-space: nowrap;
  overflow-x: hidden;
}

.phone-footer {
  height: 35px;
  width: 375px;
  position: sticky;
  position: -webkit-sticky;
  bottom: 0;
  background: #fafafa;
  border-top: 1px solid #eeeeee;
  z-index: 99;

  .home-cta {
    position: absolute;
    left: 10px;
    top: 6px;
    cursor: pointer;
  }

  .upload-cta {
    position: absolute;
    right: 10px;
    top: 6px;
    p {
      font-size: 0.63rem;
      position: absolute;
      left: -25px;
      top: 5px;
    }
  }

  input[name="file"] {
    visibility: hidden;
  }

  label {
    cursor: pointer;
    z-index: 99;
  }
}

.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-to {
  opacity: 0;
}

// Media Queries
@media (max-width: $small) {
  #app {
    height: 100% !important;
    padding-top: 0 !important;
  }

  .app-phone,
  .app-phone-scroll-cover {
    height: 100%;
    width: 100%;
  }

  .phone-header,
  .phone-footer {
    width: 100%;
  }
}

@media (max-height: $small) {
  .app-phone {
    transform: scale(0.6);
  }
}
</style>
