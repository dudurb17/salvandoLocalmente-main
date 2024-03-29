import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotaEditor from "./src/componentes/NotaEditor";
import { Nota } from "./src/componentes/Nota";

import { useEffect, useState } from "react";
import { buscaNotas, buscaNotasFiltro, criaTabela } from "./src/servicos/Notas";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  useEffect(() => {
    criaTabela();
    mostraNota();
  }, []);
  const [notas, setNotas] = useState([]);
  const [notaSelecionada, setNotaSelecionada] = useState({});
  const [filtro, setFiltro] = useState("Todos");
  async function mostraNota() {
    // const todasChaves = await AsyncStorage.getAllKeys();
    // const todasNotas = await AsyncStorage.multiGet(todasChaves);

    const todasNotas = await buscaNotas();
    setNotas(todasNotas);
    console.log(todasNotas);
  }

  async function mostraNotasFitro() {
    const notas = await buscaNotasFiltro(filtro);
    setNotas(notas);
  }
  useEffect(() => {
    if (filtro == "Todos") {
      mostraNota();
    } else {
      mostraNotasFitro();
    }
  }, [filtro]);

  return (
    <SafeAreaView flex={1}>
      <View style={estilos.picker}>
        <Picker
          selectedValue={filtro}
          onValueChange={(novaCategoria) => setFiltro(novaCategoria)}
        >
          <Picker.Item label="Todos" value="Todos" />
          <Picker.Item label="Pessoal" value="Pessoal" />
          <Picker.Item label="Trabalho" value="Trabalho" />
          <Picker.Item label="Outros" value="Outros" />
        </Picker>
      </View>
      <FlatList
        data={notas}
        keyExtractor={(nota) => nota.id}
        renderItem={(nota) => (
          <Nota {...nota} setNotaSelecionada={setNotaSelecionada} />
        )}
      />
      <NotaEditor
        mostraNota={mostraNota}
        notaSelecionada={notaSelecionada}
        setNotaSelecionada={setNotaSelecionada}
      />
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
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    margin: 16,
  },
});
