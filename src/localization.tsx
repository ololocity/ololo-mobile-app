import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

import en from './i18n/en'
import ru from './i18n/ru'

i18n.fallbacks = true
i18n.translations = { ru, en }
i18n.locale = Localization.locale

export default i18n
