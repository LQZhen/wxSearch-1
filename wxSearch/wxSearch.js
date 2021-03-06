/**
 * 小程序搜索组件
 * 作者：Bolo Lai <cantonbolo@gmail.com>
 */
class wxSearch {
  constructor(params) {
    this.prefix = params['prefix'] || ''
    this.historyLength = params['historyLength'] || 10
    this.data = this.extend({
      history: this.getHistorySync(),
      hot: [],
      suggest: [],
      keyword: ''
    }, params['data'])
  }

  /**
   * 获取配置
   */
  getConfig() {
    var that = this
    return {
      prefix: that.prefix,
      historyLength: that.historyLength
    }
  }

  /**
   * 获取关键词
   */
  getKeyword() {
    var that = this
    return that.data.keyword || ''
  }

  /**
   * 设置关键词
   */
  setKeywordSync(keyword, target) {
    var that = this
    that.setKeyword(keyword)
    that.setDataSync(target)
  }

  /**
   * 设置关键词
   */
  setKeyword(keyword) {
    var that = this
    that.data.keyword = keyword
  }

  /**
   * 获取数据
   */
  getData() {
    var that = this
    return that.data
  }

  /**
   * 把数据同步到视图上
   */
  setDataSync(target) {
    var that = this
    target.setData({
      wxSearchData: that.data
    })
  }

  /**
   * 设置数据
   */
  setData(data) {
    var that = this
    that.data = data
  }

  /**
   * 添加历史记录（写入存储并更新视图）
   */
  addHistorySync(keyword, target) {
    var that = this
    that.addHistory(keyword)
    that.setDataSync(target)
}

  /**
   * 添加历史记录
   */
  addHistory(keyword) {
    var that = this
    if (that.data.history.length >= that.historyLength) {
      that.data.history = that.data.history.slice(0, that.historyLength - 1)
    }
    that.data.history.unshift(keyword)
    wx.setStorageSync(that.prefix + 'History', that.data.history)
  }

  /**
   * 获取历史记录（不读取缓存）
   */
  getHistorySync() {
    var that = this
    return wx.getStorageSync(that.prefix + 'History') || []
  }

  /**
   * 获取历史记录
   */
  getHistory() {
    var that = this
    return that.data.history || []
  }

  /**
   * 删除单个历史记录（写入存储并更新视图）
   */
  deleteHistorySync(keyword, target) {
    var that = this
    that.deleteHistory(key)
    wx.setStorageSync(that.prefix + 'History', that.data.history)
    that.setDataSync(target)
  }

  /**
   * 删除单个历史记录
   */
  deleteHistory(keyword) {
    var that = this
    that.data.history.splice(history.indexOf(keyword), 1);
  }

  /**
   * 清空历史记录（写入存储并更新视图）
   */
  clearHistorySync(target) {
    var that = this
    wx.removeStorageSync(that.prefix + 'History')
    that.data.history = []
    that.setDataSync(target)
  }

  /**
   * 设置热门搜索（写入存储并更新视图）
   */
  setHotSync(hot, target) {
    var that = this
    that.setHot(hot)
    that.setDataSync(target)
  }

  /**
   * 设置热门搜索
   */
  setHot(hot) {
    var that = this
    that.data.hot = hot
  }

  /**
   * 获取热门搜索
   */
  getHot() {
    var that = this
    return that.data.hot || []
  }

  /**
   * 设置关键词预测（写入存储并更新视图）
   */
  setSuggestSync(suggest, target) {
    var that = this
    that.setSuggest(suggest)
    that.setDataSync(target)
  }

  /**
   * 设置关键词预测
   */
  setSuggest(suggest) {
    var that = this
    that.data.suggest = suggest
  }

  /**
   * 获取关键词预测
   */
  getSuggest() {
    var that = this
    return that.data.suggest || []
  }

  extend(defaults, options) {
    var extended = {}
    var prop
    for (prop in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
        extended[prop] = defaults[prop]
      }
    }
    for (prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        extended[prop] = options[prop]
      }
    }
    return extended
  }
}

module.exports = wxSearch