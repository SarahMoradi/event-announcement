import { createContext } from 'react'

const NotificationContext = createContext({
  Notification: null,
  showNotification: function () {},
  hideNotification: function () {},
})

export default NotificationContext
