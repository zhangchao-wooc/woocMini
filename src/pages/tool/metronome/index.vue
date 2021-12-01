<template>
  <!-- 节拍器 -->
  <view class="metronome">
    <view class="metronome-content">
      <div class="metronome-content-view">
        <div class="view-box">
          <view v-for="item in meter" :key="item" class="meter-item">{{item}}</view>
        </div>
      </div>
      <div class="metronome-content-set">
        <!-- 速度 -->
        <view class="set-btn" @click="set(1)">{{t('tool.metronome.speed')}} {{ speed}}</view>
        <!-- 节拍 -->
        <view class="set-btn" @click="set(2)">{{t('tool.metronome.meter')}} {{ meter}}</view>
      </div>
    </view>
    <view class="metronome-btn">
      <nut-icon 
        class="icon"
        :name="isPlay ? 'poweroff-circle-fill' : 'play-circle-fill'"
        style="font-size: 200px; transition: all 0.3s"
        @click="play"
      ></nut-icon>
    </view>
    <nut-popup
      class="popup"
      position="bottom"
      round
      @click-close-icon="close"
      @close="close"
      :style="{ height: '40%' }"
      v-model:visible="isVisible"
    >
      <!-- 速度 -->
      <view v-if="mode === 1" class="select-speed">
        <view class="title">{{t('tool.metronome.selectSpeed')}}</view>
        <nut-range v-model="speed" @change="onSpeedChange" hidden-range :max="218" :min="40"></nut-range>
      </view>
      <!-- 节拍 -->
      <view v-else class="select-meter">
        <view class="title">{{t('tool.metronome.selectMeter')}}</view>
        <view class="meterList">
          <nut-tag 
            round 
            type="primary" 
            @click="selectMeter(item)"  
            v-for="item in 12" 
            :key="item"
          >
            {{item}}
          </nut-tag>
        </view>
      </view>

    </nut-popup>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import { onMounted, reactive, toRefs } from 'vue';
import { i18n, t } from '@wooc/mini-i18n'
const innerAudioContext = Taro.createInnerAudioContext()

export default {
  setup () {
    const state = reactive({
      isPlay: false,
      isVisible: false,
      mode: 1, // 1、setSpeed 2、setMeter
      speed: 40,
      meter: 3,
    })

    const play = (item) => {
      const d = document.getElementsByClassName('icon')[0]
      const e = document.getElementsByClassName('metronome')[0]

      e.style.animation = !state.isPlay ? '_pulse 3s linear infinite;' : ''
      state.isPlay = !state.isPlay
      audio()
    }

    const audio = () => {
      
      innerAudioContext.autoplay = state.isPlay
      innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    }

    const onSpeedChange = (v) => {
      console.log(v);
      state.speed = v
    }

    const set = (i) => {
      state.mode = i
      state.isVisible = true
    }

    const selectMeter = (item) => {
      state.meter = item
      close()
    }

    const close = () => {
      state.isVisible = false
    }
    
    onMounted(() => {
      Taro.setNavigationBarTitle({title: t('tool.metronome')})
    })
      
    return {close, selectMeter, set, onSpeedChange, play, onMounted, ...toRefs(state)}
  }
}
</script>

<style lang="scss">
.metronome {
  .metronome-content {
    position: relative;
    width: 100vw;
    height: 50vh;
    .metronome-content-view {
      display: grid;
      place-items: center;
      height: calc(100% - 100px);
      padding: 0 7px;
      box-sizing: border-box;
      .view-box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        .meter-item {
          display: grid;
          place-items: center;
          width: 50px;
          height: 50px;
          margin: 5px;
          border-radius: 50%;
          background-color: $shadow9-background;
          box-shadow: inset 5px 5px 10px #d9d9d9,
              inset -5px -5px 10px #ffffff;;
        }
      }
    }
    .metronome-content-set {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-evenly;
      .set-btn {
        display: grid;
        place-items: center;
        width: 150px;
        height: 100px;
        border-radius: 20px;
        background-color: $shadow9-background;
        box-shadow: $primary-shadow9;
        box-sizing: border-box;
      }
    }
  } 
  .metronome-btn {
    width: 100vw;
    height: 50vh;
    display: grid;
    place-items: center;
    .nut-icon {
      width: 165px;
      height: 165px;
      background-color: $primary-color;
      border-radius: 50%;
      box-shadow: 0px 0px 10px 10px rgba($color: $primary-color, $alpha: 0.2),
      0px 0px 10px 10px rgba($color: red, $alpha: 0.2),
      0px 0px 10px 10px rgba($color: #fff, $alpha: 0.2);
    }
  }
  .select-speed,.select-meter {
    padding: 10px;
    .title {
      height: 60px;
      line-height: 40px;
      width: 100%;
      text-align: center;
      font-weight: bold;
    }
    .nut-range {
      height: 30px;
      border-radius: 10px;
      margin: 40px 10px 0;
      animation: _pulse 9s linear infinite;
    }
    .meterList {
      display: grid;
      grid-template-columns: repeat(auto-fill, 20%);
      justify-content: space-around;
      gap: 10px;
      .nut-tag {
        height: 30px;
        display: grid;
        place-items: center;
      }
    }
  }
}
</style>