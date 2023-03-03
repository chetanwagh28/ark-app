import { StyleSheet, Dimensions } from 'react-native';

const PRIMARY_COLOR = "#00B2B6";
const THIRD_COLOR = "#dcf7fa";
const SECONDARY_COLOR = "#00CBCC";
const WHITE = "#FFFFFF";
const BLACK = "#000000";
const GRAY = "#757E90";
const DARK_GRAY = "#363636";
const ERROR_COLOR = "#FF0000";
const HEADER_COLOR = "#00B2B6";
const SUB_HEADER_COLOR = "#273f61";
const SUB_SEARCH = "#2E7475";




export default StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: WHITE
    },
    containerCard1:{
        // backgroundColor: PRIMARY_COLOR,
        // borderRadius: 20
    },
    appHeader:{
        backgroundColor:HEADER_COLOR,
        borderBottomColor: PRIMARY_COLOR,
        borderBottomWidth: 1
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        padding: 5
    },
    logo:{
        width:60,
        height:60,
    },
    appLogo:{
        width:80,
        height:80,
    },
    signIcons:{
        width:50,
        height:50,  
    },
    footer: {
        flex: 1,
        // backgroundColor: PRIMARY_COLOR,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    footerupdate: {
        flex: 1,
        backgroundColor: THIRD_COLOR,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    pageTitle:{
        fontWeight:'bold',
        fontSize:22,
        color: WHITE,
        fontFamily: "OpenSans_Condensed-ExtraBoldItalic"
    },
    
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: ERROR_COLOR,
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 0,
        paddingLeft: 10,
        marginVertical:5,
        color: DARK_GRAY
    },
    textInputB: {
        flex: 1,
        borderWidth: 0.5,
        marginTop: Platform.OS === 'ios' ? 0 : 0,
        paddingLeft: 10,
        marginVertical:5,
        color: DARK_GRAY,
        borderRadius: 15,
    },

    errorMsg: {
        color: ERROR_COLOR,
        fontSize: 16,
    },
    commonAppButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        paddingVertical: 7,
        paddingHorizontal: 21,
        marginHorizontal:2,
        marginVertical:2,
        backgroundColor: "#fa9225"
    },
    commonAppButtonRight: {
        borderRadius: 15,
        flexDirection: 'row',
        paddingVertical: 7,
        paddingHorizontal: 21,
        marginHorizontal:2,
        marginVertical:2,
    },
    commonAppButtonText: {
        color: WHITE,
        fontSize: 12,
    },
    signUp: {
        // marginTop: 15,
        // width:'100%',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:"center"
    },
    textSign1: {
        fontSize: 16,
        fontWeight: 'bold'

    },

    buttonD: {
        margin: 5,
        borderWidth: 1, 
        borderRadius: 15, 
        borderColor: '#fff'
    },


    textbox: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#ffffff',
        backgroundColor: '#ffffff',
        paddingBottom: 0,
        marginHorizontal:10
    },
    dropdown: {
        borderWidth: 1, 
        backgroundColor: '#ffffff', 
        borderColor: '#f2f2f2', 
        borderRadius: 15, 
        justifyContent:'space-between', 
        marginTop:10, 
        marginHorizontal:10
    },
    dropdownStar: {
        flexDirection: 'row',
        borderWidth: 1, 
        backgroundColor: '#ffffff', 
        borderColor: '#f2f2f2', 
        borderRadius: 15, 
        justifyContent:'space-between', 
        marginTop:5, 
        marginHorizontal:10
    },
    dropdownStar1: {
        flexDirection: 'row',
        // borderWidth: 1, 
        backgroundColor: THIRD_COLOR, 
        // borderColor: '#f2f2f2', 
        // borderRadius: 15, 
        justifyContent:'space-between', 
        marginTop:5, 
        marginHorizontal:10
    },
    action1: {
        flexDirection: 'row',
        marginTop: 15,
        borderWidth: 0,
        borderRadius: 0,
        borderColor: '#f2f2f2',
        paddingBottom: 0,
    },
    list: {
        borderWidth: 0,
        borderRadius: 20,
        backgroundColor: PRIMARY_COLOR,
        color: WHITE
    },
    searchHead:{
        backgroundColor: SUB_SEARCH,
        justifyContent: 'space-around',
        borderRadiusBottom: 30
    },
    PageTitle: {
        color: WHITE
    }
});