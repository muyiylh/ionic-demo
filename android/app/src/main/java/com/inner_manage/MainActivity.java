package com.inner_manage;

import android.os.Bundle;
import android.util.Log;

import com.facebook.react.*;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

import java.lang.Override;

import cn.jpush.android.api.JPushInterface;

//  import com.facebook.react.ReactActivityDelegate;
//  import com.facebook.react.ReactRootView;
 import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
 import android.os.Bundle;  //add 
import org.devio.rn.splashscreen.SplashScreen; //add

public class MainActivity extends ReactActivity implements DefaultHardwareBackBtnHandler{

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "inner_manage";
    }
      @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);   //白屏
        super.onCreate(savedInstanceState);
        JPushInterface.init(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }
   @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
