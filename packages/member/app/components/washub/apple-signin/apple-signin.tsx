/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacityProps } from "react-native";
import {
  appleAuth,
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import { on } from "events";
import { normalize } from "../../../../../shared/utils/normalize";

/**
 * You'd technically persist this somewhere for later use.
 */
let user = null;

/**
 * Fetches the credential state for the current user, if any, and updates state on completion.
 */
async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
  if (user === null) {
    updateCredentialStateForUser("N/A");
  } else {
    const credentialState = await appleAuth.getCredentialStateForUser(user);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      updateCredentialStateForUser("AUTHORIZED");
    } else {
      updateCredentialStateForUser(credentialState);
    }
  }
}

export interface IAppleAuth {
  firstName: string | null;
  lastName: string | null;
  email: string;
  user: string;
  authorizationCode: string;
}
interface Props extends TouchableOpacityProps {
  onLogin: (auth: IAppleAuth | null) => void;
  loading?: boolean;
  text: string;
}

export default function AppleSignin(props: Props) {
  const { onLogin, loading, text, ...rest } = props;

  const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);
  useEffect(() => {
    if (!appleAuth.isSupported) return;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch((error) =>
      updateCredentialStateForUser(`Error: ${error.code}`)
    );
  }, []);

  useEffect(() => {
    if (!appleAuth.isSupported) return;

    return appleAuth.onCredentialRevoked(async () => {
      console.warn("Credential Revoked");
      fetchAndUpdateCredentialState(
        updateCredentialStateForUser
      ).catch((error) => updateCredentialStateForUser(`Error: ${error.code}`));
    });
  }, []);

  async function onAppleButtonPress(updateCredentialStateForUser) {
    console.warn("Beginning Apple Authentication");

    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });


      const {
        user: newUser,
        email,
        fullName,
        nonce,
        identityToken,
        authorizationCode,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;

      user = newUser;

      fetchAndUpdateCredentialState(
        updateCredentialStateForUser
      ).catch((error) => updateCredentialStateForUser(`Error: ${error.code}`));

      if (identityToken) {
        onLogin({
          firstName: fullName?.givenName,
          lastName: fullName?.familyName,
          email: email,
          user: user,
          authorizationCode: authorizationCode,
        });

        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
      } else {
        // no token - failed sign-in?
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      console.warn(`Apple Authentication Completed, ${user}, ${email}`);
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn("User canceled Apple Sign in.");
      } else {
        console.error(error);
      }
    }
  }

  if (!appleAuth.isSupported) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text>Apple Authentication is not supported on this device.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.horizontal]}>
      <AppleButton
        style={styles.appleButton}
        cornerRadius={100}
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.CONTINUE}
        onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
      />
      {/* <AppleButton
        style={styles.appleButton}
        cornerRadius={5}
        buttonStyle={AppleButton.Style.WHITE_OUTLINE}
        buttonType={AppleButton.Type.CONTINUE}
        onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
      />
      <AppleButton
        style={styles.appleButton}
        cornerRadius={5}
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.CONTINUE}
        onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
      />
      <Text>Sign-in Styles</Text>
      <AppleButton
        style={styles.appleButton}
        cornerRadius={5}
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
      />
      <AppleButton
        style={styles.appleButton}
        cornerRadius={5}
        buttonStyle={AppleButton.Style.WHITE_OUTLINE}
        buttonType={AppleButton.Type.SIGN_IN}
        onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
      />
      <AppleButton
        style={styles.appleButton}
        cornerRadius={5}
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  appleButton: {
    width: "100%",
    height: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginVertical: normalize(15),
  },
  horizontal: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
