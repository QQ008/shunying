<template>
  <div class="explore">
    <!-- 顶部导航栏 -->
    <TopBar :is-fixed="true" />
    
    <div class="dev-controls">
      <h2>开发状态控制</h2>
      <div class="button-group">
        <van-button 
          :type="imageState === 'normal' ? 'primary' : 'default'"
          @click="setImageState('normal')"
        >
          正常状态
        </van-button>
        <van-button 
          :type="imageState === 'no-image' ? 'primary' : 'default'"
          @click="setImageState('no-image')"
        >
          无图片状态
        </van-button>
        <van-button 
          :type="imageState === 'slow' ? 'primary' : 'default'"
          @click="setImageState('slow')"
        >
          慢加载状态
        </van-button>
      </div>
      <div class="current-state">
        当前状态: {{ getStateText }}
      </div>
    </div>
  </div>
</template>

<script setup>
import TopBar from '../components/TopBar.vue'
import { ref, computed } from 'vue'
import { useImageStore } from '../stores/image'

const imageStore = useImageStore()
const imageState = ref('normal')

const getStateText = computed(() => {
  const stateMap = {
    'normal': '正常状态',
    'no-image': '无图片状态',
    'slow': '慢加载状态'
  }
  return stateMap[imageState.value]
})

const setImageState = (state) => {
  imageState.value = state
  imageStore.setImageState(state)
}
</script>

<style scoped>
.explore {
  padding: 20px;
  padding-top: 60px; /* 为顶部导航栏留出空间 */
  text-align: center;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dev-controls {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.current-state {
  text-align: center;
  color: #666;
  font-size: 14px;
}

#z {
  color: #00000099;
}
</style> 