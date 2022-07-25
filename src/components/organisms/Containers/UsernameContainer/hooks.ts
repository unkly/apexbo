import { useCallback, useState, useEffect } from 'react'
import { auth, db } from 'libs/firebase'
import { actions } from 'components/redux/User'
import { actions as modalActions } from 'components/redux/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'components/redux'
import { doc, updateDoc } from 'firebase/firestore'
import { useAlert } from 'components/molecules/Alert'

type Props = {
  checkedIds: number[]
}

export function useInjection({ checkedIds }: Props) {
  const [name, setName] = useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(({ user }: RootState) => user)
  const { isOpenAttr } = useSelector(({ modal }: RootState) => modal)
  const [disabled, setDisabled] = useState<boolean>(true)
  const showAlert = useAlert()

  const maxLen = 20

  useEffect(() => {
    if (isOpenAttr && user?.uid && !user.emailVerified) {
      showAlert({ text: 'アカウント認証メールを送信しました。', animationTime: 5 })
    }
  }, [])

  useEffect(() => {
    setDisabled(!(name.length > 0) || false)
  }, [name])

  const onChangeName = useCallback(e => {
    setName(e.target.value)
  }, [])

  const onClickSubmit = useCallback(async () => {
    const userRef = doc(db, 'users', user!.uid)
    if (auth.currentUser) {
      await updateDoc(userRef, {
        username: name,
        platforms: checkedIds,
      })
        .then(() => {
          dispatch(
            actions.setUserData({
              username: name,
              platforms: checkedIds,
            }),
          )
          dispatch(modalActions.setAttrModal(false))
          showAlert({ text: 'ようこそ！', animationTime: 8 })
        })
        .catch(e => {
          console.log(e.code)
          showAlert({ text: 'プロフィール更新に失敗', animationTime: 5 })
        })
    }
  }, [name, checkedIds])

  const onCloseModal = useCallback(() => {
    dispatch(modalActions.setAttrModal(false))
  }, [])

  return {
    name,
    onChangeName,
    onClickSubmit,
    user,
    navigate,
    maxLen,
    disabled,
    isOpenAttr,
    onCloseModal,
  }
}
