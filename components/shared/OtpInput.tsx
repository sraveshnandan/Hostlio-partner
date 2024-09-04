import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
type Props = {
    setotp?: Dispatch<SetStateAction<string[]>>
}
const OtpInput = ({ setotp }: Props) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);

    const handleChange = (text: string, index: number) => {
        if (text.length > 1) return; // Restrict to a single character

        const updatedOtp = [...otp];
        updatedOtp[index] = text;
        setOtp(updatedOtp);
        setotp(updatedOtp)

        // Move to the next input if text is entered
        if (text && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    return (
        <View style={styles.container}>
            {otp.map((_, index) => (
                <TextInput
                    key={index}
                    ref={(el) => (inputs.current[index] = el)}
                    value={otp[index]}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    style={styles.input}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20
    },
    input: {
        width: 40,
        height: 50,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        fontSize: 18,
        margin: 2
    },
});

export default OtpInput;
