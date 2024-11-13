#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <GoogleUtilities/GULLogger.h>
#import "RNCConfig.h"
#import <Firebase.h>
#import <GoogleMaps/GoogleMaps.h>
#import "RNBootSplash.h"
#import <IntercomModule.h>

@implementation AppDelegate

- (void) customizeRootView:(RCTRootView *)rootView
{
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView];
}


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"WashubMember";
  self.initialProps = @{};
  NSString *firebaseDebugMode = [RNCConfig envFor:@"FIREBASE_DEBUG_MODE"];
  
  if (firebaseDebugMode != nil && [firebaseDebugMode isEqualToString:@"enabled"]) {
    [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"/google/measurement/debug_mode"];
    GULLoggerForceDebug();
  }
  [FIRApp configure];
  [self setupMarketingCloud];
  
  //TODO: change the api key
  [GMSServices provideAPIKey:@"AIzaSyA9QRLTOA9Vs3Em6xnncs17XirgTOah93k"]; // add this line using the api key obtained from Google Console

  [IntercomModule initialize:@"ios_sdk-22f2c3b9b76366b1e71535cdc7318ce2f1bf64b7" withAppId:@"f6llkyek"];
  

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *) bundleURL
{
  #if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
  #else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif
}


- (void) setupMarketingCloud
{
  PushConfigBuilder *pushConfigBuilder = [[PushConfigBuilder alloc] initWithAppId:@"48730a61-75e4-4344-a394-810feef17c7b"];
    [pushConfigBuilder setAccessToken:@"GmxH4g2LgRsujlhZScLOgPab"];
    [pushConfigBuilder setMarketingCloudServerUrl:[NSURL URLWithString:@"https://mc4gy0d6xg4b7z3yrmbx61ps6lgq.device.marketingcloudapis.com/"]];
    [pushConfigBuilder setMid:@"MC_MID"];
    [pushConfigBuilder setAnalyticsEnabled:YES];

    [SFMCSdk initializeSdk:[[[SFMCSdkConfigBuilder new] setPushWithConfig:[pushConfigBuilder build] onCompletion:^(SFMCSdkOperationResult result) {
        if (result == SFMCSdkOperationResultSuccess) {
        //Enable Push
          [self pushSetup];
        } else {
        // SFMC sdk configuration failed.
        NSLog(@"SFMC sdk configuration failed.");
        }
    }] build]];

}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [[SFMCSdk mp] setDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    os_log_debug(OS_LOG_DEFAULT, "didFailToRegisterForRemoteNotificationsWithError = %@", error);
}

// The method will be called on the delegate when the user responded to the notification by opening
// the application, dismissing the notification or choosing a UNNotificationAction. The delegate
// must be set before the application returns from applicationDidFinishLaunching:.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
    didReceiveNotificationResponse:(UNNotificationResponse *)response
    withCompletionHandler:(void (^)(void))completionHandler {
  // tell the MarketingCloudSDK about the notification
  [[SFMCSdk mp] setNotificationRequest:response.notification.request];

  if (completionHandler != nil) {
    completionHandler();
  }
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:
             (void (^)(UNNotificationPresentationOptions options))completionHandler {
    NSLog(@"User Info : %@", notification.request.content.userInfo);
    completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert |
                      UNAuthorizationOptionBadge);
}

// This method is REQUIRED for correct functionality of the SDK.
// This method will be called on the delegate when the application receives a silent push

- (void)application:(UIApplication *)application
    didReceiveRemoteNotification:(NSDictionary *)userInfo
          fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    [[SFMCSdk mp] setNotificationUserInfo:userInfo];

    completionHandler(UIBackgroundFetchResultNewData);
}

//URL Handling
- (void)sfmc_handleURL:(NSURL * _Nonnull)url type:(NSString * _Nonnull)type {
  if ([[UIApplication sharedApplication] canOpenURL:url]) {
    [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:^(BOOL success) {
      if (success) {
        NSLog(@"url %@ opened successfully", url);
      } else {
        NSLog(@"url %@ could not be opened", url);
      }
    }];
  }
}

-(void) pushSetup {
  dispatch_async(dispatch_get_main_queue(), ^{
    // set the UNUserNotificationCenter delegate - the delegate must be set here in
    // didFinishLaunchingWithOptions
    [UNUserNotificationCenter currentNotificationCenter].delegate = self;
    [[SFMCSdk mp] setURLHandlingDelegate:self];
    [[UIApplication sharedApplication] registerForRemoteNotifications];
   
    [[UNUserNotificationCenter currentNotificationCenter]
      requestAuthorizationWithOptions:UNAuthorizationOptionAlert |
      UNAuthorizationOptionSound |
      UNAuthorizationOptionBadge
      completionHandler:^(BOOL granted, NSError *_Nullable error) {
       if (error == nil) {
         if (granted == YES) {
           NSLog(@"User granted permission");
         }
       }
    }];
  });
}

@end
