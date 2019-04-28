//
//  KBLockManager.h
//  KubanClient
//
//  Created by 莫小言 on 2017/4/16.
//  Copyright © 2017年 kuban. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <RfmAccessControl/RfmAccessControl.h>
#import "DHBle.h"
#import "KBLockModel.h"
#import "KBLockPermissionModel.h"
#import "KBUnlimitedLockModel.h"
#import "KBPeripheralModel.h"
#import <Collector/Collector.h>
#import <MJExtension/MJExtension.h>
#import <CoreBluetooth/CoreBluetooth.h>
#define KLockManager (KBLockManager *)[KBLockManager sharedInstance]

typedef enum {
    KBLockPostTypeNone = 0,   //没搜索到
    KBLockPostTypeHave,       //搜索到
    KBLockPostTypeOpening,    //开门中
    KBLockPostTypeOpenSuccess,//开门成功
    KBLockPostTypeOpenFailPassword,   //密码错误
    KBLockPostTypeOpenFailTimeOut,    //超时
} KBLockPostType;

@interface KBLockManager : NSObject <DHBleDelegate, CBCentralManagerDelegate, RfmSessionDelegate>

@property (nonatomic, assign) BOOL scanning;
@property (nonatomic, assign) BOOL bluetoothEnabled;
@property (nonatomic, strong) KBLockModel *currentLock;
@property (nonatomic, strong) NSArray <KBLockModel *> *sortedLocks;
@property (nonatomic, strong) NSMutableArray <KBLockModel *>  *scannedLocksArray;
@property (nonatomic, strong) NSMutableDictionary *cachedLocksDictionary;
@property (nonatomic, strong) NSMutableArray <KBPeripheralModel *> *scanPeripherals;  // 扫描到的蓝牙(Debug view use)
@property (nonatomic, strong) NSMutableArray *scanUnlimitedLocks;

@property (nonatomic, assign) BOOL isPROD;

+ (KBLockManager *)sharedInstance;
- (void)registerLockDelegate;
- (void)clearLockDelegate;
- (void)startScanNeedsLastestLocks:(CGFloat)time;
- (void)checkLockTypes:(NSArray*)lockArray;
- (void)stopScan;
- (void)clickOpen:(KBLockModel *)doorModel; // 点击
- (void)judgeBluetooth;

@end
