import React, {
  createContext,
  ReactNode,
  useRef,
  useState,
} from "react"
import { useWindowDimensions, View, Platform } from "react-native"
import Modal from "react-native-modal"

interface ModalSupportedProps {
  backdropOpacity?: number
}
export interface WashubModalProps {
  visible: boolean
  showModal: (body: ReactNode, configs?: { onHide?: () => void, modalProps?: ModalSupportedProps }) => void
  hideModal: () => void
}
interface Props {
  children?: ReactNode
}

const defaultValues: WashubModalProps = {
  visible: false,
  showModal: () => {
    // eslint-disable-next-line no-console
    console.log("showModal not implemented")
  },
  hideModal: () => {
    // eslint-disable-next-line no-console
    console.log("hideModal not implemented")
  },
}

const ModalContext = createContext(defaultValues)

const { Provider } = ModalContext

function ModalProvider({ children }: Props) {
  const [visible, setVisible] = useState(false)
  const [modalContent, setModalContent] = useState<ReactNode>(<View/>)
  const onHideModalRef = useRef<() => void>()
  const modalPropsRef = useRef<ModalSupportedProps>({})
  const screenDimensions = useWindowDimensions()

  function showModal(body: ReactNode, options?: { onHide?: () => void, modalProps?: ModalSupportedProps }) {
    setVisible(true)

    const onHide = async () => {
      await options?.onHide?.()
      modalPropsRef.current.backdropOpacity = 0.85
    }

    onHideModalRef.current = onHide

    if (options?.modalProps) {
      modalPropsRef.current = options.modalProps
    }
    if (body) {
      setModalContent(body)
    }
  }
  function hideModal() {
    setVisible(false)
    onHideModalRef.current?.()
    onHideModalRef.current = () => {}
  }
  const {height, width} = useWindowDimensions()
  return (
    <Provider value={{ visible, showModal, hideModal }}>
      {children}
    
      <Modal
        animationIn="fadeInLeft"
        animationOut={"fadeOutRight"}
        animationInTiming={500}
        animationOutTiming={500}
        propagateSwipe
        accessibilityViewIsModal
        backdropTransitionOutTiming={0}
        onDismiss={hideModal}
        backdropOpacity={0.85}
        isVisible={visible}
        style={{
          alignItems: "center",
          justifyContent: "center",
          width:'100%'
        }}
        onBackdropPress={hideModal}
        statusBarTranslucent={true}
        deviceHeight={screenDimensions.height}
        deviceWidth={screenDimensions.width}
        useNativeDriver={false}
        avoidKeyboard
        {...modalPropsRef?.current}
      >
        {modalContent}
      </Modal>
    </Provider>
  )
}

export { ModalContext, ModalProvider }
