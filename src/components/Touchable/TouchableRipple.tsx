import { View, Text, TouchableNativeFeedback, TouchableNativeFeedbackProps } from 'react-native'
import React, { FC } from 'react'
import { color } from '@utils'

const TouchableRipple: FC<TouchableNativeFeedbackProps> = (props) => {
    return (
        <TouchableNativeFeedback {...props} background={TouchableNativeFeedback.Ripple(color.ripple, false)}>
            {props.children}
        </TouchableNativeFeedback>
    )
}

export default TouchableRipple