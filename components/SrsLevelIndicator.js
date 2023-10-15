import {useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

export default function SrsLevelIndicator(props) {
    return (
        <View style={styles.indicatorContainer}>
            <View style={[styles.indicatorCell, styles.startCell, props.srsLevel > 0 ? styles.activeCell : styles.disabledCell]}></View>
            <View style={[styles.indicatorCell, props.srsLevel > 1 ? styles.activeCell : styles.disabledCell]}></View>
            <View style={[styles.indicatorCell, props.srsLevel > 2 ? styles.activeCell : styles.disabledCell]}></View>
            <View style={[styles.indicatorCell, props.srsLevel > 3 ? styles.activeCell : styles.disabledCell]}></View>
            <View style={[styles.indicatorCell, styles.endCell, props.srsLevel > 4 ? styles.activeCell : styles.disabledCell]}></View>
        </View>
    );
}

const getGradientFromType = (type) =>{

    if(type=== "radical"){
        return["#00AAFF","#0676AD"]
    }
    return["#DF37A7", "#B42E87"]

}

const styles = StyleSheet.create({
    indicatorContainer:{
        width:"100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop:4
    },
    indicatorCell:{
        height: 3,
        width:5,

    },
    startCell:{
        borderBottomLeftRadius: 1,
        borderTopLeftRadius: 1,
    },
    endCell:{
        borderBottomRightRadius: 1,
        borderTopRightRadius: 1,
    },
    activeCell:{
        backgroundColor:"#60f542"
    },
    disabledCell:{
        backgroundColor:"#818181"
    }

});