// React
import React, { FunctionComponent, ReactNode, useEffect, useRef, useState } from 'react';
// Tools
import { Dimensions, StyleSheet, Animated, LayoutChangeEvent } from 'react-native'

type Props = {
  children?: ReactNode;
  open?: boolean;
  bouncing? : boolean
}

const BottomCardComponent: FunctionComponent<Props> = (props: Props) => {

  // default value
  const [cardHeight, setCardHeight] = useState<number>(300);
  const translateY = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: -cardHeight,
      left: 0,
      paddingBottom: 20,
      backgroundColor: 'white',
      width: Dimensions.get('screen').width,
      alignItems: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    }
  });

  function openBottomCard(): void {
    Animated.spring(
      translateY,
      {
        useNativeDriver: true,
        toValue: -cardHeight,
        bounciness: props.bouncing ? 1 : 0
      }
    ).start();
  }

  function closeBottomCard(): void {
    Animated.spring(
      translateY,
      {
        useNativeDriver: true,
        toValue: cardHeight,
      }
    ).start();
  }

  function onLayout(event: LayoutChangeEvent): void {
    const { layout } = event.nativeEvent;
    setCardHeight(layout.height);
  }

  useEffect(() => {
    if (props.open) {
      openBottomCard();
    } else {
      closeBottomCard();
    }
  }, [props.open]);

  return (
    <Animated.View onLayout={onLayout} style={[styles.container, { transform: [{ translateY }]}]}>
      {props.children}
    </Animated.View>
  );
}

export default BottomCardComponent;