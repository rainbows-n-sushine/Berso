import React, { useEffect } from "react";
import { Dimensions, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import tw from "twrnc";

const { width } = Dimensions.get("window");
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function ArtisticLineBackground() {
  const offset1 = useSharedValue(0);
  const offset2 = useSharedValue(60);
  const offset3 = useSharedValue(120);

  useEffect(() => {
    offset1.value = withRepeat(withTiming(120, { duration: 2500 }), -1, true);
    offset2.value = withRepeat(withTiming(180, { duration: 3000 }), -1, true);
    offset3.value = withRepeat(withTiming(240, { duration: 3500 }), -1, true);
  }, []);

  const makeWavePath = (offset) => {
    'worklet';
    return `M 0 100 
      Q ${30 + offset} 40, ${60 + offset} 100 
      T ${120 + offset} 100 
      T ${180 + offset} 100 
      T ${240 + offset} 100 
      T ${width} 100`;
  };

  const animatedProps1 = useAnimatedProps(() => ({
    d: makeWavePath(offset1.value),
  }));
  const animatedProps2 = useAnimatedProps(() => ({
    d: makeWavePath(offset2.value),
  }));
  const animatedProps3 = useAnimatedProps(() => ({
    d: makeWavePath(offset3.value),
  }));

  return (
    <View style={tw`absolute top-0 left-0 right-0 z-[-1]`}>
      <Svg height="200" width={width}>
        <AnimatedPath
          animatedProps={animatedProps1}
          stroke="#FFA500"
          strokeWidth="4"
          fill="none"
          opacity={0.3}
        />
        <AnimatedPath
          animatedProps={animatedProps2}
          stroke="#FFA500"
          strokeWidth="6"
          fill="none"
          opacity={0.5}
        />
        <AnimatedPath
          animatedProps={animatedProps3}
          stroke="#FFA500"
          strokeWidth="8"
          fill="none"
          opacity={0.7}
        />
      </Svg>
    </View>
  );
}
