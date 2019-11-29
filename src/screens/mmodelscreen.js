import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import SearchBar from 'react-native-searchbar'
import { Icon } from "react-native-elements";
import IconFont from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';

export default class ModelScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: [],
      tempDataSource: [],
      brandId: '',
    }
  }

  componentDidMount() {
    const bid = this.props.navigation.getParam('brand_id', '');
    this.setState({
      brandId: bid,
    })
    return fetch(Common.BASEURL + 'mmodel.php', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache'
      },
      body: 'brand_id=' + bid,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          tempDataSource: responseJson,
        }, function () {

        });

      })
      .catch((error) => {
        // console.error(error);
        this.setState({
          isLoading: false,
        });
        Snackbar.show({
          title: 'No internet connection.',
          color: COLORS.white,
        });
      });
  }

  open = (modelId) => {
    this.props.navigation.navigate('Varient', {
      brand_id: this.state.brandId,
      model_id: modelId
    })
  }
  _handleResults = (results) => {
    this.setState({
      tempDataSource: results,
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    else if (this.state.dataSource.length == 0) {
      return (
        <View style={styles.container}>
          <View style={{ height: 55, backgroundColor: COLORS.themeColor, flexDirection: 'row', alignItems: 'center' }}>
            <IconFont name="angle-left" style={{ color: '#fff', width: 30, height: 30, marginLeft: 16 }} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
            <Text style={StyleCommon.myHeaderText}>Select Model</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginEnd: 16, justifyContent: 'flex-end', }}>
              {/* <Icon name='search' type='feather' underlayColor={COLORS.themeColor} color='#fff' onPress={() => this.searchBar.show()} /> */}
            </View>
            <View style={{ justifyContent: 'flex-end', marginRight: 16 }}>
              <Icon name='home' type='feather' underlayColor={COLORS.themeColor} color='#fff' onPress={() => {
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Home' })],
                });
                this.props.navigation.dispatch(resetAction);
              }} />
            </View>
          </View>
          <View style={StyleCommon.centerItem}>
            <Text style={StyleCommon.textNothing}>Nothing to show here</Text>
          </View>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <View style={{ height: 55, backgroundColor: COLORS.themeColor, flexDirection: 'row', alignItems: 'center' }}>
            <IconFont name="angle-left" style={{ color: '#fff', width: 30, height: 30, marginLeft: 16 }} size={30} color={COLORS.blackLight} onPress={() => this.props.navigation.goBack()} ></IconFont>
            <Text style={StyleCommon.myHeaderText}>Select Model</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginEnd: 16, justifyContent: 'flex-end', }}>
              <Icon name='search' type='feather' underlayColor={COLORS.themeColor} color='#fff' onPress={() => this.searchBar.show()} />
            </View>
            <View style={{ justifyContent: 'flex-end', marginRight: 16 }}>
              <Icon name='home' type='feather' underlayColor={COLORS.themeColor} color='#fff' onPress={() => {
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Home' })],
                });
                this.props.navigation.dispatch(resetAction);
              }} />
            </View>
          </View>
          <SearchBar
            placeholder="Search model here"
            ref={(ref) => this.searchBar = ref}
            data={this.state.dataSource}
            handleResults={this._handleResults}
            backCloseSize={20}
            fontSize={16}
            backgroundColor={COLORS.themeColor}
            placeholderTextColor={COLORS.white}
            iconColor={COLORS.white}
            textColor={COLORS.white}
            allDataOnEmptySearch
          // showOnLoad
          />
          <FlatGrid
            itemDimension={130}
            items={this.state.tempDataSource}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={this.open.bind(this, item.model_id.toString())}>
                <View style={[styles.itemContainer, StyleCommon.shadow]}>
                  <Image
                    style={styles.img}
                    resizeMode="center"
                    defaultsource={require('../assets/images/default_img.png')}
                    source={{ uri: item.icon }} />
                  <Text style={styles.itemName}>{item.model}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backGroundLight
  },
  itemContainer: {
    padding: 10,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  img: {
    width: 100,
    height: 100,
    margin: 5,
  },
});