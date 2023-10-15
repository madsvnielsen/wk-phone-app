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

class OverviewBadge extends Component {
    render() {
        return <View style={styles.statisticsContainer}>
            <StatisticCard colorOne={"#DF37A7"} colorTwo={"#B42E87"} number={this.props.number} label={"Lessons"} />
            <StatisticCard colorOne={"#00AAFF"} colorTwo={"#0676AD"} number={this.props.number1} label={"Reviews"}/>
        </View>;
    }
}

export default function ReviewScreen() {

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
                <OverviewBadge number={lessonCount} number1={reviewCount}/>
                <Text style={styles.levelText}>Level {level}</Text>
                <CurrentLevelSubjects currentSubjects={currentLevelSubjects}/>
                <LevelUpIndicator currentSubjects={currentLevelSubjects}/>
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
       height: "100%"

    },
    usernameText:{
        color: "white",
        fontSize: 30,
        margin: 5,
        width: "100%"
    },
    levelText:{
        color: "white",
        fontSize: 20,
        margin: 5,
        width: "100%"
    }
});


