import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, TextInput, Button, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import axios from 'axios';

import Feed from './views/Feed.js'
import Search from './views/Search.js'
import Profile from './views/Profile.js'
//import { SegmentedButtons } from 'react-native-paper/src/components/SegmentedButtons/SegmentedButtonItem.js';

export default function App() {

  //Array with labels user is following
  const [labels, setLabels] = useState([]);

  //Array with tracks saved
  const [savedReleases, setSavedReleases] = useState([]);

  //Let's update state variables with our Async Storage
  useEffect(() => {
    const _retrieveData = async () => {
      try {
        const dataLabels = await AsyncStorage.getItem('labels');
        const dataReleases = await AsyncStorage.getItem('savedReleases');
        let labelsBackToArray = dataLabels ? JSON.parse(dataLabels) : [];
        let releasesBackToArray = dataReleases ? JSON.parse(dataReleases) : [];
        setLabels(labelsBackToArray);
        setSavedReleases(releasesBackToArray);

      } catch (error) {
        // Error retrieving data
      }
    }
    _retrieveData();
  }, []);

  //Functions to work with state variables and Async Storage
  //Adding functions
  const addLabel = async (label) => {
    try {
      let before = [...labels];
      before.push(label);
      setLabels(before);
      await AsyncStorage.setItem('labels', JSON.stringify(before));
      console.log('Im here')
      console.log(labels)
    } catch (error) {
      // Error saving data
    }
  }

  const addRelease = async (release) => {
    try {
      let before = [...savedReleases];
      before.push(release);
      setSavedReleases(before);
      await AsyncStorage.setItem('savedReleases', JSON.stringify(before));
    } catch (error) {
      // Error saving data
    }
  }

  //Removing functions
  const removeLabel = async (label) => {
    try {
      let after = labels.filter(item => item.id !== label.id);
      setLabels(after);
      await AsyncStorage.setItem('labels', JSON.stringify(after));
    } catch (error) {
      // Error saving data
    }
  }

  const removeRelease = async (release) => {
    try {
      let after = savedReleases.filter(item => item.id !== release.id);
      setSavedReleases(after);
      await AsyncStorage.setItem('savedReleases', JSON.stringify(after));
    } catch (error) {
      // Error saving data
    }
  }

  // state with active route and labels/icons for routes
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: 'feed', title: 'New Releases', focusedIcon: 'album', unfocusedIcon: 'album' },
      { key: 'search', title: 'New Labels', focusedIcon: 'magnify' },
      { key: 'library', title: 'Saved', focusedIcon: 'archive' }
    ],
  })
  // update route index in state
  const handleIndexChange = index => setState({ ...state, index })

  // linking keys from state to routes
  const renderScene = useCallback(({ route }) => {
    switch (route.key) {
      case 'feed': return <Feed styleProps={styles} labels={labels} releases={savedReleases} adding={addRelease} removing={removeRelease} />;
      case 'search': return <Search styleProps={styles} labels={labels} adding={addLabel} removing={removeLabel} />;
      case 'library': return <Profile styleProps={styles} labels={labels} releases={savedReleases} removeLabel={removeLabel} removeRelease={removeRelease} />;
    }
  }, [labels, savedReleases]);

  return (
    <SafeAreaProvider >
      <BottomNavigation
        navigationState={state}
        onIndexChange={handleIndexChange}
        renderScene={renderScene}
        labeled={false}
        barStyle={{ height: 85, backgroundColor: 'black' }}
      />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({

  //Global Elements ##############################
  marginTopArea: {
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    color: 'pink',
    fontSize: 18,
    letterSpacing: 8,
    fontWeigth: 700
  },
  segmentedButton: {
    backgroundColor: 'pink'
  },
  scrollView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'pink',
    paddingTop:15
  },
  text: {
    fontSize: 15,
    textAlign: 'left',
  },

  //Search Screen #################################
  search: {
    flex: 1,
    backgroundColor: 'pink',
  },
  searchArea: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  input: {
    flex: 1,
    height: 30, //40px height to our input 
    borderColor: 'pink', //color of our border
    borderWidth: 1, //width of our border
    borderRadius: 5,
    color: 'pink'
  },
  clearButton: {
    width: '25%',
  },
  searchOutputList: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    flexDirection: 'row',
    flex: 1,
    margin: 10,
  },
  searchLabelFirst: {
    alignItems: 'center',
    width: '20%'
  },
  searchLabelSecond: {
    paddingLeft: 10,
    width: '60%'
  },
  searchLabelThird: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%'
  },

  //Feed Screen ####################################
  outputList: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  releasesList: {
    width: '80%',
    alignItems: 'center',
    borderColor: 'grey',
    borderRadius: 8,
    borderWidth: 1,
    margin: 10
    //flex: 1
  },
  topReleaseInfo: {
    flexDirection: 'row',
    width: 240,
    margin: 5,
    justifyContent: 'space-between'
  },
  labelTag: {
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 18,
    fontWeigth: '600',
    textAlign: 'left',
  },
  bottomReleaseInfo: {
    flexDirection: 'row',
    width: '90%',
    margin: 20,
    justifyContent: 'space-between'
  },
  data1Tag: {
    width: '70%'
  },
  data2Tag: {
    width: '30%'
  },

  //Profil Screen #################################
  savedContent: {
    flex: 1,
    backgroundColor: 'pink',
    width: '100%'
  },
  savedLabelList: {
    flex: 1,
    width: '100%',
    paddingTop:15
  },
    verticalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
    halfRowList: {
    flexDirection: 'row',
    width:'45%',
    margin: 10
  },
  followedLabelImg:{
    width: '45%'
  },
  followedLabelInfo:{
    width: '55%',
  },
  savedReleaseList: {
    flex: 1
  },
  savedReleaseFirst: {
    //alignItems: 'center',
    width: '20%'
  },
  savedReleaseSecond: {
    width: '40%'
  },
  savedReleaseThird: {
    width: '30%'
  },
  savedReleaseFourth: {
    //alignItems: 'center',
    //justifyContent: 'center',
    width: '10%'
  },
});