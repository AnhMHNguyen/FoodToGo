import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../theme';

const TextButton = ({ buttonContainerStyle, disabled, label, labelStyle, onPress }) => (
  <TouchableOpacity
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.primary,
      ...buttonContainerStyle
    }}
    disabled={disabled}
    onPress={onPress}
  >
    <Text
      style={{
        color: COLORS.white,
        lineHeight: 0,
        ...FONTS.h3,
        ...labelStyle
      }}
    >
      { label }
    </Text>

  </TouchableOpacity>
)

export default TextButton;