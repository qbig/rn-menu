package com.rnmenu;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import io.fabric.sdk.android.services.common.Crash;
import com.microsoft.codepush.react.CodePush;

public class MainActivity extends ReactActivity {
    private CodePush _codePush;


    @Override
    protected String getJSBundleFile() {
        return this._codePush.getBundleUrl("index.android.bundle");
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "RNMenu";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        this._codePush = new CodePush("wRs80axNU31V-Io-T8m7xX_AlW2_N1nmLe6Wx", this, BuildConfig.DEBUG);
        Fabric.with(this, new Crashlytics());
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            this._codePush.getReactPackage(),
            new CustomReactPackage()
        );
    }
}
