import OnboardingScreen from "../screens/Onboarding"
import ProfileScreen from "../screens/Profile"
import SplashScreen from "../screens/Splash"
import { AuthContext } from "./ContextProviders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { useRef, useState, useEffect, useContext } from 'react';

const Stack = createNativeStackNavigator();
function NavigationManager() {
    const { isLoading, setIsLoading } = useState(true)
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)


    useEffect(() => {
        async function DataLoader() {
            try {
                const result = await AsyncStorage.getItem("loggedIn")
                if ( result !== null) {
                    const data = await JSON.parse(result);
    
                    if (data.loggedIn) {
                        setIsLoggedIn(true)
                    }
                    else {
                        setIsLoggedIn(false)
    
                    }
                }
                else {
                    await AsyncStorage.setItem("loggedIn",
                        JSON.stringify({
                            loggedIn: false
                        }))
                }
    
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(true)
            }
        }
        DataLoader()

    }, [])

    if (isLoading == true) {
        // We haven't finished reading from AsyncStorage yet
        return <SplashScreen />;
    }
    else {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    {isLoggedIn ? (
                        // Onboarding completed, user is signed in
                        <Stack.Screen options={{headerShown:false}} name="Profile" component={ProfileScreen} />
                    ) : (
                        // User is NOT signed in
                        <Stack.Screen options={{headerShown:false}} name="Onboarding" component={OnboardingScreen} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
export default NavigationManager;