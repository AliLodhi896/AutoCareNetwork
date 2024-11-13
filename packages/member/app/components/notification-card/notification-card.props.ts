export interface NotificationCardProps {
  notification: NotificationProp
}

export interface NotificationProp {
  id: string
  title: string
  customMessage?: string
  isRead?: boolean
  content: string
  date: string
}
