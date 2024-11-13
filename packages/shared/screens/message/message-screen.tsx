import React, { useState } from "react";
import { useEffect } from "react";
import { View, Linking } from "react-native";
import { WebView } from "react-native-webview";
import { styles } from "./message-screen.styles";
import { Circle } from "react-native-progress";
import { Api } from "../../services/api"


type Props = {
  visible: boolean;
  client: Api
  endpoint: string | null;
  onClose: () => void;
};

const CLOSE_URL = "anit://close";

const CONTAINER_HEIGHT = 400;

const INJECTED_JAVASCRIPT = `(function() {
  window.ReactNativeWebView.postMessage(JSON.stringify(document.documentElement.scrollHeight));
})();`;

const generateHTML = (body: string) => {
  return `
  <!DOCTYPE html>\n
<html>
  <head>
    <title>Hello World</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 70% arial, sans-serif;
        background: transparent;
      }
    </style>
  </head>
  <body>
    <div>${body}
      <div style="display: flex; justify-content: center;">
        <a style="font-size: 22px; 
                  margin: 16px;
                  margin-top: 20px;
                  text-decoration: none;
                  background: #36B2F5;
                  color: white;
                  padding: 10px;
                  width: 140px;
                  text-align: center;
                  border-radius: 44px;"
            href="${CLOSE_URL}">CLOSE</a>
      </div>
    </div>
  </body>
</html>
  `;
};

export default function CustomMessageComponent(props: Props) {
  const { visible, endpoint, onClose } = props;

  const [html, setHtml] = useState(null);

  const [scrollHeight, setScrollHeight] = useState(0);
  const [contentOffset, setContentOffset] = useState(0);

  const indicatorRatio = scrollHeight > 0 ? CONTAINER_HEIGHT / scrollHeight : 1;
  const indicatorVisible = indicatorRatio < 1;
  const indicatorHeight = CONTAINER_HEIGHT * indicatorRatio;

  const totalScrollable = scrollHeight - CONTAINER_HEIGHT;
  const offsetRatio = contentOffset / totalScrollable;
  const maxOffset = CONTAINER_HEIGHT - indicatorHeight;
  const effectiveOffset = maxOffset * offsetRatio;

  useEffect(() => {
    setContentOffset(0);
    setScrollHeight(0);
    setHtml(null);
  }, [visible]);

  useEffect(() => {
    if (!endpoint) {
      return;
    }

    props.client.fetchEndpoint(endpoint).then(({ result, error }) => {
      if (error) {
        console.error(error);
      }
      if (result) {
        setHtml(result.custom_message);
      }
    });
  }, [endpoint]);

  const onMessage = (msg: any) => {
    const height = parseInt(msg.nativeEvent.data ?? 0, 10);
    setScrollHeight(height);
  };

  return (
    <View style={styles.messageWrapper}>
      {!html && <Circle style={styles.loader} size={40} indeterminate={true} />}
      {html && (
        <>
          <WebView
            key="custom_message"
            originWhitelist={["*"]}
            source={{
              html: generateHTML(html ?? ""),
            }}
            showsVerticalScrollIndicator={false}
            onScroll={(e) => {
              setScrollHeight(e.nativeEvent.contentSize.height);
              setContentOffset(e.nativeEvent.contentOffset.y);
            }}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            onMessage={onMessage}
            onShouldStartLoadWithRequest={(request) => {
              // Only allow navigating within this website

              if (request.url === CLOSE_URL) {
                onClose();
                return false;
              }

              if (request.url === "about:blank") {
                return true;
              }
              try {
                Linking.openURL(request.url);
              } catch (e) {
                console.error(e);
              }
              return false;
            }}
            containerStyle={styles.webContainer}
          />
          {indicatorVisible && (
            <View pointerEvents="none" style={styles.scrollTray}>
              <View
                style={[
                  styles.scrollIndicator,
                  { height: indicatorHeight, top: effectiveOffset },
                ]}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
}
