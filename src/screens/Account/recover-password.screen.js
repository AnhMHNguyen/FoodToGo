import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import AuthLayout from './auth-layout';
import FormInput from '../../components/form-input/form-input.component';
import TextButton from '../../components/text-button/text-button.component';
import { validateEmail } from '../../utils/input-validation/input-validation';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const RecoverPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const isEnabledRecover = () => {
    return email !== "" && emailError === ""
  }

  const onSubmitEmail = () => {

  }
  return (
    <AuthLayout title="Password Recovery" subtitle="Please enter your email address to recover your password.">
       <View
        style={{
          flex: 1,
          marginTop: SIZES.padding1 * 2,
        }}
      >
        <FormInput
          label="Email"
          keyboardType='email-address'
          autoCompleteType="email"
          onChange={(value) => {
            validateEmail(value, setEmailError)
            setEmail(value)
          }}
          errorMsg={emailError}
          appendComponent={ 
            <View style={{ justifyContent: 'center' }}>
              <Image source={email === "" || (email !== "" && emailError === "") ? icons.correct : icons.cancel}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: email ==="" ? COLORS.gray : (email !== "" && emailError === "" ) ? COLORS.green : COLORS.red
                }}
              />
            </View>
          }
        />
      </View>
      <TextButton
        label="Send Email"
        disabled={isEnabledRecover() ? false : true}
        buttonContainerStyle={{
          height: 55,
          alignItems: 'center',
          marginTop: SIZES.padding3 * 2,
          borderRadius: SIZES.radius,
          backgroundColor: isEnabledRecover() ? COLORS.primary : COLORS.transparentPrimary
        }}
        onPress={onSubmitEmail}
      />
      <TextButton
          label="Go Back"
          buttonContainerStyle={{
            backgroundColor: null,
            alignSelf: 'flex-end',
            marginVertical: SIZES.padding,
            paddingRight: SIZES.base
          }}
          labelStyle={{
            color: COLORS.gray,
            ...FONTS.body3
          }}
          onPress={() => navigation.goBack()}
        />
    </AuthLayout>
  );
}

export default RecoverPasswordScreen;