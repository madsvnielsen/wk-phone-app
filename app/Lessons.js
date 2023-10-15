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


export default function LessonScreen() {
    return (
            <LinearGradient colors={['#242424', '#283045']} style={styles.container}>
                <Text style={styles.usernameText}>Lessons</Text>
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
        paddingTop: 50,
        paddingBottom: 50,
        paddingHorizontal: 20,
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


