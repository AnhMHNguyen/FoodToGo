import React from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { COLORS, icons, images, SIZES, FONTS } from '../../theme';

const FormInput = ({
  containerStyle,
  label,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  maxLength,
  value,
  keyboardType = "default",
  autoCompleteType = "off",
  autoCapitalize = "none",
  errorMsg = ""
}) => { 
  return (
    <View
      style={{
        ...containerStyle
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>{label}</Text>
        <Text style={{ color: COLORS.red, ...FONTS.body4 }}>{ errorMsg }</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          height: 55,
          paddingHorizontal: SIZES.padding3,
          marginTop: SIZES.base,
          borderRadius: SIZES.padding2,
          backgroundColor: COLORS.lightGray2
        }}
      >
        {prependComponent}
        <TextInput
          style={{
            flex: 1,
            ...FONTS.body2,
            ...inputStyle
          }}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCompleteType={autoCompleteType}
          onChangeText={(text) => onChange(text)}
          value={value}
        />
        { appendComponent }
      </View>
    </View>
  );
}

export default FormInput;