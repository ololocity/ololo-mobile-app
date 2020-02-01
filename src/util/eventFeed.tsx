import isSameDay from 'date-fns/isSameDay'

import i18n from '../localization'

export interface EventFeedItemType {
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
  data: Array<EventFeedItemType>
}
export interface SectionData extends Array<SectionItem> {}

export function getEventFeedSections(
  events: Array<EventFeedItemType>
): SectionData {
  const nowEvents = []
  const futureEvents = []

  for (let event of events) {
    if (isSameDay(new Date(event.startsAt), new Date())) {
      nowEvents.push(event)
    } else {
      futureEvents.push(event)
    }
  }

  return nowEvents.length > 0
    ? [
        { title: i18n.t('eventFeed.now'), data: nowEvents },
        { title: i18n.t('eventFeed.futureEvents'), data: futureEvents }
      ]
    : [{ title: i18n.t('eventFeed.allEvents'), data: futureEvents }]
}
