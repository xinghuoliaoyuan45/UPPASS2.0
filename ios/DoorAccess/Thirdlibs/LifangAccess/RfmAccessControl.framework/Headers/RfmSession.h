//
//  RfmSession.h
//  RFM_IOCTL
//
//  Created by yeyufeng on 14-10-15.
//  Copyright (c) 2014年 REFORMER. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreBluetooth/CoreBluetooth.h>

///立方设备会话事件
typedef NS_ENUM(NSInteger, RfmSessionEvent)
{
    ///未知事件
    RfmSessionEventUnknow = 0,
    ///开门事件
    RfmSessionEventOpenDoor,
    ///卡号传输
    RfmSessionEventCard,
    ///测试
    RfmSessionEventTestDevice,
    ///设置设备密码
    RfmSessionEventSetDeviceKey,
    ///梯控
    RfmSessionEventElevator,
    ///呼梯
    RfmSessionEventHallBtn
};

///立方设备会话错误类型
typedef NS_ENUM(NSInteger, RfmSessionError)
{
    ///无错误
    RfmSessionErrorNone = 0,
    ///无当前操作设备
    RfmSessionErrorNoDevice,
    ///通讯交互过程异常
    RfmSessionErrorDeviceInteraction,
    ///设备应答超时
    RfmSessionErrorDeviceTimeOut,
    ///设备应答错误，未成功执行（例如动态开门密码错误）
    RfmSessionErrorDeviceRespError,
    /// (当前版本不会出现)
    RfmSessionErrorServer
};

///执行指令时的错误类型
typedef NS_ENUM(NSInteger, RfmActionError)
{
    ///无错误
    RfmActionErrorNone = 0,
    ///忙，当前正处于操作设备的会话中
    RfmActionErrorBusy,
    ///输入参数异常
    RfmActionErrorParam,
    ///手机（平板）不支持低功耗蓝牙模式(要求：系统版本iOS6.0+，后续部分功能需要iOS7.0+，型号iPhone4S以上)
    RfmActionErrorUnsupported,
    ///用户未授权使用蓝牙
    RfmActionErrorUnauthorized,
    ///蓝牙开关未开启
    RfmActionErrorPoweredOff,
    ///指定的设备已经消失
    RfmActionErrorNoDevice,
    ///其他异常
    RfmActionErrorOther
};

///呼梯方向
typedef NS_ENUM(uint8_t, HallBtnDir)
{
    ///上
    HallBtnDirUp = 0,
    ///下
    HallBtnDirDown
};

#pragma mark - 委托协议

///设备会话事件委托协议
@protocol RfmSessionDelegate <NSObject>
@optional

/**
 * @brief                   设备会话完成事件回调
 * @param event             会话完成事件类型
 * @param mac               设备MAC
 * @param error             会话结果错误枚举
 * @param extra             附加信息，当error==RfmSessionErrorDeviceRespError设备应答了一个错误代码时，此错误代码会被透传，类型NSNumber
 *                            其他情况下本版本通常为nil
 *                            附：
 *                                硬件通用错误码
 *                                    0x00	正常
 *                                    0x01	密钥校验失败
 *                                    0x02	长度异常
 *                                    0x03	数据异常
 *                                    0x04	未知命令
 *                                    0x05	执行失败，无法执行/操作
 *                                硬件特殊错误码
 *                                    0x11	开门成功，电量不足（提醒换电池）
 *                                    0x12	无法开门：门反锁
 *                                    0x13	无法开门：电压过低
 *                                    0x14	无法开门：紧急关
 *                                    0x15	无法开门：布防
 */
- (void)rfmSessionDidFinishedEvent:(RfmSessionEvent)event mac:(NSData *)mac error:(RfmSessionError)error extra:(id)extra;

///已发现的设备列表发生变化
- (void)rfmSessionDetectedDevicesChanged:(NSArray *)devices;
@end

#pragma mark -
@interface RfmSession : NSObject

///代理
@property (nonatomic, weak) id <RfmSessionDelegate> delegate;

///底层状态
@property (nonatomic, readonly, assign) CBManagerState cbState;

/**
 * @brief                   初始化SDK
 * @param whitelist         白名单，用于过滤，不在白名单内的设备不处理，当传入nil时不过滤；数组内元素为门禁模块唯一标识符，NSData类型；若无特殊情况建议传入nil
 * @param delegate          代理对象
 * @return                  成功返回YES；失败通常是由于传入的参数有问题引起的
 */
- (BOOL)setupWithWhitelist:(NSArray *)whitelist delegate:(id<RfmSessionDelegate>)delegate;

/**
 * @brief                   刷新白名单
 */
- (void)refreshWhitelist:(NSArray *)whitelist;

/**
 * @brief                   查附近设备
 *                          要求底层报告当前已发现的设备
 * @return                  数组，其元素为 RfmSimpleDevice 对象
 * @see                     RfmSimpleDevice
 */
- (NSArray *)discoveredDevices;

/**
 * @brief                   开门，带状态检查
 * @param mac               要开启的设备的唯一标识符
 * @param deviceKey         设备密码，32字节可转换为Hex的字符串（设备密码不是开门密码，设备密码参与开门密码的运算）
 * @param time              设备本次开启输出口需要保持输出的时间，0立刻停止输出，0xFFFF为一直保持初始，其他为保存输出的时间，单位0.1秒
 */
- (RfmActionError)openDoorCheckedWithMac:(NSData *)mac deviceKey:(NSString *)deviceKey outputActiveTime:(uint16_t)time;

/**
 * @brief                   发送卡号
 * @param mac               设备的唯一标识符
 * @param deviceKey         设备密码，32字节可转换为Hex的字符串（设备密码不是开门密码，设备密码参与开门密码的运算）
 * @param card              卡号，12字节可转换为Hex的字符串
 */
- (RfmActionError)sendCardWithMac:(NSData *)mac deviceKey:(NSString *)deviceKey card:(NSString *)card;

/**
 * @brief                   测试设备
 * @param mac               设备的唯一标识符
 * @param deviceKey         设备密码，32字节可转换为Hex的字符串（设备密码不是开门密码，设备密码参与开门密码的运算）
 */
- (RfmActionError)testDevice:(NSData *)mac deviceKey:(NSString *)deviceKey;

/**
 * @brief                   设置设备密码
 * @param mac               设备的唯一标识符
 * @param newKey            新的设备密码，32字节可转换为Hex的字符串
 */
- (RfmActionError)setDeviceKey:(NSData *)mac newKey:(NSString *)newKey;

/**
 * @brief                   梯控
 * @param mac               设备的唯一标识符
 * @param deviceKey         设备密码，32字节可转换为Hex的字符串（设备密码不是开门密码，设备密码参与开门密码的运算）
 * @param code              手机号（用户标识符），例如：013612345678
 * @param floor             楼层
 */
- (RfmActionError)openElevator:(NSData *)mac deviceKey:(NSString *)deviceKey code:(NSString *)code floor:(uint8_t)floor;

/**
 * @brief                   呼梯
 * @param mac               设备的唯一标识符
 * @param deviceKey         设备密码，32字节可转换为Hex的字符串（设备密码不是开门密码，设备密码参与开门密码的运算）
 * @param code              手机号（用户标识符），例如：013612345678
 * @param dir               楼层方向
 */
- (RfmActionError)openHallBtn:(NSData *)mac deviceKey:(NSString *)deviceKey code:(NSString *)code dir:(HallBtnDir)dir;

#pragma mark -
///单例
+ (RfmSession*)sharedManager;
///库版本号
+ (NSString *)libVersion;

@end
