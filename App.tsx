import * as React from 'react';
import { AuthContextProvider } from './components/ContextProviders'
import { SavedDataContextProvider } from './components/SavedDataContextProvider'
import NavigationManager from './components/NavigationManager'
import { KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback } from "react-native"

function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthContextProvider>
        <SavedDataContextProvider>
          <KeyboardAvoidingView keyboardVerticalOffset={-150} behavior={Platform.OS === 'ios' ? 'position' : 'position'} contentContainerStyle={{ backgroundColor: "#fffffff", flexDirection: "column", flex: 1 }} style={{ backgroundColor: "white", flexDirection: "column", flex: 1 }} >
            <TouchableWithoutFeedback>
              <NavigationManager />

            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SavedDataContextProvider>
      </AuthContextProvider>
    </SafeAreaView>
  );
};

export default App;