import AsyncStorage from '@react-native-async-storage/async-storage';
import { configConstants } from '../constant';
import bestDealOffer1 from '../assets/images/deals-category-offers-banners/1-Salon.png';

/**
 * utilityHelper
 *
 * @subpackage             utilityHelper
 * @category               Helper
 * @DateOfCreation         08 Jan 2019
 * @ShortDescription       This is responsible for exporting all utility functions
 */

export const utilityHelper = {
    setItem,
    doLogout,
    langExists,
    capitalize,
    EducationComma,
    ProfilePic,
    ProfilePicDoc,
    BestDealPic,
    DateFormat,
    TimeFormat,
    AddTOKartCount,
    removeTOKartCount,
    kartCount
};


/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible set the login access token and user info to cookies 
* @return                String
*/
async function setItem(key, value) {
    AsyncStorage.setItem(key, value);
    return true;
}


/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible remove all cookies
* @return                Boolean
*/

async function doLogout(){
    AsyncStorage.removeItem(configConstants.LOGIN_TOKEN);
    AsyncStorage.removeItem(configConstants.USER_ID);
    AsyncStorage.removeItem(configConstants.USER_FULL_INFO);
    AsyncStorage.removeItem(configConstants.AUTHENTICATE);
    return true;
}

/**
* @DateOfCreation        17 July 2020
* @ShortDescription      This function is responsible remove all cookies
* @return                Boolean
*/

function langExists(lg){
    var arr = [
        { lg: 'hi', name: 'हिंदी'}, 
        { lg: 'mr', name: 'मराठी' },
        { lg: 'te', name: 'తెలుగు' },
        { lg: 'en', name: 'English' }, 
        { lg: 'bn', name: 'বাংলা' },
        { lg: 'pa', name: 'ਪੰਜਾਬੀ' }
      ];
      
    let obj = arr.find(o => o.lg === lg);
    return obj.name
}

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function ProfilePic(url){
    return url ? configConstants.API_BASE_PATH_Slash+url : 'https://avark.in/wp-content/uploads/2022/08/user-1.png'
}

function ProfilePicDoc(url){
    return url ? configConstants.API_BASE_PATH_Slash+url : 'https://avark.in/wp-content/uploads/2022/08/add-user.png'
}

function BestDealPic(url){
    return url ? configConstants.API_BASE_PATH_Slash+url : 'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png'
}

function DateFormat(date){
    let current_datetime = new Date(date)
    let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
    return formatted_date
}

function TimeFormat(time) {
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour > 12 ? 'PM' : 'AM';
    
    min = (min+'').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour+'').length == 1 ? `0${hour}` : hour;

    return (`${hour}:${min} ${part}`)  
}

function EducationComma(edu){
    if(edu){
        var arr = JSON.parse(edu);
        if(arr.length > 0){
            var String_arr = arr.map((item) => { return item['degree'] }).join(', ')
            return String_arr;
        }else{
            return ''
        }
    }else{
        return ''
    }

}


/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible set the login access token and user info to cookies 
* @return                String
*/
async function AddTOKartCount(countId) {
    let kartArg = await AsyncStorage.getItem('KartCount');
    if(kartArg){
      // // console.log(kartArg,"==kartArg==",kartArg.includes(countId))
      if(!kartArg.includes(countId)){
          let newKartCount = JSON.parse(kartArg)
          newKartCount.push(countId)
          // // console.log("new",newKartCount)
        try {
          await AsyncStorage.setItem('KartCount', JSON.stringify(newKartCount));
        } catch(e) {
          // console.log(e);
        }  
      }
    }else{
      // // console.log("countId",JSON.parse(countId))
      try {
        await AsyncStorage.setItem('KartCount', JSON.stringify([countId]));
      } catch(e) {
        // console.log(e);
      }
    }
    return true;
}


/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible set the login access token and user info to cookies 
* @return                String
*/
async function removeTOKartCount(key) {
    return true;
}

/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible set the login access token and user info to cookies 
* @return                String
*/
async function kartCount() {
    try {
        const kartArg = await AsyncStorage.getItem('KartCount');
        if(kartArg){
            let newKartCount = JSON.parse(kartArg).length
            // // console.log("new--",newKartCount)
            return newKartCount;
        }
    }catch(e){
        // console.log(e)
    }    
    return false;
}
