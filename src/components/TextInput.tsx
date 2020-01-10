import React from 'react'
import {
  View,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { useColorScheme } from 'react-native-appearance'

import { colors } from '../util/style'

interface Props {
  inputProps: Object,
  inputRef?: any,
  style?: any,
  inputWrapperStyle?: any,
  inputStyle?: any,

  value?: any,
  onFocus?: Function,
  onBlur?: Function,
  onChange?: Function,

  label?: string
}

export default function TextInput({
  inputProps,
  inputRef,
  label,
  inputWrapperStyle,
  inputStyle,
  style,
  onChange,
  onFocus,
  onBlur
}) {
  const colorScheme = useColorScheme()
  const [isFocused, setFocusState] = React.useState(false)
  const [value, setValue] = React.useState('')

  const hasLabel = typeof label === 'string'
  const hasValue = Boolean(value)
  const shouldFloat = hasLabel && (isFocused || hasValue)
  const hasError = false

  function handleChange(value: any) {
    setValue(value)

    if (typeof onChange === 'function') {
      onChange(value)
    }
  }

  function handleFocus(...args: any) {
    setFocusState(true)

    if (typeof onFocus === 'function') {
      onFocus(...args)
    }
  }

  function handleBlur(...args: any) {
    setFocusState(false)

    if (typeof onBlur === 'function') {
      onBlur(...args)
    }
  }

  return (
    <View style={[styles.root, style]}>
      <View
        style={[
          styles.field,
          colorScheme === 'dark' && styles.fieldDark,
          inputWrapperStyle,
          isFocused && styles.fieldFocused,
          hasError && styles.fieldHasError
        ]}
      >
        <RNTextInput
          {...inputProps}
          ref={inputRef}
          placeholder={hasLabel && !isFocused ? undefined : inputProps.placeholder}
          style={[styles.input, hasError && styles.inputHasError, inputStyle]}
          onChangeText={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
        />

        {hasLabel ? (
          <View
            style={[styles.label, shouldFloat && styles.labelFloating]}
            pointerEvents="none"
          >
            <Text
              style={[
                styles.labelText,
                colorScheme === 'dark' && styles.labelTextDark,
                shouldFloat && styles.labelTextFloating
              ]}
            >
              {label}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 12
  },
  field: {
    position: 'relative',
    paddingTop: 12,
    paddingBottom: 4,

    borderBottomColor: 'rgba(0, 0, 0, 0.16)',
    borderBottomWidth: 2
  },
  fieldDark: {
    borderBottomColor: 'rgba(255, 255, 255, 0.16)',
  },
  fieldFocused: {
    borderBottomColor: colors.blue
  },
  fieldHasError: {
    borderBottomColor: colors.red
  },

  input: {
    paddingVertical: 8
  },
  inputHasError: {},

  label: {
    position: 'absolute',
    top: 16,
    left: 0
  },
  labelFloating: {
    top: 0
  },

  labelText: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,

    color: 'rgba(0, 0, 0, 0.54)'
  },
  labelTextDark: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  labelTextFloating: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: 'rgba(47, 128, 237, 1)'
  }
})
