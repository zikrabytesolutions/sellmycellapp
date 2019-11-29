import { StyleSheet } from 'react-native';
import COLORS from '../colors/color.js';

export default StyleSheet.create({
  header: {
    backgroundColor: COLORS.headerBackground,
  },
  headerWhite: {
    backgroundColor: COLORS.white,
  },
  headerText: {
    fontWeight: 'normal',
    fontSize: 14,
  },
  shadow: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 5,
  },
  shadowTab: {
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  inputsContainer: {
    flex: 1,
  },
  fullWidthButton: {
    borderRadius: 5,
    backgroundColor: COLORS.greenBtn,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  fullWidthButtonGray: {
    borderRadius: 5,
    backgroundColor: COLORS.gray,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  fullWidthButtonText: {
    fontSize: 18,
    color: 'white'
  },
  boldBlackText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textBlackColor,
  },
  semiboldGrayText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textDimColor,
  },
  inputBox: {
    borderRadius: 5,
    borderColor: COLORS.borderColor,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 18
  },
  inputBoxDisable: {
    borderRadius: 5,
    borderColor: COLORS.borderColor,
    borderStyle: 'solid',
    backgroundColor: COLORS.disableColor,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 18
  },
  centerItem: {
    flex: 1,
    justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center'
  },
  textNothing: {
    fontSize: 18,
    color: COLORS.textDimColor
  },

  myHeaderBg: {
    height: 55,
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.themeColor,
    flexDirection: 'row'
  },
  myHeaderIcon: { color: '#fff', width: 30, height: 30 },
  myHeaderText: { fontSize: 19, paddingHorizontal: 10, color: COLORS.white },

  whiteBorder: {
    padding: 16,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  }
});