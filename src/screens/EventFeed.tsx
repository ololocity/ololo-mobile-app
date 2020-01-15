import React from 'react'
import { SectionList, StyleSheet } from 'react-native'

import SafeAreaView from '../components/SafeAreaView'
import EventFeedSectionTitle from '../components/EventFeedSectionTitle'
import EventFeedItem from '../components/EventFeedItem'
import EventPreviewModal from '../components/EventPreviewModal'

import { getUnsplashImageUrl } from '../util/misc'

import i18n from '../localization'

export interface EventFeedItem {
  id: string
  hostName: string
  title: string
  locationName: string
  startsAt: number
  durationMinutes: number
  coverImageUrl: string
}

interface SectionItem {
  title: string
  data: Array<EventFeedItem>
}

interface SectionData extends Array<SectionItem> {}

const EVENTS = [
  {
    id: 'event1',
    hostName: 'Павел Исаенко',
    title: 'Платный воркшоп по фотографии',
    locationName: 'ololoErkindik',
    startsAt: 1579092422351,
    durationMinutes: 60,
    coverImageUrl: getUnsplashImageUrl('WLUHO9A_xik', 375, 361)
  },
  {
    id: 'event2',
    hostName: 'Николай Соколов',
    title: 'Платный воркшоп по интерфейсам',
    locationName: 'ololoErkindik',
    startsAt: 1579092422351,
    durationMinutes: 60,
    coverImageUrl: getUnsplashImageUrl('WLUHO9A_xik', 375, 361)
  },
  {
    id: 'event3',
    hostName: 'Михаил Романенко',
    title: 'Бесплатный воркшоп по фотографии',
    locationName: 'ololoVictory',
    startsAt: 1579092422351,
    durationMinutes: 60,
    coverImageUrl: getUnsplashImageUrl('WLUHO9A_xik', 375, 361)
  }
]
const [todayEvent, ...restEvents] = EVENTS
const DATA: SectionData = [
  {
    title: i18n.t('eventFeed.now'),
    data: [todayEvent]
  },
  {
    title: i18n.t('eventFeed.futureEvents'),
    data: restEvents
  }
]

export default function EventFeed() {
  const [activeItem, setActiveItem] = React.useState(undefined)
  const [activeItemLayout, setActiveItemLayout] = React.useState(undefined)
  const hasActiveItem = activeItem && activeItemLayout

  function handleItemPress(item, layout) {
    setActiveItemLayout(layout)
    setActiveItem(item)
  }

  function handlePreviewModalDismiss() {
    setActiveItem(undefined)
    setActiveItemLayout(undefined)
  }

  return (
    <>
      <SafeAreaView style={styles.root}>
        <SectionList
          scrollEnabled={!hasActiveItem}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          sections={DATA}
          stickySectionHeadersEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <EventFeedItem
              isActive={activeItem && activeItem.id === item.id}
              {...{
                item,
                onPress: dimensions => handleItemPress(item, dimensions)
              }}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <EventFeedSectionTitle {...{ title }} />
          )}
        />
      </SafeAreaView>
      {hasActiveItem ? (
        <EventPreviewModal
          item={activeItem}
          initialLayout={activeItemLayout}
          onDismiss={handlePreviewModalDismiss}
        />
      ) : null}
    </>
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
