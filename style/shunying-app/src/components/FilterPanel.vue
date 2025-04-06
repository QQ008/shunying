<template>
  <div class="filter-panel-container">
    <transition name="fade">
      <div class="filter-mask" v-if="modelValue" @click="handleClose"></div>
    </transition>
    
    <transition name="slide">
      <div class="filter-content" v-if="modelValue">
        <div class="filter-header">
          <div class="filter-title">筛选条件</div>
          <div class="filter-close" @click="handleClose">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div class="filter-scroll-area">
          <!-- 日期筛选 -->
          <div class="filter-section">
            <div class="section-title">日期</div>
            <div class="date-options">
              <div 
                v-for="(option, index) in dateOptions" 
                :key="index" 
                class="date-option"
                :class="{ active: localFilters.dateOption === option.value }"
                @click="selectDateOption(option.value)"
              >
                {{ option.label }}
              </div>
              <div class="date-option custom" :class="{ active: localFilters.dateOption === 'custom', expanded: customDateExpanded }">
                <div class="custom-date-header" @click="toggleCustomDate">
                  <span>{{ getDateDisplay() }}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :style="{ transform: customDateExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }">
                    <path d="M6 9L12 15L18 9" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <transition name="fold">
                  <div class="custom-date-inputs" v-if="customDateExpanded">
                    <input type="date" v-model="localFilters.startDate" placeholder="开始日期" />
                    <span class="date-separator">至</span>
                    <input type="date" v-model="localFilters.endDate" placeholder="结束日期" />
                  </div>
                </transition>
              </div>
            </div>
          </div>
          
          <!-- 地点筛选 -->
          <div class="filter-section">
            <div class="section-title">地点</div>
            <div class="location-options">
              <div
                v-for="(location, index) in locationOptions"
                :key="index"
                class="location-option"
                :class="{ active: localFilters.location === location.value }"
                @click="selectLocation(location.value)"
              >
                {{ location.label }}
              </div>
            </div>
          </div>
          
          <!-- 车型筛选 -->
          <div class="filter-section">
            <div class="section-title">车型</div>
            <div class="bike-options">
              <div 
                v-for="(bike, index) in bikeOptions" 
                :key="index"
                class="bike-option"
                :class="{ active: isTypeSelected(bike.value) }"
                @click="toggleBikeType(bike.value)"
              >
                <div class="checkbox">
                  <div class="checkbox-inner" v-if="isTypeSelected(bike.value)"></div>
                </div>
                <span>{{ bike.label }}</span>
              </div>
            </div>
          </div>
          
          <!-- 颜色筛选 -->
          <div class="color-filters" v-if="showColorFilters" :class="{ 'slide-in': showColorFilters }">
            <!-- 骑行服颜色 -->
            <div class="filter-section">
              <div class="section-title">骑行服颜色</div>
              <div class="color-options">
                <div 
                  class="color-option all-option"
                  :class="{ selected: !localFilters.jerseyColor }"
                  @click="selectJerseyColor('')"
                >
                  <div class="all-colors-icon">全部</div>
                </div>
                <div 
                  v-for="(color, index) in visibleJerseyColors" 
                  :key="index"
                  class="color-option"
                  :class="{ selected: localFilters.jerseyColor === color.value }"
                  @click="selectJerseyColor(color.value)"
                  :title="color.label"
                >
                  <div class="color-dot" :style="{ backgroundColor: color.hex }"></div>
                </div>
                <div 
                  v-if="!showAllJerseyColors && jerseyColors.length > visibleColorsCount" 
                  class="color-option show-more"
                  @click="toggleJerseyColors"
                >
                  <div class="show-more-icon" :class="{ 'rotate-icon': showAllJerseyColors }">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 9L12 16L5 9" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <span>更多颜色</span>
                </div>
              </div>
            </div>
            
            <!-- 骑行裤颜色 -->
            <div class="filter-section">
              <div class="section-title">骑行裤颜色</div>
              <div class="color-options">
                <div 
                  class="color-option all-option"
                  :class="{ selected: !localFilters.bibColor }"
                  @click="selectBibColor('')"
                >
                  <div class="all-colors-icon">全部</div>
                </div>
                <div 
                  v-for="(color, index) in visibleBibColors" 
                  :key="index"
                  class="color-option"
                  :class="{ selected: localFilters.bibColor === color.value }"
                  @click="selectBibColor(color.value)"
                  :title="color.label"
                >
                  <div class="color-dot" :style="{ backgroundColor: color.hex }"></div>
                </div>
                <div 
                  v-if="!showAllBibColors && bibColors.length > visibleColorsCount" 
                  class="color-option show-more"
                  @click="toggleBibColors"
                >
                  <div class="show-more-icon" :class="{ 'rotate-icon': showAllBibColors }">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 9L12 16L5 9" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <span>更多颜色</span>
                </div>
              </div>
            </div>
            
            <!-- 锁鞋颜色 -->
            <div class="filter-section">
              <div class="section-title">锁鞋颜色</div>
              <div class="color-options">
                <div 
                  class="color-option all-option"
                  :class="{ selected: !localFilters.shoeColor }"
                  @click="selectShoeColor('')"
                >
                  <div class="all-colors-icon">全部</div>
                </div>
                <div 
                  v-for="(color, index) in visibleShoeColors" 
                  :key="index"
                  class="color-option"
                  :class="{ selected: localFilters.shoeColor === color.value }"
                  @click="selectShoeColor(color.value)"
                  :title="color.label"
                >
                  <div class="color-dot" :style="{ backgroundColor: color.hex }"></div>
                </div>
                <div 
                  v-if="!showAllShoeColors && shoeColors.length > visibleColorsCount" 
                  class="color-option show-more"
                  @click="toggleShoeColors"
                >
                  <div class="show-more-icon" :class="{ 'rotate-icon': showAllShoeColors }">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 9L12 16L5 9" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <span>更多颜色</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 底部占位空间，避免内容被固定的按钮遮挡 -->
          <div class="bottom-space"></div>
        </div>
        
        <!-- 操作按钮 - 固定在底部 -->
        <div class="filter-actions">
          <!-- 筛选结果统计 -->
          <div class="filter-stats">
            <div class="stats-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#9966FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="stats-text">{{ getFilterResultsText() }}</div>
          </div>
          
          <div class="action-buttons">
            <button class="reset-btn" @click="handleReset">重置</button>
            <button class="apply-btn" @click="handleApply">应用筛选</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useSearchStore } from '../stores/searchStore'

