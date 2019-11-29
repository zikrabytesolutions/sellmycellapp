import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Snackbar from 'react-native-snackbar';
import COLORS from '../assets/colors/color.js';
import StyleCommon from '../assets/styles/styleCommon.js';
import Common from '../utils/common.js';
import SearchBar from 'react-native-searchbar';
import { Icon } from "react-native-elements";
import { Appbar } from 'react-native-paper';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';

export default class BrandScreen extends Component {
  // static navigationOptions = {
  //   title: 'Select Brand',
  //   // headerLeft: (
  //   //   <Icon
  //   //     containerStyle={{ paddingLeft: 10}}
  //   //     type="ionicon"
  //   //     name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
  //   //   />
  //   // ),
  //   // headerRight: (
  //   //   <TouchableOpacity onPress={this.searchBar.show()}>
  //   //     <View style={{
  //   //       flexDirection: "row", justifyContent: "space-evenly", paddingEnd: 16,
  //   //       // width: 120
  //   //     }}>
  //   //       <Icon color={COLORS.white} type="ionicon" name={Platform.OS === "ios" ? "ios-search" : "md-search"} />
  //   //       {/* <Icon type="ionicon" name={Platform.OS === "ios" ? "ios-heart" : "md-heart"} />
  //   //     <Icon type="ionicon" name={Platform.OS === "ios" ? "ios-more" : "md-more"} /> */}
  //   //     </View>
  //   //   </TouchableOpacity>
  //   // ),
  //   headerStyle: StyleCommon.header,
  //   headerTintColor: COLORS.headerTintColor,
  //   headerTitleStyle: StyleCommon.headerText,
  // }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      tempDataSource: [],
    }
  }

  componentDidMount() {
    fetch(Common.BASEURL + 'mbrand.php')
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
          title: 'Sorry, something went wrong.',
          color: 'white',
        });
      });
  }

  _handleResults = (results) => {
    this.setState({
      tempDataSource: results,
    });
  }

  open(brandId) {
    this.props.navigation.navigate('Model', {
      brand_id: brandId
    })
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
            <Text style={StyleCommon.myHeaderText}>Select Brand</Text>
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
            <Text style={StyleCommon.myHeaderText}>Select Brand</Text>
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
          {/* <TouchableOpacity onPress={() => this.searchBar.show()}>
            <View style={[StyleCommon.shadow, { flexDirection: "row", paddingVertical: 14, paddingHorizontal: 16, }]}>
              <Icon color={COLORS.gray} type="ionicon" name={Platform.OS === "ios" ? "ios-search" : "md-search"} />
              <Text style={{ color: COLORS.gray, fontSize: 18, marginLeft: 16 }}>Search</Text>
            </View>
          </TouchableOpacity> */}
          <SearchBar
            placeholder="Search brand here"
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
            // staticDimension={300}
            // fixed
            // spacing={20}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={this.open.bind(this, item.brand_id.toString())}>
                <View style={[styles.itemContainer, StyleCommon.shadow]}>
                  <Image
                    style={styles.img}
                    resizeMode="center"
                    defaultsource={require('../assets/images/default_img.png')}
                    source={{ uri: item.icon }}
                  />
                  <Text style={styles.itemName}>{item.brand_name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )
    }
  }


  // render() {
  //   const items = [
  //     { name: 'Apple', code: '#FFFFFF', img: 'apple.png' }, { name: 'Samsung', code: '#FFFFFF', img: 'apple.png' },
  //     { name: 'Google', code: '#FFFFFF', img: 'google.png' }, { name: 'Asus', code: '#FFFFFF', img: 'asus.png' },
  //     { name: 'Huawei', code: '#FFFFFF', img: 'huawei.png' }, { name: 'Oppo', code: '#FFFFFF', img: 'oppo.png' },
  //     { name: 'Vivo', code: '#FFFFFF', img: 'vivo.png' }, { name: 'Motorola', code: '#FFFFFF', img: 'motorola.png' },
  //     { name: 'Lenovo', code: '#FFFFFF', img: 'lenovo.png' }, { name: 'ZTE', code: '#FFFFFF', img: 'zte.png' },
  //     { name: 'Realme', code: '#FFFFFF', img: 'realme.png' }, { name: 'Xiaomi', code: '#FFFFFF', img: 'mi.png' },
  //   ];

  // return (
  //   <View>
  // <FlatGrid
  //   itemDimension={130}
  //   items={items}
  //   style={styles.gridView}
  //   // staticDimension={300}
  //   // fixed 
  //   // spacing={20} 
  //   renderItem={({ item, index }) => (
  //     <TouchableOpacity onPress={() => this.props.navigation.navigate('Model')}>
  //       <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
  //         <Image
  //           style={styles.img}
  //           source={require('../assets/images/apple.png')} />
  //         <Text style={styles.itemName}>{item.name}</Text>
  //         <Text style={styles.itemCode}>{item.code}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   )}
  // />
  //   </View>
  // );
  // }
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
    color: '#000',
    fontWeight: '600',
  },
  img: {
    width: 100,
    height: 100,
    margin: 5,
  },
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
});