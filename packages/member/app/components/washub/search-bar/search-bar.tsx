import { View, TextInput, Platform, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as Progress from 'react-native-progress';
import { styles } from './search-bar.styles';

const isIos = Platform.OS === 'ios';

type Props = {
  onSearch: (text: string) => void;
  loading: boolean;
};

const SearchBar = ({ onSearch, loading }: Props) => {
  const [text, setText] = useState('');

  const Loading = loading ? (
    <Progress.Bar
      color='#36B2F5'
      style={styles.progress}
      width={null}
      indeterminate={true}
      borderRadius={0}
      borderWidth={0}
      height={2}
    />
  ) : null;

  return (
    <View style={[styles.container, {zIndex: 1}]}>
      <View style={styles.header}>
        <View style={styles.searchBackground}>
          <TextInput
            style={styles.searchField}
            onChangeText={setText}
            underlineColorAndroid='transparent'
            placeholderTextColor={'#969696'}
            placeholder={'Enter city, state, or zip'}
            clearButtonMode='always'
            returnKeyType='search'
            onSubmitEditing={() => onSearch(text)}
            value={text}
          />
          {Loading}
          <TouchableOpacity onPress={() => onSearch(text)}>
            <Image source={require('./search-icon.png')} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