// 获取搜索状态管理器
const searchStore = useSearchStore()

// 父组件传入的v-model值，控制筛选面板的显示/隐藏
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  filters: {
    type: Object,
    default: () => ({
      startDate: '',
      endDate: '',
      dateOption: 'today', // 默认是今天
      location: '戒台寺', // 默认选择戒台寺
      bikeType: ['road', 'motor', 'other'], // 默认全选所有车型
      jerseyColor: '',
      bibColor: '',
      shoeColor: ''
    })
  }
})

// 事件
const emit = defineEmits(['update:modelValue', 'apply', 'reset'])

// 本地筛选条件，避免直接修改props
const localFilters = ref({
  startDate: props.filters.startDate || '',
  endDate: props.filters.endDate || '',
  dateOption: props.filters.dateOption || 'today',
  location: props.filters.location || '戒台寺',
  bikeType: props.filters.bikeType === 'all' 
    ? ['road', 'motor', 'other'] 
    : Array.isArray(props.filters.bikeType) 
      ? [...props.filters.bikeType] 
      : props.filters.bikeType 
        ? [props.filters.bikeType] 
        : ['road', 'motor', 'other'],
  jerseyColor: props.filters.jerseyColor || '',
  bibColor: props.filters.bibColor || '',
  shoeColor: props.filters.shoeColor || ''
})

