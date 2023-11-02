import {useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import SubjectOverviewCard from "./SubjectOverviewCard";
import {BarChart} from "react-native-gifted-charts";
import Moment from 'moment';

export default function ReviewForecast(props) {

    const data = [];
    //console.log("REVIEWS: " +props.reviews[0].subject_ids);
    Moment.locale('en');
    props.reviews.forEach((review) =>{
        if(review.subject_ids.length > 0) {
            const val = review.subject_ids.length;
            data.push({
                value: val,
                label: Moment(review.available_at).format("HH:mm"),
                topLabelComponent: () => (
                    <Text style={{color: 'white', fontSize: 18, marginBottom: 6}}>{val}</Text>
                )

            })
        }
    })
    if(data.length > 0){
        data[0].label = "now"
    }


    return (
        <View>
            <Text style={styles.headerStyle}>Upcoming reviews</Text>
            <BarChart width={300}
                      data={data}
                      frontColor="#00AAFFFF"
                      xAxisLabelTextStyle={{color : "white"}}
                      label={"white"}
                      yAxisTextStyle={{color: "white"}}
                      hideYAxisText={true}
                      yAxisThickness={0}
                      isAnimated
                      barBorderTopLeftRadius={5}
                      barBorderTopRightRadius={5}
                      hideRules={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        color: "white",
        width : "100%",
        textAlign:"center",
        fontSize: 20,
        margin:0,
        fontWeight: "bold"


    },


});