import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OverviewScreen from "./app/Overview";
import {registerRootComponent } from "expo";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Roboto_100Thin, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import ReviewScreen from "./app/Reviews";
import LessonScreen from "./app/Lessons";
import {LinearGradient} from "expo-linear-gradient";


const Stack = createNativeStackNavigator();

 export default function App() {
     let [fontsLoaded, fontError] = useFonts({
         Roboto_100Thin,
         Roboto_400Regular,
         Roboto_700Bold
     });

     if (!fontsLoaded && !fontError) {
         return null;
     }


     return (
          <NavigationContainer>
              <Stack.Navigator initialRouteName="Overview" screenOptions={{
                  headerStyle: {
                      backgroundColor: '#ab3597',
                  },
                  headerTitleStyle:{
                      color:'white',
                      fontFamily: 'Roboto_400Regular'
                  },
                  animation : "fade_from_bottom"
              }}>
                  <Stack.Screen name="Overview" component={OverviewScreen}  />
                  <Stack.Screen name="Reviews" component={ReviewScreen}  />
                  <Stack.Screen name="Lessons" component={LessonScreen}  />
              </Stack.Navigator>
          </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
