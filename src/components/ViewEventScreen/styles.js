import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  value: {
    fontSize: 16,
    marginTop: 6,
    color: '#555',
  },
  deleteButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#007BFF', // Blue color for both buttons
    marginTop: 10,
  },
  deleteButtonRed: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: 'red',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  deleteContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
});
