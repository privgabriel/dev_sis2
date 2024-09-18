import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  StatusBar, // Importando o StatusBar
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import games from "./src/data/games"; // Importa o array de jogos
import Header from "./src/components/Header"; // Importa o Header
import Footer from "./src/components/Footer"; // Importa o Footer

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca
  const [selectedGame, setSelectedGame] = useState<any>(null); // Estado para armazenar o jogo selecionado
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do Modal

  // Filtrar e ordenar jogos por nome com base no termo de busca
  const filteredGames = games
    .filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  // Renderizar o card de cada jogo
  const renderGameCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelectedGame(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.gameTitle}>{item.name}</Text>
        <Text style={styles.gameDetails}>Platform: {item.platform}</Text>
        <Text style={styles.gameDetails}>Genre: {item.genre}</Text>
        <Text style={styles.gameDetails}>Developer: {item.developer}</Text>
        <Text style={styles.gameDetails}>Release Date: {item.releaseDate}</Text>
        <Text style={styles.gameDetails}>
          Rating: {item.rating} (Score: {item.ratingScore})
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      {/* Definindo a cor da StatusBar */}
      <StatusBar backgroundColor="#6200ea" barStyle="light-content" />

      <SafeAreaView style={styles.container}>
        {/* Header com input de busca */}
        <Header searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />

        {/* Corpo: Lista de jogos filtrada */}
        <FlatList
          data={filteredGames}
          renderItem={renderGameCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.gameList}
        />

        {/* Modal para exibir o trailer do jogo */}
        {selectedGame && selectedGame.trailer && (
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedGame.name}</Text>
                <YoutubePlayer
                  height={300} // Aumentar a altura para um tamanho maior
                  width={300} // Aumentar a largura para ocupar a tela de maneira adequada
                  play={false}
                  videoId={selectedGame.trailer.split("v=")[1].substring(0, 11)}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.buttonText}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}

        {/* Footer */}
        <Footer />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  gameList: {
    paddingBottom: 80, // Espaço para o Footer
  },
  card: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 200,
  },
  cardContent: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  gameDetails: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center", // Centraliza o conteúdo do modal
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: -80, // Reduz o espaço entre o vídeo e o botão
    width: "100%",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#6200ea", // Cor de fundo
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8, // Botão arredondado
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
