import { IconButton } from '@chakra-ui/react';
import { ReactComponent as ReloadIcon } from 'images/icons/reload.svg';

const ReloadButton = (props) => <IconButton icon={<ReloadIcon style={{ margin: 0, fill: 'white', width: 32, height: 32, stroke: 'white' }} />} title="Reload" onClick={props.onClick} {...props} style={{ textAlign: 'center', padding: 0, margin: 0 }} />

export default ReloadButton;
