import * as React from 'react'
import {noop} from 'lodash-es'
import * as Kb from '../common-adapters/index'
import * as Styles from '../styles'
import {getStyle as getTextStyle} from '../common-adapters/text'

type Props = {
  onChangeText: (newText: string) => void
  onClear: () => void
  onEnterKeyDown: () => void
  onDownArrowKeyDown: () => void
  onUpArrowKeyDown: () => void
  onBackspace: () => void
  placeholder: string
  searchString: string
}

const handleKeyDown = (preventDefault: () => void, ctrlKey: boolean, key: string, props: Props) => {
  switch (key) {
    case 'p':
      if (ctrlKey) {
        preventDefault()
        props.onUpArrowKeyDown()
      }
      break
    case 'n':
      if (ctrlKey) {
        preventDefault()
        props.onDownArrowKeyDown()
      }
      break
    case 'Tab':
    case ',':
      preventDefault()
      props.onEnterKeyDown()
      break
    case 'ArrowDown':
      preventDefault()
      props.onDownArrowKeyDown()
      break
    case 'ArrowUp':
      preventDefault()
      props.onUpArrowKeyDown()
      break
    case 'Backspace':
      props.onBackspace()
      break
  }
}

// xxx todo ref-focus like new-input.tsx
const Input = (props: Props) => (
  <Kb.Box2 direction="horizontal" style={styles.container}>
    <Kb.Icon
      color={Styles.globalColors.black_50}
      type="iconfont-search"
      fontSize={getTextStyle('BodySemibold').fontSize}
      style={styles.icon}
    />
    <Kb.PlainInput
      autoFocus={true}
      style={styles.input}
      placeholder={props.placeholder}
      placeholderColor={Styles.globalColors.black_50}
      onChangeText={props.onChangeText}
      value={props.searchString}
      textType="BodySmallSemibold"
      maxLength={50}
      onEnterKeyDown={props.onEnterKeyDown}
      onKeyDown={e => {
        handleKeyDown(() => e.preventDefault(), e.ctrlKey, e.key, props)
      }}
      onKeyPress={e => {
        handleKeyDown(noop, false, e.nativeEvent.key, props)
      }}
    />
    <Kb.Box2 direction="vertical" style={{marginLeft: 'auto'}}>
      {!!props.searchString && (
        <Kb.Icon
          color={Styles.globalColors.black_50}
          type="iconfont-remove"
          onClick={props.onClear}
          fontSize={getTextStyle('BodySemibold').fontSize}
          style={styles.icon}
        />
      )}
    </Kb.Box2>
  </Kb.Box2>
)

const styles = Styles.styleSheetCreate({
  container: Styles.platformStyles({
    common: {
      alignItems: 'center',
      backgroundColor: Styles.globalColors.black_10,
      borderRadius: 4,
      flex: 1,
      margin: Styles.globalMargins.tiny,
      marginLeft: Styles.globalMargins.xsmall,
      marginRight: Styles.globalMargins.xsmall,
      ...Styles.padding(Styles.globalMargins.tiny, Styles.globalMargins.xtiny),
    },
  }),
  icon: {
    marginLeft: Styles.globalMargins.tiny,
    marginRight: Styles.globalMargins.tiny,
  },
  input: Styles.platformStyles({
    common: {
      backgroundColor: Styles.globalColors.transparent,
    },
    isElectron: {
      height: 14,
    },
  }),
})

export default Input