// 默认筛选条件，用于重置
const defaultFilters = {
  startDate: '',
  endDate: '',
  dateOption: 'today',
  location: '戒台寺',
  bikeType: ['road', 'motor', 'other'],
  jerseyColor: '',
  bibColor: '',
  shoeColor: ''
}

// 本地状态：是否正在关闭
const isClosing = ref(false)

// 车型多选逻辑
const isTypeSelected = (type) => {
  return localFilters.value.bikeType.includes(type)
}

const toggleBikeType = (type) => {
  const index = localFilters.value.bikeType.indexOf(type)
  if (index === -1) {
    localFilters.value.bikeType.push(type)
  } else {
    localFilters.value.bikeType.splice(index, 1)
  }
}

// 计算属性：是否显示颜色筛选选项
const showColorFilters = computed(() => {
  return localFilters.value.bikeType.includes('road')
})

// 日期选项
const dateOptions = [
  { label: '今天', value: 'today' },
  { label: '昨天', value: 'yesterday' },
  { label: '周末', value: 'weekend' },
  { label: '本周', value: 'thisWeek' },
  { label: '本月', value: 'thisMonth' }
]

// 地点选项
const locationOptions = [
  { label: '全部', value: '全部' },
  { label: '戒台寺', value: '戒台寺' },
  { label: '潭王路', value: '潭王路' },
  { label: '妙峰山', value: '妙峰山' },
  { label: '其他', value: '其他' }
]

// 车型选项
const bikeOptions = [
  { label: '公路车', value: 'road' },
  { label: '摩托车', value: 'motor' },
  { label: '其他', value: 'other' }
]

// 颜色选项
const jerseyColors = [
  { label: '红色', value: 'red', hex: '#ff4d4f', common: true },
  { label: '蓝色', value: 'blue', hex: '#1890ff', common: true },
  { label: '黑色', value: 'black', hex: '#000000', common: true },
  { label: '白色', value: 'white', hex: '#ffffff', common: true },
  { label: '黄色', value: 'yellow', hex: '#fadb14', common: true },
  { label: '深蓝色', value: 'navy', hex: '#003366', common: false },
  { label: '灰色', value: 'grey', hex: '#8c8c8c', common: false },
  { label: '绿色', value: 'green', hex: '#52c41a', common: false },
  { label: '橙色', value: 'orange', hex: '#fa8c16', common: false },
  { label: '紫色', value: 'purple', hex: '#722ed1', common: false },
  { label: '粉色', value: 'pink', hex: '#eb2f96', common: false }
]

const bibColors = [
  { label: '黑色', value: 'black', hex: '#000000', common: true },
  { label: '深蓝色', value: 'navy', hex: '#003366', common: true },
  { label: '灰色', value: 'grey', hex: '#8c8c8c', common: true },
  { label: '红色', value: 'red', hex: '#ff4d4f', common: false },
  { label: '蓝色', value: 'blue', hex: '#1890ff', common: false },
  { label: '白色', value: 'white', hex: '#ffffff', common: false }
]

const shoeColors = [
  { label: '白色', value: 'white', hex: '#ffffff', common: true },
  { label: '黑色', value: 'black', hex: '#000000', common: true },
  { label: '红色', value: 'red', hex: '#ff4d4f', common: false },
  { label: '黄色', value: 'yellow', hex: '#fadb14', common: false },
  { label: '蓝色', value: 'blue', hex: '#1890ff', common: false }
]

// 控制颜色展示状态
const visibleColorsCount = 5
const showAllJerseyColors = ref(false)
const showAllBibColors = ref(false)
const showAllShoeColors = ref(false)

// 计算可见的颜色选项
const visibleJerseyColors = computed(() => {
  if (showAllJerseyColors.value) {
    return jerseyColors
  }
  return jerseyColors.filter(color => color.common).slice(0, visibleColorsCount)
})

const visibleBibColors = computed(() => {
  if (showAllBibColors.value) {
    return bibColors
  }
  return bibColors.filter(color => color.common).slice(0, visibleColorsCount)
})

