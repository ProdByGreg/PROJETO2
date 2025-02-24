import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    boxTop:{
        height:Dimensions.get('window').height/3,
        width:'100%',
        //backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'
    },
    boxMid:{
        height:Dimensions.get('window').height/4,
        width:'100%',
        //backgroundColor:'green',
        paddingHorizontal:37
    },
    boxBottom:{
        height:Dimensions.get('window').height/3,
        width:'100%',
        //backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',

    },
    logo:{
        width:80,
        height:80,
        borderRadius:40
    },
    text:{
        fontWeight:'bold',
        marginTop:40,
        fontSize:18,
    },
    titleInput:{
        marginLeft:5,
        color:themas.Colors.gray,
        marginTop:20,
    },
    boxInput:{
        width:'100%',
        height:40,
        borderWidth:1,
        marginTop:10,
        flexDirection:'row',
        borderRadius:20,
        alignItems:'center',
        paddingHorizontal:5,
        backgroundColor:themas.Colors.lightGray,
        borderColor:themas.Colors.lightGray,

    },
    input:{
        height:'100%',
        width:'90%',
        borderRadius:20,
        paddingLeft:10
    },
    button:{
        width:200,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:themas.Colors.primary,
        borderRadius:40,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity:  0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    textButton:{
        fontSize:16,
        color:'#FFFF',
        fontWeight:'bold',
    },
    textBottom:{
        fontSize:16,
        color:themas.Colors.gray,

    }

})

