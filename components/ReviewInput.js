import {Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {useState} from "react";
import {toKana, isRomaji, toHiragana} from 'wanakana';




export default function ReviewInput(props) {
    const [answer, setAnswer] = useState('');

    const inputToKana = (e)=> {
        setAnswer(toHiragana(e, {IMEMode : true}))
    }
    return(
        <SafeAreaView>
                <TextInput
                    style={styles.input}
                    placeholder={props.meaning ? "Meaning" : "答え"}
                    value={answer}
                    onChangeText={props.meaning ? setAnswer : inputToKana}
                    onSubmitEditing={props.onDone}
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
