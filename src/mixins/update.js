export default {
    data() {
      return {
        registration: null,
        updateExists: false,
      }
    },
    created() {
      document.addEventListener('swUpdated', this.updateAvailable, { once: true })
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // We'll also need to add 'refreshing' to our data originally set to false.
        if (this.refreshing) return
        this.refreshing = true
        // Here the actual reload of the page occurs
        window.location.reload()
      })
    },
    methods: {
      updateAvailable(event) {
        this.registration = event.detail
        this.updateExists = true
      }
    }
  }