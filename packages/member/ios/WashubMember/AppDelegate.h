#import "RCTAppDelegate.h"
#import <UIKit/UIKit.h>
#import <UserNotifications/UserNotifications.h>
#import <MarketingCloudSDK/MarketingCloudSDK.h>
#import <SFMCSDK/SFMCSDK.h>

@interface AppDelegate : RCTAppDelegate<UNUserNotificationCenterDelegate, SFMCSdkURLHandlingDelegate>

@end
