import React from "react";
import { AdMobBanner } from "expo-ads-admob";
import { View } from "react-native";

function BannerAd({ size, styles }) {
  const test = "ca-app-pub-3940256099942544/6300978111"; //test ad
  const production = "ca-app-pub-8095237298596091/6458360272";
  return (
    <View style={[{ justifyContent: "center", alignItems: "center" }, styles]}>
      <AdMobBanner
        adUnitID={production}
        bannerSize={"banner"}
        onDidFailToReceiveAdWithError={() => console.log("error")}
      />
    </View>
  );
}

export default BannerAd;
