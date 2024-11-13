import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { Alert, Linking, Platform, StyleSheet } from "react-native";
import { Location } from "../global-types";
import { Card, isDealerBundleApp } from "../services/api";
import { color, spacings } from "../theme";

export const WASHUB_TEL_URL = "tel:(877) 365-WASH";
export const WASHUB_SMS_NUMBER = "516-226-7616";
export const WASHUB_EMAIL = "info@autocarenetwork.us";

export function contactViaPhone(
  message: string = "loginScreen.contactWashub",
  details: string = "Please call (877) 365-WASH (9274)"
) {
  const showPrompt = () => {
    Alert.alert(message, details, [{ text: "OK" }]);
  };

  Linking.canOpenURL(WASHUB_TEL_URL)
    .then((supported) => {
      if (!supported) {
        showPrompt();
      } else {
        Linking.openURL(WASHUB_TEL_URL).catch(showPrompt);
      }
    })
    .catch(showPrompt);
}

const APP_ID_KEY = "APP_ID_KEY";

export async function getAppID(): Promise<string> {
  let appId = await AsyncStorage.getItem(APP_ID_KEY);
  if (!appId) {
    appId = uuidv4();
    await AsyncStorage.setItem(APP_ID_KEY, appId);
  }
  return appId;
}
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function showError(error: string): void {
  Alert.alert("Error", error, [{ text: "OK" }]);
}

export function toTitleCase(str?: string | null): string | null {
  if (!str) {
    return null;
  }
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function getMemberNumber(card: Card): string {
  return card.CardCode ? `${card.CardCode}` : card.DealerBundleMemberNumber;
}


export function isToday(date: Date | null): boolean {
  if (!date) {
    return false;
  }
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function getCityStateZip(location: Location): string {
  return `${location.LocationCity}, ${location.LocationState} ${location.LocationZip}`;
}

export function showNoWashError(): void {
  Alert.alert(
    "Sorry",
    "No Washes Available Today \n Check Card For Plan Details",
    [{ text: "OK" }]
  );
}

export function formatStandardTime(date: Date): string | undefined {
  // fetch
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // calculate
  let timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
  } else if (hours > 12) {
    timeValue = "" + (hours - 12);
  } else if (hours === 0) {
    timeValue = "12";
  }

  timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
  timeValue += seconds < 10 ? ":0" + seconds : ":" + seconds; // get seconds
  timeValue += hours >= 12 ? " PM" : " AM"; // get AM/PM
  return timeValue;
}

export function hasWashes(cards: Card[]): boolean {
  return !!cards?.find((c) => c.CanWashToday);
}

export function validateWash(cards: Card[]): boolean {
  if (hasWashes(cards)) {
    return true;
  }

  Alert.alert(
    "Sorry",
    "Your account does not have any washes available to redeem.\n\nQuestions? Contact Washub: (877) 365-WASH (9274)",
    [{ text: "OK" }]
  );

  return false;
}

export function getAppName(): string {
  return isDealerBundleApp() ? "Dealer Bundle" : "Washub";
}

export const getNotificationPayloadKey = (notification: any, key: string) => {
  const data = notification.data ?? {};
  return data[key] || notification[key];
};

export function openDirections(destination: string): void {
  let url: string;
  if (Platform.OS === "ios") {
    url =
      "https://maps.apple.com/maps?saddr=Current Location&daddr=" + destination;
  } else {
    url =
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURI(destination);
    console.log(url);
  }

  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  });
}

export function formattedCode(code: string): string {
  const charArr = [];
  let codeStr = String(code);
  if (codeStr.length === 8) {
    codeStr = codeStr.substr(2, codeStr.length);
  }
  for (let index = 0; index <= codeStr.length; index++) {
    const char = codeStr[codeStr.length - (index + 1)];
    if (index % 3 === 0) {
      charArr.push(" ");
    }
    charArr.push(char);
  }
  return charArr.reverse().join("");
}

export function addThreeMonth(d: moment.Moment) {
  var fm = moment(d).add(3, "M");
  var fmEnd = moment(fm).endOf("month");
  return d.date() != fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
    ? fm.add(1, "d")
    : fm;
}

export function showMileage(d: string) {
  const competedDate = addThreeMonth(moment(d));
  return moment().isAfter(competedDate);
}

export const getInitialValue = (
  requiredFields: string[],
  hasRequiredFields: boolean
) => {
  const showField = (name: string) => {
    if (hasRequiredFields) {
      return requiredFields.includes(name);
    }

    return true;
  };

  if (hasRequiredFields) {
    const value = {};
    if (showField("MemberNumber") || showField("CardCode")) {
      value["registrationCode"] = "";
    }
    if (showField("FirstName")) {
      value["firstName"] = "";
    }
    if (showField("LastName")) {
      value["lastName"] = "";
    }
    if (showField("Email")) {
      value["email"] = "";
    }
    if (showField("Phone")) {
      value["phoneNumber"] = "";
    }
    if (showField("ZipCode")) {
      value["zipCode"] = "";
    }
    if (showField("Password")) {
      value["password"] = "";
      value["confirmPassword"] = "";
    }
    return value;
  } else {
    return {
      registrationCode: "",
      firstName: "",
      lastName: "",
      zipCode: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    };
  }
};

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}


export const backgroundImage = (merchant: boolean) => merchant ? require("./../../assets/images/pattern-merchant.png") : require("./../../assets/images/pattern-member.png")

export const cardStyles = StyleSheet.create({
  card: {
    marginHorizontal: spacings.small,
    borderWidth: spacings.tiny - 1,
    borderColor: color.palette.red,
    borderRadius: spacings.borderRadius.smaller,
    height: spacings.cardHeight,
    backgroundColor: color.palette.white,
    paddingVertical: spacings.medium,
    paddingHorizontal: spacings.medium,
  },
});

export const shadower = (elevation: number): Record<string, unknown> => {
  return {
    shadowOpacity: 0.15,
    shadowOffset: {
      height: 3,
    },
    shadowRadius: 1,
    elevation: elevation ? elevation : 6,
  };
};

export const generateHTML = (body: String) => {
  return `
  <!DOCTYPE html>\n
  <html>
    <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=320, user-scalable=no">
      <style type="text/css">
      body {
        margin: 0;
        padding: 10px;
        font: 100% arial, sans-serif;
        background: transparent!important;
      }
      </style>
    </head>
    <body>
      <div>${body}</div>
    </body>
  </html>
  `;
};


export function formatToPhone(phoneNumberString: string) {
  
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "")
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3]
  }
  return phoneNumberString
}