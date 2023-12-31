import {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

export default function StatisticCard(props
) {
    return (
        <TouchableOpacity  onPress={() => {props.onPress()}}>
        <LinearGradient colors={[props.colorOne, props.colorTwo]} style={styles.statisticsCard}>
                <Text style={styles.numberHeader}>{props.number}</Text>
                <Text style={styles.numberLabel}>{props.label}</Text>
        </LinearGradient>
        </TouchableOpacity >


    );
}

const styles = StyleSheet.create({
    statisticsCard: {
        width: 150,
        height: 130,
        borderRadius:5,
        padding: 10,
        margin:15,
    },
    numberHeader:{
        color:"white",
        fontSize: 50,
        textAlign: "center",
        width: "100%",

        fontWeight: "700"
    },
    numberLabel:{
        color:"white",
        fontSize: 25,
        width: "100%",
        textAlign: "center",
        marginTop: "auto",
        fontWeight: "300"
    }
});