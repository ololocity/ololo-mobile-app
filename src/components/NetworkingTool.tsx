import React from 'react'
import {
  Animated,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

import NetworkingScannerOverlay from './NetworkingScannerOverlay'
import QRCode from 'react-native-qrcode-svg'

import { colors } from '../util/style'
import i18n from '../localization'

const cardTabIcon = require('../assets/networking-tab-card.png')
const scannerTabIcon = require('../assets/networking-tab-scanner.png')

const QRCODE = '123e4567-e89b-12d3-a456-426655440000'

interface Props {
  height: number
  onCardScan: (connection: Object) => void
  onPress: () => void
}

export default function NetworkingTool({ height, onCardScan }: Props) {
  const scrollViewRef = React.useRef()
  const { width: screenWidth } = Dimensions.get('window')
  const [isScanning, setScanningState] = React.useState(false)
  const [hasScanned, setScannedState] = React.useState(false)
  const [scrollPosition] = React.useState(new Animated.Value(0))
  const indicatorTranslateX = scrollPosition.interpolate({
    inputRange: [0, screenWidth],
    outputRange: [0, screenWidth / 2]
  })
  const [hasPermission, setHasPermission] = React.useState(undefined)

  function scrollToIndex(index: number) {
    if (scrollViewRef.current) {
      scrollViewRef.current.getNode().scrollTo({ x: index * screenWidth })
    }
  }

  function handleCardTabPress() {
    scrollToIndex(0)
  }

  function handleScanTabPress() {
    scrollToIndex(1)
  }
  function handleScroll(event) {
    const offsetX = event.nativeEvent.contentOffset.x

    if (offsetX >= 0) {
      setScanningState(Boolean(Math.round(offsetX / screenWidth)))
    }
  }

  function handleCodeScan({ type, data }) {
    if (type === BarCodeScanner.Constants.BarCodeType.qr) {
      setScannedState(true)
      onCardScan({ data })
    }
  }

  React.useEffect(() => {
    if (isScanning) {
      ;(async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        setHasPermission(status === 'granted')
      })()
    }
  }, [isScanning])

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        ref={scrollViewRef}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollPosition } } }],
          { useNativeDriver: true, listener: handleScroll }
        )}
      >
        <View style={[styles.tab, styles.cardTab, { width: screenWidth }]}>
          <View style={styles.qrCodeBackground}>
            <QRCode size={200} value={QRCODE} />
          </View>
          <Text style={styles.cardTabBottomText}>
            {i18n.t('networking.scanQRCode')}
          </Text>
        </View>
        <View style={[styles.tab, styles.scannerTab, { width: screenWidth }]}>
          {hasPermission ? (
            <BarCodeScanner
              style={StyleSheet.absoluteFill}
              onBarCodeScanned={hasScanned ? undefined : handleCodeScan}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            />
          ) : null}

          <NetworkingScannerOverlay height={height} />
          <Text style={styles.cardTabBottomText}>
            {i18n.t('networking.pointToQRCode')}
          </Text>
        </View>
      </Animated.ScrollView>

      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tabButton} onPress={handleCardTabPress}>
          <Image
            source={cardTabIcon}
            style={[styles.tabIcon, !isScanning && styles.tabIconActive]}
          />
          <Text
            style={[
              styles.tabButtonLabel,
              !isScanning && styles.tabButtonActiveLabel
            ]}
          >
            {i18n.t('networking.cardTab.name')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={handleScanTabPress}>
          <Image
            source={scannerTabIcon}
            style={[styles.tabIcon, isScanning && styles.tabIconActive]}
          />
          <Text
            style={[
              styles.tabButtonLabel,
              isScanning && styles.tabButtonActiveLabel
            ]}
          >
            {i18n.t('networking.scannerTab.name')}
          </Text>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.activeTabIndicator,
            {
              width: screenWidth / 2,
              transform: [{ translateX: indicatorTranslateX }]
            }
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

    position: 'relative'
  },
  scroll: {
    ...StyleSheet.absoluteFillObject
  },
  tab: {
    flex: 1,

    position: 'relative'
  },
  cardTab: {
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardTabBottomText: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 21,
    position: 'absolute',
    bottom: 50,
    color: colors.white,
    left: 20,
    right: 20,
    textAlign: 'center'
  },
  qrCodeBackground: {
    width: 289,
    height: 289,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 33,
    marginBottom: 24
  },
  scannerTab: {
    backgroundColor: colors.black
  },
  tabs: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,

    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    height: 63
  },
  activeTabIndicator: {
    position: 'absolute',
    left: 0,
    bottom: 0,

    height: 1,
    backgroundColor: colors.white
  },
  tabButton: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabIcon: {
    marginRight: 14,

    opacity: 0.7
  },
  tabIconActive: {
    opacity: 1
  },
  tabButtonLabel: {
    fontSize: 20,
    fontWeight: '500',

    color: colors.white,

    opacity: 0.7
  },
  tabButtonActiveLabel: {
    opacity: 1
  }
})
