import React from 'react'
import { useStyles } from './style'
import { LeftArrowIconWhite } from 'components/atoms/Icon'
import EmailInput from 'components/molecules/Input/Email'
import { useInjection } from './hooks'
import Modal from 'react-modal'

export default React.memo(function ForgotPasswordContainer() {
  const {
    email,
    onChangeEmail,
    onPressSubmit,
    errorText,
    disabled,
    onClickBackButton,
    onKeyDown,
    isOpenPasswordReset,
    onCloseModal,
  } = useInjection()
  const styles = useStyles({ disabled })
  return (
    <Modal
      isOpen={isOpenPasswordReset}
      onRequestClose={onCloseModal}
      appElement={document.getElementById('root') as HTMLElement}
      className={styles.container}
      overlayClassName={styles.overlay}>
      <div className={styles.container} onKeyDown={onKeyDown}>
        <div className={styles.top}>
          <img src={LeftArrowIconWhite} alt="" className={styles.img} onClick={onClickBackButton} />
          <h1 className={styles.topLabel}>パスワード再設定</h1>
        </div>
        <div className={styles.label}>
          <p>入力されたメールアドレスにパスワード再設定専用フォームのリンクが送信されます</p>
        </div>
        <div className={styles.emailLabel}>
          <p className={styles.emailAddressLabel}>メールアドレス</p>
          <p className={styles.errorMsg}>{errorText}</p>
        </div>
        <EmailInput
          type="border"
          value={email}
          onChange={onChangeEmail}
          style={styles.emailInput}
          placeholder="メールアドレスを入力"
        />
        <button className={styles.submit()} onClick={onPressSubmit} disabled={disabled}>
          再設定用リンクを送信
        </button>
      </div>
    </Modal>
  )
})
