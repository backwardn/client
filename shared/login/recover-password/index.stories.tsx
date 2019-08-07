import * as React from 'react'
import * as Sb from '../../stories/storybook'
import * as ProvisionConstants from '../../constants/provision'
import RecoverPassword, {Props} from '.'

const rd = {
  cTime: 0,
  encryptKey: '',
  lastUsedTime: 0,
  mTime: 0,
  status: 0,
  verifyKey: '',
}

const commonProps: Props = {
  devices: [
    ProvisionConstants.rpcDeviceToDevice({
      ...rd,
      deviceID: '1',
      name: 'iPhone',
      type: 'mobile',
    }),
    ProvisionConstants.rpcDeviceToDevice({
      ...rd,
      deviceID: '2',
      name: 'Home Computer',
      type: 'desktop',
    }),
    ProvisionConstants.rpcDeviceToDevice({
      ...rd,
      deviceID: '3',
      name: 'Android Nexus 5x',
      type: 'mobile',
    }),
    ProvisionConstants.rpcDeviceToDevice({
      ...rd,
      deviceID: '4',
      name: 'tuba contest',
      type: 'backup',
    }),
  ],
  onResetAccount: Sb.action('onResetAccount'),
  onSelect: Sb.action('onSelect'),
}

const load = () => {
  Sb.storiesOf('Login/RecoverPassword', module).add('Device selection', () => (
    <RecoverPassword {...commonProps} />
  ))
}

export default load
