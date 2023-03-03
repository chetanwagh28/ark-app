/**
 * @format
 */
import React, {useEffect} from 'react';
import { AppRegistry, DeviceEventEmitter, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/App/store'; //Import the store
import App from './src/App/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
// import IncomingCall from 'react-native-incoming-call';

// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import {ToastProvider} from './src/App/ToastContext';
// import Toast from './src/App/Toast';

const AppRun = () => {
    const navigationRef = React.useRef(null);
    useEffect(async() => {

        const unsubscribe = messaging().setBackgroundMessageHandler(async remoteMessage => {
            // console.log(navigationRef, 'Message handled in the background!', remoteMessage);  

            if(remoteMessage.data){
                if(remoteMessage.data.custom_data && JSON.parse(remoteMessage.data.custom_data)?.room_id){
                  // JSON.parse
                    // console.log("custom_data----->>>>>>",JSON.parse(data.data.custom_data))
                    var row = JSON.parse(remoteMessage.data.custom_data)
                    // IncomingCall.display(
                    //   row.room_id, // Call UUID v4
                    //   "Dr. "+row.name, // Username
                    //   row.profile_url, // Avatar URL
                    //   'Incomming Call', // Info text
                    //   20000 // Timeout for end call after 20s
                    // );

                }
                if(remoteMessage.data.custom_data && JSON.parse(remoteMessage.data.custom_data)?.type){
                  // JSON.parse
                    // console.log("handled in the background----->>>>>>",JSON.parse(data.data.custom_data))
                    var row = JSON.parse(remoteMessage.data.custom_data)

                    navigationRef.current?.navigate(row.type, {type: 'notification', id: row.id}) 
                }
            }
        });

    }, []);
    // Wrap your app with the new GestureHandler
        // <GestureHandlerRootView style={{ flex: 1 }}>
        //     <Provider store={store}>
        //         <ToastProvider>
        //             // <Toast />
        //             <App/>
        //         </ToastProvider>
        //     </Provider>
        // </GestureHandlerRootView>
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => AppRun);