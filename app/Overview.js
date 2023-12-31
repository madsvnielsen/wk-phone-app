import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Component, useCallback, useEffect, useState} from "react";
import {
    getAllAssignments,
    getCurrentLevelAssignments,
    getSubjectsInformation,
    getSummary,
    getUserInformation
} from "../API/wkAPI.js";
import { LinearGradient } from 'expo-linear-gradient';
import StatisticCard from "../components/StatisticCard";
import CurrentLevelSubjects from "../components/CurrentLevelSubjects";
import LevelUpIndicator from "../components/LevelUpIndicator";
import CategoryStatus from "../components/CategoryStatus";
import ReviewForecast from "../components/ReviewForecast";
import {useFocusEffect} from "@react-navigation/native";



export default function OverviewScreen({navigation}) {

    const [lessonCount, setLessonCount] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [username, setUsername] = useState("");
    const [level, setLevel] = useState(0);
    const [currentLevelSubjects, setCurrentLevelSubjects] = useState([]);
    const [allAssignments, setAllAssignments] = useState([]);
    const [, contextUpdate] = useState();


    useEffect(() => {
        let ignore = false;
         function getUserSummary(){
            getSummary().then(
                (data) =>{
                    if(!ignore){
                        setLessonCount(data.lessonCount);
                        setReviewCount(data.reviewCount);
                        setReviews(data.reviews)
                    }

                }
            );
        }
       async function updateUserData(){
           const userData = await  getUserInformation();
           if(!ignore) {
               setUsername(userData.username);
               setLevel(userData.level);
           }

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
           if(!ignore) {
               setCurrentLevelSubjects(tempLevelSubjects);
           }
       }

       async function getCategoryData(){
             getAllAssignments().then(data => {
                 if(!ignore) {
                     setAllAssignments(data.assignments)
                 }
             })
       }

       getUserSummary();
       updateUserData();
       getCategoryData()

        return () =>{
           ignore = true;
        }



    }, []);
    return (
            <LinearGradient colors={[ '#172959', '#242424']} style={styles.container}>
                <ScrollView >
                    <View style={styles.scrollView} >
                    <Text style={styles.usernameText}>{username}</Text>
                    <View style={styles.statisticsContainer}>
                        <StatisticCard colorOne={"#DF37A7"} colorTwo={"#B42E87"} number={lessonCount} label={"Lessons"} onPress={() => {navigation.navigate("Lessons")}}/>
                        <StatisticCard colorOne={"#00AAFF"} colorTwo={"#0676AD"} number={reviewCount} label={"Reviews"} onPress={() => {navigation.navigate("Reviews")}}/>
                    </View>
                    <View>
                        <ReviewForecast reviews={reviews}/>
                    </View>

                    <Text style={styles.levelText}>Level {level}</Text>
                    <View >
                        <CurrentLevelSubjects currentSubjects={currentLevelSubjects}/>
                        <LevelUpIndicator currentSubjects={currentLevelSubjects}/>
                    </View>
                    <View >
                        <CategoryStatus assignments={allAssignments}/>
                    </View>
                       </View>
                </ScrollView>
            </LinearGradient>


    );
}

const styles = StyleSheet.create({
    statisticsContainer:{
      flex:1,
      justifyContent: "space-evenly",
      flexDirection:"row",
    },
    container: {
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
        marginTop: 20,
        width: "100%",
    },
    scrollView:{
        marginHorizontal : 20
    }
});