const visibleShoeColors = computed(() => {
  if (showAllShoeColors.value) {
    return shoeColors
  }
  return shoeColors.filter(color => color.common).slice(0, visibleColorsCount)
})

// 自定义日期是否展开
const customDateExpanded = ref(false)

// 切换自定义日期展开/收起
const toggleCustomDate = () => {
  customDateExpanded.value = !customDateExpanded.value
  
  if (customDateExpanded.value) {
    // 如果展开，则选择自定义日期选项
    if (localFilters.value.dateOption !== 'custom') {
      // 保留已有的日期，切换到自定义模式
      selectDateOption('custom', false)
    }
  }
}

// 获取日期显示文本
const getDateDisplay = () => {
  if (localFilters.value.dateOption === 'custom') {
    if (localFilters.value.startDate && localFilters.value.endDate) {
      if (localFilters.value.startDate === localFilters.value.endDate) {
        return localFilters.value.startDate
      } else {
        return `${localFilters.value.startDate} 至 ${localFilters.value.endDate}`
      }
    } else if (localFilters.value.startDate) {
      return localFilters.value.startDate
    } else if (localFilters.value.endDate) {
      return localFilters.value.endDate
    } else {
      return '自定义日期'
    }
  } else {
    // 根据选项显示不同的日期文本
    const option = localFilters.value.dateOption
    const dateOptionText = dateOptions.find(item => item.value === option)?.label || '自定义日期'
    
    if (localFilters.value.startDate || localFilters.value.endDate) {
      if (localFilters.value.startDate === localFilters.value.endDate) {
        // 同一天
        return `${dateOptionText}：${localFilters.value.startDate}`
      } else if (localFilters.value.startDate && localFilters.value.endDate) {
        // 日期范围
        return `${dateOptionText}：${localFilters.value.startDate} 至 ${localFilters.value.endDate}`
      } else if (localFilters.value.startDate) {
        // 只有开始日期
        return `${dateOptionText}：${localFilters.value.startDate}`
      } else {
        // 只有结束日期
        return `${dateOptionText}：${localFilters.value.endDate}`
      }
    } else {
      return dateOptionText
    }
  }
}

// 选择日期选项
const selectDateOption = (option, closeCustom = true) => {
  localFilters.value.dateOption = option
  
  // 如果不是自定义日期，则收起自定义日期面板
  if (option !== 'custom' && closeCustom) {
    customDateExpanded.value = false
  }
  
  // 根据选项设置日期范围
  const today = new Date()
  let startDate = new Date(today)
  let endDate = new Date(today)
  
  switch (option) {
    case 'today':
      // 今天
      localFilters.value.startDate = formatDate(startDate)
      localFilters.value.endDate = formatDate(endDate)
      break
    case 'yesterday':
      // 昨天
      startDate.setDate(today.getDate() - 1)
      endDate.setDate(today.getDate() - 1)
      localFilters.value.startDate = formatDate(startDate)
      localFilters.value.endDate = formatDate(endDate)
      break
    case 'weekend':
      // 上一个周末（最近的周六和周日）
      const dayOfWeek = today.getDay() // 0是周日，6是周六
      if (dayOfWeek === 0) { // 今天是周日
        startDate.setDate(today.getDate() - 1) // 周六
        localFilters.value.startDate = formatDate(startDate)
        localFilters.value.endDate = formatDate(today)
      } else if (dayOfWeek === 6) { // 今天是周六
        endDate.setDate(today.getDate() + 1) // 周日
        localFilters.value.startDate = formatDate(today)
        localFilters.value.endDate = formatDate(endDate)
      } else { // 工作日
        // 找到上一个周末
        startDate.setDate(today.getDate() - dayOfWeek - 1) // 上周六
        endDate.setDate(today.getDate() - dayOfWeek) // 上周日
        localFilters.value.startDate = formatDate(startDate)
        localFilters.value.endDate = formatDate(endDate)
      }
      break
    case 'thisWeek':
      // 本周（周一到今天）
      const currentDayOfWeek = today.getDay() || 7 // 将周日的0转换为7
      startDate.setDate(today.getDate() - (currentDayOfWeek - 1)) // 本周一
      localFilters.value.startDate = formatDate(startDate)
      localFilters.value.endDate = formatDate(endDate)
      break
    case 'thisMonth':
      // 本月
      startDate.setDate(1) // 当月1号
      localFilters.value.startDate = formatDate(startDate)
      localFilters.value.endDate = formatDate(endDate)
      break
    case 'custom':
      // 自定义，不做修改，等用户输入
      break
  }
}

