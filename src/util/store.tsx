// @flow
import { AsyncStorage } from 'react-native'

export async function set(key: string, data: Object): Promise<any> {
  try {
    const payload = JSON.stringify(data)
    await AsyncStorage.setItem(key, payload)
  } catch (e) {
    console.log('Error saving data')
  }
}

export async function get(key: string): Promise<any> {
  let data

  try {
    const payload = await AsyncStorage.getItem(key)

    if (typeof payload === 'string') {
      data = JSON.parse(payload)
    }

    return data
  } catch (e) {
    console.log('Error retrieving data')
  }
}

export async function clear(key: string): Promise<any> {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    console.log('Error removing data')
  }
}
