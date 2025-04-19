import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect } from 'expo-router'
import React, { useEffect, useState } from 'react'

export default function IndexPage() {
  const [isAccessed, setIsAccessed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const subscription = async () => {
      const token = await AsyncStorage.getItem('accessToken')
      setIsAccessed(token === 'true' ? true : false)
      setLoading(false)
    }

    subscription()
  }, [])

  return <>{loading ? <></> : <Redirect href={!isAccessed ? '/(routes)/welcome' : '/(routes)/home'} />}</>
}
