import React, { Component, useRef, useState } from 'react'
import { View, Text, Image, Button, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground, Dimensions, Platform, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import { Global } from './Global';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import RBSheet from 'react-native-raw-bottom-sheet';
import { SearchBar, Tabs, Card, CheckBox, ListItem } from "react-native-elements";
import HomeComponent from '../component/HomeComponent';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Ionicons } from '@expo/vector-icons';
import MyButton from '../component/MyButton';


const GenerationData = [
  {
    id: "4",
    title: "Generation 4",
  },
  {
    id: "5",
    title: "Generation 5",
  },
  {
    id: "6",
    title: "Generation 6",
  },
  {
    id: "7",
    title: "Generation 7",
  },
  {
    id: "8",
    title: "Generation 8",
  },
  {
    id: "9",
    title: "Generation 9",
  },
];


export function TabHypotheticalSearch({ navigation }) {
  const bottomSheet = useRef();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const refRBSheetGeneration = useRef();
  const BottomSheetSearchNavigation = useRef();
  const [GenerationTitle, setGenerationTitle] = React.useState("Generation 5");
  const [state, setState] = React.useState({ checked: [] });
  const [chekedItem, setChekedItem] = React.useState(5)
  const [searchValue, setSearchValue] = React.useState("")
  const [userData, setUserData] = useState();
  const [HorseData, setHorseData] = useState([]);
  const [loader, setLoader] = useState(false)


  const [getData, setData] = React.useState([]);

  const [getText, setText] = React.useState("");
  const [stallion, setStallion] = React.useState("");


  return (
    <ScrollView>
      <Animatable.View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}
        animation="fadeInDown"
      >

        <Animatable.View style={styles.footer}
          animation="fadeInDown">


          <View style={styles.InputContainer}>
            <Feather
              style={{ top: 5, marginRight: 10 }}
              name="search"
              color="#2e3f6e"
              size={20}
            />

            <TextInput
              style={{ color: 'black', left: 5, width: '100%', height: '100%' }}
              placeholder="Type a Name:"
              onChangeText={(text) => {
                setText(text)
              }}
            />
          </View>
          <View style={{ bottom: 5 }}>
            <View style={styles.InputContainer2}>
              <Feather
                style={{ top: 5, marginRight: 10 }}
                name="search"
                color="#2e3f6e"
                size={20}
              />
              <TextInput
                style={{ color: 'black', left: 5, width: '100%', height: '100%' }}
                placeholder="Type a Name:"
                onChangeText={(text) => {
                  setText(text)
                }}
              />
            </View>
          </View>


          <View style={{ bottom: 10 }}>

            <TouchableOpacity
              style={styles.action}
              onPress={() => {
                refRBSheetGeneration.current.open()
              }}>
              <Ionicons
                style={{ marginRight: 9, top: 3 }}
                name="aperture-outline"
                color="#2e3f6e"
                size={22}
              />
              <Text style={{ paddingRight: 'auto', top: 4.5, left: 5 }}>{GenerationTitle}</Text>
              <Feather style={{ paddingLeft: Dimensions.get('screen').width / 2, top: '1%' }} name="chevron-down" color="grey" size={20} />

            </TouchableOpacity>


            <RBSheet hasDraggableIcon
              ref={refRBSheetGeneration}
              height={Dimensions.get('window').height / 2}
              animationType='fade'
              closeOnDragDown={true}
              closeOnPressMask={true}
              animationType='fade'
              customStyles={{
                container: {
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10
                },

              }}
            >

              <View>
                <View style={{ borderBottomWidth: 0.7, borderBottomColor: '#CFCFD5', paddingLeft: 20, padding: 20, flexDirection: 'row', paddingTop: 0 }}>
                  {Global.Language === 1 ?
                    <Text style={{ fontSize: 22, left: 5 }}>Nesiller:</Text>
                    :
                    <Text style={{ fontSize: 22, left: 5 }}>Generations:</Text>
                  }

                </View>
                {GenerationData.length > 0 ?

                  <FlatList
                    scrollEnabled={true}
                    bounces={false}
                    style={styles.flatList}
                    data={GenerationData}

                    renderItem={({ item, i }) => (
                      <TouchableOpacity style={styles.latestItem}
                        onPress={() => {
                          setState({ checked: [state, item.id] });
                          setChekedItem(item.id)
                          setGenerationTitle("Generation " + item.id)
                          refRBSheetGeneration.current.close();

                        }}
                      >
                        <Ionicons name="chevron-forward-outline" size={16} color="black" />

                        <View style={{ flexDirection: 'row' }}>

                          <Text style={styles.textStyle}>
                            {item.title} {" "}
                          </Text>

                        </View>
                      </TouchableOpacity>)}
                    keyExtractor={item => item.id.toString()}
                  />
                  :
                  null
                }
              </View>
            </RBSheet>

          </View>

          <MyButton
            Title="Hypothetical Search"
            Icon="search-outline"
            IconSize={18}
            onPress={() => navigation.navigate('HorseDetail', {
              HORSE_NAME: getText
            })}
          >
          </MyButton>
          <HomeComponent />
        </Animatable.View>
      </Animatable.View>
    </ScrollView>

  );

}
const windowWidth = Dimensions.get('window').width - 100;
export default TabHypotheticalSearch;


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: 'black',
    bottom: 15,
    fontSize: 15,
    flex: 1,
    minHeight: 56,
    maxHeight: 56,
    width: windowWidth,
    borderRadius: 4,
    marginBottom: -10,
    justifyContent: 'center',
    paddingTop: 5,
    left: 15
  },
  viewContainer: {
    flex: 1,
  },
  ErrorMessageButtonContainer: {
    width: '80%',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputAndroid: {
    color: 'black',
    bottom: 16,
    fontSize: 15,
    flex: 1,
    minHeight: 56,
    maxHeight: 56,
    width: windowWidth,
    borderRadius: 4,
    marginBottom: -10,
    justifyContent: 'center',
    paddingTop: 5,
    left: 15
  },
  placeholder: { color: 'gray', fontSize: 14, left: 15, bottom: 16 },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  InputContainer: {
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#d4d2d2',
    marginBottom: 15,
    zIndex: 99,
    fontSize: 25,
    height: 45,

    padding: 8,
    color: '#000',
  },
  InputContainer2: {
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: 'row',
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#d4d2d2',
    marginBottom: 15,
    zIndex: 99,
    fontSize: 25,
    height: 45,

    padding: 8,
    color: '#000',
  },
  action: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
    marginTop: 0,
    height: 45,
    borderWidth: 1,
    borderColor: '#d4d2d2',
    borderBottomWidth: 1,
    padding: 8,
    paddingRight: 'auto',
    marginBottom: 15,
    zIndex: 99,
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 'auto',
    paddingTop: 8,
    left: 15,
    color: '#05375a',
    alignItems: 'center',

  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 30, top: -18
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  },
  signInButton: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e3f6e',
    borderRadius: 8,
    flexDirection: 'row'
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  TextStyle: {
    textAlign: 'center',
    fontSize: 15,
  },
  container: {
    marginTop: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  ScreensContainer: {
    width: '100%',
    height: '100%',
    //backgroundColor:'white'
  },
  SeacrhScreenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  SearchButtonStyle: {
    width: '90%',
    padding: 10,
    marginVertical: 20,
    borderColor: '#2e3f6e',
    borderRadius: 8,
    elevation: 8,
    shadowColor: 'silver',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
    marginTop: 12,
    marginLeft: 18,
    backgroundColor: "#2e3f6e"

  },
  SearchButtonText: {
    alignSelf: "center",
    fontSize: 16,
    color: "#fff",
    fontWeight: '500'
  },
  SireMareButtonContainer: {
    backgroundColor: "#e8edf1",
    padding: 8,
    borderRadius: 8,
    height: 36,
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginRight: 5,
    marginLeft: 5,
    alignSelf: 'center'
  },
  GenerationButtonContainer: {
    backgroundColor: "#e8edf1",
    padding: 10,
    borderRadius: 8,
    height: 40,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginRight: 5
  },
  buttonContainer: {
    flex: 1,
  },
  TabBarContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  Title: {
    paddingTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  Subtitle: {
    paddingTop: 20,
    fontSize: 18,
    fontWeight: '200',
    textAlign: 'center'
  },
  LatestViewItem: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  LatestCardTitle: {
    marginLeft: 5,
    fontWeight: '500',
    fontSize: 18
  },
  LatestCardItemTitle: {
    fontSize: 14,
    fontWeight: '500'
  },
  swipeContainer: {
    width: "100%",
  },
  SwipeablePanelContainer: {
    padding: 20,
  },
  SwipeablePanelItem: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  SwipeablePanelText: {
    fontSize: 18,
  },
  FlagContainer: {
    flexDirection: 'row',
  },
  SearchButtonContainer: {
    marginTop: 20,
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
  SearchButtons: {
    width: '45%',
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#2e3f6e',
    borderRadius: 10,
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: 'silver',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
    backgroundColor: "#2169ab"
  },
  SearchButtonsText: {
    alignSelf: "center",
    textTransform: "uppercase",
    fontSize: 16,
    color: "#fff",
    fontWeight: '500'
  },
  SeacrhContainer: {
    width: '100%',
    paddingBottom: 10,
    padding: 10
  },
  SearchButton: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    elevation: 8,
    backgroundColor: '#2169ab',
    alignItems: 'center'
  },
  GenerationContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between'
  },
  GenerationView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  HypotheticalTitlesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  HypotheticalTitles: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  HypotheticalTitlesText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'silver'
  },
  FlatListItemView: {
    paddingTop: 15,
    borderBottomWidth: 0.2
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  },
  ActivityIndicatorStyle: {
    zIndex: 1,
    width: '100%',
    height: '60%',
    alignContent: 'center'
  },
  ErrorMessageContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  ErrorMessageTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222'
  },
  ErrorMessageText: {
    fontSize: 16,
    color: '#c7c1c1',
    textAlign: 'center',
    marginTop: 5
  },
  ErrorMessageButtonContainer: {
    width: '80%',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ErrorMessageButton: {
    backgroundColor: 'rgb(232, 237, 241)',
    width: '40%',
    padding: 10,
    borderRadius: 8
  },
  ErrorMessageButtonText: {
    textAlign: 'center',
    color: '#2169ab',
    fontSize: 14,
  },
  autocompleteContainer: {
    borderWidth: 1,
    zIndex: 999,
    borderColor: '#87ceeb',
    width: '80%',
    backgroundColor: '#e8edf1'
  },
  flatList: {
    paddingBottom: 10,
    borderTopWidth: 0,
    borderTopColor: '#CFCFD5',
    marginTop: 5,
    maxHeight: Dimensions.get('screen').height,
    width: '100%',
    left: 10
  },
  flatList2: {
    paddingBottom: 20,
    paddingTop: 10,
    marginTop: 10,
    marginLeft: 15,
    maxHeight: Dimensions.get('screen').height / 1.4,

  },
  item: {
    flexDirection: 'row',
    width: 360,
    left: -15,
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 16,
    zIndex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d3d3',

  },
  title: {
    fontSize: 32,
  },
  latestItem: {
    flexDirection: 'row',
    width: 360,
    left: -10,
    padding: 8,
    marginVertical: 7,
    marginHorizontal: 16,
    zIndex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d3d3',
  },
  textStyle: {
    left: 5,

    fontSize: 12
  },
  textStyle2: {
    left: 5,
    fontSize: 13,
    fontWeight: 'bold'
  },
});