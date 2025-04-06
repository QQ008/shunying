<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <TopBar :is-fixed="true" />
    
    <!-- 头部横幅 -->
    <div class="banner-container">
      <div class="banner" :style="{ backgroundImage: 'url(' + bannerImage + ')' }">
        <div class="banner-content">
          <h1 class="banner-title">瞬影, 捕捉速度</h1>
          <h1 class="banner-title">与风的对话</h1>
        </div>
      </div>
      <div class="banner-gradient"></div>
    </div>

    <!-- 功能区域 -->
    <div class="features-container">
      <!-- 搜索区域 -->
      <div class="search-block" @click="goToSearch" :class="{ 'active': isSearchActive }">
        <div class="search-icon">
          <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32.5" cy="32.5" r="27.5" stroke="white" stroke-width="5" fill="white" fill-opacity="0.35"/>
            <path d="M51 51L61 61" stroke="white" stroke-width="5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="search-text">
          <h3>查找图片</h3>
          <p>查找属于您的照片～</p>
        </div>
      </div>

      <!-- 功能区块 -->
      <div class="feature-blocks">
        <div class="feature-block" @click="handleFeatureClick('拍摄预告')" :class="{ 'active': isFeatureActive1 }">
          <div class="feature-bg"></div>
          <div class="feature-content">
            <div class="feature-icon">
              <img src="/images/icons/calendar.svg" alt="拍摄预告" width="28" height="28">
            </div>
            <div class="feature-text">
              <h4>拍摄预告</h4>
              <p>查看瞬影师拍摄计划</p>
            </div>
          </div>
        </div>
        <div class="feature-block" @click="handleFeatureClick('活动专区')" :class="{ 'active': isFeatureActive2 }">
          <div class="feature-bg"></div>
          <div class="feature-content">
            <div class="feature-icon">
              <img src="/images/icons/trophy.svg" alt="活动专区" width="28" height="28">
            </div>
            <div class="feature-text">
              <h4>活动专区</h4>
              <p>比赛与活动专属图片</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 热门地点 -->
      <div class="hot-spots">
        <div class="section-header">
          <h3>热门地点</h3>
          <router-link to="/more-spots" class="view-all">查看全部 →</router-link>
        </div>
        <div class="spot-list-container">
          <div class="spot-list">
            <div class="spot-card" 
                 v-for="(spot, index) in hotSpots" 
                 :key="index" 
                 @click="handleSpotClick(spot)"
                 :class="{ 'active': activeSpotIndex === index }">
              <div class="spot-image" :style="{ backgroundImage: 'url(' + spot.image + ')' }"></div>
              <div class="spot-info">
                <h4>{{ spot.name }}</h4>
                <p><van-icon name="location-o" size="12" color="#9966ff" /> {{ spot.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TopBar from '../components/TopBar.vue';

const router = useRouter();

// 假设的图片URL，实际开发时需要替换为真实的资源
const bannerImage = ref('/images/banner-bg.png');

// 热门地点数据
const hotSpots = ref([
  {
    name: '戒台寺',
    location: '北京市头沟',
    image: '/images/place1.jpg'
  },
  {
    name: '潭王路',
    location: '北京市头沟',
    image: '/images/place2.jpg'
  },
  {
    name: '妙峰山',
    location: '北京市头沟',
    image: '/images/place3.png'
  }
]);

// 点击状态管理
const isSearchActive = ref(false);
const isFeatureActive1 = ref(false);
const isFeatureActive2 = ref(false);
const activeSpotIndex = ref(-1);

// 跳转到搜索页面
const goToSearch = () => {
  isSearchActive.value = true;
  setTimeout(() => {
    router.push('/search');
    isSearchActive.value = false;
  }, 150);
};

// 功能区块点击
const handleFeatureClick = (featureName) => {
  if (featureName === '拍摄预告') {
    isFeatureActive1.value = true;
    setTimeout(() => {
      console.log('点击了拍摄预告');
      isFeatureActive1.value = false;
    }, 150);
  } else if (featureName === '活动专区') {
    isFeatureActive2.value = true;
    setTimeout(() => {
      console.log('点击了活动专区');
      isFeatureActive2.value = false;
    }, 150);
  }
};

// 热门地点点击
const handleSpotClick = (spot) => {
  const index = hotSpots.value.findIndex(item => item.name === spot.name);
  activeSpotIndex.value = index;
  setTimeout(() => {
    console.log('点击了热门地点:', spot.name);
    activeSpotIndex.value = -1;
  }, 150);
};
</script>

<style scoped>
.home {
  padding-bottom: 40px;
  width: 100%;
  overflow-x: hidden;
  margin-top: 0;
}

/* 头部横幅 */
.banner-container {
  position: relative;
  width: 100%;
  height: 295px;
  margin-top: 0; /* 从页面顶部开始显示 */
  overflow: hidden;
  z-index: 0; /* 确保banner在导航栏下方 */
}

.banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 295px;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 将内容移至底部 */
  padding-bottom: 40px; /* 底部内边距 */
  background-color: #171C1E; /* 当无图片时的默认背景色 */
}

.banner:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.banner-content {
  position: relative;
  z-index: 2;
  padding: 30px 48px;
  margin-top: 60px; /* 为顶部导航栏留出空间 */
}

.banner-title {
  color: white;
  font-size: 28px;
  margin: 6px 0;
  font-weight: 400;
  line-height:40px;
}

.banner-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to bottom, rgba(23, 28, 30, 0), #F5F5F7);
  z-index: 2;
}

