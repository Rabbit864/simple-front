import { useNotificationStore } from '../stores/notificationStore'
import axios from 'axios'

export const initMercure = async () => {
    const store = useNotificationStore()

    const { data } = await axios.post('http://localhost:8000/mercure/auth')

    const url = new URL('http://localhost:3000/.well-known/mercure')
    url.searchParams.append('topic', 'notifications')
    url.searchParams.append('authorization', data.token)

    const eventSource = new EventSource(url, {
        withCredentials: true
    })

    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)
        store.add(data)
    }

    eventSource.onerror = (e) => {
        console.error('Mercure error', e)
    }
}