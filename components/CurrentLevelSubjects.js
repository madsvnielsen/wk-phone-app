import {useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import SubjectOverviewCard from "./SubjectOverviewCard";

export default function CurrentLevelSubjects(props) {
    if(props.currentSubjects === null){
        return (<Text>Loading...</Text>)
    }
    return (
        <View style={styles.subjectContainer}>
            {props.currentSubjects.map(
                subject =>{
                    return (<SubjectOverviewCard key={subject.id}
                                                 characters={subject.characters}
                                                 type={subject.type}
                                                 srsLevel={subject.srsLevel}
                    />)
                }
            )}


        </View>

    );
}

const styles = StyleSheet.create({
    subjectContainer: {
        flexDirection: "row",
        flew: 1,
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        flexWrap: "wrap",
        width:"100%",
        marginHorizontal:"auto"


    },

});