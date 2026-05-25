import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Button, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Feed from './views/Feed.js'
import Search from './views/Search.js'
import Profile from './views/Profile.js'

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
      setLabels(after);
      await AsyncStorage.setSavedReleases('savedReleases', JSON.stringify(after));
    } catch (error) {
      // Error saving data
    }
  }

  // defining routes with components to be rendered
  const FeedRoute = () => <Feed styleProps={styles.container} labels={labels} releases={savedReleases} adding={addRelease} />;
  const SearchRoute = () => <Search styleProps={styles.container} labels={labels} adding={addLabel}/>;
  const ProfileRoute = () => <Profile styleProps={styles.container} labels={labels} releases={savedReleases} removeLabel={removeLabel} removeRelease={removeRelease}/>;

  // state with active route and labels/icons for routes
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: 'feed', title: 'New Releases', focusedIcon: 'history', unfocusedIcon: 'history' },
      { key: 'search', title: 'New Labels', focusedIcon: 'album' },
      { key: 'library', title: 'Saved', focusedIcon: 'archive' }
    ],
  })
  // update route index in state
  const handleIndexChange = index => setState({ ...state, index })

  // linking keys from state to routes
  const renderScene = BottomNavigation.SceneMap({
    feed: FeedRoute,
    search: SearchRoute,
    library: ProfileRoute,
  });

  return (
    <SafeAreaProvider >
      <BottomNavigation
        navigationState={state}
        onIndexChange={handleIndexChange}
        renderScene={renderScene}
      />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