// 格式化日期为YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 选择地点
const selectLocation = (location) => {
  localFilters.value.location = location
}

// 选择骑行服颜色
const selectJerseyColor = (color) => {
  localFilters.value.jerseyColor = color
}

// 选择骑行裤颜色
const selectBibColor = (color) => {
  localFilters.value.bibColor = color
}

// 选择锁鞋颜色
const selectShoeColor = (color) => {
  localFilters.value.shoeColor = color
}

// 应用筛选条件
const handleApply = () => {
  // 将bikeType数组转换为字符串格式
  let bikeTypeValue;
  
  if (localFilters.value.bikeType.length === 0) {
    bikeTypeValue = ''
  } else if (localFilters.value.bikeType.length === 1) {
    bikeTypeValue = localFilters.value.bikeType[0]
  } else if (localFilters.value.bikeType.length === 3) {
    // 全选了三种车型
    bikeTypeValue = 'all'
  } else {
    // 其他组合保持数组形式
    bikeTypeValue = localFilters.value.bikeType
  }
  
  const filtersToApply = {
    ...localFilters.value,
    bikeType: bikeTypeValue
  }
  
  // 更新全局状态
  searchStore.applyFilters(filtersToApply)
  
  // 兼容原有逻辑
  emit('apply', filtersToApply)
  emit('update:modelValue', false)
}

// 重置筛选条件
const handleReset = () => {
  // 重置为默认值
  localFilters.value = JSON.parse(JSON.stringify(defaultFilters))
  
  // 更新全局状态
  searchStore.resetFilters()
  
  // 兼容原有逻辑
  emit('reset')
}

// 关闭面板
const handleClose = () => {
  emit('update:modelValue', false)
}

// 监听父组件传入的筛选条件变化
watch(() => props.filters, (newFilters) => {
  // 处理bikeType
  let bikeTypeArray = []
  if (newFilters.bikeType === 'all') {
    // 如果是全选
    bikeTypeArray = ['road', 'motor', 'other']
  } else if (Array.isArray(newFilters.bikeType)) {
    bikeTypeArray = [...newFilters.bikeType]
  } else if (newFilters.bikeType) {
    bikeTypeArray = [newFilters.bikeType]
  } else {
    bikeTypeArray = ['road', 'motor', 'other'] // 默认全选
  }
  
  localFilters.value = {
    startDate: newFilters.startDate || '',
    endDate: newFilters.endDate || '',
    dateOption: newFilters.dateOption || 'today',
    location: newFilters.location || '戒台寺',
    bikeType: bikeTypeArray,
    jerseyColor: newFilters.jerseyColor || '',
    bibColor: newFilters.bibColor || '',
    shoeColor: newFilters.shoeColor || ''
  }
}, { deep: true })

// 组件挂载时，根据初始dateOption设置日期
onMounted(() => {
  // 确保bikeType是数组且包含所有选项（全选）
  if (props.filters.bikeType === 'all') {
    localFilters.value.bikeType = ['road', 'motor', 'other']
  }
  
  // 根据初始dateOption设置日期
  if (localFilters.value.dateOption) {
    nextTick(() => {
      selectDateOption(localFilters.value.dateOption)
    })
  }
})

// 切换骑行服颜色展示
const toggleJerseyColors = () => {
  showAllJerseyColors.value = !showAllJerseyColors.value
}

