import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { DISHES } from '../shared/dishes';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Text } from 'react-native';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

class Menu extends Component {

    render() {
        const renderMenuItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                />
            );
        }

        const { navigate } = this.props.navigation;

        if (this.props.dishes.isLoading) {
            return (
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return (
                <View>
                    <Text>{props.dishes.errMess}</Text>
                </View>
            );
        }
        else {
            return (
                <FlatList
                    data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }
}

export default connect(mapStateToProps)(Menu);