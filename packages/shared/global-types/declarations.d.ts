import type { ViewProps as _ViewProps, ReactNode as _ReactNode } from "react-native"

declare module "*.svg" {
  import React from "react"
  import { SvgProps } from "react-native-svg"
  const content: React.FC<SvgProps>
  export default content
}
declare module "react-native" {
  interface ViewProps extends Omit<_ViewProps, "children"> {
    children?: Exclude<React.ReactNode, {}>
  }

  export type ReactNode = ViewProps["children"]
}

declare module "react" {
  export type ReactNode = _ReactNode
}