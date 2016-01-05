package com.rnmenu;

import android.content.Context;
import android.net.nsd.NsdManager;
import android.net.nsd.NsdServiceInfo;
import android.provider.Settings;
import android.util.Log;

import com.crashlytics.android.Crashlytics;
import com.crashlytics.android.answers.Answers;
import com.crashlytics.android.answers.CustomEvent;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by qiaoliang89 on 21/12/15.
 */
public class FabricLogWrapper extends ReactContextBaseJavaModule {

    ReactApplicationContext mContext;

    public static final String TAG = "BigSpoon eMenu";

    @Override
    public String getName() {
        return "FabricLogWrapper";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    @ReactMethod
    public void logStringValue(String key, String val) {
        Crashlytics.setString(key, val);
        Answers.getInstance().logCustom(new CustomEvent("log").putCustomAttribute(key, val));
    }

    @ReactMethod
    public void logMessage(String msg) {
        Crashlytics.log(msg);
        Answers.getInstance().logCustom(new CustomEvent("log").putCustomAttribute("msg", msg));
    }

    public FabricLogWrapper(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }
}
