import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View, LayoutAnimation } from "react-native";
import { Text } from "../../../../../shared/components/text/text";
import { styles } from "./profile-drawer.style";
import { useAuthState } from "../../../../../shared/contexts/auth-state-context";
import ArrowDown from "../../svg/arrow-down";
import ArrowUp from "../../svg/arrow-up";
import { ProfileHead } from "./profile-head";
import { useAppState } from "../../../context/app-state-context";
import AccountVehicles from "./account/account-vehicles";
import AccountPlans from "./account/account-plans";
import { ICardStatus } from "../../../washub-types";
import AccountProfile from "./account/account-profile";
import AccountPlanHisotry from "./account/account-plan-history";
import { Card } from "../../../services/api";
import analytics from "@react-native-firebase/analytics";
import WashubClient from "../../../services/api/api";
import PermissionPopup from "../permission-popup/permission-popup";
import InfoPopup from "../popup/info-popup";

interface IMenuItem {
  id: number;
  title: string;
  component: JSX.Element | null;
}
export enum MENU_ID {
  MY_PLANS = 1,
  MY_VEHICLES = 2,
  MEMBERSHIP_HISTORY = 3,
  MY_PROFILE = 4,
  MY_MEMBER_NUMBERS = 5,
}
const CUSTOM_MENU = [MENU_ID.MY_PLANS];

export const ProfileDrawer = ({ navigation }) => {
  const { authState } = useAuthState();
  const { appState } = useAppState();
  const [activeCards, setActiveCards] = useState<any>([]);
  const [expireCards, setExpireCards] = useState<any>([]);
  const [addVinNumberFromApp, setAddVinNumberFromApp] = useState<any>(null);

  const [infoPopup, setInfoPopup] = useState(true);

  const [openNewMembership, setOpenNewMembership] = useState<boolean>(false);
  const [addVinNumberCard, setAddVinNumberCard] = useState<Card | null>(null);
  let value = 0

  const fetchCards = async () => {
    try {
      const cardResult = await WashubClient.getCards();
      if (!cardResult.error) {
        const newCards = cardResult.result?.Cards || [];
        if (newCards.length > appState.cards.length) {
          if (newCards.length > appState.cards.length && addVinNumberFromApp == null) {
            setAddVinNumberFromApp('Web')
          }
          if (newCards.length > appState.cards.length && (addVinNumberFromApp == 'App' || addVinNumberFromApp == null)) {
            setInfoPopup(true)
          } else {
            setInfoPopup(false)
          }
          console.log('new cards updated')
          appState.cards = newCards

        }
        const availableCards = appState.cards?.filter(
          (c) => c.CardStatus === ICardStatus.Active
        );
        const expiredCardsData = appState.cards?.filter(
          (c) => c.CardStatus !== ICardStatus.Active
        );
        setExpireCards(expiredCardsData)

        setActiveCards(availableCards)

      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(fetchCards, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // const expiredCards = appState.cards?.filter(
  //   (c) => c.CardStatus !== ICardStatus.Active
  // );

  // const availableCards = appState.cards?.filter(
  //   (c) => c.CardStatus === ICardStatus.Active
  // );

  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  useEffect(() => {
    const expiredCards = appState.cards?.filter(
      (c) => c.CardStatus !== ICardStatus.Active
    );

    const availableCards = appState.cards?.filter(
      (c) => c.CardStatus === ICardStatus.Active
    );

    setExpireCards(expiredCards)
    setActiveCards(availableCards)

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return () => {
      setActiveMenu(null);
      setOpenNewMembership(false);
      setAddVinNumberCard(null);
    };
  }, []);

  const toggleAddNew = (show) => {
    setActiveMenu(MENU_ID.MY_PLANS);
    setOpenNewMembership(show);
  };

  const toggleAddVin = (card) => {
    setActiveMenu(MENU_ID.MY_PLANS);
    setAddVinNumberCard(card);
  };

  const closeDrawer = async (refetch?: boolean) => {
    // await analytics().logEvent('screen_view', {
    //   screen_name: 'My Plans',
    // });
    navigation.closeDrawer();
    setActiveMenu(null);
  };

  const menuItems: IMenuItem[] = [
    {
      id: MENU_ID.MY_PLANS,
      title: "My Plans",
      component: (
        <AccountPlans
          cards={activeCards}
          openNew={openNewMembership}
          addVinNumberCard={addVinNumberCard}
          handleClose={() => closeDrawer(true)}
          setAddVinNumberFromApp={setAddVinNumberFromApp}
        />
      ),
    },
    {
      id: MENU_ID.MY_VEHICLES,
      title: "My vehicles",
      component: (
        <AccountVehicles
          cards={activeCards}
          handleAddNew={toggleAddNew}
          handleAddVin={toggleAddVin}
        />
      ),
    },
    {
      id: MENU_ID.MEMBERSHIP_HISTORY,
      title: "My Plan History",
      component: <AccountPlanHisotry cards={expireCards} />,
    },
    {
      id: MENU_ID.MY_PROFILE,
      title: "My Profile",
      component: <AccountProfile user={authState.profile} />,
    },
  ];
  const renderMenuItem = ({ item }) => {
    return (
      <>
        <InfoPopup
          modalVisible={!infoPopup}
          setModalVisible={() => { setInfoPopup(true) }}
          onPress={() => { setInfoPopup(true) }}
          text={'Voucher card has been added by Autocare Network.'}
          textBottom={'To access dealer specials for app users, turn on push notifications under settings'}
        />
        <Pressable
          style={styles.menuCard}
          onPress={async () => {
            console.log('test id',item.id)
            await analytics().logEvent('screen_view', {
              screen_name: item?.id == 1 ? 'My Profile - My Plans' : item?.id == 2 ? 'My Profile - My Vehicles' : item?.id == 3 ? 'My Profile - Membership History' : 'My Profile',
            });
              console.log('My Plans even logged')
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setActiveMenu(item.id === activeMenu ? null : item.id);
          }}
        >
          <Text style={styles.menuCardText}>{item.title.toUpperCase()}</Text>
          {item.id === activeMenu ? <ArrowDown /> : <ArrowUp />}
        </Pressable>
        {item.id === activeMenu && item.component}
      </>
    );
  };

  if (authState.profile === null) return <></>;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, justifyContent: "flex-end" }}>
        <ProfileHead
          user={authState.profile}
          handleClose={() => closeDrawer()}
        />
      </View>
      <View style={[styles.container, { flex: 12 }]}>
        {CUSTOM_MENU.includes(activeMenu) ? (
          <View style={styles.customMenu}>
            <View style={styles.customTop}>
              <Pressable
                onPress={() => {
                  toggleAddNew(false);
                  toggleAddVin(false);
                  setActiveMenu(null);
                }}
                style={styles.backContainer}
              >
                <Text
                  style={{ ...styles.backButton, ...styles.backButtonXS }}
                  text="<"
                />
                <Text style={styles.backButton} text="BACK" />
              </Pressable>
            </View>
            <View style={styles.customBody}>
              {menuItems.find((m) => m.id === activeMenu).component}
            </View>
          </View>
        ) : (
          <FlatList
            style={styles.flatList}
            data={menuItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMenuItem}
          />
        )}
      </View>
    </View>
  );
};
