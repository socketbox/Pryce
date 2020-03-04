import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    /*
     * UserLists
     */
    newList: {
      width: '65%',
      borderWidth: 1,
      marginTop: 1,
      alignSelf: 'center',
      alignItems: 'center',
      alignContent: 'center',
      color: '#000000',
      padding: 20
    },
    newListForm: {
      borderWidth: 1,
      borderColor: '#000000',
      width: '80%', 
      fontSize: 18,
      textAlign: 'center',
    },
    signIn2: {
		color: "#121212",
		textAlign: "center",
		paddingTop: 5,
    },
    /*
     * ListDetails
     */
    buttons: {
      fontSize: 18,
      color: "#121212",
      width: '35%', 
      padding: 15,
      borderWidth: 1,
    },
  }
); 

export default styles; 