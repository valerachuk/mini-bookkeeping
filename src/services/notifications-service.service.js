export default {

  eventHandler: null,

  fireError (text) {
    this.fireNotification({
      type: 'error',
      text
    });
  },

  fireSuccess (text) {
    this.fireNotification({
      type: 'success',
      timeout: 3500,
      text
    });
  },

  fireNotification (...args) {
    this.eventHandler(...args);
  },

  subscribeToNotifications (eventHandler) {
    this.eventHandler = eventHandler;
  }

};
