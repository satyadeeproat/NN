# Project Structure

## Description
The folder structure looks like this 

- **android/**: Contains the Android native code and resources for the application.
  - **AppPackage.kt**  App Package to return modules of Custom Keyboard class 
  - **CustomKeyboard.kt**  Custom keyboard module implementation in Swift 
- **ios/**: Contains the iOS native code and resources for the application
  - **CustomKeyboard.swift**  Custom keyboard module implementation in Swift 
  - **NN-Bridging-Header.h**  Bridging header to expose obj-c to swift
  - **NativeBridge.m**  obj-c file to expose methods from Custom keyboard class module 
- **src/**: Contains the source code of the React Native application, including reusable UI components and screen components.
  - **components/**: Contains reusable UI components such as a custom keyboard, header, and input pin field.
  - **screens/**: Contains components representing different screens of the application, such as the authentication screen.
  - **App.tsx**: Main entry point for the React Native app.
- **index.js**: Entry point for the React Native app.

## Design Decision
Both In Android and IOS, we are creating a Random array with digits 1-9 and keeping '.' as 3rd last and 'X' as last element.
Then we create a button UI view for each number, For 'X', we create use material ui icon and use the particular unicode for backspace.
We attach tapEvent to all the button to emit their values whenever it's being tapped. After creating all the UI view we will apend it to the main UI view.

Once component will be unmounted in React Native, we call hideKeyboard functionality to remove the above view.

In React native side 
```
For showing the custom keyboard
    const {CustomKeyboard} = NativeModules;
    const showKeyboard = async () => {
      await CustomKeyboard.showKeyboard();
    }

And to see which button is pressed
  const {CustomKeyboard} = NativeModules;
    const eventEmitter = new NativeEventEmitter(CustomKeyboard);
    eventEmitter.addListener(
      'ButtonPressEvent',
      (event: {buttonTitle: ButtonTitle}) => {
        const {buttonTitle} = event;
        onPress(buttonTitle);
      },
    );
```


## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

# Screenshot of working code in ios and android

- ![alt text](https://github.com/satyadeeproat/NN/blob/main/images/ios1.png?raw=true)
- ![alt text](https://github.com/satyadeeproat/NN/blob/main/images/ios2.png?raw=true)
- ![alt text](https://github.com/satyadeeproat/NN/blob/main/images/ios3.png?raw=true)
- ![alt text](https://github.com/satyadeeproat/NN/blob/main/images/android1.png?raw=true)
- ![alt text](https://github.com/satyadeeproat/NN/blob/main/images/android2.png?raw=true)
- ![alt text](https://github.com/satyadeeproat/NN/blob/main/images/android3.png?raw=true)
