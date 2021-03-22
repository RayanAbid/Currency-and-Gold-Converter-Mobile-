// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
// import { Avatar, Card, Title, Paragraph, Headline } from "react-native-paper";

import CurrencyCodes from "./CurrencyCodes";

// const LeftContent = (props) => <Avatar.Icon {...props} icon='folder' />;

export default function SelectCurrency({ navigation, route }) {
  const [search, setSearch] = React.useState("");

  var filteredCountry = CurrencyCodes;

  if (search) {
    filteredCountry = filteredCountry.filter((country) => {
      return country.currency.code.toLowerCase().indexOf(search.toLowerCase().toString()) !== -1;
    });
  }

  return (
    <>
      <View style={styles.textContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='search...'
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {filteredCountry.map((code) => (
          <Pressable
            onPress={() =>
              navigation.navigate("Gold", {
                post: code.currency.code,
                dataFor: route.params.dataFor,
                img: code.flag,
                symbol: code.currency.symbol,
                data: code,
              })
            }
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
              },
            ]}>
            <View style={styles.button}>
              <Text style={{ padding: 15 }}>
                <Image
                  style={{
                    width: 40,
                    height: 20,
                  }}
                  source={{ uri: `data:image/jpeg;base64,${code.flag}` }}
                />
                {` ${code.name} (${code.currency.code})`}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  textInput: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  textContainer: {
    padding: 0,
    marginTop: 20,
    margin: 10,
    paddingBottom: 0,
    marginBottom: 0,
  },
});
