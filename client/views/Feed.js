import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, ScrollView, Image } from 'react-native'
import { IconButton, Palette } from 'react-native-paper';
const axios = require('axios');

const Feed = (props) => {
    const [optionReleases, setOptionReleases] = useState([]);

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
    }, [props.labels])

    const fetchReleases = async (label) => {
        try {
            const res = await axios.get(`http://192.168.100.233:4040/discogs/newReleases?q=${label.id}`)
            const format = res.data.map(x => ({ id: x.id, title: x.title, label:label.title, thumb: x.thumb, artist: x.artist, format: x.format, year: x.year }))
            const filtDup = format.filter((item, i) => format.findIndex(x => x.title == item.title) === i);
            const latestReleases = filtDup.filter((item,i) => item.year == 2026)
            return (latestReleases);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={props.styleProps.outputList}>
            {optionReleases.length > 0 ?
                <ScrollView style={props.styleProps.scrollView}>
                    { optionReleases.map((release, i) => (
                            <View style={props.styleProps.list} key={i}>
                                <Image style={{ width: 60, height: 60 }} source={{ uri: release.thumb }} />
                                <View>
                                <Text style={props.styleProps.text}>{release.artist}</Text>
                                <Text style={props.styleProps.text}>{release.title}</Text>
                                <Text style={props.styleProps.text}>{release.label}</Text>
                                </ View>
                                <View>
                                <Text style={props.styleProps.text}>{release.format}</Text>
                                <Text style={props.styleProps.text}>{release.year}</Text>
                                </ View>
                                {props.releases.some(x => x.id == release.id)
                                    ? <IconButton icon="check-underline" size={20} onPress={() => props.removing(release)} />
                                    : <IconButton icon="plus" size={20} onPress={() => props.adding(release)} />
                                }
                            </View>
                        ))
                    }
                </ScrollView>
                : <Text>Here you will see different options of labels</Text>
            }
        </View>
    )
}

export default Feed