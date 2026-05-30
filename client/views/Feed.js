import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, ScrollView, Image } from 'react-native'
import { IconButton, Palette, SegmentedButtons } from 'react-native-paper';
const axios = require('axios');
import {SERVER_URL} from '../config.js'
import { SafeAreaView } from 'react-native-safe-area-context';

const Feed = (props) => {
    const [optionReleases, setOptionReleases] = useState([]);

    const [searchPeriod, setSearchPeriod] = useState(0);

    useEffect(() => {
        const _retrieveData = async () => {
            try {
                const finalArray = await Promise.all(props.labels.map((x) => fetchReleases(x)));
                const flatten = finalArray.flat();
                setOptionReleases(flatten)

            } catch (error) {
                // Error retrieving data
            }
        }
        _retrieveData();
    }, [props.labels, searchPeriod])

    const fetchReleases = async (label) => {
        try {
            const res = await axios.get(`${SERVER_URL}/discogs/newReleases?q=${label.id}`)
            const format = res.data.map(x => ({ id: x.id, title: x.title, label: label.title, thumb: x.thumb, artist: x.artist, format: x.format, year: x.year }))
            const filtDup = format.filter((item, i) => format.findIndex(x => x.title == item.title) === i);
            const latestReleases = filtDup.filter((item, i) =>
                searchPeriod == 0 ? item.year == 2026
                    : searchPeriod == 1 ? item.year == 2026 || item.year == 2025
                        : searchPeriod == 2 && item.year == 2026 || item.year == 2025 || item.year == 2024)
            return (latestReleases);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={props.styleProps.marginTopArea}>
                <Text style={props.styleProps.headerText}>Latest Releases</ Text>
            </View>
            <SegmentedButtons style={props.styleProps.segmentedButton}
                value={searchPeriod}
                onValueChange={setSearchPeriod}
                buttons={[
                    {
                        value: 0,
                        label: `This Year`,
                    },
                    {
                        value: 1,
                        label: `Last Two Years`,
                    },
                    {
                        value: 2,
                        label: `Last Three Years`,
                    }
                ]}
                theme={{ roundness: 0 }}
            />
            <View style={props.styleProps.outputList}>
                {optionReleases.length > 0 ?
                    <ScrollView style={props.styleProps.scrollView} contentContainerStyle={{ alignItems: 'center' }}>
                        {optionReleases.map((release, i) => (
                            <View style={props.styleProps.releasesList} key={i}>
                                <View style={props.styleProps.topReleaseInfo}>
                                    <View style={props.styleProps.labelTag}>
                                    <Text style={props.styleProps.boldText}>{release.label}</Text>
                                    </View>
                                    <View style={props.styleProps.iconTag}>
                                    {props.releases.some(x => x.id == release.id)
                                        ? <IconButton icon="check-underline" size={20} onPress={() => props.removing(release)} />
                                        : <IconButton icon="plus" size={20} onPress={() => props.adding(release)} />
                                    }
                                    </View>
                                </ View>
                                <Image style={{ width: 240, height: 240 }} source={release.thumb ? { uri: release.thumb } : require('../assets/placeholder_1.png')}/>
                                <View style={props.styleProps.bottomReleaseInfo}>
                                    <View style={props.styleProps.data1Tag}>
                                        <Text style={props.styleProps.text}>{release.artist}</Text>
                                        <Text style={props.styleProps.text}>{release.title}</Text>
                                    </ View>
                                    <View style={props.styleProps.data2Tag}>
                                        <Text style={props.styleProps.text}>{release.format}</Text>
                                        <Text style={props.styleProps.text}>{release.year}</Text>
                                    </ View>
                                </ View>
                            </View>
                        ))
                        }
                    </ScrollView>
                    : <Text>Here you will see different options of labels</Text>
                }
            </View>
        </SafeAreaView>
    )
}

export default Feed