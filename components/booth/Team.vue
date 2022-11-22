<script>
import Comment from './Comment.vue'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import fancyBox from 'vue-fancybox'

let slickConfig = {
  accessibility: true,
  arrows: true,
  dots: false,
  focusOnSelect: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  touchThreshold: 5,
}

export default {
  components: { Comment, VueSlickCarousel },
  name: 'team',
  target: 'static',
  props: ['idt', 'booth'],
  data() {
    return {
      team: {},
      comments: {},
      photos: [],
      videos: [],
      formComment: {
        parent: null,
        team_id: this.idt,
        comment: null,
        commentChild: null,
      },
      like: false,
      likes: 0,
      slickConfig: slickConfig,
      fancyvid: null,
    }
  },
  beforeMount() {
    this.$auth.refreshTokens()
    this.$axios.defaults.headers.common = {
      Authorization: `Bearer ${this.$auth.$storage.getCookie('token')}`,
      Acsept: 'application/json',
    }
  },
  async mounted() {
    try {
      let team = await this.$axios.$get('/team/' + this.idt)
      this.team = team.data
      this.photos = team.data.photo
      this.videos = team.data.video

      let vid = []
      for (const v in this.videos) {
        vid.push({ url: this.$store.state.filePath + video.file })
      }
      this.fancyvid = vid
    } catch (error) {
      console.log(error)
    }

    this.fetchLike()
    this.fetchComment()
  },
  methods: {
    async fetchLike() {
      try {
        let resp = await this.$axios.$get('/like/' + this.idt)
        if (resp.status) {
          this.like = resp.data.liked ? true : false
          this.likes = resp.data.total
        }
      } catch (error) {
        console.log(error)
      }
    },
    async postLike() {
      if (!this.like)
        try {
          let resp = await this.$axios.$post('/like/' + this.idt, {
            state: !this.like,
          })
          if (resp.status) {
            this.like = resp.data.liked ? true : false
            this.likes = resp.data.total
          }
        } catch (error) {
          console.log(error)
        }
    },
    async postComment(parent = null) {
      try {
        this.formComment.parent = parent
        let resp = await this.$axios.$post('/comment', this.formComment)
        if (resp.status) {
          this.formComment.comment = null
          this.formComment.commentChild = null
          this.formComment.parent = null
          this.comments = resp.data
        }
      } catch (error) {
        console.log(error)
      }
    },

    async fetchComment() {
      try {
        // this.comments = {}
        let comment = await this.$axios.$get('/comment/' + this.idt)
        this.comments = comment.data
      } catch (error) {
        console.log(error)
      }
    },
    async point(desc) {
      let data = {
        activity_id: 3,
        description: 'tim ' + this.team.name + ' ' + desc,
      }

      let resp = await this.$axios.$post('/point', data)
    },
    open(e) {
      fancyBox(e.target, this.videos)
    },
  },
}
</script>

<template>
  <div class="w-full overflow-y-auto pr-2 team">
    <div class="flex gap-3">
      <div class="w-1/2 lg:h-60 h-32 overflow-hidden flex-none">
        <img
          v-img
          v-if="photos.length"
          :src="require('~/assets/img/booth/b' + booth + '.jpeg')"
          class="object-cover"
          alt=""
        />
      </div>
      <div class="flex-auto flex">
        <div class="my-auto">
          <div class="font-bold">{{ team.name }}</div>
          <div class="font-light">
            {{ team.description }}
          </div>
          <div class="mt-2 flex">
            <button @click="postLike()">
              <img
                src="~/assets/img/heart0.png"
                class="w-5 inline-block mb-1"
                alt=""
                v-if="!like"
              />
              <img
                src="~/assets/img/heart1.png"
                class="w-5 inline-block mb-1"
                alt=""
                v-if="like"
              />
            </button>
            <span class="ml-1 my-auto flex-auto text-gray-700">{{
              likes
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mt-4 mb-2 pb-2">
      <!-- <div class="snap-start scroll-mx-6 shrink-0">
        <div class="shrink-0 w-0"></div>
      </div> -->

      <div class="pr-4 pl-6">
        <VueSlickCarousel
          v-bind="slickConfig"
          v-if="photos.length > 0 || videos.length > 0"
        >
          <div class="h-40 px-1" v-for="photo in photos" :key="'p' + photo.id">
            <img
              v-img
              @click="point($store.state.filePath + photo.file)"
              class="shrink-0 w-60 h-40 rounded-lg shadow-sm bg-white"
              :src="$store.state.filePath + photo.file"
            />
          </div>
          <div class="h-40 px-2" v-for="video in videos" :key="'v' + video.id">
            <video
              @play="point($store.state.filePath + video.file)"
              class="hrink-0 w-60 h-40 rounded-lg shadow-sm bg-white"
              controls
            >
              <source
                :src="$store.state.filePath + video.file"
                type="video/mp4"
              />
            </video>
            <!-- <a :href="$store.state.filePath + video.file">
              <img :src="$store.state.filePath + video.file" alt="" />
            </a> -->
          </div>
        </VueSlickCarousel>
      </div>
    </div>

    <!-- jadwal -->
    <div>
      <span class="text-gray-500 font-light">Jadwa presentasi tim: </span>
      <span class="text-blue-500"
        >Selasa, 23 November pukul {{ team.schedule }}</span
      >
    </div>

    <!-- form Comment -->
    <div class="mt-5 text-gray-700 font-light">Type comment for this idea</div>
    <div class="mt-1">
      <textarea
        name="comment"
        class="rounded-md p-2 border-gray-400 w-full"
        rows="5"
        v-model="formComment.comment"
      ></textarea>
    </div>
    <button
      @click="postComment()"
      class="px-5 py-2 mt-1 bg-blue-600 text-white rounded-md"
    >
      Send
    </button>

    <!-- Comments -->
    <div class="mt-8 text-gray-700 mb-2">Comments</div>
    <div v-for="comment in comments" :key="comment.id" class="mb-7">
      <comment
        v-if="comment.parent == null"
        :comment="comment"
        :reply="true"
        :idt="idt"
        :formComment="formComment"
        :postComment="postComment"
      />
      <div class="ml-10" v-for="child in comments" :key="child.id">
        <comment :comment="child" v-if="child.parent == comment.id" />
      </div>
    </div>
  </div>
</template>

<style>
.slick-prev:before,
.slick-next:before {
  color: #010e1b !important;
}
</style>

<style scoped>
.team {
  max-height: 31em;
}

@media (max-height: 31em) {
  .team {
    height: 300px;
  }
}
</style>

<style>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  opacity: 60%;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgb(207, 207, 207);
}

::-webkit-scrollbar-thumb:hover {
  border-radius: 3px;
  background: rgb(179, 179, 179);
}
</style>
