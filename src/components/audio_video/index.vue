<template>
  <!-- 音视频分离组件 -->
  <view class="audio_video">
    <video
      id="video"
      :src="videoUrl"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeUpdate"
      poster="https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg"
      initial-time="0"
      :controls="true"
      :autoplay="false"
    />
  </view>
</template>

<script lang="ts">
import { onMounted, onBeforeMount, reactive, toRefs } from 'vue';

interface stateT {
  active: false,
  videoUrl: string,
  audioUrl: string,
  innerAudioContext: any
}

export default {
  name: 'audioVideo',
  props: {
    videoUrl: {
      type: String,
      default: ''
    },
    audioUrl: {
      type: String,
      default: ''
    }
  },
  onReady () {
    
  },
  setup (props) {
    const state:stateT = reactive({
      active: false,
      videoUrl: '',
      audioUrl: '',
      innerAudioContext: {}
    })

    onBeforeMount(() => {
      state.videoUrl = props.videoUrl
      state.audioUrl = props.audioUrl
      
    })

    onMounted(() => { 

    })

    const onPlay = () => {

    }

    const onPause = (e) => {

    }

    function onTimeUpdate (e) {
      console.log(e);
      // innerAudioContext.seek(e.detail.buffered)
    }

    return {onPlay, onPause, onTimeUpdate, onMounted, onBeforeMount, ...toRefs(state)}
  },
  methods: {
    // onPlay () {
    //   console.log('onPlay');
      
    // }
  }
}
</script>

<style>

</style>