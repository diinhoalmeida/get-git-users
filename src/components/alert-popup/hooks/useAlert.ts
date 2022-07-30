import { useContext } from 'react';
import {AlertContext} from '../../../setup/context/alert-context';

const useAlert = () => useContext(AlertContext);

export default useAlert;