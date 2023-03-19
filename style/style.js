import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#663399',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#663399',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#9370DB",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#fff",
    fontSize: 20,
    fontWeight: 'bold'
  },
  points: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 15,
    textAlign: 'center'
  },
  dicepoints: {
    flexDirection: 'row',
    width: 280,
    alignContent: 'center'
  },
  textinput: {
    textAlign: 'center',
    fontSize: 25,
    backgroundColor: '#fff',
    marginLeft: 60,
    marginRight: 60,
    marginTop: 50,
    borderRadius: 10,
    height: 50
  },
  info: {
    textAlign: 'center',
    padding: 30
  },
  user: {
    textAlign: 'center',
    padding: 60
  },
  scoreboardIcon: {
    textAlign: 'center',
    padding: 5
  },
  multipledice: {
    textAlign: 'center'
  },
  rulesheader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  rules: {
    textAlign: 'center',
    paddingTop: 20,
    paddingLeft: 30,
    paddingBottom: 20,
    paddingRight: 30
  },
  rule: {
    fontWeight: 'bold'
  },
  lucktext: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  playbutton: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#9370DB",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  scoreboard: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 40
  },
  totalPoints: {
    fontSize: 25,
    padding: 15,
    fontWeight: 'bold'
  },
  player: {
    padding: 50,
    fontSize: 18
  },
  results: {
    flexDirection: 'row',
    fontSize: 20,
    paddingBottom: 10
  },
  playername: {
    fontSize: 20
  }
});