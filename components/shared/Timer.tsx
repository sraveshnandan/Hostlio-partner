import { View, Text } from 'react-native'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'

type Props = {
    time: number
    setIsDisabled: Dispatch<SetStateAction<boolean>>
    isDisabled: boolean
    onTimerFunction: () => void
    label: string,
    message?: string
}

const Timer = ({ time, isDisabled, setIsDisabled, onTimerFunction, label, message }: Props) => {
    const [timer, setTimer] = useState<number>(time || 300); // 5 minutes = 300 seconds
    const [isResendDisabled, setIsResendDisabled] = useState<boolean>(isDisabled || false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);



    const StartTimer = useCallback(() => {

        onTimerFunction()
        // Start the countdown timer
        setIsResendDisabled(true);
        setTimer(time);

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }


        timerRef.current = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(timerRef.current as NodeJS.Timeout);
                    setIsResendDisabled(false);
                    setIsDisabled(false)
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);


    }, [])



    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current); // Clean up the interval on component unmount
            }
        };
    }, []);


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <View>
            <Text
                onPress={!isResendDisabled ? StartTimer : undefined}
                style={{ color: isResendDisabled ? 'gray' : '#007bff', textDecorationLine: 'underline', textAlign: "center" }}
            >
                {label}
            </Text>
            {isResendDisabled && (
                <Text style={{ marginTop: 8, color: '#FF0000' }}>
                    {message && message}{formatTime(timer)}
                </Text>
            )}
        </View>
    )
}

export default Timer