import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, ScrollView, Image } from 'react-native'
import { IconButton, Palette, SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = (props) => {

    const [activeTab, setActiveTab] = useState('labels');
    const [labelCount, setLabelCount] = useState(0);
    const [releasesCount, setReleasesCount] = useState(0);

    useEffect(() => {
        setLabelCount(props.labels.length);
        setReleasesCount(props.releases.length);
    }, [props.labels, props.releases])

    return (
        <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={props.styleProps.marginTopArea}>
                <Text style={props.styleProps.headerText}>LABELtracker</ Text>
            </View>
            <SegmentedButtons style={props.styleProps.segmentedButton}
                value={activeTab}
                onValueChange={setActiveTab}
                buttons={[
                    {
                        value: 'labels',
                        label: `My Labels (${labelCount})`,
                        uncheckedColor: 'black'
                    },
                    {
                        value: 'releases',
                        label: `Saved Releases (${releasesCount})`,
                        uncheckedColor: 'black'
                    }
                ]}
                theme={{ roundness: 0 }}
            />
            <View style={props.styleProps.savedContent}>
                {activeTab == 'labels' &&
                    <View style={props.styleProps.savedLabelList}>
                        {props.labels.length > 0 ?
                            <ScrollView contentContainerStyle={props.styleProps.verticalContainer}>
                                {
                                    props.labels.map((label, i) => (
                                        <View style={props.styleProps.halfRowList} key={i}>
                                            <View style={props.styleProps.followedLabelImg}>
                                                <Image style={{ width: 80, height: 80 }} source={{ uri: label.thumb }} />
                                            </View>
                                            <View style={props.styleProps.followedLabelInfo}>
                                                <Text style={props.styleProps.text}>{label.title}</Text>
                                                <View>
                                                <IconButton icon="trash-can-outline" size={25} onPress={() => props.removeLabel(label)} />
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                }
                            </ScrollView>
                            : <Text>Here you will see your saved labels</Text>
                        }
                    </View>
                }
                {activeTab == 'releases' &&
                    <View style={props.styleProps.savedReleaseList}>
                        {props.releases.length > 0 ?
                            <ScrollView style={props.styleProps.scrollView}>
                                {
                                    props.releases.map((release, i) => (
                                        <View style={props.styleProps.list} key={i}>
                                            <View style={props.styleProps.savedReleaseFirst}>
                                                <Image style={{ width: 60, height: 60 }} source={release.thumb ? { uri: release.thumb } : require('../assets/placeholder_1.png')}/>
                                            </View>
                                            <View style={props.styleProps.savedReleaseSecond}>
                                                <Text style={props.styleProps.text}>{release.artist}</Text>
                                                <Text style={props.styleProps.text}>{release.title}</Text>
                                                <Text style={props.styleProps.text}>{release.label}</Text>
                                            </ View>
                                            <View style={props.styleProps.savedReleaseThird}>
                                                <Text style={props.styleProps.text}>{release.format}</Text>
                                                <Text style={props.styleProps.text}>{release.year}</Text>
                                            </ View>
                                            <View style={props.styleProps.savedReleaseFourth}>
                                                <IconButton icon="trash-can-outline" size={20} onPress={() => props.removeRelease(release)} />
                                            </View>
                                        </View>
                                    ))
                                }
                            </ScrollView>
                            : <Text>Here you will see your saved releases</Text>
                        }
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default Profile