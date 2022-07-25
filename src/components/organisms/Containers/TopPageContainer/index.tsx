import React from 'react'
import { useStyles } from './style'

type Props = {
  left: React.ReactNode
  right: React.ReactNode
  ad: React.ReactNode
}

export default React.memo(function TopPageContainer({ left, right, ad }: Props) {
  const styles = useStyles()
  return (
    <div className={styles.container}>
      {left}
      {right}
      {ad}
    </div>
  )
})
