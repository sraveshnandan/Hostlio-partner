import { handleGetAllCategories } from '@/utils/actions';
import { Redirect } from 'expo-router';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

const SplashScreen = () => {
    const dispatch = useDispatch();
    // final useEffect to run api call to load data
    useEffect(() => {
        handleGetAllCategories(dispatch)
        return () => { }
    }, [])
    return (
        <Redirect href={`/(auth)/`} />
    )
}

export default SplashScreen


