import React, { useState } from 'react'
import { View, Text, TextInput, Button, ScrollView, Image } from 'react-native'
import { IconButton, Palette } from 'react-native-paper';
const axios = require('axios');

const Search = (props) => {
    const [searchLabel, setSearchLabel] = useState('');
    const [optionLabels, setOptionLabels] = useState([]);

    const handleSearch = async () => {
        try {
            const res = await axios.get(`http://192.168.100.233:4040/discogs/labelSearch?q=${searchLabel}`)
            const filter = res.data.map(x => ({ id: x.id, title: x.title, thumb: x.thumb }))
            setOptionLabels(filter);
            console.log(filter);
            setSearchLabel('');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={props.styleProps.search}>
            <View style={props.styleProps.searchInputArea}>
                <TextInput style={props.styleProps.input}
                    onChangeText={(text) => setSearchLabel(text)}
                    // here we take the value from our text input and set the state so that we can access it.
                    value={searchLabel}
                    onSubmitEditing={handleSearch}
                // to submit on press return
                />
                <Button onPress={handleSearch} title="Search" />
            </View>
            <View style={props.styleProps.outputList}>
                {optionLabels.length > 0 ?
                    <ScrollView style={props.styleProps.scrollView}>
                        {
                            optionLabels.map((label, i) => (
                                <View style={props.styleProps.list} key={i}>
                                    <Image style={{ width: 60, height: 60 }} source={{ uri: label.thumb }} />
                                    {/*<Text style={props.styleProps.text}>ID: {label.id}</Text>*/}
                                    <Text style={props.styleProps.text}>TITLE: {label.title}</Text>
                                    {props.labels.some(x => x.id == label.id)
                                        ? <IconButton icon="check-underline" size={20} onPress={() => props.removing(label)} />
                                        : <IconButton icon="plus" size={20} onPress={() => props.adding(label)} />
                                    }
                                </View>
                            ))
                        }
                    </ScrollView>
                    : <Text>Here you will see different options of labels</Text>
                }
            </View>
        </View>
    )
}

export default Search