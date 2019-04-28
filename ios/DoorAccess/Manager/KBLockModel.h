//
//  KBLockModel.h
//  KubanClient
//
//  Created by zhouhan on 16/9/6.
//  Copyright © 2016年 kuban. All rights reserved.
//

#import "DHBle.h"
#import "FBEncryptorAES.h"
#import <MJExtension/MJExtension.h>
#import <Collector/Collector.h>
typedef enum {
    KBLockOpenActionType_Auto = 1,
    KBLockOpenActionType_Shake,
    KBLockOpenActionType_Manual,
} KBLockOpenActionType;

typedef enum {
    KBLockPlaceType_Door,
    KBLockPlaceType_Meeting,
    KBLockPlaceType_Office,
} KBLockPlaceType;

@interface KBLockModel : NSObject

@property (nonatomic, assign) NSUInteger ID;
@property (nonatomic, copy) NSString *name;
@property (nonatomic, assign) BOOL isEnabled;
@property (nonatomic, assign) BOOL isAutoEnabled;
@property (nonatomic, assign) BOOL isGate;
@property (nonatomic, assign) BOOL networking;
@property (nonatomic, assign) BOOL hasBindingCard;
@property (nonatomic, copy) NSString *type;
@property (nonatomic, copy) NSString *deviceId;
@property (nonatomic, copy) NSString *networkType;
@property (nonatomic, copy) NSString *devicePassword;
@property (nonatomic, strong) NSNumber *misRssi;
@property (nonatomic, strong) NSNumber *clickRssi;
@property (nonatomic, strong) NSNumber *androidRssi;
@property (nonatomic, strong) NSNumber *androidClickRssi;
@property (nonatomic, strong) NSDate *startAt;
@property (nonatomic, strong) NSDate *endAt;
@property (nonatomic, copy) NSString *lockType;
@property (nonatomic, copy) NSString *serialNumber; // serialNumber是酷办后端唯一序列号
@property (nonatomic, copy) NSString *serial; // serial可能是硬件本身mac或序列号
// history
@property (nonatomic, strong) NSDate *createdAt;
@property (nonatomic, copy) NSString *lockName;


@property (nonatomic, assign) KBLockOpenActionType openType;    // 开门类型
@property (nonatomic, strong) NSNumber *actRssi;
@property (nonatomic, strong) NSMutableArray <CBPeripheral *> *peripherals;
@property (nonatomic, strong) NSDate *readTime;
@property (nonatomic, copy) NSString *readTimeStr;


//"touch_password": null,

- (NSString *)decryptedDevicePassword;
- (KBLockPlaceType)placeType;
- (CBPeripheral *)mainPeripheral;
- (CBPeripheral *)subPeripheral;
- (id)copyWithZone:(NSZone *)zone;
+ (NSString *)resultReason:(DHBleResultType)resultType;
+ (NSString *)decryptedPasswordWith:(NSString *)paswword isProd:(BOOL)prod;

@end
