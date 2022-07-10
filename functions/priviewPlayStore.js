import * as StoreReview from "expo-store-review";
import { Linking } from "react-native";

export const riviewPlayStore = async () => {
  if (await StoreReview.hasAction()) {
    Linking.openURL(`market://details?id=com.misdar.Math&showAllReviews=true`);
    StoreReview.requestReview();
  }
};
