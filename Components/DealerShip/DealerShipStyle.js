import { StyleSheet } from 'react-native'
const DealerShipStyle = StyleSheet.create({
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
    flex: 2,
    paddingRight: 10,
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 5,
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
    marginTop: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  dealerShipText: {
    fontSize: 17,

    marginHorizontal: 10,
    marginTop: 20,
  },
  Logout_Button: {
    alignItems: "center",
    width: 80,
    marginTop: 20
  },
  ChangePassword_Button: {
    alignItems: "center",
    width: 150,
    marginTop: 20
  },
  Toggle_Label: {
    color: "black",
    fontWeight: "100",
    marginLeft: 100
  }
})
export default DealerShipStyle;