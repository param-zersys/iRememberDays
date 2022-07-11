import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import colors from '../constant/colors';

type HeaderProp = {
  LeftComponent: React.FC;
  centerText: string;
  RightComponent: React.FC;
};

const CustomHeader = (props: HeaderProp) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.black} />

      <View
        style={{
          height: 50 + insets.top,
          paddingTop: insets.top,
          backgroundColor: colors.black,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <props.LeftComponent />
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            textTransform: 'uppercase',
            color: colors.white,
          }}>
          {props.centerText}
        </Text>
        <View>
          <props.RightComponent />
        </View>
      </View>
    </>
  );
};

export default CustomHeader;
