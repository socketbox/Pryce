import { StyleSheet } from 'react-native';
import Constants from 'expo-constants'

export const styles = StyleSheet.create({
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
      color: '#121212',
      padding: 20
    },
    newListForm: {
      borderWidth: 1,
      borderColor: '#000000',
      width: '80%', 
      fontSize: 18,
      textAlign: 'center',
    },
    
    /*
     * ListDetails
     */
    buttons: {
      fontSize: 18,
      color: "#121212",
      width: '35%', 
      padding: 15,
      borderWidth: StyleSheet.hairlineWidth,
    },
    /*
     * Login
     */
	container: {
		flex: 1,
	},
	pryce: {
		flex: 1,
		fontSize: 70,
		textAlign: 'center'
	},
	loginInfo: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 2
	},
	inputRow: {
		width: 220,
		height: 30,
		marginBottom: 30,
		flexDirection: 'row'
	},
	inputIcon: {
		fontSize: 30,
		alignSelf: 'flex-end',
		justifyContent: 'flex-end',
	},
	inputField: {
		width: 193,
		height: "100%",
		color: '#121212',
		textAlign: 'left',
		fontSize: 20,
		marginLeft: 6,
		borderBottomWidth: 1,
		borderBottomColor: '#060606'
	},
	login2: {
		color: "#121212",
		textAlign: "center",
		paddingTop: 5,
    },
    loginButton: {
		width: 220,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
		borderWidth: 1,
		borderStyle: 'solid',
		marginBottom: 30
	},
	
	createAccount: {
		width: 168,
		height: 16,
		flexDirection: 'row',
		flex: 1,
		alignSelf: 'center',
	},
	newText: {
		color: '#121212',
		fontSize: 14,
		marginTop: 2,
	},
	createAccountHere: {
		top: 2,
		left: 0,
		color: '#126ef7',
		fontSize: 14,
	},
	continueAsGuest: {
		width: 125,
		height: 18,
		color: '#126ef7',
		fontSize: 14,
		alignSelf: 'center',
		marginBottom: 57,
    },
    /*
     * Register
     */ 
    title: {
		color: "#121212",
		fontSize: 40,
		textAlign: 'center',
		paddingTop: '20%',
	},
	form: {
		alignItems: 'center',
	},
	buttonContainer: {
		width: 161,
		height: 32,
		borderRadius: 6,
		borderColor: "rgba(0,0,0,0.65)",
		borderWidth: 1,
		borderStyle: "solid",
	},
	unIcon: {
		fontSize: 20,
		opacity: 0.5,
		alignSelf: 'flex-end',
		marginBottom: 1,
	},
	unInput: {
		width: 193,
		height: 15,
		color: '#121212',
		textAlign: 'left',
		marginLeft: 6,
		marginTop: 6,
	},
	unIconRow: {
		height: 21,
		flexDirection: 'row',
		marginRight: 1,
	},
	unLine: {
		width: 218,
		height: 1,
		backgroundColor: '#060606',
		opacity: 0.25,
		marginTop: 1,
		marginLeft: 2,
	},
	password: {
		width: 220,
		height: 23,
		marginTop: 19,
	},
	pwIcon: {
		fontSize: 20,
		opacity: 0.5,
		alignSelf: 'flex-end',
		marginBottom: 1,
	},
	pwInput: {
		width: 193,
		height: 15,
		color: '#121212',
		textAlign: 'left',
		marginLeft: 6,
		marginTop: 6,
	},
	pwIconRow: {
		height: 21,
		flexDirection: 'row',
		marginRight: 1,
	},
	pwLine: {
		width: 218,
		height: 1,
		backgroundColor: '#060606',
		opacity: 0.25,
		marginTop: 1,
		marginLeft: 2,
	},
	/*
	 * EditItem
	 */
    signInButton: {
    width: 161,
    height: 32,
    marginTop: 36,
    marginLeft: 40
  },
  signInContainer: {
    width: 161,
    height: 32,
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.65)",
    borderWidth: 1,
    borderStyle: "solid"
  },
  editItem1: {
    color: "#121212",
    textAlign: "center",
    marginLeft: 59
  },
    pryceColumn: {
    width: 240,
    marginTop: 87,
    marginLeft: 67
  },
  /*
   * ItemInfo
   */
  containerItemInfo: {
	flex: 1,
	justifyContent: 'center',
	paddingTop: Constants.statusBarHeight,
	backgroundColor: '#ecf0f1',
	padding: 8,
  },
  /*
   * NewItem
   */
	containerNewItem: {
		flex: 1, 
		marginTop: 40,
		alignItems: 'center'
	},
	data: {
		width: 220,
		height: 23,
	},
	icon: {
		fontSize: 20,
		opacity: 0.5,
		alignSelf: 'flex-end',
		marginBottom: 1,
	},
	input: {
		width: 193,
		height: 15,
		color: '#121212',
		textAlign: 'left',
		marginLeft: 6,
		marginTop: 6,
	},
	iconRow: {
		height: 21,
		flexDirection: 'row',
		marginRight: 1,
	},
	line: {
		width: 218,
		height: 1,
		backgroundColor: '#060606',
		opacity: 0.25,
		marginTop: 1,
		marginLeft: 2,
	},
	submit: {
		width: 100,
		height: 25,
		borderWidth: 2,
		marginTop: 10,
		textAlign: 'center',
		alignSelf: 'center',
	},
	/*
	 * Search
	 */
	searchContainer: {
		flex: 1,
		padding: 30,
		marginTop: 65,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	/*title: {
		marginBottom: 20,
		fontSize: 25,
		textAlign: 'center'
	},*/
	searchInput: {
		height: 50,
		padding: 4,
		marginRight: 5,
		fontSize: 23,
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 8,
		color: 'black'
	},
	buttonText: {
		fontSize: 18,
		color: '#111',
		alignSelf: 'center'
	},
	button: {
		height: 45,
		flexDirection: 'row',
		backgroundColor:'white',
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	}
});


