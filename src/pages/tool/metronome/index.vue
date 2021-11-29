<template>
  <!-- 节拍器 -->
  <view class="metronome">
    <view class="metronome-content">
      <div class="metronome-content-view">
        展示区
      </div>
      <div class="metronome-content-set">
        <!-- 速度 -->
        <nut-button @click="set(1)">速度 {{speed}}</nut-button>
        <!-- 节拍 -->
        <nut-button @click="set(2)">节拍 {{meter}}</nut-button>
      </div>
    </view>
    <view class="metronome-btn">
      <nut-icon 
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
      :style="{ height: '30%' }"
      v-model:visible="isVisible"
    >
      <view v-if="mode === 1" class="select-speed">
        <view class="title">选择速度</view>
        <nut-range v-model="speed" @change="onSpeedChange"></nut-range>
      </view>
      <view v-if="mode === 2" class="select-meter">
        <view class="title">选择节拍</view>
        <view class="meterList">
          <nut-tag 
            mark 
            type="primary" 
            @click="selectMeter(item)"  
            v-for="item in meterList" 
            :key="item.name"
          >
            {{item.name}}
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
export default {
  setup () {
    const state = reactive({
      isPlay: false,
      isVisible: false,
      mode: 1, // 1、setSpeed 2、setMeter
      speed: 60,
      meter: '3/4',
      meterList: [
        {
          name: '1/4',
          meter: '1'
        },
        {
          name: '2/4',
          meter: '2'
        },
        {
          name: '3/4',
          meter: '3'
        },
        {
          name: '4/4',
          meter: '4'
        }
      ]
    })

    const play = (item) => {
      state.isPlay = !state.isPlay
    }

    const onSpeedChange = (v) => {
      state.speed = v
    }

    const set = (i) => {
      state.mode = i
      state.isVisible = true
    }

    const selectMeter = (item) => {
      state.meter = item.name
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
      height: calc(100% - 60px);
    }
    .metronome-content-set {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-evenly;
      .nut-button {
        width: 150px;
        height: 60px;
        box-shadow: 0 0 5px 5px rgba($color: #000000, $alpha: 0.05);
      }
    }
  } 
  .metronome-btn {
    width: 100vw;
    height: 50vh;
    display: grid;
    place-items: center;
  }
  .select-speed,.select-meter {
    padding: 10px;
    .title {
      height: 60px;
      line-height: 60px;
      width: 100%;
      text-align: center;
      font-weight: bold;
    }
    .nut-range {
      margin-top: 40px;
    }
    .meterList {
      display: grid;
      grid-template-columns: repeat(auto-fill, 60px);
      grid-template-rows: 30px;
      gap: 10px;
    }
  }
}
</style>