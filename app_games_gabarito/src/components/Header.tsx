import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

interface HeaderProps {
  searchTerm: string;
  onSearchTermChange: (text: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchTermChange }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>GameApp</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar jogos..."
        value={searchTerm}
        onChangeText={onSearchTermChange}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6200ea",
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
