/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const App = () => {
  const [tab, setTab] = useState("world");
  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedKeywords, setSelectedKeywords] = useState();
  const [newsData, setNewsData] = useState([]);

  const getNewsFeed = async () => {
    try {
      const response = await fetch(
        'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=M3GzOVyGdAt3f3MFdmWL6o0i2lG8xeYx'
      );
      const json = await response.json();
      setNewsData(json.results);
      // console.log("api_response=======>", json)
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNewsFeed();
  }, [])

  const newsList = ({ item }) => {
    const imageUrl = item.media[0]?.["media-metadata"][0].url || "https://www.vifm.org/wp-content/uploads/2018/06/Placeholder-unsmushed.png";
    console.log("api_response=======>", imageUrl);

    return (
        <View style={styles.news}>
            <Image source={{uri: imageUrl}} style={styles.image}/>
            <View style={styles.description}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.newsDetailes}>By: Reporter Naresh</Text>
                <Text style={styles.newsDetailes}>Published Date: {item.published_date}</Text>
            </View>
        </View>
    )
  }


  const tabColor = (currentTab) => {
    if (tab === currentTab) {
      return "#0041ff";
    } else if (tab === currentTab) {
      return "#0041ff";
    } else if (tab === currentTab) {
      return "#0041ff";
    } else if (tab === currentTab) {
      return "#0041ff";
    } else if (tab === currentTab) {
      return "#0041ff";
    } else if (tab === currentTab) {
      return "#0041ff";
    } else {
      return "gray"
    }
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle='light-content' backgroundColor="#5983ff"/>
        <View style={{backgroundColor: "#75d0e2", height: "100%"}}>
            <View style={styles.header}>
              <Text style={styles.headerText}>NYT News Feed</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.tabHeader}>Section</Text>
              <View>
                <View style={styles.tabContainer}>
                    <Pressable 
                      style={[styles.tabButton, {borderColor: tabColor("world")}]}
                      onPress={() => setTab("world")}
                    >
                      <Text style={{color: tabColor("world")}}>World</Text>
                    </Pressable>
                    <Pressable 
                      style={[styles.tabButton, {borderColor: tabColor("arts")}]}
                      onPress={() => setTab("arts")}
                    >
                      <Text style={{color: tabColor("arts")}}>Arts</Text>
                    </Pressable>
                    <Pressable 
                      style={[styles.tabButton, {borderColor: tabColor("opinion")}]}
                      onPress={() => setTab("opinion")}
                    >
                      <Text style={{color: tabColor("opinion")}}>Opinion</Text>
                    </Pressable>
                </View>
                <View style={styles.tabContainer}>
                    <Pressable 
                      style={[styles.tabButton, {borderColor: tabColor("science")}]}
                      onPress={() => setTab("science")}
                    >
                      <Text style={{color: tabColor("science")}}>Science</Text>
                    </Pressable>
                    <Pressable 
                      style={[styles.tabButton, {borderColor: tabColor("sports")}]}
                      onPress={() => setTab("sports")}
                    >
                      <Text style={{color: tabColor("sports")}}>Sports</Text>
                    </Pressable>
                    <Pressable 
                      style={[styles.tabButton, {borderColor: tabColor("weather")}]}
                      onPress={() => setTab("weather")}
                    >
                      <Text style={{color: tabColor("weather")}}>Weather</Text>
                    </Pressable>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.sectionHeader}>
                <Picker
                    mode="dropdown"
                    style={styles.dropDown}
                    dropdownIconColor="gray"
                    selectedValue={selectedLocation}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedLocation(itemValue)
                    }>
                    <Picker.Item label="Location" value="location" />
                </Picker>
                <Picker
                    mode="dropdown"
                    style={styles.dropDown}
                    dropdownIconColor="gray"
                    selectedValue={selectedKeywords}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedKeywords(itemValue)
                    }>
                    <Picker.Item label="Keywords" value="keywords" />
                </Picker>
              </View>
              <View style={styles.sectionContainer}>
                <FlatList 
                  data={newsData}
                  renderItem={newsList}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
    backgroundColor: "white"
  },
  header: {
    backgroundColor: "#5983ff",
    padding: 15
  },
  headerText: {
    fontWeight: "600",
    fontSize: 20,
    color: "white",
    letterSpacing: 1
  },
  tabHeader: {
    fontWeight: "600",
    color: "#0f1116de",
    fontSize: 17,
  },
  tabContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  tabButton: {
    borderWidth: 1,
    borderRadius: 5,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#74c0e2",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // marginTop: 10,
    padding: 10
  },
  dropDown: {
    color: "gray", 
    backgroundColor: "white",
    width: "45%",
  },
  news: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    elevation: 10,
    marginHorizontal: 15,
    marginTop: 15,
  },  
  image: {
    width: 80,
    height: 80,
    borderRadius: 5
  },
  description: {
    marginLeft: 17,
    flexGrow: 1,
    flex: 1
  },
  title: {
    fontWeight: "600",
    marginBottom: 15,
    fontSize: 11,
  },
  newsDetailes: {
    fontSize: 10,
    // marginTop: 4
  }
});

export default App;
