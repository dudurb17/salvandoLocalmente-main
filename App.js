import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotaEditor from "./src/componentes/NotaEditor";
import { Nota } from "./src/componentes/Nota";

import { useEffect, useState } from "react";
import { buscaNotas, criaTabela } from "./src/servicos/Notas";

export default function App() {
  useEffect(() => {
    criaTabela();
    mostraNota();
  }, []);
  const [notas, setNotas] = useState([]);
  async function mostraNota() {
    // const todasChaves = await AsyncStorage.getAllKeys();
    // const todasNotas = await AsyncStorage.multiGet(todasChaves);

    const todasNotas = await buscaNotas();
    setNotas(todasNotas);
    console.log(todasNotas);
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        keyExtractor={(nota) => nota.id}
        renderItem={(nota) => <Nota {...nota} />}
      />
      <NotaEditor mostraNota={mostraNota} />
      <StatusBar />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
