import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Platform } from 'react-native';
import Header from '../../components/header/header.component';
import FormInput from '../../components/form-input/form-input.component';
import TextButton from '../../components/text-button/text-button.component';
import SafeArea from '../../components/safe-area/safe-area.component';
import { firestore, storage } from '../../../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from '../../services/authentication/authentication.context';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, validateInput } from '../../utils/input-validation/input-validation';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const ProfileEditScreen = ({ navigation, route }) => { 
  const { user} = useAuth();
  const { userInfo } = route.params;
  const [fullName, setFullName] = useState(userInfo.displayName)
  const [email, setEmail] = useState(userInfo.email);
  const [emailError, setEmailError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const isEnabledEdit = () => {
    return email !== "" && fullName.length > 3 && emailError === "" && fullNameError === "" 
    && isLoading === false
  }

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permission to make this work!')
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
          })
          console.log(result)
          if (!result.cancelled) {
            setImage(result.uri)
          }
        }
      }
  }

  const updateInfo = async () => {
    if (image === null) {
      setDoc(doc(firestore, "users", user.uid), {
        displayName: fullName,
        email: email,
      }, { merge: true })
    } else {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        }
        xhr.onerror = () => {
          reject(new TypeError('Network request failed'))
        }
        xhr.responseType = 'blob';
        xhr.open('GET', image, true);
        xhr.send(null)
      })
      const uploadUri = image;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extension;
      console.log(filename);
      const storageRef = ref(storage, `profile/${filename}`)
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on('state_changed', null,
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((URL) => {
              setDoc(doc(firestore, "users", user.uid), {
                displayName: fullName,
                email: email,
                photoURL: URL
              }, { merge: true });
            });
        })
    }
    navigation.navigate("ProfileMain")
  }

  return (
    <SafeArea>
      <Header
        title="EDIT PROFILE"
        leftComponent={ 
          <TouchableOpacity
            style={{
              width: 50,
              justifyContent: 'center'
            }}
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={icons.cross}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25
              }}
            />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={{width: 50}}/>
        }
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding2,
          
        }}
      >
        <TouchableOpacity
          style={{
              width: 120,
              flexDirection: 'column',
              marginVertical: SIZES.padding2,
              alignItems: 'center',
              alignSelf: 'center'
            }}
            onPress={pickImage}
          >
            <Image
              source={{ uri: image ? image : userInfo.photoURL}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                overflow: 'hidden',
              }}
          />
          <View
            style={{
              position: 'absolute',
              top: 80,
              backgroundColor: COLORS.white,
              padding: SIZES.base,
              borderRadius: SIZES.radius
            }}
          >
            <Image
              source={icons.camera}
              style={{
                width: 20,
                height: 20
              }}
            />
          </View>
          </TouchableOpacity>
        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            marginTop: SIZES.padding,
            height: SIZES.height * 0.4,
            paddingHorizontal: SIZES.padding2,
            borderRadius: SIZES.padding1,
            backgroundColor: COLORS.white,
            paddingTop: SIZES.padding
          }}
          enableOnAndroid={true}
          enableAutomaticScroll={(Platform.OS === 'ios')}
        >   
          
          <FormInput
            label="Full Name"
            onChange={(value) => {
              validateInput(value, 3, setFullNameError);
              setFullName(value);
            }}
            value={fullName}
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
            value={email}
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
          <TextButton
            label="Update"
            disabled={isEnabledEdit() ? false : true}
            buttonContainerStyle={{
              height: 55,
              alignItems: 'center',
              marginTop: SIZES.padding3 * 2,
              borderRadius: SIZES.radius,
              backgroundColor: isEnabledEdit() ? COLORS.primary : COLORS.transparentPrimary
            }}
            onPress={updateInfo}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeArea>
  );
}

export default ProfileEditScreen;