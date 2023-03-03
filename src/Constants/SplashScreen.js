import React, { Component } from 'react';  
import { Platform, StyleSheet, View, Text, GradientText,MaskedView,
 Image, } from 'react-native';  
 export default class Splash extends Component<{}>  
{  
   constructor(){  
     super();  
     this.state={  
     isVisible : true,  
    }  
  }  
   Hide_Splash_Screen=()=>{  
    this.setState({   
      isVisible : false   
    });  
  }  
   
  componentDidMount(){  
    var that = this;  
    setTimeout(function(){  
      that.Hide_Splash_Screen();  
    }, 4000);  
   }  
   
    render()  
    {  
        let Splash_Screen = (
            <View style = { styles.MainContainer }>         
             <View style={styles.SplashScreen_RootView}>  

               <View style={styles.SplashScreen_ChildView}>  
            
                    <Image source={{{uri: "https://panel.avark.in/apk-image/assets/newimage/leave.png"}}}
                style={{
                  marginLeft:40,
                  marginTop:100,
                  }}  /> 
      
                  <Text style={styles.welcome}>From AVARK Pvt. Ltd.</Text>  
                  {/* <MaskedView
                    style={{ height: 24 }}
                    maskElement={<Text style={s.text}>{children}</Text>}
                    >
                      <LinearGradient
                        colors={['cadetblue', '#fabada']}
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0, y: 0.33 }}
                        style={{ flex: 1 }}
                      />
                </MaskedView> */}
                </View>
              
  
             </View> 
             </View>  )  
         return(  
              
                   <>
                       
                 {  
                  (this.state.isVisible === true) ? Splash_Screen : this.props.navigation.navigate("Home")  
                 }  
                 
                 </>
              );          
    }  
}  
 const styles = StyleSheet.create(  
{  
    MainContainer:  
    {  
        flex: 1,  
        justifyContent: 'center',  
         alignItems: 'center',
        Backgroundcolor:'blue',  
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  
    },  
     SplashScreen_RootView: {  
        flex:1,  
        margin: 10,  
        position: 'absolute',  
        width: '100%',  
        height: '100%', 
        Backgroundcolor:'black',  
      },  
     SplashScreen_ChildView:  
    {  
        justifyContent: 'center',  
        alignItems: 'center',  
        backgroundColor: 'black',  
        flex:1,  
    }, 
      welcome: {  
      fontSize: 20,  
      marginTop:400,
      fontWeight:'bold',
      color:'white',
      fontStyle: "italic",
    },    
});  