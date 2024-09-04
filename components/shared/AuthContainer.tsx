import React, { ReactNode } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
    children: ReactNode,
    verticallyCenter?: boolean,
    paddingTop?: number
}

const AuthContainer = ({ children, verticallyCenter, paddingTop }: Props) => {
    return (
        <SafeAreaView className={`flex-1  ${verticallyCenter && "justify-center"} px-[10%] ${paddingTop && `pt-${paddingTop}`} pt-24`}>
            {children}
        </SafeAreaView>
    )
}

export default AuthContainer