import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";



export default function SubjectBanner(props) {
    return(
        <LinearGradient style={styles.bannerContainer} colors={getGradientFromType(props.type)}>
            <Text style={styles.bannerText}
                  adjustsFontSizeToFit={true}
            >{props.characters}</Text>
        </LinearGradient>
    )
}

const getGradientFromType = (type) =>{

    if(type=== "radical"){
        return["#00AAFF","#0676AD"]
    }
    if(type=== "kanji"){
        return["#DF37A7", "#90226c"]
    }
    return["#5a06ea", "#4316b7"]

}


const styles = StyleSheet.create({
    bannerContainer:{
        width: "100%",
        height: 150,
    },
    bannerText:{
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 70,

    }
})
