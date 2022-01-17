import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import AuthLayout from './auth-layout';
import FormInput from '../../components/form-input/form-input.component';
import TextButton from '../../components/text-button/text-button.component';
import { useAuth } from '../../services/authentication/authentication.context';
import { validateEmail, validatePassword, validateInput } from '../../utils/input-validation/input-validation';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { onRegister, isLoading, error } = useAuth();

  const isEnabledSignUp = () => {
    return email !== "" && password !== "" && fullName.length > 3 && emailError === "" && passwordError === "" && fullNameError === "" 
    && isLoading === false
  }

  return (
    <AuthLayout
      title="Getting Started"
      subtitle="Create an account to continue!"
    >
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding1 * 2,
        }}
      >
        <FormInput
          label="Full Name"
          onChange={(value) => {
            validateInput(value, 3, setFullNameError);
            setFullName(value);
          }}
          errorMsg={fullNameError}
          appendComponent={ 
            <View style={{ justifyContent: 'center' }}>
              <Image source={fullName === "" || (fullName !== "" && fullNameError === "") ? icons.correct : icons.cancel}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: fullName ==="" ? COLORS.gray : (fullName !== "" && fullNameError === "" ) ? COLORS.green : COLORS.red
                }}
              />
            </View>
          }
        />
        
        <FormInput
          label="Email"
          keyboardType='email-address'
          autoCompleteType="email"
          onChange={(value) => {
            validateEmail(value, setEmailError)
            setEmail(value)
          }}
          containerStyle={{
            marginTop: SIZES.padding2
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
   
        <TextButton
          label="Sign Up"
          disabled={isEnabledSignUp() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding3 * 2,
            borderRadius: SIZES.radius,
            backgroundColor: isEnabledSignUp() ? COLORS.primary : COLORS.transparentPrimary
          }}
          onPress={() => onRegister(email, password, fullName)}
        />

        {/*SignIn*/}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding2,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>Already have an account?</Text>
          <TextButton
            label="Sign In"
            buttonContainerStyle={{
              marginLeft: SIZES.base,
              backgroundColor: null
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h4
            }}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </AuthLayout>
  );
}

export default RegisterScreen;