// @flow
import * as React from 'react'
import { Linking } from 'expo'

export default function useLinkingEffect(effectHandler) {
  React.useEffect(() => {
    function handleOpenUrl(ev) {
      effectHandler(ev.url)
    }

    // for initial render
    async function initialUrl() {
      try {
        const linkingUrl = await Linking.getInitialURL()
        if (linkingUrl) {
          effectHandler(linkingUrl)
        }
      } catch (error) {
        console.log('Unable to handle linking url', error)
      }
    }
    initialUrl()

    Linking.addEventListener('url', handleOpenUrl)
    return () => Linking.removeEventListener('url', handleOpenUrl)
  }, [effectHandler])
}
