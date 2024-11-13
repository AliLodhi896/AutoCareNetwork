import React, { useCallback, useRef, useState } from "react"
import {
  View,
  Text as RNText,
  Pressable,
  Alert,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
} from "react-native"
import {
  DottedLine,
  Screen,
  Tabs,
  Text,
  VIcon,
} from "../../../../shared/components"
import { translate } from "../../i18n"
import { dashboardStyles } from "./dashboard.style"
import { color } from "../../../../shared/theme"
import moment from "moment"
import { palette } from "../../../../shared/theme/palette"
import DatePicker from "react-native-date-picker"
import WashubClient from "../../services/api/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import useModal from "../../../../shared/contexts/modal/useModal"
import { RequestLicenseUpdate } from "../../components/request-license-update/request-license-update"
import { Transaction } from "../../types"
import LoadingScreen from "../../../../shared/screens/loading-screen/loading-screen"
import { useAppState } from "../../context/app-state-context"
import { useNavigation } from "@react-navigation/native"
import { formatStandardTime, isToday } from "../../../../shared/utils/common"
import { CircleButton } from "../../../../shared/components/circle-button/circle-button"
import { BackButton } from "../../../../shared/components/back-button/back-button"
import ImageView from "../../../../shared/components/image-view/image-view"

const LICENSE_REQUEST_KEY = "LICENSE_REQUEST_KEY"
type TabKey = "Today" | "ThisWeek" | "ThisMonth" | "Custom"
type Tabs = Array<{ key: TabKey; value: string }>
const managerTabs: Tabs = [
  {
    value: translate("dashboard.today"),
    key: "Today",
  },
  {
    value: translate("dashboard.thisWeek"),
    key: "ThisWeek",
  },
  {
    value: translate("dashboard.thisMonth"),
    key: "ThisMonth",
  },
  {
    value: translate("dashboard.custom"),
    key: "Custom",
  },
]

const nonManagerTab: Tabs = [
  {
    value: translate("dashboard.today"),
    key: "Today",
  },
]

