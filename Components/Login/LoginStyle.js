import { StyleSheet, Platform, Dimensions } from 'react-native'
const MaxWidth = Dimensions.get('screen').width;
const Maxheight = Dimensions.get('screen').height;
const Loginstyles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
      },
      android: {
        backgroundColor: 'white'
      },
    }),
  },
  mainView: {
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
        marginHorizontal: 15
      },
      android: {

        width: MaxWidth,
        height: Maxheight / 3,
        marginHorizontal: 20
      },
    }),

  },
  formContainer: {
    marginHorizontal: '4%',
    marginTop: 30
  },
  inputfield: {
    backgroundColor: "white",
    borderRadius: 5,
    borderBottomWidth: 0.2,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderTopWidth: 0.2
  },
  loginButton: {
    marginHorizontal: '2%',
    marginTop: 20,
    paddingLeft: '35%',
    width: '96%',
    backgroundColor: '#8FC54B',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  forgotContainer: {
    width: '160%',
    marginTop: 10
  },
  lastContainer: {
    width: '160%',
    marginTop: 60
  },
  forgotText: {
    marginHorizontal: '35%',
    color: 'gray'
  },
  textLast: {
    fontSize: 14,
    marginHorizontal: '4%',
    color: 'gray'
  },
  textLastTwo: {
    marginHorizontal: '20%',
    fontSize: 14,
    color: 'gray'
  }
});

export default Loginstyles;