import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FC } from 'react'

interface Props {
    backgroundColor?: string
}
const Bubble: FC<Props> = (props) => {
    const getColor = () => {
        return {
            backgroundColor: props.backgroundColor ?? "rgba(255, 255, 255, 0.15)",
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={[styles.bubble1, getColor()]} />
                <View style={[styles.bubble2, getColor()]} />
            </View>
        </View>
    )
}

export default Bubble

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: -70,
        top: -70,
    },
    body: {
        position: "relative"
    },
    bubble1: {
        width: 250,
        height: 250,
        borderRadius: 150
    },
    bubble2: {
        width: 130,
        height: 130,
        borderRadius: 150,
        position: "absolute",
        bottom: -80,
        right: 0
    }
})