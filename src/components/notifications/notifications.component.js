import { NotificationsService } from '@/services';

export default {

  data: () => ({
    notifications: []
  }),

  methods: {
    onReceiveNotification (notification) {
      notification.id = this.notifications[0] ? this.notifications[0].id + 1 : 0;
      this.notifications.unshift(notification);
      if (notification.timeout !== undefined) {
        setTimeout(() => {
          this.closeAlert(notification);
        }, notification.timeout);
      }
    },
    closeAlert (notification) {
      this.notifications = this.notifications.filter(notif => notif !== notification);
    }
  },

  mounted () {
    NotificationsService.subscribeToNotifications(this.onReceiveNotification);
  }

};
