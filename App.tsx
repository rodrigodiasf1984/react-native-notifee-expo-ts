import { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import notifee, {
  AndroidImportance,
  EventType,
  TimestampTrigger,
  TriggerType
} from '@notifee/react-native'

export default function App() {
  const createChannel = async () => {
    const channelId = await notifee.createChannel({
      id: 'test',
      name: 'sales',
      importance: AndroidImportance.HIGH,
      vibration: true
    })
    return channelId
  }

  const displayNotification = async () => {
    await notifee.requestPermission()
    const channelId = await createChannel()

    await notifee.displayNotification({
      id: '123',
      title: 'Olá, <strong>Notifee131313</strong>🤩!',
      body: 'Hello World!',
      android: {
        channelId: channelId
      },
      ios: {
        sound: 'default'
      }
    })
  }
  const updateNotification = async () => {
    await notifee.requestPermission()

    const channelId = await createChannel()

    await notifee.displayNotification({
      id: '123',
      title: 'Olá, <strong>Notifee</strong>🤩!',
      body: 'Hello World!',
      android: {
        channelId: channelId
      },
      ios: {
        sound: 'default'
      }
    })
  }

  const cancelNotification = async () => {
    await notifee.cancelNotification('123')
  }

  const scheduleNotification = async () => {
    const date = new Date(Date.now())
    date.setMinutes(date.getMinutes() + 1)

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime()
    }
    const channelId = await createChannel()

    await notifee.createTriggerNotification(
      {
        title: 'Scheduled notification!⏰ ',
        body: 'This notification was scheduled to display',
        android: {
          channelId: channelId
        },
        ios: {
          sound: 'default'
        }
      },
      trigger
    )
  }

  const listScheduledNotifications = async () => {
    notifee.getTriggerNotificationIds().then((ids) => {
      console.log('✅ ~  listScheduledNotifications ids:', ids)
      console.log(ids)
    })
  }

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('Notification dismissed', detail.notification)
          break
        case EventType.PRESS:
          console.log('Notification pressed', detail.notification)
          break
      }
    })
  }, [])

  useEffect(() => {
    return notifee.onBackgroundEvent(async ({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('Notification dismissed', detail.notification)
          break
        case EventType.PRESS:
          console.log('Notification pressed', detail.notification)
          break
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local notifications</Text>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={displayNotification}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Display notification</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={updateNotification}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Update notification</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={cancelNotification}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Cancel notification</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={scheduleNotification}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Schedule notification</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={listScheduledNotifications}
          style={styles.button}
        >
          <Text style={styles.buttonText}>List scheduled notifications</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
