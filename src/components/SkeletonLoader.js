import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import LinearGradient from 'react-native-linear-gradient';
var {width, height} = Dimensions.get('screen')
width = width

const SkeletonLoader = (props) => (
	<View>
	{Array.from(Array(5), (e, i) => {
		return (
		      <SkeletonPlaceholder key={i+1} backgroundColor={'#273f61'} highlightColor={'#00B2B6'}>
		        <LinearGradient colors={['#dcf7fa', '#00B2B6', '#dcf7fa']} style={styles.cardListView}>
			        <Card>
			          <Card.Content>
			              <View style={{flexDirection:'row',  alignItems:'center', justifyContent : 'flex-start'}}>
			                <View style={{flexDirection:'column',margin: 20,  alignItems: 'center', justifyContent : 'center',marginRight:10}}>
			                  <View>
			                    <View style={{ marginLeft: 20, width: 60, height: 60, borderRadius: 50 }} />
			                  </View>
			                </View>
			                <View style={{ marginLeft: 20 }}>
			                  <View style={{ width: 150, height: 20, borderRadius: 4 }} />
			                  <View
			                    style={{ marginTop: 6, width: 120, height: 20, borderRadius: 4 }}
			                  />
			                  <View
			                    style={{ marginTop: 6, width: 120, height: 20, borderRadius: 4 }}
			                  />
			                </View>
			              </View>
			          </Card.Content>  
			        </Card>  
		        </LinearGradient>  
		      </SkeletonPlaceholder>
		    )
		})
	}
	</View> 
)
const styles = StyleSheet.create({
	cardListView: {
    borderWidth: 0,
    height:100,
        
    borderColor:'#dcf7fa',
    shadowColor: '#00B2B6',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    borderRadius:5,
    marginLeft:5,
    marginRight:5,
    marginBottom:5,
    marginTop:5,
    width:width-20
  },
})

export default SkeletonLoader;