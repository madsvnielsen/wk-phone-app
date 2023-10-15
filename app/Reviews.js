import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Component, useCallback, useEffect, useState} from "react";
import {
    getCurrentLevelAssignments,
    getSubjectsInformation,
    getSummary,
    getUserInformation
} from "../API/wkAPI.js";
import { LinearGradient } from 'expo-linear-gradient';
import StatisticCard from "../components/StatisticCard";
import CurrentLevelSubjects from "../components/CurrentLevelSubjects";
import LevelUpIndicator from "../components/LevelUpIndicator";
import SubjectBanner from "../components/SubjectBanner";
import ReviewInputLabel from "../components/ReviewInputLabel";
import ReviewInput from "../components/ReviewInput";


export default function ReviewScreen() {
    return (
            <LinearGradient colors={[ '#172959', '#242424']} style={styles.container}>
            <SubjectBanner characters={"恋愛"} type={"vocab"}/>
            <ReviewInputLabel type={"vocabulary"} meaning={false}/>
            <ReviewInput meaning={false}/>
            </LinearGradient>

    );
}

const styles = StyleSheet.create({
    flexBox:{
        flex : 1,
        justifyContent: "flex-end",
        flexDirection:"column"
    },
    statisticsContainer:{
      flex:1,
      justifyContent: "space-evenly",
      flexDirection:"row"
    },
    container: {
        height: "100%",


    },
    usernameText:{
        color: "white",
        fontSize: 30,
        margin: 5,
        width: "100%",
        fontWeight: "100"

    },
    levelText:{
        color: "white",
        fontSize: 20,
        margin: 5,
        width: "100%",

    }
});


