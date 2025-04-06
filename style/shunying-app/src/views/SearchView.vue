<template>
  <div class="search">
    <!-- 顶部导航栏 -->
    <TopBar :is-fixed="false" />
    
    <!-- 页面顶部搜索栏 -->
    <div class="search-header">
      <div class="search-bar" @click="openFilter">
        <div class="search-icon">
          <van-icon name="search" />
        </div>
        <div class="search-text">筛选条件: {{ getFilterSummary() }}</div>
        <div class="filter-icon">
          <van-icon name="filter-o" />
        </div>
      </div>
    </div>

    <!-- 图片列表 -->
    <div class="photos-container">
      <div v-if="filteredPhotos.length > 0" class="photos-grid">
        <div 
          v-for="(photo, index) in filteredPhotos" 
          :key="index" 
          class="photo-item"
          :class="{ 'photo-vertical': photo.orientation === 'vertical' }"
          @click="viewPhoto(photo)"
        >
          <div class="photo-wrapper">
            <van-image
              v-if="photo.url"
              :src="photo.url"
              :alt="photo.description"
              loading="lazy"
              fit="contain"
              :width="'100%'"
              :height="'auto'"
            >
              <template #loading>
                <div class="loading-placeholder">
                  <van-loading type="spinner" color="#9966FF" />
                </div>
              </template>
              <template #error>
                <div class="error-placeholder">
                  <van-icon name="photo-o" size="24" />
                  <span class="error-text">加载失败</span>
                </div>
              </template>
            </van-image>
            <div class="photo-info">
              <div class="photo-location">{{ photo.location }}</div>
              <div class="photo-date">{{ formatDate(photo.date) }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-else class="empty-state">
        <van-empty description="暂无符合条件的图片" />
      </div>
      
      <div v-if="loadingMore" class="loading-more">
        <div class="loading-spinner"></div>
        <div>加载更多...</div>
      </div>
    </div>

    <!-- 筛选面板组件 -->
    <FilterPanel
      v-model="showFilter"
      :filters="filters"
      @apply="applyFilters"
      @reset="resetFilters"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useSearchStore } from '../stores/searchStore'
import FilterPanel from '../components/FilterPanel.vue'
import TopBar from '../components/TopBar.vue'
import { useImageStore } from '../stores/image'
import { useRouter } from 'vue-router'

// 获取搜索状态管理器
const searchStore = useSearchStore()
const imageStore = useImageStore()

// 获取路由实例
const router = useRouter()

// 引用全局状态
const showFilter = computed({
  get: () => searchStore.showFilter,
  set: (value) => searchStore.setShowFilter(value)
})

const loadingMore = computed(() => searchStore.loadingMore)

// 筛选条件，使用Pinia中的值
const filters = computed(() => searchStore.filters)

// 从Pinia获取照片
const photos = computed(() => searchStore.photos)

// 筛选后的照片数据
const filteredPhotos = ref([])

// 加载照片数据
const loadPhotos = async () => {
  filteredPhotos.value = []
  const mockPhotos = generateMockPhotos()
  
  for (const photo of mockPhotos) {
    try {
      const url = await imageStore.getImageUrl(photo.id - 1)
      photo.url = url
      filteredPhotos.value.push(photo)
    } catch (error) {
      console.error('Failed to load photo:', error)
      photo.url = null
      filteredPhotos.value.push(photo)
    }
  }
}

// 生成模拟照片数据
const generateMockPhotos = () => {
  const locations = ['戒台寺', '潭王路', '妙峰山', '其他地点']
  const bikeTypes = ['road', 'motor', 'other']
  const jerseyColors = ['red', 'blue', 'yellow', 'black', 'white']
  const bibColors = ['black', 'navy', 'grey']
  const shoeColors = ['white', 'black', 'red', 'yellow']
  
  return Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    url: null,
    description: `骑行照片 ${index + 1}`,
    location: locations[Math.floor(Math.random() * locations.length)],
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    bikeType: bikeTypes[Math.floor(Math.random() * bikeTypes.length)],
    jerseyColor: jerseyColors[Math.floor(Math.random() * jerseyColors.length)],
    bibColor: bibColors[Math.floor(Math.random() * bibColors.length)],
    shoeColor: shoeColors[Math.floor(Math.random() * shoeColors.length)],
    orientation: Math.random() > 0.8 ? 'vertical' : 'horizontal'
  }))
}

// 组件挂载时，初始化数据
onMounted(async () => {
  await loadPhotos()
})

// 监听图片状态变化
watch(() => imageStore.imageState, async () => {
  await loadPhotos()
})

// 打开筛选面板
const openFilter = () => {
  showFilter.value = true
}

// 应用筛选
const applyFilters = (newFilters) => {
  searchStore.applyFilters(newFilters)
}

// 重置筛选
const resetFilters = () => {
  searchStore.resetFilters()
}

// 查看照片详情
const viewPhoto = (photo) => {
  router.push({
    name: 'photo-detail',
    params: { id: photo.id }
  })
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

// 获取筛选条件摘要
const getFilterSummary = () => {
  return searchStore.filterSummary
}

// 监听滚动加载更多
const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = document.documentElement.scrollTop
  const clientHeight = document.documentElement.clientHeight
  
  // 当滚动到距离底部100px时，加载更多
  if (scrollHeight - scrollTop - clientHeight < 100 && !loadingMore.value) {
    loadMorePhotos()
  }
}

// 加载更多照片
const loadMorePhotos = () => {
  // 实际应用中，这里应该调用API加载更多照片
  console.log('加载更多照片')
}

// 添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 组件销毁时，移除监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.search {
  background-color: #F5F5F7;
  min-height: calc(100vh - 120px);
  padding-bottom: 20px;
}

/* 搜索头部 */
.search-header {
  padding: 12px 14px 10px;
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-icon, .filter-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-text {
  flex: 1;
  margin: 0 12px;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 图片列表 */
.photos-container {
  padding: 0 10px 10px;
}

.photos-grid {
  columns: 2;
  column-gap: 10px;
}

.photo-item {
  break-inside: avoid;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background-color: #eee;
  transform: translateZ(0);
  transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.1);
}

.photo-item:active {
  transform: scale(0.98);
}

.photo-wrapper {
  position: relative;
  width: 100%;
  display: block;
}

.photo-wrapper img,
.photo-wrapper .van-image {
  width: 100%;
  display: block;
}

.photo-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  color: white;
}

.photo-location {
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 2px;
}

.photo-date {
  font-size: 11px;
  opacity: 0.8;
}

/* 加载更多 */
.loading-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  color: #666;
  font-size: 14px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(153, 102, 255, 0.3);
  border-radius: 50%;
  border-top-color: #9966ff;
  animation: spin 0.8s linear infinite;
  margin-bottom: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 平板适配 */
@media (min-width: 768px) {
  .photos-grid {
    columns: 3;
  }
}

/* 电脑适配 */
@media (min-width: 1200px) {
  .photos-grid {
    columns: 4;
  }
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  margin-bottom: 20px;
  opacity: 0.8;
}

.empty-text {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.empty-subtext {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.reset-filter-btn {
  padding: 10px 20px;
  background-color: #9966ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.reset-filter-btn:active {
  background-color: #8052d8;
}

.loading-placeholder,
.error-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  color: #999;
}

.error-text {
  margin-top: 8px;
  font-size: 12px;
}
</style> 