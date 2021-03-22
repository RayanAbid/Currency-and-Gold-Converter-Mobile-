// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

const { width } = Dimensions.get("screen");
import SelectCurrency from "./SelectCurrency";

import { Button, Block, Text, Input, theme } from "galio-framework";
import { StyleSheet, Dimensions, Image } from "react-native";
const image = {
  uri:
    "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80",
};

import axios from "axios";
import getSymbolFromCurrency from "currency-symbol-map";

import AnimatedLoader from "react-native-animated-loader";
import { Header } from "../components";

export default function App({ navigation, route }) {
  const [ConvertFrom, setConvertFrom] = useState();
  const [ConvertFromData, setConvertFromData] = useState();
  const [ConvertFromImg, setConvertFromImg] = useState();
  const [ConvertTo, setConvertTo] = useState();
  const [ConvertToData, setConvertToData] = useState();
  const [ConvertToImg, setConvertToImg] = useState();
  const [ConvertToSymbol, setConvertToSymbol] = useState();
  const [ConvertedVal, setConvertedVal] = useState(0);
  const [amount, setAmount] = useState(1);
  const [Progress, setProgress] = useState(0);
  const [visibles, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    console.log(route.params, "wowowo");
    if (route.params?.post) {
      if (route.params?.dataFor === "convertFrom") {
        setConvertFrom(route.params.post);
        setConvertFromImg(route.params.img);
        setConvertFromData(route.params.data);
      } else if (route.params?.dataFor === "convertTo") {
        setConvertTo(route.params?.post);
        setConvertToImg(route.params.img);
        setConvertToSymbol(route.params.symbol);
        setConvertToData(route.params.data);
      }
    }
  }, [route.params?.post]);

  const handleSubmit = (event) => {
    event.preventDefault();
    GetRate();
  };

  const GetRate = async () => {
    const options = {
      method: "GET",
      url: "https://currency-exchange.p.rapidapi.com/exchange",
      params: { from: ConvertFrom, to: ConvertTo, q: 1 },
      headers: {
        "x-rapidapi-key": "aaaba026a5msh9d9e0d9bfa8d38ep1134d8jsn9388688a73b4",
        "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setConvertedVal(response.data);
        setVisible(false);
        console.log("currency", response.data);
      })
      .catch(function (error) {
        setVisible(false);
        alert("Sorry !");
        console.error(error);
      });
  };

  const placeholder = {
    label: "Select a Currency...",
    value: null,
    color: "#9EA0A4",
  };

  return (
    // <ImageBackground source={image} style={globalStyles.image}>
    <>
      <Block flex center style={styles.home}>
        {/* {this.renderProducts()} */}
        <Block row style={{ width: "100%" }}>
          <Button onPress={() => navigation.navigate("SelectCurrency", { dataFor: "convertFrom" })}>
            Convert From
          </Button>
          <Button onPress={() => navigation.navigate("SelectCurrency", { dataFor: "convertTo" })}>
            Convert To
          </Button>
        </Block>
        <Block row>
          {ConvertFrom != undefined && (
            <>
              <Image
                style={{ width: 30, height: 15 }}
                source={{ uri: `data:image/jpeg;base64,${ConvertFromImg}` }}
              />
              <Text
                style={{
                  color: "black",
                  marginTop: 10,
                }}>{`${ConvertFromData.name} (${ConvertFrom})`}</Text>
            </>
          )}
          {ConvertTo != undefined && (
            <>
              <Image
                style={{ width: 30, height: 15 }}
                source={{ uri: `data:image/jpeg;base64,${ConvertToImg}` }}
              />
              <Text
                style={{
                  color: "black",
                  marginTop: 10,
                }}>{`${ConvertToData.name} (${ConvertTo})`}</Text>
            </>
          )}
          <Button
            onPress={() => {
              setVisible(true);
              setProgress(1);
              GetRate();
            }}>
            Convert
          </Button>
        </Block>
        <Block>
          <Text>{ConvertedVal != 0 ? ConvertedVal : 0}</Text>
        </Block>
        <AnimatedLoader
          source={require("./loader.json")}
          visible={visibles}
          animationStyle={styles.lottie}
          overlayColor={"rgba(0, 0, 0,0.8)"}
          speed={1}
        />
      </Block>
    </>
    //    <View style={globalStyles.row}>
    //     <CardItem style={[globalStyles.cardGlass, globalStyles.col50]}>
    //       <Pressable
    //         onPress={() => navigation.navigate("SelectCurrency", { dataFor: "convertFrom" })}>
    //         <Body>
    //           <Text style={globalStyles.text}>Convert From</Text>
    //           <View style={{ padding: 10 }}>
    // {ConvertFrom != undefined ? (
    //   <>
    //     <Image
    //       style={{ width: 30, height: 15 }}
    //       source={{ uri: `data:image/jpeg;base64,${ConvertFromImg}` }}
    //     />
    //     <Text style={{ color: "black", marginTop: 10 }}>{ConvertFromData.name}</Text>
    //   </>
    // ) : (
    //   <Text style={{ color: "black" }}>Click Here</Text>
    // )}
    //           </View>
    //         </Body>
    //       </Pressable>
    //     </CardItem>

    //     <CardItem style={[globalStyles.cardGlass, globalStyles.col50]}>
    //       <Pressable
    //         onPress={() => navigation.navigate("SelectCurrency", { dataFor: "convertTo" })}>
    //         <Body>
    //           <Text style={globalStyles.text}>Convert To</Text>
    //           <View style={{ padding: 10 }}>
    //             {ConvertTo != undefined ? (
    //               <>
    //                 <Image
    //                   style={{
    //                     width: 30,
    //                     height: 15,
    //                   }}
    //                   source={{ uri: `data:image/jpeg;base64,${ConvertToImg}` }}
    //                 />
    //                 <Text style={{ color: "black", marginTop: 10 }}>{ConvertToData.name}</Text>
    //               </>
    //             ) : (
    //               <Text style={{ color: "black" }}>Click Here</Text>
    //             )}
    //           </View>
    //         </Body>
    //       </Pressable>
    //     </CardItem>
    //   </View>

    //   <View style={[globalStyles.row, { marginTop: 10 }]}>
    //     <CardItem style={globalStyles.textGlass}>
    //       <TextInput
    //         placeholder='Enter Amount'
    //         keyboardType='numeric'
    //         onChangeText={(num) => setAmount(num)}
    //         value={amount}
    //         style={globalStyles.textInput}
    //       />
    //     </CardItem>
    //   </View>

    //   <View style={[globalStyles.row, { marginTop: 10 }]}>
    //     <CardItem style={globalStyles.btnGlass}>
    //       <Pressable
    //         onPress={() => {
    //           setVisible(true);
    //           setProgress(1);
    //           GetRate();
    //         }}>
    //         <Body style={globalStyles.center}>
    //           <Text style={globalStyles.button}>Convert</Text>
    //         </Body>
    //       </Pressable>
    //     </CardItem>
    //   </View>

    //   {Progress == 1 && (
    //     <View style={globalStyles.row}>
    //       <CardItem style={globalStyles.cardGlass}>
    //         <Body style={[globalStyles.center, { paddingLeft: "22%" }]}>
    //           <Text style={globalStyles.text}>{Progress == 1 ? "The Current Rate is" : ""}</Text>
    //           <Text style={[globalStyles.text, { fontSize: 35 }]}>
    //             {Progress == 1
    //               ? (parseFloat(amount) * parseFloat(ConvertedVal)).toFixed(2) +
    //                 " " +
    //                 ConvertToSymbol
    //               : ""}
    //           </Text>
    //         </Body>
    //       </CardItem>
    //     </View>
    //   )}
    // </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
    // justifyContent: "center",
  },
  lottie: {
    width: 200,
    height: 200,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
