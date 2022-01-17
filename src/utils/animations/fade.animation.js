import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const FadeInView = ({ duration = 150, ...props }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      durantion: duration,
      useNativeDriver: true
    }).start();
  }, [fadeAnim, duration])
  
  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim
      }}
    >
      { props.children }
    </Animated.View>
  );
}