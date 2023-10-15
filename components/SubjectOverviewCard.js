import {useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import SrsLevelIndicator from "./SrsLevelIndicator";

export default function SubjectOverviewCard(props) {
    return (
        <LinearGradient style={styles.subjectCard} colors={getGradientFromType(props.type, props.srsLevel)}>
            <Text style={styles.subjectText}>{props.characters}</Text>
            <SrsLevelIndicator srsLevel={props.srsLevel}/>
        </LinearGradient>

    );
}

const getGradientFromType = (type, srsLevel) =>{
    if(srsLevel=== null){
        return["#b6b6b6","#606060"]
    }
    if(type=== "radical"){
        return["#00AAFF","#0676AD"]
    }
    return["#DF37A7", "#B42E87"]

}

const styles = StyleSheet.create({
    subjectCard:{
        height: 35,
        width: 35,
        margin: 2,
        borderRadius: 2,
        padding:2,
    },
    subjectText:{
        color:"white",
        textAlign: "center",
        fontSize: 15
    }

});