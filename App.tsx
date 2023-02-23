import { useEffect } from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import notifee, { AndroidImportance, EventType } from '@notifee/react-native'

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
      </View>
    </View>
  )
}
