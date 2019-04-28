//
//  GattManager.h
//  BlueDemo
//
//  Created by mac on 14-7-15.
//  Copyright (c) 2014年 izhihuicheng. All rights reserved.


#import <Foundation/Foundation.h>

/** key快要过期的Block */
typedef void(^KeyWillOverdue)(NSString *key);
/** key已经的Block */
typedef void(^KeyBeenOverdue)(NSString *key);
/** 所有的key都过期的Block */
typedef void(^KeyAllOverdue)(NSArray *keys);

@protocol GattBLEDelegate <NSObject>

- (void)getBleSearchAnswer:(int)result resultString:(NSString *)str26;

@end

/** BLE 蓝牙处理类 */
@interface GattManager : NSObject


@property(nonatomic,weak) id <GattBLEDelegate> delegate;


/** 验证key是否过期（根据当前时间计算是否过期:) */
- (void)decode:(NSArray *)keys
   willOverdue:(KeyWillOverdue)willOverdue
   beenOverdue:(KeyBeenOverdue)beenOverdue
    allOverdue:(KeyAllOverdue)allOverdue;

/** 将标志设置为初始值 */
- (void)setFlagDefault;

/** 创建中央端 */
- (void) setUp;

/** 中央端扫描外围 */
- (void)scan:(float)count;

/** 中央端停止扫描外围 */
- (void) stopScan;

//- (UInt16) swap:(UInt16)s;

- (NSString *)getOpenKey;

/**
 
 门禁二维码获取(有效时间单位为分钟)
 
 @param llingId 用户的linglingId
 @param keys 密钥
 @param validTime 有效时间(分钟)
 @param validNum 有效次数
 @param authLevel 用户属性
 @param refreshInterval 有效楼层
 @param encryptKey 解密密码
 @return 生成二维码的字符串
 */
- (NSString *)createElevatorControllQRWithLLingId:(NSString *)llingId
                                             Keys:(NSArray *)keys
                                        ValidTime:(int)validTime
                                         ValidNum:(int)validNum
                                        AuthLevel:(int)authLevel
                                  refreshInterval:(int)refreshInterval
                                       EncryptKey:(NSString *)encryptKey;

/**
 
 门禁二维码获取(有效时间单位为秒)
 
 @param llingId 用户的linglingId
 @param keys 密钥
 @param validTime 有效时间(秒)
 @param validNum 有效次数
 @param authLevel 用户属性
 @param refreshInterval 有效楼层
 @param encryptKey 解密密码
 @return 生成二维码的字符串
 */
- (NSString *)createElevatorControllQRWithLLingId:(NSString *)llingId
                                             Keys:(NSArray *)keys
                             ValidTimeWithSeconds:(int)validTime
                                         ValidNum:(int)validNum
                                        AuthLevel:(int)authLevel
                                  refreshInterval:(int)refreshInterval
                                       EncryptKey:(NSString *)encryptKey;

/**
 生成二维码信息(无有效次数的)
 
 @param llingId 用户的linglingId
 @param keys 密钥
 @param storyAuths 手动楼层
 @param minusFloor 最低楼层
 @param validTime 有效时间
 @param validFloor 有效楼层
 @param authLevel 等级
 @param encryptKey 解密密码
 @return 生成二维码的字符串
 */
- (NSString *)createElevatorControllQRWithLLingId:(NSString *)llingId
                                             Keys:(NSArray *)keys
                                       StoryAuths:(NSArray *)storyAuths
                                       MinusFloor:(int)minusFloor
                                        ValidTime:(int)validTime
                                       ValidFloor:(int)validFloor
                                        AuthLevel:(int)authLevel
                                       EncryptKey:(NSString *)encryptKey;

/**
 
 生成二维码信息(有有效次数的)
 
 @param llingId 用户的linglingId
 @param keys 密钥
 @param storyAuths 手动楼层
 @param minusFloor 最低楼层
 @param validTime 有效时间
 @param validNum 有效次数
 @param validFloor 有效楼层
 @param authLevel 等级
 @param encryptKey 解密密码
 @return 生成二维码的字符串
 
 */
- (NSString *)createElevatorControllQRWithLLingId:(NSString *)llingId
                                             Keys:(NSArray *)keys
                                       StoryAuths:(NSArray *)storyAuths
                                       MinusFloor:(int)minusFloor
                                        ValidTime:(int)validTime
                                         ValidNum:(int)validNum
                                       ValidFloor:(int)validFloor
                                        AuthLevel:(int)authLevel
                                       EncryptKey:(NSString *)encryptKey;

@end

