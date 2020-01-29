import React from 'react'
import { View, SectionList, StyleSheet, BackHandler } from 'react-native'

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
    coverImageUrl: getUnsplashImageUrl('hfk6xOjQlFk', 375, 361)
  },
  {
    id: 'event2',
    hostName: 'Николай Соколов',
    title: 'Платный воркшоп по интерфейсам',
    locationName: 'ololoErkindik',
    startsAt: 1579092422351,
    durationMinutes: 60,
    coverImageUrl: getUnsplashImageUrl('JAvWcpZmyUQ', 375, 361)
  },
  {
    id: 'event3',
    hostName: 'Михаил Романенко',
    title: 'Бесплатный воркшоп по оригами',
    locationName: 'ololoVictory',
    startsAt: 1579092422351,
    durationMinutes: 60,
    coverImageUrl: getUnsplashImageUrl('vhVj--1y31Y', 375, 361)
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
  const lastScrollY = React.useRef(0)
  const hasActiveItem = activeItem && activeItemLayout

  function handleItemPress(item, layout) {
    if (!hasActiveItem) {
      setActiveItemLayout({ ...layout, py: layout.py - lastScrollY.current })
      setActiveItem(item)
    }
  }

  function handlePreviewModalDismiss() {
    setActiveItem(undefined)
    setActiveItemLayout(undefined)
  }

  function handleScroll({
    nativeEvent: {
      contentOffset: { y }
    }
  }) {
    lastScrollY.current = y
  }

  React.useEffect(() => {
    function handleBackButtonPress() {
      if (hasActiveItem) {
        handlePreviewModalDismiss()
        return true
      }

      BackHandler.exitApp()
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonPress
    )
    return function cleanup() {
      backHandler.remove()
    }
  }, [hasActiveItem])

  return (
    <View style={styles.root}>
      <SectionList
        scrollEnabled={!hasActiveItem}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        sections={DATA}
        stickySectionHeadersEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={1}
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
      {hasActiveItem ? (
        <EventPreviewModal
          item={activeItem}
          initialLayout={activeItemLayout}
          onDismiss={handlePreviewModalDismiss}
        />
      ) : null}
    </View>
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
    paddingTop: 45,
    paddingBottom: 20,
    paddingHorizontal: 16
  }
})
