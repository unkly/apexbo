import React from 'react'
import ActionButton from 'components/molecules/Button/Action'
import { useStyles } from './style'
import { useSelector } from 'react-redux'
import { RootState } from 'components/redux'

type Props = {
  docId: string
  uid: string
}

export default React.memo(function ActionButtonSet({ docId, uid }: Props) {
  const styles = useStyles()
  const { user } = useSelector(({ user }: RootState) => user)

  if (user?.uid === uid) {
    return (
      <div className={styles.actionButtonsContainer}>
        <ActionButton type="Like" docId={docId} uid={uid} />
        <ActionButton type="Other" docId={docId} uid={uid} />
      </div>
    )
  } else {
    return (
      <div className={styles.actionButtonsContainer}>
        <ActionButton type="Message" docId={docId} uid={uid} />
        <ActionButton type="Like" docId={docId} uid={uid} />
        <ActionButton type="Follow" docId={docId} uid={uid} />
        <ActionButton type="Other" docId={docId} uid={uid} />
      </div>
    )
  }
})
