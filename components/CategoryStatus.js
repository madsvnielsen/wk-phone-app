import {useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import SubjectOverviewCard from "./SubjectOverviewCard";

export default function CategoryStatus(props) {

    if(props.currentSubjects === null){
        return (<Text>Loading...</Text>)
    }

    let apprenticeCount = props.assignments.filter(ass => ass.data.srs_stage > 0 && ass.data.srs_stage <= 4).length
    let guruCount = props.assignments.filter(ass => ass.data.srs_stage === 5 || ass.data.srs_stage === 6 ).length
    let masterCount = props.assignments.filter(ass => ass.data.srs_stage === 7).length
    let enlightenedCount = props.assignments.filter(ass => ass.data.srs_stage === 8).length
    let burnedCount = props.assignments.filter(ass => ass.data.srs_stage === 9).length


    return (
        <View style={styles.categoryContainer}>
            <LinearGradient colors={["#DF37A7", "#B42E87"]} style={styles.categoryBox}>
                <Text style={styles.numberText}>{apprenticeCount}</Text>
                <Text style={styles.numberLabel}>Apprentice</Text>
            </LinearGradient>
            <LinearGradient colors={["#5a06ea", "#4316b7"]} style={styles.categoryBox}>
                <Text style={styles.numberText}>{guruCount}</Text>
                <Text style={styles.numberLabel}>Guru</Text>
            </LinearGradient>
            <LinearGradient colors={["#6ac4ef","#3bb5f1"]} style={styles.categoryBox}>
                <Text style={styles.numberText}>{masterCount}</Text>
                <Text style={styles.numberLabel}>Master</Text>
            </LinearGradient>
            <LinearGradient colors={["#00AAFF","#0676AD"]} style={styles.categoryBox}>
                <Text style={styles.numberText}>{enlightenedCount}</Text>
                <Text style={styles.numberLabel}>Enlightened</Text>
            </LinearGradient>
            <LinearGradient colors={["#363636","#2c2c2c"]} style={styles.categoryBox}>
                <Text style={styles.numberText}>{burnedCount}</Text>
                <Text style={styles.numberLabel}>Burned</Text>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: "row",
        flew: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap",
        width:"100%",
        marginHorizontal:"auto"


    },
    categoryBox: {
        backgroundColor : "red",
        height: 75,
        width:100,
        marginVertical: 5,
        marginRight: 10
    },
    numberText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        height: 50,
        textAlignVertical: "center",
        fontWeight: "bold"

    },
    numberLabel: {
        color: "#dadada",
        textAlign: "center",
        fontSize: 15,


    }

});