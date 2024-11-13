import { Platform, Share } from "react-native";
import { Card } from "./api.types";


export function getWashText(card?: Card): string {
    const washCount = card?.WashesAvailable ?? 0;
    if (washCount > 0) {
        const washText = washCount === 1 ? 'Wash' : 'Washes';
        return `${washCount} ${washText} Available`;
    } else if (card?.CanWashToday) {
        return 'Wash Available Today!';
    }
    return 'No Washes Available';
}

export function getMemberNumber(card: Card): string {
    return card.CardCode ? `${card.CardCode}` : card.DealerBundleMemberNumber;
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
            charArr.push(' ');
        }
        charArr.push(char);
    }
    return charArr.reverse().join('');
}

export const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };