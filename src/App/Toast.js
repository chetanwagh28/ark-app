import React, {useContext, useEffect, useRef} from 'react';
import {ToastContext} from './ToastContext';
import {
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export const Toast = () => {
  const {toast, hide} = useContext(ToastContext);
  const translateYRef = useRef(new Animated.Value(-100));

  useEffect(() => {
    if (toast.visible) {
      Animated.timing(translateYRef.current, {
        duration: 300,
        easing: Easing.ease,
        toValue: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateYRef.current, {
        duration: 450,
        easing: Easing.ease,
        toValue: -100,
        useNativeDriver: true,
      }).start();
    }
  }, [toast]);

  return (
    <Animated.View
      style={[
        styles.toast,
        {transform: [{translateY: translateYRef.current}]},
      ]}>
      <TouchableOpacity onPress={hide} style={styles.content}>
        <Text style={styles.toastMessageH}> {toast.message && toast.message.title}</Text>
        <Text style={styles.toastMessage}> {toast.message && toast.message.body}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    borderRadius: 4,
    marginHorizontal: 16,
    padding: 4,
    position: 'absolute',
    top: 0,
    zIndex: 2,
    right: 0,
    left: 0,
    backgroundColor: '#00B2B6',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 32,
    width: '100%',
  },
  toastMessageH: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.26,
    marginHorizontal: 10,
  },
  toastMessage: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.26,
    marginHorizontal: 10,
  },
});
