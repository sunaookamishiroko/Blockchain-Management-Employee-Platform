import { StyleSheet, Dimensions } from 'react-native';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    buttonStyle: {
      backgroundColor: "#3399FF",
      borderWidth: 0,
      color: "#FFFFFF",
      borderColor: "#3399FF",
      height: 40,
      alignItems: "center",
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonTextStyle: {
      color: "#FFFFFF",
      paddingVertical: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      fontWeight: "600",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row"
    },
    carouselContainer: {
      marginTop: 50
    },
    itemContainer: {
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'dodgerblue'
    },
    itemLabel: {
      color: 'white',
      fontSize: 24
    },
    counter: {
      marginTop: 25,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center'
    }
});

export default styles;