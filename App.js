import React from 'react';
import {SafeAreaView, Button} from 'react-native';

const App: () => Node = () => {
  return (
    <SafeAreaView>
      <Button onPress={() => console.log('Click me')} title="Click me!" />
    </SafeAreaView>
  );
};

export default App;
