import React, { useState } from 'react'
import { View, Text, TextInput, Button, ScrollView, Image } from 'react-native'
import { IconButton, Palette } from 'react-native-paper';

const Profile = (props) => {
    return (
        <View style={props.styleProps.savedContent}>
        <View style={props.styleProps.savedLabelList}>
            {props.labels.length > 0 ?
                <ScrollView style={props.styleProps.scrollView}>
                    {
                        props.labels.map((label, i) => (
                            <View style={props.styleProps.list} key={i}>
                                <Image style={{ width: 60, height: 60 }} source={{ uri: label.thumb }} />
                                {/*<Text style={props.styleProps.text}>ID: {label.id}</Text>*/}
                                <Text style={props.styleProps.text}>TITLE: {label.title}</Text>
                                <IconButton icon="trash-can-outline" size={20} onPress={() => props.removeLabel(label)} />
                            </View>
                        ))
                    }
                </ScrollView>
                : <Text>Here you will see your saved labels</Text>
            }
        </View>
        <View style={props.styleProps.savedReleaseList}>
            {props.releases.length > 0 ?
                <ScrollView style={props.styleProps.scrollView}>
                    {
                        props.releases.map((release, i) => (
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
                                <IconButton icon="trash-can-outline" size={20} onPress={() => props.removeRelease(release)} />
                            </View>
                        ))
                    }
                </ScrollView>
                : <Text>Here you will see your saved releases</Text>
            }
        </View>
        </View>
    )
}

export default Profile