// 切换骑行裤颜色展示
const toggleBibColors = () => {
  showAllBibColors.value = !showAllBibColors.value
}

// 切换锁鞋颜色展示
const toggleShoeColors = () => {
  showAllShoeColors.value = !showAllShoeColors.value
}

// 模拟的照片统计数据（实际应该由后端提供）
const photoStats = ref({
  total: 156,
  byDate: {
    today: 28,
    yesterday: 15,
    weekend: 35,
    thisWeek: 62,
    thisMonth: 124,
    custom: 156 // 默认全部
  },
  byLocation: {
    '全部': 156,
    '戒台寺': 68,
    '潭王路': 42,
    '妙峰山': 36,
    '其他': 10
  },
  byBikeType: {
    road: 95,
    motor: 48,
    other: 13
  },
  roadBikeByColor: {
    jersey: {
      red: 18,
      blue: 22,
      black: 25,
      white: 15,
      yellow: 10,
      navy: 5
    },
    bib: {
      black: 45,
      navy: 25,
      grey: 15,
      red: 5,
      blue: 3,
      white: 2
    },
    shoe: {
      white: 35,
      black: 40,
      red: 12,
      yellow: 5,
      blue: 3
    }
  }
})

// 获取筛选结果文本
const getFilterResultsText = () => {
  // 计算符合当前筛选条件的照片数量
  let count = calculateFilteredCount()
  
  // 生成描述文本
  let baseText = `共找到 ${count} 张照片`
  
  // 如果是0，添加提示
  if (count === 0) {
    return `${baseText} (无符合条件的照片)`
  }
  
  // 构建详细描述
  let details = []
  
  // 添加日期描述
  if (localFilters.value.dateOption) {
    const dateLabel = dateOptions.find(item => item.value === localFilters.value.dateOption)?.label || '自定义日期'
    details.push(dateLabel)
  }
  
  // 添加地点描述
  if (localFilters.value.location && localFilters.value.location !== '全部') {
    details.push(localFilters.value.location)
  }
  
  // 添加车型描述
  if (localFilters.value.bikeType.length > 0) {
    if (localFilters.value.bikeType.length === bikeOptions.length) {
      // 全选
      details.push('全部车型')
    } else if (localFilters.value.bikeType.includes('road')) {
      // 如果选择了公路车，可以包含颜色信息
      const bikeDetail = []
      bikeDetail.push('公路车')
      
      // 添加颜色信息
      if (localFilters.value.jerseyColor) {
        const color = jerseyColors.find(c => c.value === localFilters.value.jerseyColor)?.label
        if (color) bikeDetail.push(`${color}骑行服`)
      }
      
      if (localFilters.value.bibColor) {
        const color = bibColors.find(c => c.value === localFilters.value.bibColor)?.label
        if (color) bikeDetail.push(`${color}骑行裤`)
      }
      
      if (localFilters.value.shoeColor) {
        const color = shoeColors.find(c => c.value === localFilters.value.shoeColor)?.label
        if (color) bikeDetail.push(`${color}骑行鞋`)
      }
      
      details.push(bikeDetail.join('、'))
    } else {
      // 其他车型组合
      const selectedBikes = localFilters.value.bikeType.map(type => {
        const option = bikeOptions.find(opt => opt.value === type)
        return option ? option.label : ''
      }).filter(Boolean)
      
      details.push(selectedBikes.join('、'))
    }
  }
  
  if (details.length > 0) {
    return `${baseText}（${details.join(' · ')}）`
  }
  
  return baseText
}

