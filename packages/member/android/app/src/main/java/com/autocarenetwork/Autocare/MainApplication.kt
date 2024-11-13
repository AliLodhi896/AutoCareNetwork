package com.washub.member

import android.app.Application
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.net.Uri
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import android.util.Log
import com.facebook.react.ReactPackage
import com.facebook.react.PackageList
import com.intercom.reactnative.IntercomModule
import com.salesforce.marketingcloud.MarketingCloudConfig
import com.salesforce.marketingcloud.notifications.NotificationCustomizationOptions
import com.salesforce.marketingcloud.notifications.NotificationMessage
import com.salesforce.marketingcloud.sfmcsdk.SFMCSdk
import com.salesforce.marketingcloud.sfmcsdk.SFMCSdkModuleConfig
import kotlin.random.Random

class MainApplication : Application(), ReactApplication {
    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> = PackageList(this).packages.apply {
                // Packages that cannot be autolinked yet can be added manually here, for example:
                // add(MyReactNativePackage())
            }


            override fun getJSMainModuleName(): String = "index"

            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }

    override val reactHost: ReactHost
        get() = getDefaultReactHost(applicationContext, reactNativeHost)

    override fun onCreate() {
        super.onCreate()

        this.initMarketingCloudSdk()
        this.initIntercomModule()

        SoLoader.init(this, false)
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // If you opted-in for the New Architecture, we load the native entry point for this app.
            load()
        }
    }

    private fun initMarketingCloudSdk() {
        val marketingCloudConfig = MarketingCloudConfig.builder()
            .setApplicationId("48730a61-75e4-4344-a394-810feef17c7b")
            .setAccessToken("GmxH4g2LgRsujlhZScLOgPab")
            .setSenderId("881162078508")
            .setMarketingCloudServerUrl("https://mc4gy0d6xg4b7z3yrmbx61ps6lgq.device.marketingcloudapis.com/")
            .setNotificationCustomizationOptions(
                NotificationCustomizationOptions.create(
                    R.drawable.bootsplash_logo,
                    { context: Context, notificationMessage: NotificationMessage ->
                        val requestCode = Random.nextInt()
                        var intent = context.packageManager.getLaunchIntentForPackage(context.packageName)
                        var flags =  PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE

                        if (notificationMessage.url?.isEmpty() == false) {
                            intent = Intent(Intent.ACTION_VIEW, Uri.parse(notificationMessage.url))
                            flags = PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
                        }

                        return@create PendingIntent.getActivity(
                            context,
                            requestCode,
                            intent,
                            flags
                        )
                    },
                    null
                )
            )
            .setAnalyticsEnabled(true)
            .build(this)

        SFMCSdk.configure(this, SFMCSdkModuleConfig.build {
            this.pushModuleConfig = marketingCloudConfig
        }) { initializationStatus ->
            Log.e("TAG", "STATUS ${initializationStatus.status}")
            if (initializationStatus.status == 1) {
                Log.e("TAG", "STATUS SUCCESS")
            }
        }
    }

    private fun initIntercomModule() {
        IntercomModule.initialize(
            this,
            "android_sdk-81f0c8c8def804ad8b30d172ea6ba463d99540be",
            "f6llkyek"
        )
    }
}
