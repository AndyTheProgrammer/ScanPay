import React from "react";
import { View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {handleBarCodeScanned} from './BarcodeScanner';

const Scanner = () => {
    state = {
        hasCameraPermission: null,
        scanned: false,
      };

  <View>
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />

    <View style={styles.layerTop} />
    <View style={styles.layerCenter}>
      <View style={styles.layerLeft} />
      <View style={styles.focused} />
      <View style={styles.layerRight} />
    </View>

    <View style={styles.layerBottom} />
    {scanned && (
      <Button
        title={"Tap to Scan Again"}
        onPress={() => this.setState({ scanned: false })}
      />
    )}

    {scanned && (
      <Button
        title={"Check items"}
        color="#841584"
        onPress={() => {}}
      />
    )}
  </View>;
};

export default Scanner;
