import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Card } from "../../../services/api";
import { VehiclePreview } from "../../vehicle-preview/vehicle-preview";
import { styles } from "./cars-carousel.styles";
import { screenDimensions } from "../../../../../shared/theme";
import NavLightIcon from "../../../../../shared/components/svg/nav-light-icon";
import { Button, Text } from "../../../../../shared/components";
import { normalize } from "../../../../../shared/utils/normalize";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import { useAppState } from "../../../context/app-state-context";
import analytics from "@react-native-firebase/analytics";

type Props = {
  cards: Card[];
};
interface IShowNav {
  prev: boolean;
  next: boolean;
}

const isIOS = Platform.OS === "ios";

const defaultShowNav: IShowNav = {
  prev: isIOS ? true : false,
  next: isIOS ? true : false,
};

const CarsCarousel = ({ cards }: Props) => {
  const { appState, setAppState } = useAppState();
  const ref = React.useRef<ICarouselInstance>(null);
  const [showNav, setShowNav] = useState<IShowNav>(defaultShowNav);

  useEffect(() => {
    return () => {
      setShowNav(defaultShowNav);
    };
  }, []);

  useEffect(() => {
    if (appState.selectedCard !== null && !isIOS) {
      const findIndex = cards.findIndex(
        (card) => card.CardCode === appState.selectedCard.CardCode
      );
      setShowNav({
        prev: findIndex > 0,
        next: findIndex >= 0 && findIndex < cards.length - 1,
      });
    }
  }, [appState.selectedCard]);


  const scrreenView =  async (index) => {
    await analytics().logEvent('screen_view', {
      screen_name: 'Home Screen Car' + ' ' + index,
    });
  }

  return (
    <View style={styles.carouselWrapper}>
      {showNav.prev && cards.length > 1 && (
        <View
          style={{ ...styles.navButtonWrapper, ...{ left: normalize(20) } }}
        >
          <Button
            style={{
              ...styles.navButton,
              ...styles.navButtonLeft,
            }}
            onPress={() => {
              ref.current?.prev();
            }}
          >
            <NavLightIcon />
          </Button>
        </View>
      )}
      <Carousel
        loop={isIOS && cards.length > 1 ? true : false}
        width={screenDimensions.width}
        pagingEnabled={true}
        height={normalize(195)}
        autoPlay={false}
        data={cards}
        ref={ref}
        scrollAnimationDuration={500}
        onScrollEnd={(index) => {
          scrreenView(index)
          const selectedCard = cards[index];
          setAppState({ selectedCard: selectedCard });
        }}
        renderItem={(card) => {
          return (
            <View style={{ width: "100%", height: normalize(195) }}>
              {card.item.VehicleInfo ? (
                <VehiclePreview card={card.item} allowFlip color="#1d1d1d" />
              ) : (
                <View style={styles.itemContainerEmpty}>
                  <View style={styles.itemEmpty}>
                    <Text text="Image not available" />
                  </View>
                </View>
              )}
            </View>
          );
        }}
      />
      {showNav.next && cards.length > 1 && (
        <View
          style={{ ...styles.navButtonWrapper, ...{ right: normalize(20) } }}
        >
          <Button
            style={styles.navButton}
            onPress={() => {
              ref.current?.next();
            }}
          >
            <NavLightIcon />
          </Button>
        </View>
      )}
    </View>
  );
};

export default CarsCarousel;
