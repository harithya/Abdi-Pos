import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const MaterialCommunityPack = {
    name: 'material-community',
    icons: createIconsMap(),
};

function createIconsMap() {
    return new Proxy({}, {
        get(target, name) {
            return IconProvider(name);
        },
    });
}

const IconProvider = (name) => ({
    toReactElement: (props) => MaterialCommunityIcon({ name, ...props }),
});

function MaterialCommunityIcon({ name, style, fill }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
        <Icon name={name} size={height} color={fill} style={iconStyle} />
    );
}