// 计算符合筛选条件的照片数量
const calculateFilteredCount = () => {
  // 这是一个模拟的计算函数，实际应用中可能需要向后端发起请求获取准确数量
  let count = photoStats.value.total
  
  // 按日期筛选
  if (localFilters.value.dateOption && localFilters.value.dateOption !== 'custom') {
    count = Math.min(count, photoStats.value.byDate[localFilters.value.dateOption])
  } else if (localFilters.value.startDate || localFilters.value.endDate) {
    // 自定义日期范围，这里简化处理，实际应该根据日期范围计算
    const dateRangeFactor = 0.8 // 假设日期范围覆盖了80%的照片
    count = Math.floor(count * dateRangeFactor)
  }
  
  // 按地点筛选
  if (localFilters.value.location && localFilters.value.location !== '全部') {
    // 原始地点数与筛选后的比例
    const locationRatio = photoStats.value.byLocation[localFilters.value.location] / photoStats.value.total
    count = Math.floor(count * locationRatio)
  }
  
  // 按车型筛选
  if (localFilters.value.bikeType.length > 0 && localFilters.value.bikeType.length < bikeOptions.length) {
    // 计算选中的车型占总数的比例
    let bikeTypeCount = 0
    localFilters.value.bikeType.forEach(type => {
      bikeTypeCount += photoStats.value.byBikeType[type] || 0
    })
    const bikeTypeRatio = bikeTypeCount / photoStats.value.total
    count = Math.floor(count * bikeTypeRatio)
  }
  
  // 如果选择了公路车，并且选择了颜色，进一步筛选
  if (localFilters.value.bikeType.includes('road')) {
    const roadBikeStats = photoStats.value.roadBikeByColor
    
    // 计算公路车在选中车型中的比例
    const roadBikeRatio = photoStats.value.byBikeType.road / 
      localFilters.value.bikeType.reduce((sum, type) => sum + (photoStats.value.byBikeType[type] || 0), 0)
    
    let roadBikeCount = Math.floor(count * roadBikeRatio)
    
    // 骑行服颜色
    if (localFilters.value.jerseyColor) {
      const jerseyRatio = (roadBikeStats.jersey[localFilters.value.jerseyColor] || 0) / photoStats.value.byBikeType.road
      roadBikeCount = Math.floor(roadBikeCount * jerseyRatio)
    }
    
    // 骑行裤颜色
    if (localFilters.value.bibColor) {
      const bibRatio = (roadBikeStats.bib[localFilters.value.bibColor] || 0) / photoStats.value.byBikeType.road
      roadBikeCount = Math.floor(roadBikeCount * bibRatio)
    }
    
    // 锁鞋颜色
    if (localFilters.value.shoeColor) {
      const shoeRatio = (roadBikeStats.shoe[localFilters.value.shoeColor] || 0) / photoStats.value.byBikeType.road
      roadBikeCount = Math.floor(roadBikeCount * shoeRatio)
    }
    
    // 计算非公路车的数量
    const nonRoadBikeCount = count - Math.floor(count * roadBikeRatio)
    
    // 总数 = 符合颜色条件的公路车 + 其他车型
    count = roadBikeCount + nonRoadBikeCount
  }
  
  // 确保结果不小于0
  return Math.max(0, count)
}

// 监听筛选条件变化，更新统计
watch([
  () => localFilters.value.dateOption,
  () => localFilters.value.startDate,
  () => localFilters.value.endDate,
  () => localFilters.value.location,
  () => localFilters.value.bikeType,
  () => localFilters.value.jerseyColor,
  () => localFilters.value.bibColor,
  () => localFilters.value.shoeColor
], () => {
  // 当筛选条件变化时，可以做一些额外的处理，例如实时向后端请求数据
  console.log('筛选条件变化', getFilterResultsText())
}, { deep: true })
</script>

<style scoped>
.filter-panel-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  pointer-events: none;
}

.filter-panel-container > * {
  pointer-events: auto;
}

.filter-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.filter-content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 85vh;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.1);
}

/* 进入和离开动画 */
.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: transform 0.28s cubic-bezier(0.34, 1, 0.64, 1);
}

