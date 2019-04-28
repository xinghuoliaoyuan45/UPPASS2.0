//
//  ScanManage.h
//  iZHC_MoProtocol
//
//  Created by mac on 2018/2/27.
//  Copyright © 2018年 izhihuicheng. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef NS_OPTIONS(NSInteger, ScanResult) {
    AccessToEquipmentFailure = 0, //目前无有权限设备
    AccessToSuccessfully = 1,//成功获取有权限设备
    BluetoothNotTurnedOn = 2//蓝牙未打开
};

@protocol ScanManageDelegate <NSObject>

/**
    扫描结果
    @param scanResult 扫描结果
    @param secretKey 设备密钥
    @param SNCode 设备串码
    @param scanBlueName 蓝牙名字
    @param RSSI 信号强度
 */
- (void)getBleScanResult:(ScanResult)scanResult
               SecretKey:(NSString *)secretKey
                  SNCode:(NSString *)SNCode
            ScanBlueName:(NSString *)scanBlueName
                    RSSI:(NSString *)RSSI;

/** 结束扫描后回调 */
- (void)endOfTheScanningCallback;

@end

@interface ScanManage : NSObject

@property (nonatomic , weak) id <ScanManageDelegate> delegate;

/** 单例 */
+ (instancetype)shareScanManage;

/**
 有权限的蓝牙设置
 @param keys 密钥
 @param scanTime 扫描时间
*/
- (void)setPermissionsBluetoothWithKey:(NSArray *)keys
                              ScanTime:(float)scanTime;

/** 开始扫描 */
- (void)startScanPeripheral;

/** 停止扫描 */
- (void)stopScanPeripheral;



@end
