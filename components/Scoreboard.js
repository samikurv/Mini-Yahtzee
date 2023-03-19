import { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import styles from '../style/style';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { SCOREBOARD_KEY } from "../constants/Game";

export default Scoreboard = ( {} ) => {

    const Navigation = useNavigation(); 
    const [scores, setScores] = useState([]);

        useEffect(() => {
        const unsubscribe = Navigation.addListener("focus", () => {
            getScoreboardData();
        }); 
        return unsubscribe;
    }, []);

    const getScoreboardData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
          if (jsonValue !== null) {
            let tmpScores = JSON.parse(jsonValue);
            tmpScores.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)); 
            setScores(tmpScores);
          }
        }
        catch (error) {
          console.log(error.message);
        }
      }

    return (
        <ScrollView style={styles.scoreboard}>
            <Header/>
            <View>
            <FontAwesome5         
                        name="list"
                        size={100}
                        color="#9370DB"
                        style={styles.scoreboardIcon}
                    />
                {scores.map((player, i) => (
                    <Text style={styles.multipledice} key={i}>{i + 1}. {player.name} {player.date} {player.time} {player.points}</Text>
                ))}
            </View>
            <Footer/>
        </ScrollView>
    )

}