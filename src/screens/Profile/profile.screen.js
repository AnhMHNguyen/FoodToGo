import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../../components/header/header.component';
import SafeArea from '../../components/safe-area/safe-area.component';
import { useAuth } from '../../services/authentication/authentication.context';
import { firestore } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, icons, images, SIZES, FONTS } from "../../theme";

const ProfileScreen = ({ navigation }) => {
  const { user, onLogout } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');


  const getUserInfo = async () => {
    const snapshot = await getDoc(doc(firestore, "users", user.uid));
    if (snapshot.exists()) {
      setUserInfo(snapshot.data());
      setErrorMsg('')
    } else {
      setErrorMsg("Users Snapshot Not Found")
    }
  }

  useFocusEffect(
    useCallback(() => {
      try {
        getUserInfo()
      } catch (err) {
        setErrorMsg("Oops! Something went wrong")
      }
    }, [])
  );


  return (
    <SafeArea>
      <Header
        title="PROFILE"
        leftComponent={ 
          <View />
        }
        rightComponent={
          <View/>
        }
      />
      {errorMsg==="" && userInfo===null && (
        <View style={{flex: 1, alignItems: "center", justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={COLORS.primary}/>
        </View>
      )}
      {errorMsg!=="" && (
        <View style={{flex: 1, alignItems: "center", justifyContent: 'center'}}>
          <Text>{ errorMsg }</Text>
        </View>
      )}
      {errorMsg==="" && userInfo!==null && (        
        <View
          style={{
            flex: 1,
            paddingHorizontal: SIZES.base
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              marginVertical: SIZES.padding2,
              alignItems: 'center'
            }}
          >
            <Image
              source={{ uri: userInfo.photoURL }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                overflow: 'hidden',
              }}
            />
            <Text style={{marginTop:SIZES.padding3, ...FONTS.h4}}>{ userInfo.displayName }</Text>
            <Text style={{ ...FONTS.body4 }}>{ userInfo.email }</Text>
          </View>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 50,
              marginTop: SIZES.padding2,
              marginBottom: 2,
              alignItems: 'center',
              paddingLeft: SIZES.padding,
              borderRadius: SIZES.padding1,
              backgroundColor: COLORS.white
            }}
            onPress={() => navigation.navigate("ProfileEdit", {userInfo: userInfo})}
          >
            <Image
              source={icons.profile}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.primary,
              }}
            />
            <Text style={{marginLeft: SIZES.padding3, ...FONTS.body3}}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 50,
              marginBottom: SIZES.base,
              alignItems: 'center',
              paddingLeft: SIZES.padding,
              borderRadius: SIZES.padding1,
              backgroundColor: COLORS.white
            }}
            onPress={onLogout}
          >
            <Image
              source={icons.logout}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.primary,
              }}
            />
            <Text style={{marginLeft: SIZES.padding3, ...FONTS.body3}}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeArea>
  );
}

export default ProfileScreen;