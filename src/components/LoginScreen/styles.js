import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4FF", 
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4B3F72", 
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 15,
    borderColor: "#4B3F7280",
    borderWidth: 1,
    elevation: 2,
  },
  button: {
    backgroundColor: "#4B3F72", 
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },
  secondaryButton: {
    borderColor: "#4B3F72",
    borderWidth: 1,
    backgroundColor: "#F5F5F5", 
  },
  secondaryButtonText: {
    color: "#4B3F72", 
    fontWeight: "700",
    fontSize: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
