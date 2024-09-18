import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        GameApp © 2024 - All rights reserved
      </Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#6200ea",
    padding: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
  },
});
