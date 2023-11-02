import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Component, useCallback, useEffect, useRef, useState} from "react";
import {
    getCurrentLevelAssignments,
    getSubjectsInformation, getSubjectsInformationByID,
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
import {useFocusEffect} from "@react-navigation/native";


export default function ReviewScreen() {

    const [reviewCount, setReviewCount] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [askReading, setAskReading] = useState(false)
    const [initialized, setInitialized] = useState(false)



    const nextReviewItem = (queue) => {
        console.log("Next review item!");
        const unfinishedReviews = queue.filter(review => !review.readingComplete || !review.meaningComplete);
        console.log(unfinishedReviews)
        if(unfinishedReviews.length === 0){
            //All reviews complete
            return;
        }

        const randomIndex = Math.floor(Math.random() * unfinishedReviews.length);
        setCurrentSubject(queue[randomIndex])
        console.log(queue[randomIndex])
        if(Math.random() > 0.5 && !queue[randomIndex].readingComplete){
            setAskReading(true)
        }else {
            setAskReading(queue[randomIndex].meaningComplete)
        }

    }


    useEffect(()=>{
        function getReviewSubjects(){
           return  getSummary().then(
                (data) =>{
                    if(!ignore) {
                        setReviewCount(data.reviewCount);
                    }
                    const reviewItems = []
                    return data.reviews[0].subject_ids;

                }
            );
        }

        let ignore = false;
        getReviewSubjects().then(subjects => {
            getSubjectsInformationByID(subjects).then(results => {
                const reviewQueue = []
                results.forEach(result => {
                    reviewQueue.push(
                        {
                            readingComplete: result.type === "radical",
                            meaningComplete: false,
                            subject: result
                        }
                    )
                })
                if(!ignore){
                    setReviews(reviewQueue)
                    nextReviewItem(reviewQueue)
                }
                return () =>{
                    ignore = true;
                }
            })
        })

    }, [])

    if(currentSubject === null){
        if(!initialized){
            setInitialized(true);
        }

        return (<Text>Loading...</Text>)

    }

    return (
            <LinearGradient colors={['#172959', '#242424']} style={styles.container}>
                <SubjectBanner characters={currentSubject.subject.characters} type={currentSubject.subject.type}/>
                <ReviewInputLabel type={currentSubject.subject.type} meaning={!askReading}/>
                <ReviewInput meaning={!askReading} onDone={() => {nextReviewItem(reviews)}}/>
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


