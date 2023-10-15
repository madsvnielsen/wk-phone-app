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



export default function OverviewScreen({navigation}) {

    const [lessonCount, setLessonCount] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [username, setUsername] = useState("");
    const [level, setLevel] = useState(0);
    const [currentLevelSubjects, setCurrentLevelSubjects] = useState([]);
    const [, contextUpdate] = useState();


    useEffect(() => {
         function getUserSummary(){
            getSummary().then(
                (data) =>{
                    setLessonCount(data.lessonCount);
                    setReviewCount(data.reviewCount);
                }
            );
        }
       async function updateUserData(){
           const userData = await  getUserInformation();
           setUsername(userData.username);
           setLevel(userData.level);

           const levelAssignments = await getCurrentLevelAssignments(userData.level);
           let tempLevelSubjects = []
           const subjectsInformation = await getSubjectsInformation(userData.level);
           subjectsInformation.map((subject) => {
               const subjectAssignment = levelAssignments.assignments.find((asData) => asData.data.subject_id === subject.id);
               tempLevelSubjects.push(
                   {
                       characters: subject.characters,
                       type: subject.type,
                       srsLevel: subjectAssignment == null ? null :  subjectAssignment.data.srs_stage,
                       id : subject.id,
                       passedAt: subjectAssignment == null ? null : subjectAssignment.data.passed_at
                   })
           })
           tempLevelSubjects.sort((a,b) => a.type > b.type  ? -1: 1);
           tempLevelSubjects = [... tempLevelSubjects.filter(a => a.srsLevel !== null),
               ... tempLevelSubjects.filter(a=>a.srsLevel === null)]
           setCurrentLevelSubjects(tempLevelSubjects);
       }

        getUserSummary();
         updateUserData();



    }, []);
    return (
            <LinearGradient colors={['#242424', '#283045']} style={styles.container}>
                <Text style={styles.usernameText}>{username}</Text>
                <View style={styles.statisticsContainer}>
                    <StatisticCard colorOne={"#DF37A7"} colorTwo={"#B42E87"} number={lessonCount} label={"Lessons"} onPress={() => {navigation.navigate("Lessons")}}/>
                    <StatisticCard colorOne={"#00AAFF"} colorTwo={"#0676AD"} number={reviewCount} label={"Reviews"} onPress={() => {navigation.navigate("Reviews")}}/>
                </View>
                <Text style={styles.levelText}>Level {level}</Text>
                <View style={{flex:3}}>
                    <CurrentLevelSubjects currentSubjects={currentLevelSubjects}/>
                    <LevelUpIndicator currentSubjects={currentLevelSubjects}/>
                </View>

            </LinearGradient>


    );
}

const styles = StyleSheet.create({
    statisticsContainer:{
      flex:1,
      justifyContent: "space-evenly",
      flexDirection:"row",
    marginBottom: 20,
    },
    container: {
        paddingTop: 50,
        paddingBottom: 50,
        paddingHorizontal: 20,
        flex:1,
        flexDirection:"column",

    },
    usernameText:{
        color: "white",
        fontSize: 30,
        margin: 5,
        width: "100%",
        fontWeight: "100",

    },
    levelText:{
        color: "white",
        fontSize: 20,
        marginHorizontal: 5,
        marginTop: 40,
        width: "100%",
    }
});