/* 功能区域容器 */
.features-container {
  padding: 0 20px;
  margin-top: 15px; /* 调整间距，防止与banner重叠 */
  position: relative;
  z-index: 2;
}

/* 搜索区块 */
.search-block {
  background: linear-gradient(to right, #9358FF, #C7A8FF);
  padding: 0px 25px 20px 44px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 136px;
  margin-bottom: 15px; /* 减小与下方卡片的间距 */
}

.search-icon {
  margin-right: 0;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  background: none;
}

.search-text {
  padding-left: 40px; /* 增加左侧内边距，使文字更靠右 */
  flex: 1; /* 使文本区域占据剩余空间 */
}

.search-text h3 {
  color: white;
  font-size: 32px;
  font-weight: 400;
  letter-spacing: 4px;
  margin-top: 8px
}

.search-text p {
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.1rem;
  font-size: 18px;
  margin-left: 1px
}

/* 调整Icon大小 */
.search-block .van-icon {
  font-size: 32px !important;
}

/* 功能区块 */
.feature-blocks {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.feature-block {
  flex: 1;
  position: relative;
  width: 190px;
  height: 128px;
  border-radius: 16px;
  background-color: #9857F1;
}

.feature-bg {
  position: absolute;
  top: 4px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #F3ECFF;
  border-radius: 16px;
}

.feature-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 124px;
  text-align: center;
}

.feature-icon {
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-text h4 {
  color: rgba(0, 0, 0, 0.9);
  margin: 0 0 2px 0;
  font-size: 16px;
  font-weight: 500;
}

.feature-text p {
  color: rgba(0, 0, 0, 0.8);
  margin: 0;
  font-size: 12px;
}

/* 热门地点 */
.hot-spots {
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-header h3 {
  font-size: 18px;
  margin: 0;
  color: #333;
  font-weight: bold;
}

.view-all {
  color: #751BEF;
  font-size: 14px;
  text-decoration: none;
}

.spot-list-container {
  margin: 0 -20px 0 0;
  overflow: hidden;
  width: calc(100% + 20px);
}

.spot-list {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 0 0 15px 0;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  padding-right: 40px; /* 确保最后一个卡片部分显示 */
}

.spot-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.spot-card {
  min-width: 160px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.06);
}

.spot-image {
  height: 100px;
  background-size: cover;
  background-position: center;
}

.spot-info {
  padding: 10px;
}

.spot-info h4 {
  margin: 0 0 2px 0;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 1px;
  color: #333;
}

.spot-info p {
  margin: 0;
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
}

.spot-info p .van-icon {
  margin-right: 2px;
}

/* 平板适配 */
@media (min-width: 768px) {
  .features-container {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .feature-blocks {
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .feature-block {
    flex: 0 0 calc(50% - 10px);
  }
  
  .spot-list-container {
    margin-right: 0;
  }
  
  .spot-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
    padding-right: 20px;
  }
  
  .spot-card {
    min-width: auto;
  }
}

/* 点击效果 */
.search-block, .feature-block, .spot-card {
  transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.1), opacity 0.15s ease;
}

.search-block.active, .feature-block.active, .spot-card.active {
  transform: scale(0.98);
  opacity: 0.9;
}

.search-block {
  cursor: pointer;
}

.feature-block {
  cursor: pointer;
}

.spot-card {
  cursor: pointer;
  transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.1), 
              box-shadow 0.15s ease, opacity 0.15s ease;
}

.spot-card:hover {
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
</style> 