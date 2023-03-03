import React, {useEffect, useState} from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';


const Firebase = ({navigation}) => {
    // const {translations, initializeAppLanguage} = useContext(LocalizationContext);

    //console.disableYellowBox = true;
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        // When a user tap on a push notification and the app is in background
        messaging().onNotificationOpenedApp(async (remoteMessage) => {
        // alert("Background Push Notification opened")
            Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body, [
              {text: 'Close'}
            ]);
        });

        // When a user tap on a push notification and the app is CLOSED
        messaging().getInitialNotification().then((remoteMessage) => {
          if (remoteMessage) {
            Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body, [
                {text: 'Close'}
            ]);
          }
        });

        // When a user receives a push notification and the app is in foreground
        messaging().onMessage((data) => {
          // // console.log("noti",data.notification)
          Alert.alert(data.notification.title, data.notification.body, [
              {text: 'Close'}
          ]);
           // alert("Foreground Push Notification opened")
        });

        return () => {
            setIsLoading(false);
          }
    }, []);
};

export default Firebase;
