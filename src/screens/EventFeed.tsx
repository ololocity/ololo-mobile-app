import React from 'react'
import { SectionList, StyleSheet } from 'react-native'

import SafeAreaView from '../components/SafeAreaView'
import EventFeedSectionTitle from '../components/EventFeedSectionTitle'
import EventFeedItem from '../components/EventFeedItem'

import i18n from '../localization'

export interface EventFeedItem {
  id: string,
  hostName: string
  title: string
  locationName: string
  startsAt: number
  durationMinutes: number
}

interface SectionItem {
  title: string
  data: Array<EventFeedItem>
}

interface SectionData {
  [index: number]: SectionItem
}

const DATA: SectionData = [
  {
    title: i18n.t('eventFeed.now'),
    data: [
      {
        id: 'event1',
        hostName: 'Павел Исаенко',
        title: 'Платный воркшоп по фотографии',
        locationName: 'ololoErkindik',
        startsAt: 1579092422351,
        durationMinutes: 60
      }
    ]
  },
  {
    title: i18n.t('eventFeed.futureEvents'),
    data: [
      {
        id: 'event2',
        hostName: 'Николай Соколов',
        title: 'Платный воркшоп по интерфейсам',
        locationName: 'ololoErkindik',
        startsAt: 1579092422351,
        durationMinutes: 60
      },
      {
        id: 'event3',
        hostName: 'Михаил Романенко',
        title: 'Бесплатный воркшоп по фотографии',
        locationName: 'ololoVictory',
        startsAt: 1579092422351,
        durationMinutes: 60
      }
    ]
  }
]

export default function EventFeed() {
  return (
    <SafeAreaView style={styles.root}>
      <SectionList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        sections={DATA}
        stickySectionHeadersEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <EventFeedItem {...{ item }} />}
        renderSectionHeader={({ section: { title } }) => (
          <EventFeedSectionTitle {...{ title }} />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  list: {
    flex: 1
  },
  listContent: {
    paddingHorizontal: 16
  }
})
