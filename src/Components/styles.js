import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  main: {
    backgroundColor: '#272b34',
    height: '100%',
    padding: '5%'
  },
  defaultBtn: {
    height: 30,
    margin: 10,
    borderColor: '#fff',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    padding: 12,
  },
  defaultColor: {
    color: '#fff'
  },
  danger: {
    borderColor: '#dc3545',
    color: '#dc3545',
  },
  warning: {
    borderColor: '#ffc107',
    color: '#ffc107',
  },
  success: {
    borderColor: '#28a745',
    color: '#28a745',
  },
  title: {
    fontWeight: '500',
    fontSize: 30,
    margin: 20,
    color: '#fff'
  },
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputStyle: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }
});