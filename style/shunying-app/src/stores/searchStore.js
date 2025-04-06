import { defineStore } from 'pinia'

// 定义并导出一个名为 useSearchStore 的 store
export const useSearchStore = defineStore('search', {
  // 存储的状态
  state: () => ({
    // 筛选条件
    filters: {
      startDate: '',
      endDate: '',
      dateOption: 'today',
      location: '戒台寺',
      bikeType: 'all', // 默认全选
      jerseyColor: '',
      bibColor: '',
      shoeColor: '',
      mixed: []
    },
    // 存储显示的照片
    photos: [],
    // 是否显示筛选面板
    showFilter: false,
    // 是否正在加载更多照片
    loadingMore: false,
    // 是否已初始化数据
    initialized: false
  }),
  
  // 计算属性
  getters: {
    // 获取筛选后的照片
    filteredPhotos: (state) => {
      if (!state.photos || state.photos.length === 0) {
        return []
      }
      
      let result = [...state.photos]
      
      // 根据日期筛选
      if (state.filters.dateOption === 'custom' && state.filters.startDate && state.filters.endDate) {
        result = result.filter(photo => {
          const photoDate = new Date(photo.date)
          const start = new Date(state.filters.startDate)
          const end = new Date(state.filters.endDate)
          return photoDate >= start && photoDate <= end
        })
      } else if (state.filters.dateOption === 'today') {
        const today = new Date()
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
        result = result.filter(photo => photo.date === todayStr)
      } else if (state.filters.dateOption === 'yesterday') {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`
        result = result.filter(photo => photo.date === yesterdayStr)
      } else if (state.filters.dateOption === 'thisWeek') {
        const today = new Date()
        const dayOfWeek = today.getDay() || 7 // 将周日的0转换为7
        const monday = new Date(today)
        monday.setDate(today.getDate() - (dayOfWeek - 1))
        monday.setHours(0, 0, 0, 0)
        
        result = result.filter(photo => {
          const photoDate = new Date(photo.date)
          return photoDate >= monday
        })
      } else if (state.filters.dateOption === 'thisMonth') {
        const today = new Date()
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
        
        result = result.filter(photo => {
          const photoDate = new Date(photo.date)
          return photoDate >= firstDay
        })
      } else if (state.filters.dateOption === 'weekend') {
        const today = new Date()
        const dayOfWeek = today.getDay() // 0是周日，6是周六
        
        // 确定最近的周末日期
        let saturday, sunday
        if (dayOfWeek === 0) { // 今天是周日
          sunday = today
          saturday = new Date(today)
          saturday.setDate(today.getDate() - 1) // 昨天是周六
        } else if (dayOfWeek === 6) { // 今天是周六
          saturday = today
          sunday = new Date(today)
          sunday.setDate(today.getDate() + 1) // 明天是周日
        } else { // 工作日
          // 上一个周末
          saturday = new Date(today)
          saturday.setDate(today.getDate() - dayOfWeek - 1)
          sunday = new Date(today)
          sunday.setDate(today.getDate() - dayOfWeek)
        }
        
        // 格式化日期为字符串，用于比较
        const saturdayStr = `${saturday.getFullYear()}-${String(saturday.getMonth() + 1).padStart(2, '0')}-${String(saturday.getDate()).padStart(2, '0')}`
        const sundayStr = `${sunday.getFullYear()}-${String(sunday.getMonth() + 1).padStart(2, '0')}-${String(sunday.getDate()).padStart(2, '0')}`
        
        result = result.filter(photo => photo.date === saturdayStr || photo.date === sundayStr)
      }
      
      // 根据地点筛选
      if (state.filters.location && state.filters.location !== '全部') {
        result = result.filter(photo => photo.location === state.filters.location)
      }
      
      // 根据车型筛选
      if (state.filters.bikeType && state.filters.bikeType !== 'all') {
        result = result.filter(photo => photo.bikeType === state.filters.bikeType)
      }
      
      // 如果是公路车，根据装备颜色筛选
      if ((state.filters.bikeType === 'road' || state.filters.bikeType === 'all') && 
          (state.filters.jerseyColor || state.filters.bibColor || state.filters.shoeColor)) {
        
        // 筛选公路车照片
        let roadBikePhotos = result.filter(photo => photo.bikeType === 'road')
        let otherPhotos = result.filter(photo => photo.bikeType !== 'road')
        
        // 根据骑行服颜色筛选
        if (state.filters.jerseyColor) {
          roadBikePhotos = roadBikePhotos.filter(photo => photo.jerseyColor === state.filters.jerseyColor)
        }
        
        // 根据骑行裤颜色筛选
        if (state.filters.bibColor) {
          roadBikePhotos = roadBikePhotos.filter(photo => photo.bibColor === state.filters.bibColor)
        }
        
        // 根据锁鞋颜色筛选
        if (state.filters.shoeColor) {
          roadBikePhotos = roadBikePhotos.filter(photo => photo.shoeColor === state.filters.shoeColor)
        }
        
        // 重新组合筛选结果
        if (state.filters.bikeType === 'road') {
          result = roadBikePhotos
        } else {
          result = [...roadBikePhotos, ...otherPhotos]
        }
      }
      
      return result
    },
    
    // 获取筛选条件摘要
    filterSummary: (state) => {
      const summary = []
      
      if (state.filters.dateOption === 'today') {
        summary.push('今日')
      } else if (state.filters.dateOption === 'yesterday') {
        summary.push('昨日')
      } else if (state.filters.dateOption === 'weekend') {
        summary.push('本周末')
      } else if (state.filters.dateOption === 'thisWeek') {
        summary.push('本周')
      } else if (state.filters.dateOption === 'thisMonth') {
        summary.push('本月')
      } else if (state.filters.dateOption === 'custom' && state.filters.startDate) {
        let dateText = state.filters.startDate
        if (state.filters.endDate) {
          dateText += ` 至 ${state.filters.endDate}`
        }
        summary.push(dateText)
      }
      
      if (state.filters.location && state.filters.location !== 'all') {
        summary.push(state.filters.location)
      }
      
      if (state.filters.bikeType && state.filters.bikeType !== 'all') {
        if (state.filters.bikeType === 'road') {
          summary.push('公路车')
        } else if (state.filters.bikeType === 'motor') {
          summary.push('摩托车')
        }
      }
      
      if (state.filters.jerseyColor) {
        summary.push(`骑行服:${state.filters.jerseyColor}`)
      }
      
      if (state.filters.bibColor) {
        summary.push(`骑行裤:${state.filters.bibColor}`)
      }
      
      if (state.filters.shoeColor) {
        summary.push(`锁鞋:${state.filters.shoeColor}`)
      }
      
      return summary.length > 0 ? summary.join(', ') : '全部'
    }
  },
  
  // 操作方法
  actions: {
    // 设置筛选条件
    setFilters(filters) {
      this.filters = { ...filters }
    },
    
    // 重置筛选条件
    resetFilters() {
      this.filters = {
        startDate: '',
        endDate: '',
        dateOption: 'today',
        location: '戒台寺',
        bikeType: 'all',
        jerseyColor: '',
        bibColor: '',
        shoeColor: '',
        mixed: []
      }
    },
    
    // 设置照片数据
    setPhotos(photos) {
      this.photos = [...photos]
      this.initialized = true
    },
    
    // 设置筛选面板显示状态
    setShowFilter(status) {
      this.showFilter = status
    },
    
    // 应用筛选
    applyFilters(filters) {
      this.setFilters(filters)
      this.showFilter = false
      // 这里可以添加其他筛选逻辑，如果需要的话
    },
    
    // 加载照片数据，如果尚未初始化
    async loadInitialPhotos(photosData) {
      if (!this.initialized && photosData && photosData.length > 0) {
        this.setPhotos(photosData)
      }
    }
  }
}) 