<template>
  <div class="photo-detail">
    <div class="photo-gallery">
      <div class="main-photo">
        <img :src="currentPhoto.url" :alt="currentPhoto.title" @click="showFullScreen">
      </div>
      <div class="thumbnail-list">
        <div v-for="(photo, index) in photos" 
             :key="index" 
             class="thumbnail"
             :class="{ active: currentIndex === index }"
             @click="changePhoto(index)">
          <img :src="photo.url" :alt="photo.title">
        </div>
      </div>
    </div>

    <div class="photo-info">
      <h1>{{ currentPhoto.title }}</h1>
      <p class="description">{{ currentPhoto.description }}</p>
      <div class="price-info">
        <span class="price">¥{{ currentPhoto.price }}</span>
        <button class="buy-btn" @click="handleBuy">立即购买</button>
      </div>
      <div class="download-section">
        <button class="download-btn" @click="handleDownload" :disabled="!isPurchased">
          {{ isPurchased ? '下载原图' : '购买后下载' }}
        </button>
      </div>
    </div>

    <!-- 全屏预览 -->
    <div v-if="isFullScreen" class="fullscreen-preview" @click="closeFullScreen">
      <img :src="currentPhoto.url" :alt="currentPhoto.title">
      <button class="close-btn" @click="closeFullScreen">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentIndex = ref(0)
const isFullScreen = ref(false)
const isPurchased = ref(false)

// 模拟数据
const photos = ref([
  {
    id: 1,
    title: '春日樱花',
    description: '拍摄于2024年春天，樱花盛开的季节。这张照片捕捉了樱花绽放的美丽瞬间，展现了春天的生机与活力。',
    url: 'https://picsum.photos/800/600?random=1',
    price: 29.9
  },
  {
    id: 2,
    title: '城市夜景',
    description: '都市的璀璨夜景，展现了现代城市的繁华与魅力。灯光交织，勾勒出城市的轮廓。',
    url: 'https://picsum.photos/800/600?random=2',
    price: 39.9
  },
  {
    id: 3,
    title: '海边日落',
    description: '夕阳西下，金色的阳光洒在海面上，波光粼粼，美不胜收。',
    url: 'https://picsum.photos/800/600?random=3',
    price: 49.9
  }
])

const currentPhoto = computed(() => photos.value[currentIndex.value])

const changePhoto = (index) => {
  currentIndex.value = index
}

const showFullScreen = () => {
  isFullScreen.value = true
}

const closeFullScreen = () => {
  isFullScreen.value = false
}

const handleBuy = () => {
  // 模拟购买流程
  isPurchased.value = true
  alert('购买成功！')
}

const handleDownload = () => {
  if (!isPurchased.value) {
    alert('请先购买照片')
    return
  }
  // 模拟下载流程
  alert('开始下载原图...')
}
</script>

<style scoped>
.photo-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.photo-gallery {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-photo {
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.main-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.main-photo img:hover {
  transform: scale(1.02);
}

.thumbnail-list {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
}

.thumbnail {
  width: 100px;
  height: 70px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.thumbnail.active {
  border-color: #4CAF50;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-info {
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
}

.description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
}

.price-info {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.price {
  font-size: 28px;
  color: #f44336;
  font-weight: bold;
}

.buy-btn, .download-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.buy-btn {
  background-color: #4CAF50;
  color: white;
}

.buy-btn:hover {
  background-color: #45a049;
}

.download-btn {
  background-color: #2196F3;
  color: white;
  width: 100%;
}

.download-btn:hover:not(:disabled) {
  background-color: #1976D2;
}

.download-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.fullscreen-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

.fullscreen-preview img {
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 40px;
  cursor: pointer;
  padding: 10px;
}

@media (max-width: 768px) {
  .photo-detail {
    grid-template-columns: 1fr;
  }
  
  .main-photo {
    height: 300px;
  }
}
</style> 