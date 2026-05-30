import React, { useState, useRef } from 'react'
import { View, Text, TextInput, Button, ScrollView, Image } from 'react-native'
import { IconButton, Palette } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {SERVER_URL} from '../config.js'

const axios = require('axios');

const Search = (props) => {
    const [searchLabel, setSearchLabel] = useState('');
    const [optionLabels, setOptionLabels] = useState([]);

    const [inputText, setInputText] = useState(false);

    const handleSearch = async (text) => {
        try {
            const res = await axios.get(`${SERVER_URL}/discogs/labelSearch?q=${text}`)
            const filter = res.data.map(x => ({ id: x.id, title: x.title, thumb: x.thumb }))
            setSearchLabel(text);
            setOptionLabels(filter);
        } catch (e) {
            console.log(e);
        }
    }

    const inputRef = useRef(null);

    const handleClear = () => {
        inputRef.current.clear();
        setOptionLabels([]);
        setSearchLabel('');
    }

    return (
        <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={props.styleProps.search}>
                <View style={props.styleProps.marginTopArea}>
                    <View style={props.styleProps.searchArea}>
                        <TextInput ref={inputRef}
                            style={props.styleProps.input}
                            onChangeText={(text) => handleSearch(text)}
                            placeholder=' search label'
                            placeholderTextColor='#fdbdbd4f'
                            onFocus={() => setInputText(true)}
                            onBlur={() => setInputText(false)}
                        />
                        {inputText &&
                            <View style={props.styleProps.clearButton}>
                                <Button onPress={handleClear} title="Clear" color='pink' />
                            </View>
                        }
                    </View>
                </View>
                <View style={props.styleProps.searchOutputList}>
                    {optionLabels.length > 0 ?
                        <ScrollView style={props.styleProps.scrollView}>
                            {
                                optionLabels.map((label, i) => (
                                    <View style={props.styleProps.list} key={i}>
                                        <View style={props.styleProps.searchLabelFirst}>
                                        <Image style={{ width: 60, height: 60 }} source={label.thumb ? { uri: label.thumb } : require('../assets/placeholder_1.png')} />
                                        </View>
                                        <View style={props.styleProps.searchLabelSecond}>
                                            <Text style={props.styleProps.text}>{label.title}</Text>
                                            <Text style={props.styleProps.text}>{label.id}</Text>
                                        </View>
                                        <View style={props.styleProps.searchLabelThird}>
                                        {props.labels.some(x => x.id == label.id)
                                            ? <IconButton icon="check-underline" size={20} onPress={() => props.removing(label)} />
                                            : <IconButton icon="plus" size={20} onPress={() => props.adding(label)} />
                                        }
                                        </View>
                                    </View>
                                ))
                            }
                        </ScrollView>
                        : <Text>Discogs Label catalog at your finger tips</Text>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Search