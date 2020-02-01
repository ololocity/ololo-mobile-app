import React from 'react'
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  BackHandler,
  RefreshControl,
  ActivityIndicator
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useColorScheme } from 'react-native-appearance'

import EventFeedSectionTitle from '../components/EventFeedSectionTitle'
import EventFeedItem from '../components/EventFeedItem'
import EventPreviewModal from '../components/EventPreviewModal'

import i18n from '../localization'
import { colors } from '../util/style'

export interface EventFeedItem {
  id: string
  speakers: Array<{ name: string }>
  title: string
  venue: {
    name: string
  }
  startsAt: string
  duration: number
  coverImage: {
    url: string
  }
}

interface SectionItem {
  title: string
  data: Array<EventFeedItem>
}

interface SectionData extends Array<SectionItem> {}

const allEventsQuery = gql`
  {
    allEvents(filter: { startsAt: { gte: "2020-01-01" } }) {
      id
      title
      startsAt
      coverImage {
        url
      }
      duration
      speakers {
        name
      }
      venue {
        name
      }
    }
  }
`

export default function EventFeed() {
  const colorScheme = useColorScheme()
  const [activeItem, setActiveItem] = React.useState(undefined)
  const [activeItemLayout, setActiveItemLayout] = React.useState(undefined)
  const [isRefreshing, setRefreshingState] = React.useState(false)
  const lastScrollY = React.useRef(0)
  const hasActiveItem = activeItem && activeItemLayout

  const { loading, error, data, refetch } = useQuery(allEventsQuery)
  const sectionData =
    data && Array.isArray(data.allEvents)
      ? [
          {
            title: i18n.t('eventFeed.now'),
            data: data.allEvents
          }
        ]
      : undefined

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

  async function handleRefresh() {
    setRefreshingState(true)

    try {
      await refetch()
    } catch (e) {
      console.log('Unable to refresh', e)
    } finally {
      setRefreshingState(false)
    }
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
        contentContainerStyle={
          sectionData ? styles.listContent : styles.emptyListContent
        }
        sections={sectionData}
        stickySectionHeadersEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={1}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={() => {
          if (loading && !isRefreshing) {
            return (
              <ActivityIndicator style={StyleSheet.absoluteFill} size="large" />
            )
          }

          if (!loading && error) {
            return (
              <View style={styles.placeholder}>
                <Text
                  style={[
                    styles.placeholderText,
                    colorScheme === 'dark' && styles.placeholderTextDark
                  ]}
                >
                  Error loading events: {error.message}
                </Text>
              </View>
            )
          }

          return (
            <View style={styles.placeholder}>
              <Text
                style={[
                  styles.placeholderText,
                  colorScheme === 'dark' && styles.placeholderTextDark
                ]}
              >
                No events yet V_____________V
              </Text>
            </View>
          )
        }}
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
  },
  emptyListContent: {
    flex: 1
  },
  placeholder: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 16
  },
  placeholderText: {
    fontSize: 18
  },
  placeholderTextDark: {
    color: colors.white
  }
})
