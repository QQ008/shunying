<template>
  <div class="top-bar" :class="{ 'position-fixed': isFixed, 'position-static': !isFixed }">
    <div class="logo-container">
      <div class="logo-circle">
        <img src="../assets/logo-icon.svg" alt="瞬影" class="logo-icon" />
      </div>
      <span class="app-name">瞬影</span>
    </div>
    <div class="notification">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
// 添加props来控制position属性
defineProps({
  isFixed: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  width: 100%;
  height: 60px;
  border-bottom: none;
  z-index: 100;
}

.position-fixed {
  position: fixed;
  top: 0;
  left: 0;
}

.position-static {
  position: static;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #1c2331;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.logo-icon {
  width: 20px;
  height: 20px;
}

.app-name {
  font-size: 22px;
  font-weight: 500;
  color: #294D74;
}

.notification {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.notification-icon {
  width: 24px;
  height: 24px;
}
</style> 