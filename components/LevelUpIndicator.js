import {useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import SubjectOverviewCard from "./SubjectOverviewCard";

export default function LevelUpIndicator(props) {
    const requiredKanji = props.currentSubjects.filter((subject) => subject.type === "kanji")
    const kanjiPassed = requiredKanji.filter((subject) => subject.passedAt !== null).length;
    const kanjiRequired = Math.round((requiredKanji.length*0.9))
    let percentage = Math.round((kanjiPassed/kanjiRequired)*100);
   if(percentage > 100){
       percentage = 100;
   }
    return (
        <LinearGradient colors={["#9d9d9d","#c5c5c5"]} style={styles.indicatorContainer}>
            <LinearGradient colors={["#f100a1","#86005a"]} style={[styles.indicatorBar, {width: percentage.toString() + "%"}]}>
            </LinearGradient>
            <Text style={styles.indicatorText}>  {kanjiPassed} of {kanjiRequired} passed</Text>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    indicatorContainer: {
        width:"100%",
        marginHorizontal:"auto",
        marginVertical: 15,
        borderRadius: 20,

    },
    indicatorBar: {
        borderRadius: 20,
        height: 30,
    },
    indicatorText:{
        position: "absolute",
        textAlign:"center",
        textAlignVertical: "center",
        height:"100%",
        width:"100%",
        color:"#ffffff"


    }

});