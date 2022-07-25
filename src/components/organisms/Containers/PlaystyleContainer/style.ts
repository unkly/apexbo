import { css } from '@emotion/css'
import { Colors } from 'constant'

type GetStyleProps = {
  index?: number
  checked?: boolean
}

export function useStyles() {
  const labelContainer = css`
    display: flex;
    font-size: 14px;
    font-weight: 500;
    color: ${Colors.GREY};
    margin-top: 38px;
  `

  const buttonContainer = css`
    display: flex;
    align-items: center;
  `

  const buttonImg = css`
    width: 18px;
    height: 18px;
    margin-right: 8px;
  `

  return {
    labelContainer,
    buttonContainer,
    buttonImg,
  }
}

const baseButton = css`
  display: flex;
  align-items: center;
  color: ${Colors.PORPOISE};
  font-size: 14px;
  font-weight: 400;
  padding: 6px 16px;
  background-color: ${Colors.EERIE_BLACK};
  border: none;
  border-radius: 8px;
  margin: 16px 16px 0 0;
  cursor: pointer;
`

export function getStyles({ index, checked }: GetStyleProps) {
  const button = () => {
    if (checked) {
      switch (index) {
        case 0:
          return css`
            ${baseButton}
            background-color: ${Colors.GREEN};
            color: ${Colors.WHITE};
          `
        case 1:
          return css`
            ${baseButton}
            background-color: ${Colors.RED};
            color: ${Colors.WHITE};
          `
      }
    } else {
      return css`
        ${baseButton}
      `
    }
  }
  return {
    button,
  }
}
