import { AdMobRewarded } from "expo-ads-admob";

const production = "ca-app-pub-8095237298596091/6620603268"
const test = "ca-app-pub-8095237298596091/3832196936";

function RewardedAd() {
  AdMobRewarded.setAdUnitID(production);
  AdMobRewarded.requestAdAsync().then(() => {
    AdMobRewarded.showAdAsync()
      .then(() => console.log("ok"))
      .catch((e) => console.log(e.message));
  });
}

export default RewardedAd;
