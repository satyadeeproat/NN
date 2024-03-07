import {useEffect} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';

export enum ButtonTitle {
  delete = 'X',
  Zero = '0',
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  empty = '.',
}

interface KeyboardViewProps {
  onPress: (buttonTitle: ButtonTitle) => void;
}

export const KeyboardView: React.FC<KeyboardViewProps> = ({onPress}) => {
  useEffect(() => {
    const {CustomKeyboard} = NativeModules;
    const showKeyboard = async () => {
      await CustomKeyboard.showKeyboard();
    };
    showKeyboard();
    const cleanup = () => {
      CustomKeyboard.hideKeyboard();
    };

    return cleanup;
  }, []);

  useEffect(() => {
    const {CustomKeyboard} = NativeModules;
    const eventEmitter = new NativeEventEmitter(CustomKeyboard);
    eventEmitter.addListener(
      'ButtonPressEvent',
      (event: {buttonTitle: ButtonTitle}) => {
        const {buttonTitle} = event;
        onPress(buttonTitle);
      },
    );

    return () => {
      eventEmitter.removeAllListeners('ButtonPressEvent');
    };
  }, [onPress]);

  return null;
};
