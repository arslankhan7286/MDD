import { StyleSheet, Platform } from 'react-native'
const DashboardStyles = StyleSheet.create({
  DashboardContainer: {
    flex: 1,
  },
  DealershipContainer: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 170,
        marginHorizontal: 20
      },
      android: {
        marginTop: 110,
        marginHorizontal: 20,
      },
    }),
  },
  DashboardInputsView: {
    height: '18%',
    width: '95%',
  },
  SearchFieldInputView: {
    ...Platform.select({
      ios: {
        height: '8%',
        width: '95%',
        marginTop: 50
      },
      android: {
        height: '10%',
        width: '90%',
        marginTop: 10,
        marginLeft: '5%',

      },
    }),
  },
  DashboardInput: {
    // flex:1,
    paddingRight: 10,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 5,
    height: 40
  },

  SearchcarsInput: {
    ...Platform.select({
      ios: {
        flex: 2,
        paddingRight: 10,
        marginTop: 20,
        marginLeft: 10,
        borderRadius: 5,
        backgroundColor: '#ECECE7'
      },
      android: {
        flex: 2,
        paddingRight: 10,
        marginTop: 20,
        marginLeft: 10,
        borderRadius: 5,
        backgroundColor: '#ECECE7'
      },
    }),
  },

  inputIcon: {
    paddingBottom: 10
  },
  ButtonView: {
    marginTop: 10,
    backgroundColor: 'blue'

  },
  dashboardBottomButton: {
    width: '90%',
    backgroundColor: 'lightgray',
    marginTop: 100,
    marginHorizontal: 15,
    textAlign: 'center',
    borderRadius: 5
  },
  dealerShipText: {
    fontSize: 17,

    marginHorizontal: 10,
    marginTop: 20,
  },
  Header_Title: {
    fontSize: 20,
    width: 270,
    textAlign: 'left',
    color: Platform.OS === "android" ? "black" : null
  }
})
export default DashboardStyles;