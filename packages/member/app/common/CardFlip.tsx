import React, { Component } from "react";

import { StyleSheet, Animated, View } from "react-native";

type Props = React.PropsWithChildren<{
  duration: number;
  flipZoom: number;
  flipDirection: string;
  onFlip: (side: number) => void;
  perspective: number;
  style: number | number[] | {};
  sizingView: any;
}>;

type State = {
  duration: number;
  side: number;
  sides: any;
  progress: Animated.Value;
  rotation: Animated.ValueXY;
  zoom: Animated.Value;
  rotateOrientation: string;
  flipDirection: "x" | "y";
};
export default class CardFlip extends Component<Props, State> {
  static defaultProps = {
    style: {},
    duration: 500,
    flipZoom: 0.09,
    flipDirection: "y",
    perspective: 800,
    onFlip: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      duration: 5000,
      side: 0,
      sides: [],
      progress: new Animated.Value(0),
      rotation: new Animated.ValueXY({ x: 0, y: 0 }),
      zoom: new Animated.Value(0),
      rotateOrientation: "",
      flipDirection: "y",
    };
  }

  static getDerivedStateFromProps(props: Props) {
    return {
      duration: props.duration,
      flipZoom: props.flipZoom,
      sides: props.children,
    };
  }

  componentDidMount() {
    this.setState({
      duration: this.props.duration,
      sides: this.props.children,
    });
  }

  flip() {
    if (this.props.flipDirection === "y") {
      this.flipY();
    } else {
      this.flipX();
    }
  }

  flipY() {
    const { side } = this.state;

    this.setState({
      side: side === 0 ? 1 : 0,
      rotateOrientation: "y",
    });
    this._flipTo({
      x: 0,
      y: side === 0 ? 100 : 0,
    });
  }

  flipX() {
    const { side } = this.state;

    this.setState({
      side: side === 0 ? 1 : 0,
      rotateOrientation: "x",
    });

    this._flipTo({
      x: side === 0 ? 100 : 0,
      y: 0,
    });
  }

  _flipTo(toValue: { x: any; y: any }) {
    const { duration, rotation, progress, zoom, side } = this.state;
    Animated.parallel([
      Animated.timing(progress, {
        toValue: side === 0 ? 100 : 0,
        duration,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(zoom, {
          toValue: 100,
          duration: duration / 2,
          useNativeDriver: false,
        }),
        Animated.timing(zoom, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(rotation, {
        toValue,
        duration: duration,
        useNativeDriver: false,
      }),
    ]).start(() => this.props.onFlip(side === 0 ? 1 : 0));
  }

  getCardATransformation() {
    const { progress, rotation, side, rotateOrientation } = this.state;

    const sideAOpacity = progress.interpolate({
      inputRange: [50, 51],
      outputRange: [100, 0],
      extrapolate: "clamp",
    });

    const sideATransform = {
      opacity: sideAOpacity,
      zIndex: side === 0 ? 1 : 0,
      transform: [{ perspective: this.props.perspective }],
    };
    if (rotateOrientation === "x") {
      const aXRotation = rotation.x.interpolate({
        inputRange: [0, 100],
        outputRange: ["0deg", "180deg"],
        extrapolate: "clamp",
      });
      sideATransform.transform.push({ rotateX: aXRotation });
    } else {
      // cardA Y-rotation
      const aYRotation = rotation.y.interpolate({
        inputRange: [0, 100],
        outputRange: ["0deg", "180deg"],
        extrapolate: "clamp",
      });
      sideATransform.transform.push({ rotateY: aYRotation });
    }
    return sideATransform;
  }

  getCardBTransformation() {
    const { progress, rotation, side, rotateOrientation } = this.state;

    const sideBOpacity = progress.interpolate({
      inputRange: [50, 51],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    const sideBTransform = {
      opacity: sideBOpacity,
      zIndex: side === 0 ? 0 : 1,
      transform: [{ perspective: -1 * this.props.perspective }],
    };

    if (rotateOrientation === "x") {
      const bXRotation = rotation.x.interpolate({
        inputRange: [0, 100],
        outputRange: ["360deg", "180deg"],
        extrapolate: "clamp",
      });
      sideBTransform.transform.push({ rotateX: bXRotation });
    } else {
      // cardB Y-rotation
      const bYRotation = rotation.y.interpolate({
        inputRange: [0, 100],
        outputRange: ["180deg", "0deg"],
        extrapolate: "clamp",
      });
      sideBTransform.transform.push({ rotateY: bYRotation });
    }
    return sideBTransform;
  }

  render() {
    const { zoom, sides } = this.state;
    const { flipZoom } = this.props;

    // Handle cardA transformation
    const cardATransform = this.getCardATransformation();

    // Handle cardB transformation
    const cardBTransform = this.getCardBTransformation();

    // Handle cardPopup
    const cardZoom = zoom.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 1 + flipZoom],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={[this.props.style]}>
        <Animated.View style={[styles.cardContainer, cardATransform]}>
          {sides[0]}
        </Animated.View>
        <Animated.View style={[styles.cardContainer, cardBTransform]}>
          {sides[1]}
        </Animated.View>
        <View style={styles.sizingView} pointerEvents="box-none">
          {this.props.sizingView}
        </View>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  cardContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  sizingView: {
    opacity: 0,
  },
});
