import { Image, View, AsyncStorage, Text } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
// import Onboarding from 'react-native-onboarding-swiper';
// Patient onboarding
import managecalendar from '../assets/doctor/manage-calendar.png';
import referral from '../assets/doctor/referral.png';
import upcomingappointments from '../assets/doctor/upcoming-appointments.png';
import reward from '../assets/doctor/reward.png';

const DOnBoardScreen  = ({props, navigation}) => {

  const Square = ({ isLight, selected }) => {
    let backgroundColor;
    if (isLight) {
      backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
    } else {
      backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
    }
    return (
      <View
        style={{
          width: 6,
          height: 6,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };

  const backgroundColor = isLight => (isLight ? 'blue' : 'lightblue');
  const color = isLight => backgroundColor(!isLight);

  const Done = ({ isLight, ...props }) => (
    <Button
      title={'Done'}
      buttonStyle={{
        backgroundColor: backgroundColor(isLight),
      }}
      containerViewStyle={{
        marginVertical: 10,
        width: 70,
        backgroundColor: backgroundColor(isLight),
      }}
      textStyle={{ color: color(isLight) }}
      {...props}
    />
  );

  const Skip = ({ isLight, skipLabel, ...props }) => (
    <Button
      title={'Skip'}
      buttonStyle={{
        backgroundColor: backgroundColor(isLight),
      }}
      containerViewStyle={{
        marginVertical: 10,
        width: 70,
      }}
      textStyle={{ color: color(isLight) }}
      {...props}
    >
      {skipLabel}
    </Button>
  );

  const Next = ({ isLight, ...props }) => (
    <Button
      title={'Next'}
      buttonStyle={{
        backgroundColor: backgroundColor(isLight),
      }}
      containerViewStyle={{
        marginVertical: 10,
        width: 70,
        backgroundColor: backgroundColor(isLight),
      }}
      textStyle={{ color: color(isLight) }}
      {...props}
    />
  );

  const complete = async () => {
      await AsyncStorage.setItem('onBoard', "true");
      navigation.navigate('Home')
  }


  return (
    <View>
    {/*<Onboarding
      DotComponent={Square}
      NextButtonComponent={Next}
      SkipButtonComponent={Skip}
      DoneButtonComponent={Done}
      onSkip={() => navigation.navigate('Home')}
      onDone={complete}
      
      titleStyles={{ color: 'blue' }} // set default color for the title
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={upcomingappointments} />,
          title: 'Onboarding',
          subtitle: 'Upcoming Appointments',
          titleStyles: { color: 'red' }, // overwrite default color
        },
        {
          backgroundColor: '#fff',
          image: <Image source={managecalendar} />,
          title: 'Onboarding',
          subtitle: 'Manage Calendar',
          titleStyles: { color: 'red' }, // overwrite default color
        },
        {
          backgroundColor: '#fff',
          image: <Image source={referral} />,
          title: 'Onboarding',
          subtitle: 'Referral',
          titleStyles: { color: 'red' }, // overwrite default color
        },
        {
          backgroundColor: '#fff',
          image: <Image source={reward} />,
          title: 'Onboarding',
          subtitle: 'Reward',
          titleStyles: { color: 'red' }, // overwrite default color
        }
      ]}
    />*/}
      <Text>onBoard</Text>
    </View>
  );
}

export default DOnBoardScreen;