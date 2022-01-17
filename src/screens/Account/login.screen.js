import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormInput from '../../components/form-input/form-input.component';
import TextButton from '../../components/text-button/text-button.component';
import AuthLayout from './auth-layout';
import { FadeInView } from '../../utils/animations/fade.animation';
import { useAuth } from '../../services/authentication/authentication.context';
import { validateEmail, validatePassword } from '../../utils/input-validation/input-validation';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const {onLogin, isLoading, error} = useAuth();

  const isEnabledSignIn = () => {
    return email !== "" && password !== "" && emailError === "" && passwordError === ""
  }

  return (
    <AuthLayout title="Let's Sign You In" subtitle="Welcome back, We missed you!">
      {/* Input Form */}
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

        <FormInput
          label="Password"
          secureTextEntry={!showPass}
          autoCompleteType="password"
          containerStyle={{
            marginTop: SIZES.padding2
          }}
          onChange={(value) => {
            validatePassword(value, setPasswordError)
            setPassword(value);
          }}
          errorMsg={passwordError}
          appendComponent={ 
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: "flex-end",
                justifyContent: "center"
              }}
              onPress={() => setShowPass(!showPass) }
            >
              <Image
                source={showPass ? icons.eye : icons.eye_close}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray
                }}
              />
            </TouchableOpacity>
          }
        />

        {/*Forgot password*/}
        <TextButton
          label="Forgot Password?"
          buttonContainerStyle={{
            backgroundColor: null,
            alignSelf: 'flex-end',
            marginTop: SIZES.base
          }}
          labelStyle={{
            color: COLORS.gray,
            ...FONTS.body4
          }}
          onPress={() => navigation.navigate("RecoverPassword")}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary}/>
        ): (    
          <TextButton
            label="Sign In"
            disabled={isEnabledSignIn() ? false : true}
            buttonContainerStyle={{
              height: 55,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: isEnabledSignIn() ? COLORS.primary : COLORS.transparentPrimary
              }}
            onPress={() => onLogin(email, password)}
          />
        )}

        {/*SignUp*/}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding2,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>Don't have an account?</Text>
          <TextButton
            label="Sign Up"
            buttonContainerStyle={{
              marginLeft: SIZES.base,
              backgroundColor: null
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h4
            }}
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </AuthLayout>
  );
}

export default LoginScreen;