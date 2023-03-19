import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../style/style';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS, SCOREBOARD_KEY } from '../constants/Game';
import { Col, Grid } from 'react-native-easy-grid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';

let board = [];

export default Gameboard = ({  }) => {

    const route = useRoute();
    const [playerName, setPlayerName] = useState('');
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
    const [scores, setScores] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);

    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                key={"row" + i}
                onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"row" + i}
                    size={50}
                    color={getDiceColor(i)}
                />
            </Pressable>
        );
    }

    const pointsRow = [];

    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"points" + spot}>
                <Text key={"points" + spot} style={styles.points}>{getSpotTotal(spot)}</Text>
            </Col>
        )
    }

    const buttonsRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        buttonsRow.push(
            <Col key={"buttonsRow" + diceButton}>
                <Pressable
                    key={"buttonsRow" + diceButton}
                    onPress={() => selectDicePoints(diceButton)}>
                    <MaterialCommunityIcons
                        name={"numeric-" + (diceButton + 1) + "-circle"}
                        key={"buttonsRow" + diceButton}
                        size={40}
                        color={getDicePointsColor(diceButton)}
                    ></MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    useEffect (() => {
      if (playerName === "" && route.params?.player) {
        setPlayerName(route.params.player);
        getScoreboardData();
      }
  
    }, []);

    useEffect(() => {
        if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points');
        }
        else if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS - 1);

        } else if (selectedDicePoints.every(x => x)) {
            savePlayerPoints();
            setStatus('Game over.');
        } else {
            let sum = 0;

            for (let i of dicePointsTotal) {
                sum = sum + i;
            }
            if (sum > BONUS_POINTS_LIMIT) {
              sum = sum + BONUS_POINTS;
            }
            setTotalPoints(sum);
        }

    }, [nbrOfThrowsLeft]);

    useEffect(() => {
        
    });

    function getDiceColor(i) {
        if (board.every((val, i, arr) => val === arr[0])) {
            return "orange";
        }
        else {
            return selectedDices[i] ? "black" : "#663399";
        }
    }

    function getDicePointsColor(i) {
        if (selectedDicePoints[i]) {
            return "#663399";
        } else {
            return "#9370DB";
        }
    }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    function getSpotTotal(i) {
        return dicePointsTotal[i];
    }

    function selectDicePoints(i) {
        if (nbrOfThrowsLeft > 0) {
            setStatus('Throw three times before setting points');
        } else {
            let selected = [...selectedDices];
            let selectedPoints = [...selectedDicePoints];
            let points = [...dicePointsTotal]
            if (!selectedPoints[i]) {
                selectedPoints[i] = true;
                let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
                points[i] = nbrOfDices * (i + 1);
                setDicePointsTotal(points);
            }
            selected.fill(false);
            setSelectedDices(selected);
            setSelectedDicePoints(selectedPoints);
            setNbrOfThrowsLeft(NBR_OF_THROWS);

            if (selectedDicePoints[i]) {
                setStatus('You already selected points for ' + [i + 1]);
            }

            return points[i];
        }
    }

    function throwDices() {
        if (nbrOfThrowsLeft <= 0) {
            setStatus('Select your points before next throw');
        } else if (selectedDicePoints.every(x => x === true)) {
            setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
            setDicePointsTotal(new Array(MAX_SPOT).fill(0));
            setTotalPoints(0);
            setStatus('Throw dices');
        } else {
            let spots = [...diceSpots];
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * 6 + 1);
                    board[i] = 'dice-' + randomNumber;
                    spots[i] = randomNumber;
                }
            }
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
            setDiceSpots(spots);
            setStatus('Select and throw dices again');
        }

    }

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if(jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                tmpScores.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)); 
                setScores(tmpScores);
            }
        }
        catch (error) {
            console.log('Read error: ' + error.message)
        }
    }

    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();

    const savePlayerPoints = async () => {
        const playerPoints = {
            name: playerName,
            date: date + '.' + month + '.' + year,
            time: hours + ':' + min,
            points: totalPoints
        }
        try {
            const newScore = [...scores, playerPoints];
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
        }
        catch (error) {
            console.log("Save error: " + error.message);
        }

    }

    return (
      <View style={styles.gameboard}>
      <Header/>
      {nbrOfThrowsLeft == 3?
          <View style={styles.flex}>
              <MaterialCommunityIcons
                  name="dice-multiple"
                  size={85}
                  color="#663399"
              />
          </View>
          :
          <View style={styles.flex}>{row}</View>
      }
      <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable style={styles.button}
          onPress={() => throwDices()}>
          <Text style={styles.buttonText}>
              Throw dices
          </Text>
      </Pressable>
      <Text style={styles.totalPoints}>Total: {totalPoints}</Text>
      <Text style={styles.gameinfo}>You are {BONUS_POINTS_LIMIT - totalPoints} away from bonus points!</Text>
      <View style={styles.dicepoints}><Grid>{pointsRow}</Grid></View>
      <View style={styles.dicepoints}><Grid>{buttonsRow}</Grid></View>
      <Text style={styles.player}>Player: {playerName}</Text>
      <Footer/>
  </View>
    )
}