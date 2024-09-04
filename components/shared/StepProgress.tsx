import { View, Text, Animated, Easing, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, wp } from '@/constants';

type Props = {
    steps: string[],
    currentStep: number,
    onStepChange?: () => void
}

const StepProgress = ({ steps, currentStep }: Props) => {


    const scaleAnim = useRef(new Animated.Value(1)).current;
    const lineAnim = useRef(new Animated.Value(0)).current;


    // Get screen width
    const screenWidth = Dimensions.get('window').width;
    // Calculate line width based on screen width and number of steps
    const lineWidth = screenWidth / (steps.length * 1.23);

    useEffect(() => {
        // Animate the step circle scaling
        Animated.timing(scaleAnim, {
            toValue: 1.2, // Scale up
            duration: 300,
            easing: Easing.bounce,
            useNativeDriver: true,
        }).start(() => {
            // Return to normal size
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        });

        // Animate the progress line width
        Animated.timing(lineAnim, {
            toValue: 1, // End animation by setting to full width
            duration: 300,
            useNativeDriver: true,
        }).start();

    }, [currentStep]);

    return (
        <View className='flex-row mt-2 items-center justify-evenly '>
            {steps.map((item, index) => (
                <View key={index} className='flex-row items-center '>
                    <Animated.View

                        style={{ height: 35, width: 35, transform: [{ scale: index === currentStep ? scaleAnim : 1 }], }}
                        className={`p-2 ${currentStep === index || currentStep > index ? "bg-green-600" : "bg-Gray"} rounded-full items-center justify-center`}
                    >
                        {currentStep > index ? (
                            <Ionicons name='checkmark-outline' color={Colors.White} size={20} />
                        ) : (
                            <Text className='text-md font-semibold text-white'>{index + 1}</Text>
                        )}
                    </Animated.View>

                    {/* Render the green line if not the last item */}
                    {index < steps.length - 1 && (
                        <View
                            style={{
                                height: 4,
                                width: lineWidth,
                                backgroundColor: currentStep > index ? 'green' : Colors.Gray,
                            }}
                            className='w-fit'
                        />
                    )}
                </View>
            ))}
        </View>
    );
}

export default StepProgress;
