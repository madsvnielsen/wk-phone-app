import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";



export default function ReviewInputLabel(props) {
    return(
        <LinearGradient style={styles.bannerContainer} colors={['#313131', 'black']}>
            <Text style={styles.bannerText}

            >{props.type === "kanji" ? "Kanji" : props.type === "radical" ? "Radical" : "Vocabulary"} {props.meaning ? "meaning" : "reading"}</Text>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    bannerContainer:{
        width: "100%",
        height: 50,
    },
    bannerText:{
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
        height: "100%",
        fontWeight: "200",
        fontSize: 20

    }
})