const VehicleDetailContent = ({
  transaction,
  requestLicensePlate,
  hasRequestedLP,
}) => {
  const modal = useModal()
  return (
    <View style={dashboardStyles.modalContainer}>
      <View style={dashboardStyles.modalTopContainer}>
        <>
          <View style={dashboardStyles.vehicleImageContainer}>
            <ImageView style={dashboardStyles.vehicleImage}>
              <Image
                style={dashboardStyles.vehicleImage}
                resizeMode="cover"
                source={{ uri: transaction.VehicleInfo.PhotoUrl }}
              />
            </ImageView>

            <Text style={dashboardStyles.customerVehicleDetails}>
              {translate("dashboard.customerVehicleDetails")}
            </Text>
          </View>

          <View style={dashboardStyles.line}>
            <DottedLine />
          </View>

          <View style={dashboardStyles.vehicleInfoContainer}>
            <View style={dashboardStyles.detailWrapperRight}>
              <View style={dashboardStyles.detailWrapperRightKey}>
                <Text style={dashboardStyles.detailText}>
                  {translate("dashboard.make")}:
                </Text>
                <Text style={dashboardStyles.detailText}>
                  {translate("dashboard.model")}:
                </Text>
                <Text style={dashboardStyles.detailText}>
                  {translate("common.color")}:
                </Text>
              </View>
              <View style={dashboardStyles.detailWrapperRightValue}>
                <Text style={dashboardStyles.valueText}>
                  {transaction.VehicleInfo.Make}
                </Text>
                <Text style={dashboardStyles.valueText}>
                  {transaction.VehicleInfo.Model}
                </Text>
                <Text style={dashboardStyles.valueText}>
                  {transaction.VehicleInfo.Color}
                </Text>
              </View>
            </View>

            <View style={dashboardStyles.licensePlateContainer}>
              <Pressable
                onPress={() => {
                  const canRequest = transaction && !hasRequestedLP(transaction)
                  if (canRequest) requestLicensePlate(transaction)
                }}
              >
                <Text>
                  {transaction.LicensePlate ? (
                    <>
                      <Text
                        fontFamily="secondary"
                        style={dashboardStyles.licensePlatedetailText}
                      >
                        {translate("dashboard.licensePlate")}:
                      </Text>
                      {"    "}
                      {transaction.LicensePlate}
                    </>
                  ) : hasRequestedLP(transaction) ? (
                    translate("dashboard.changeRequest")
                  ) : (
                    translate("dashboard.noLicensePlate")
                  )}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={dashboardStyles.modalBottomContainer}>
            <CircleButton
              innerText
              noText
              style={dashboardStyles.modalCircle}
              textStyle={dashboardStyles.modalText}
              text={translate("common.close")}
              onPress={() => {
                modal.hideModal()
              }}
              icon={
                <Image
                  style={dashboardStyles.closeIconsStyle}
                  source={require("../../../assets/images/close-icon.png")}
                />
              }
            />
          </View>
        </>
      </View>
    </View>
  )
}
export const DashboardScreen = () => {
  const [currentTab, setCurrentTab] = useState<TabKey>("Today")
  const { appState } = useAppState()
  const station = appState.selectedStation
  const isStart = useRef(false)
  const [startDate, setStartDate] = useState(new Date())
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [endDate, setEndDate] = useState(new Date())
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const modal = useModal()
  const navigation = useNavigation()
  const [
    requestedLicensePlateChange,
    setRequestedLicensePlateChange,
  ] = useState<string[]>([])

  const hasRequestedLP = React.useCallback((transaction: Transaction) => {
    const result =
      requestedLicensePlateChange.indexOf(String(transaction.TransactionId)) >
      -1
    return result
  }, [])
  const loadData = useCallback(async () => {
    setLoading(true)
    const results = await WashubClient.getMerchantTransactions({
      DateRange: currentTab,
      CustomStartDate: startDate.toLocaleDateString("en-US"),
      CustomEndDate: endDate.toLocaleDateString("en-US"),
    })
    setTransactions(results.response.data?.Transactions || [])
    setLoading(false)
  }, [currentTab, startDate, endDate])

  React.useEffect(() => {
    AsyncStorage.getItem(LICENSE_REQUEST_KEY).then((result) => {
      let data: string[] = []
      if (result) {
        data = result.split(",")
      }
      setRequestedLicensePlateChange(data)
    })
  }, [])
  const showTransactModal = React.useCallback(
    (transaction: Transaction) => {
      modal.showModal(
        <VehicleDetailContent
          transaction={transaction}
          requestLicensePlate={(trans) => {
            const { CardCode, LicensePlate, StationName, StationId } = trans
            modal.hideModal()
            const submit = async ({
              name,
              email,
              license,
              state,
            }: {
              name: string
              email: string
              license: string
              state: string
            }) => {
              const body = `<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr><strong style="font-size:16px;">Corrected License Plate Number - As per Car Wash Manager.</strong></tr>
      <tr><strong>Requestor Name:</strong> ${name}</tr>
      <tr><strong>Requestor Email:</strong> ${email}</tr>
      <tr><strong>Station ID:</strong> ${StationId}</tr>
      <tr><strong>Car Wash:</strong> ${StationName}</tr>
      <tr><strong>Card Code:</strong> ${CardCode}</tr>
      <tr><strong>License Plate:</strong> ${license}</tr>
      <tr><strong>State:</strong> ${state}</tr>

      </table>`

              const message = {
                MessageRecipient: "info@autocarenetwork.com",
                MessageSubject: "Corrected License Plate Number",
                MessageBody: body,
                MessageFormat: "html",
              }

              const { error } = await WashubClient.sendMessage(message)

              if (error) {
                Alert.alert("Error", error.message)
              } else {
                setRequestedLicensePlateChange([
                  ...requestedLicensePlateChange,
                  String(trans.TransactionId),
                ])
                AsyncStorage.setItem(
                  LICENSE_REQUEST_KEY,
                  requestedLicensePlateChange.join(",")
                )
                Alert.alert(
                  translate("dashboard.success"),
                  translate("dashboard.plateSuccessfullyChanged")
                )
              }
            }
            if (!LicensePlate) {
              modal.showModal(
                <RequestLicenseUpdate
                  onDone={(data) => {
                    console.warn("data is: ", data)
                    modal.hideModal()
                    submit(data)
                  }}
                />
              )
            }
          }}
          hasRequestedLP={hasRequestedLP}
        />
      )
    },
    [hasRequestedLP]
  )
  React.useEffect(() => {
    setTimeout(() => {
      loadData()
    }, 50)
  }, [currentTab, loadData, startDate, endDate])

  const tabs = station?.IsManager ? managerTabs : nonManagerTab

  const tableData = React.useMemo(() => {
    return transactions.reduce(
      (acc, ele) => {
        const date = new Date(ele.DateTime)
        const dateStyle = [
          dashboardStyles.listText,
          isToday(date) && { color: color.palette.green },
        ]

        acc.dateList.push(
          <View style={dashboardStyles.dateWrapper}>
            <Text style={dateStyle}>
              {date.toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })}
            </Text>
            <Text style={dateStyle}>
              {formatStandardTime(date).toLocaleLowerCase()}
            </Text>
          </View>
        )

        acc.cardCodeList.push(
          <Text style={dashboardStyles.listText}>{ele.CardCode}</Text>
        )

        acc.dealerList.push(
          <Text style={dashboardStyles.listText}>
            {ele.DealerName || translate("dashboard.noDealer")}
          </Text>
        )
        acc.vehicleImageList.push(
          <VIcon
            name="camera"
            family="Feather"
            onPress={() => showTransactModal(ele)}
            style={
              {
                fontSize: 35,
              } as any
            }
          />
        )

        return acc
      },
      {
        dateList: [],
        cardCodeList: [],
        dealerList: [],
        vehicleImageList: [],
      }
    )
  }, [transactions])

  const ListHeader = ({ name }: { name: string }) => {
    const headerText = {
      dateList: translate("dashboard.date/time"),
      cardCodeList: translate("dashboard.card"),
      dealerList: translate("dashboard.dealership"),
      vehicleImageList: translate("dashboard.vehicleImage"),
    }
    return (
      <View style={dashboardStyles.tableHead}>
        <Text style={dashboardStyles.headerText}>{headerText[name]}</Text>
      </View>
    )
  }

  const RenderListItem = ({ item, index }) => {
    return (
      <View
        style={{
          ...dashboardStyles.listItem,
          backgroundColor: index % 2 == 0 ? palette.white : palette.darkGray,
        }}
      >
        {item}
      </View>
    )
  }

  return (
    <ImageBackground
      style={{
        flex: 1,
        padding: 15,
        paddingTop: Platform.select({
          ios: 40,
          default: 40
        }),
        backgroundColor: color.palette.lightBlackBackground,
      }}
      source={require("../../../../assets/images/pattern-merchant.png")}
    >
        <View style={dashboardStyles.header}>
          <BackButton
            noPadding
            type="close"
            color={color.palette.white}
            text={translate("common.close")}
            onPress={navigation.goBack}
          />
          <Pressable
            onPress={loadData}
            style={[dashboardStyles.headerIconContainer]}
          >
            <Text style={dashboardStyles.refreshText}>
              {translate("common.refresh")}
            </Text>
            <Image
              style={dashboardStyles.refreshIconStyle}
              source={require("../../../assets/images/refresh-icon.png")}
            />
          </Pressable>
        </View>

        <View style={dashboardStyles.topContainer}>
          <Text fontFamily="primary" style={dashboardStyles.title}>
            {translate("dashboard.title")}
            <RNText style={dashboardStyles.dotText}>.</RNText>
          </Text>
          <Tabs<TabKey>
            tabs={tabs}
            textCenter
            onChange={(value) => setCurrentTab(value)}
            value={currentTab}
          />
          {currentTab === "Custom" ? (
            <View style={dashboardStyles.dateRangeContainer}>
              <Pressable
                onPress={() => {
                  isStart.current = true
                  setVisible(true)
                }}
              >
                <Text style={dashboardStyles.timeLabelText}>
                  {translate("dashboard.startDate")}
                </Text>
                <Text>{moment(startDate).format("YYYY-MM-DD")}</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  isStart.current = false
                  setVisible(true)
                }}
              >
                <Text style={dashboardStyles.timeLabelText}>
                  {translate("dashboard.endDate")}
                </Text>
                <Text>{moment(endDate).format("YYYY-MM-DD")}</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
        {visible ? (
          <DatePicker
            modal
            mode="date"
            date={isStart?.current ? startDate : endDate}
            maximumDate={
              isStart?.current
                ? endDate
                : moment(
                  startDate
                ).add(99, "days").toDate()
            }
            minimumDate={
              !isStart?.current
                ? startDate
                : moment(endDate).subtract(99, "days").toDate()
            }
            onConfirm={(date) => {
              isStart.current ? setStartDate(date) : setEndDate(date)
              setVisible(false)
            }}
            onCancel={() => {
              setVisible(false)
            }}
            open={visible}
          />
        ) : null}
        {tableData.dateList.length > 0 && (
          <ScrollView contentContainerStyle={dashboardStyles.listContainer}>
            {loading ? (
              <LoadingScreen
                style={{
                  backgroundColor: color.transparent,
                  minHeight: tableData.dateList.length * 100 + 50,
                }}
              />
            ) : (
              Object.keys(tableData).map((key, index) => {
                return (
                  <View
                    style={[
                      { flex: 1 },
                      key !== "dateList"
                        ? {
                            borderLeftColor: color.palette.red,
                            borderLeftWidth: 0.5,
                          }
                        : {},
                    ]}
                    key={index}
                  >
                    <>
                      <ListHeader name={key} />
                      {tableData[key].map((item: any, listkey: number) => {
                        return (
                          <RenderListItem
                            index={listkey}
                            key={`${listkey}-${key}`}
                            item={item}
                          />
                        )
                      })}
                    </>
                  </View>
                )
              })
            )}
          </ScrollView>
        )}
    </ImageBackground>
  )
}
