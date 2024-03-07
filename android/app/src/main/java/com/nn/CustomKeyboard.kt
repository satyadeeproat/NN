package com.nn

import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.view.Gravity
import android.view.View
import android.widget.Button
import android.widget.LinearLayout
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import android.view.ViewGroup

class CustomKeyboard(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "CustomKeyboard"
    }
    private var keyboardView: View? = null

    private fun getRandomizedArray(): Array<String> {
        val numbers = arrayOf("1", "2", "3", "4", "5", "6", "7", "8", "9", "0")
        val specialChars = arrayOf(".", "X")
        val buttonTitles = numbers.toMutableList()

        // Shuffle numbers
        buttonTitles.shuffle()

        // Insert special characters at their fixed positions
        buttonTitles.add(buttonTitles.size - 1, specialChars[0])
        buttonTitles.add(specialChars[1])

        return buttonTitles.toTypedArray()
    }

    @ReactMethod
    fun showKeyboard() {
        val buttonTitles = getRandomizedArray();
        val linearLayout = LinearLayout(reactApplicationContext)
        linearLayout.orientation = LinearLayout.VERTICAL
        linearLayout.gravity = Gravity.BOTTOM

        for (rowIndex in 0 until 4) {
            val rowLayout = LinearLayout(reactApplicationContext)
            rowLayout.orientation = LinearLayout.HORIZONTAL
            val rowParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT)
            rowLayout.layoutParams = rowParams

            for (colIndex in 0 until 3) {
                val index = rowIndex * 3 + colIndex
                if (index >= buttonTitles.size) {
                    break
                }

                val button = Button(reactApplicationContext)
                val buttonParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1.0f)
                button.layoutParams = buttonParams
                if (buttonTitles[index] == "X") {
                    button.text = "\uE14A"
                    val typeface = Typeface.createFromAsset(reactApplicationContext.assets, "fonts/MaterialIcons.ttf")
                    button.typeface = typeface
                } else {
                    button.text = buttonTitles[index]
                }
                button.height = 150
                button.textSize = 30f
                button.setBackgroundColor(Color.LTGRAY)

                val borderDrawable = GradientDrawable()
                borderDrawable.setStroke(1, Color.BLACK)
                borderDrawable.cornerRadius = 5f
                button.background = borderDrawable

                button.setOnClickListener {
                    buttonTapped((it as Button).text.toString())
                }

                rowLayout.addView(button)
            }

            linearLayout.addView(rowLayout)
        }

        currentActivity?.runOnUiThread {
            val rootView = currentActivity?.window?.decorView?.findViewById<ViewGroup>(android.R.id.content)
            rootView?.addView(linearLayout)
            keyboardView = linearLayout
        }
    }


    @ReactMethod
    fun hideKeyboard() {
        currentActivity?.runOnUiThread {
            val rootView = currentActivity?.window?.decorView?.findViewById<ViewGroup>(android.R.id.content)
            keyboardView?.let { rootView?.removeView(it) }
            keyboardView = null
        }
    }

    @ReactMethod
    fun buttonTapped(buttonTitle: String?) {
        val params = Arguments.createMap()
        params.putString("buttonTitle", buttonTitle)
        reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("ButtonPressEvent", params)
    }
    @ReactMethod
    fun addListener(type: String?) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    fun removeListeners(type: Int?) {
        // Keep: Required for RN built in Event Emitter Calls.
    }
}
