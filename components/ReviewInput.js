import {Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {useState} from "react";




export default function ReviewInput(props) {
    const [answer, onChangeAnswer] = useState('');

    return(
        <SafeAreaView>

                <TextInput
                    style={styles.input}
                    placeholder={props.meaning ? "Meaning" : "答え"}
                    value={answer}
                    onChangeText={onChangeAnswer}
                >

                </TextInput>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        padding: 10,
        width: "100%",
        backgroundColor: "#F2F2F2",
        textAlign : "center"

    },

})
