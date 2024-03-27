import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet } from 'react-native'

import VehicleManagement from './view/vehicle/VehicleManagement'



export default function App() {
  return (
    <SafeAreaView style={styles.safe_container}>
      <StatusBar style="auto" />
      <VehicleManagement />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  /* CONTAINER */
  safe_container: { flex: 1 },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