.slide-leave-active {
  transition: transform 0.25s cubic-bezier(0.34, 0, 0.64, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}

/* 日期选择器折叠动画 */
.fold-enter-active,
.fold-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.fold-enter-from,
.fold-leave-to {
  max-height: 0;
  opacity: 0;
}

.fold-enter-to,
.fold-leave-from {
  max-height: 100px;
  opacity: 1;
}
/* 固定下拉区域的顶部间距 */
.custom-date-inputs {
  margin-top: 6px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 8px;
  border-bottom: 1px solid #f0f0f0;
}

.filter-scroll-area {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
  max-height: calc(85vh - 140px);
}

.filter-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  letter-spacing: 0.05em;
}

.filter-close {
  padding: 4px;
  cursor: pointer;
}

.filter-section {
  margin-bottom: 12px;
  padding-top: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color:rgba(0, 0, 0, 0.9);
  margin-bottom: 8px;
}

/* 日期选项 */
.date-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.date-option {
  padding: 8px 14px;
  background-color: #f5f5f7;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.date-option.active {
  background-color: #9966ff;
  color: #fff;
}

.date-option.custom {
  width: 100%;
  padding: 0;
  background-color: transparent;
}

.custom-date-header {
  padding: 8px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f7;
  border-radius: 8px;
  cursor: pointer;
  color: #333;
  transition: all 0.2s;
}

.date-option.active .custom-date-header {
  background-color: #9966ff;
  color: #fff;
}

.date-option.active .custom-date-header svg path {
  stroke: #fff;
}

.custom-date-header span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
}

.custom-date-inputs {
  display: flex;
  align-items: center;
  gap: 5px;
}

.custom-date-inputs input {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
}

.custom-date-inputs input:focus {
  border-color: #9966ff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(153, 102, 255, 0.2);
}

.date-separator {
  color:rgba(0, 0, 0, 0.7);
  font-weight: 500;
}

/* 地点选项 */
.location-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.location-option {
  padding: 8px 14px;
  background-color: #f5f5f7;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.location-option.active {
  background-color: #9966ff;
  color: #fff;
}

/* 车型选项 */
.bike-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.bike-option {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background-color: #f5f5f7;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.bike-option.active {
  background-color: #f0e6ff;
  border: 1px solid #9966ff;
}

.checkbox {
  width: 18px;
  height: 18px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-inner {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background-color: #9966ff;
}

/* 颜色筛选部分 */
.color-filters {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
}

.color-filters.slide-in {
  max-height: 1000px;
  transition: max-height 0.5s cubic-bezier(0.5, 0, 1, 0);
}

.color-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 5px 0;
}

.color-option {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.color-option:active {
  transform: scale(0.95);
}

.color-option.all-option {
  padding: 6px 10px;
  background-color: #f5f5f7;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  transition: all 0.2s;
}

.color-option.all-option.selected {
  background-color: #9966ff;
  color: white;
}

.all-colors-icon {
  font-size: 14px;
}

.color-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.color-option.selected .color-dot {
  transform: scale(1.05);
  box-shadow: 0 0 0 2px #9966ff, 0 2px 8px rgba(153, 102, 255, 0.3);
}

.color-option.show-more {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #666;
}

.show-more-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  transition: transform 0.3s ease;
}

.show-more-icon.rotate-icon {
  transform: rotate(180deg);
}

/* 颜色选项进入/离开动画 */
.color-option-enter-active,
.color-option-leave-active {
  transition: all 0.3s ease;
}

.color-option-enter-from,
.color-option-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 操作按钮 */
.filter-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 20px;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

.filter-stats {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background-color: #f9f6ff;
  border-radius: 10px;
  margin-bottom: 5px;
}

.stats-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats-text {
  flex: 1;
  font-size: 13px;
  color: #333;
  line-height: 1.4;
}

.action-buttons {
  display: flex;
  gap: 10px;
  width: 100%;
}

.reset-btn, .apply-btn {
  flex: 1;
  padding: 12px 0;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.reset-btn {
  background-color: #f5f5f7;
  color: #666;
}

.apply-btn {
  background-color: #9966ff;
  color: #fff;
}

.reset-btn:active {
  background-color: #eaeaea;
}

.apply-btn:active {
  background-color: #845ad9;
}

.bottom-space {
  height: 35px;
}
</style> 