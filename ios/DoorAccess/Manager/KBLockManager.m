//
//  KBLockManager.m
//  KubanClient
//
//  Created by 莫小言 on 2017/4/16.
//  Copyright © 2017年 kuban. All rights reserved.
//

#import "KBLockManager.h"
#import "KBUnlimitedLockModel.h"
#import "KBPeripheralModel.h"
#import <AVFoundation/AVAudioPlayer.h>
#import "YYCategory.h"
#import "GattManager.h"
#import "ScanManage.h"
#import <CoreLocation/CoreLocation.h>
#import "DateTools.h"
#define kUUID @"68747470-3A77-7777-2E65-65756E2E636E"
#define kScanLockTime 0.5
#define kPruneTime 3

#define kRssiAutoOpen 48*(-1)
#define kRssiClick 100*(-1)

@interface KBLockManager () <AVAudioPlayerDelegate, GattBLEDelegate, ScanManageDelegate>
@property (nonatomic, strong) NSDate *openTime;
@property (nonatomic, strong) CBCentralManager *centralManager;
@property (nonatomic, strong) NSMutableArray *openPeripherals;  // 已开过的
@property (nonatomic, strong) CBPeripheral *currentPeripheral;
@property (nonatomic, strong) AVAudioPlayer *soundPlayer;
@property (nonatomic) NSMutableArray *lifangLocks;
@property (nonatomic) NSMutableArray *dhLocks;
@property (nonatomic) NSMutableArray *linglingLocks;
@property (nonatomic) NSMutableArray *kubanBoltLocks;
/** 令令蓝牙类 */
@property (nonatomic , strong) GattManager *gattManager;

@property (nonatomic, strong) NSMutableDictionary *lockDict;
@end

@implementation KBLockManager

+ (KBLockManager *)sharedInstance {
  static KBLockManager *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [[self alloc] init];
  });
  return sharedInstance;
}

- (instancetype)init
{
  self = [super init];
  if (self) {
    self.lockDict = [[NSMutableDictionary alloc]init];
  }
  return self;
}

- (void)registerLockDelegate {
  //  [DHBle shareInstance].delegate = self;
//  [[DHBle shareInstance] bleInit];
//  self.centralManager = [DHBle shareInstance].manager;
  self.centralManager = [[CBCentralManager alloc] initWithDelegate:self queue:nil];
//  [self judgeBluetooth];
  [self.scanUnlimitedLocks  removeAllObjects];
}

- (void)checkLockTypes:(NSArray*)lockArray {
  
  NSMutableDictionary *dict = [NSMutableDictionary dictionary];
  [lockArray enumerateObjectsUsingBlock:^(KBLockPermissionModel *permission, NSUInteger idx, BOOL * _Nonnull stop) {
    NSDate *nowDate = [NSDate date];
    if ([nowDate isEarlierThanOrEqualTo:permission.endAt]) {
      if (![permission.lock.deviceId isEqualToString:@""]) {
        permission.lock.startAt = permission.startAt;
        permission.lock.endAt = permission.endAt;
        [dict setValue:permission.lock forKey:permission.lock.deviceId];
      }
    }
  }];
  
  self.lockDict = dict;
  
  self.lifangLocks = [NSMutableArray array];
  self.dhLocks = [NSMutableArray array];
  self.linglingLocks = [NSMutableArray array];
  self.kubanBoltLocks = [NSMutableArray array];
  [lockArray enumerateObjectsUsingBlock:^(KBLockPermissionModel* permission, NSUInteger idx, BOOL * _Nonnull stop) {
    //    bluetooth: 0, # DH纯蓝牙
    //    network: 1, # DH带网口
    //    faceplusplus: 2, # 人脸识别
    //    xlink: 3, # Xlink lock
    //    gate_qrcode: 4, # 扫码闸机
    //    lifang: 5, # 立方门禁
    //    lingling: 6, # 令令门禁
    //    kuban_bolt: 7, # 酷办bolt门禁
    NSString *lockType = permission.lock.lockType;
    if ([lockType isEqualToString:@"bluetooth"] || [lockType isEqualToString:@"network"]){
      [self.dhLocks addObject:permission];
    } else if ([lockType isEqualToString:@"lifang"]){
      [self.lifangLocks addObject:permission];
    } else if ([lockType isEqualToString:@"lingling"]){
      [self.linglingLocks addObject:permission];
    } else if ([lockType isEqualToString:@"kuban_bolt"]){
      [self.kubanBoltLocks addObject:permission];
    }
  }];
}

- (void)stopScan {
  self.scanning = NO;
  if ([[self lifangLocks] count] > 0) {
    [[RfmSession sharedManager] setupWithWhitelist:nil delegate:self];
  }
  
  if ([[self linglingLocks] count] > 0) {
    [[ScanManage shareScanManage] stopScanPeripheral];
  }
  
  if ([[self dhLocks] count] > 0) {
    [[DHBle shareInstance] stopScanDevice];
  }
}

- (void)startScanNeedsLastestLocks:(CGFloat)time{
  if (time <= 0) {
    time = 2.5f;
  }
  
  if (!self.bluetoothEnabled || self.scanning) {
    return;     // 没开蓝牙 or 正在扫描中 不扫描
  }
  // 清空各个数组
  [self.scannedLocksArray removeAllObjects];
  [self.scanPeripherals removeAllObjects];
  
  self.scanning = YES;
  
  dispatch_queue_t serial_queue = dispatch_queue_create("io.kuban.client.scanBleLocks", DISPATCH_QUEUE_SERIAL);
  if ([[self lifangLocks] count] > 0) {
    [[RfmSession sharedManager] setupWithWhitelist:nil delegate:self];
  }
  
  if ([[self linglingLocks] count] > 0) {
    // 设置蓝牙回调
    self.gattManager = [[GattManager alloc] init];
    self.gattManager.delegate = self;
    [self.gattManager setUp];//实例化中心角色
    [self.gattManager setFlagDefault];
    //设置扫描代理
    [ScanManage shareScanManage].delegate = self;
    
    //设置有权限的设备
    NSArray* keys = [self.linglingLocks ct_map:^id(KBLockPermissionModel* permissionModel) {
      KBLockModel *lock = permissionModel.lock;
      return lock.decryptedDevicePassword;
    }];
    [[ScanManage shareScanManage] setPermissionsBluetoothWithKey:keys ScanTime:time];
    
    //开始扫描
    [[ScanManage shareScanManage] startScanPeripheral];
  }
  
  if ([[self dhLocks] count] > 0){
    //    [[DHBle shareInstance] bleInit];
    [[DHBle shareInstance] enableNSLog:NO];
    [DHBle shareInstance].delegate = self;
    int type = [[DHBle shareInstance] scanDevice:(int)time];
    if (type != 0){
      //            DDLogError(@"Failed to start scan dhLocks : %d", type);
    }

  }
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(time+1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [self endScanAction];
  });
}


- (void)clearLockDelegate {
  [self stopScan];
  [DHBle shareInstance].delegate = nil;
  //  [self.locationManager stopMonitoringForRegion:self.myBeacon];
  self.scanning = NO;
}

- (void)endScanAction{
  [self lfScanEndAction];
  // collect all locks
  [self sortScanLocks];
}

- (void)sortScanLocks {
  //    DDLogInfo(@"结束扫描 %@", [NSDate date] );
  self.scanning = NO;
  
  NSArray *scanLocks = [NSArray arrayWithArray:self.scannedLocksArray];
  
  [self.scannedLocksArray removeAllObjects];
  [self.cachedLocksDictionary removeAllObjects];
  
  // 将扫描到的lock 存到缓存数组里
  for (KBLockModel *reading in scanLocks) {
    NSMutableArray *locks = [self.cachedLocksDictionary objectForKey:reading.deviceId];
    if (locks.count > 0) {
      NSMutableArray *tempArr = [[NSMutableArray alloc]initWithArray:locks];
      [tempArr addObject:reading];
      [self.cachedLocksDictionary setObject:tempArr forKey:reading.deviceId];
    } else {
      [self.cachedLocksDictionary setObject:@[reading] forKey:reading.deviceId];
    }
  }
  
  NSLog(@"Cache lock dic %@",self.cachedLocksDictionary);
  // 排序 找出actRssi中间值 后的lockArr
  NSMutableArray *resultsArr = [NSMutableArray array];
  for (NSArray *resultArr in self.cachedLocksDictionary.allValues) {
    // 取出所有rssi
    NSMutableArray *actRssiArr = [NSMutableArray array];
    KBLockModel *reading = [(KBLockModel *)resultArr.lastObject copy];
    //        DDLogInfo(@"缓存里的rssi");
    if (reading) {
      for (KBLockModel *lock in resultArr) {
        [actRssiArr addObject:lock.actRssi];
        //            DDLogInfo(@"%@ %@", lock.actRssi, lock.readTime);
        if (lock.peripherals.count > reading.peripherals.count) {
          reading.peripherals = lock.peripherals;
        }
      }
      
      [actRssiArr ct_orderedByAscending:^id(NSNumber *actRssi) {
        return actRssi;
      }];
      NSNumber *minddle = actRssiArr[actRssiArr.count / 2];
      //        DDLogInfo(@"minddle rssi  %@", minddle);
      reading.actRssi = minddle;
      [resultsArr addObject:reading];
    }
  }
  NSLog(@"result arr: %@",resultsArr);
  self.sortedLocks = [resultsArr ct_orderedByDescending:^id(KBLockModel *doorModel) {
    return doorModel.actRssi;
  }];
  if (self.sortedLocks.count) {
    self.currentLock = self.sortedLocks.firstObject;
  }
  if (self.sortedLocks.count) {
    [[NSNotificationCenter defaultCenter] postNotificationName:@"KBNotiUpdateLockUI" object:@{@"type":@(KBLockPostTypeHave),@"data":self.sortedLocks}];
  } else {
    [[NSNotificationCenter defaultCenter] postNotificationName:@"KBNotiUpdateLockUI" object:@{@"type":@(KBLockPostTypeNone),@"data":self.sortedLocks}];
  }
}
#pragma mark - 扫描回调
- (void)scanDeviceCallBack:(CBPeripheral *)peripheral RSSI:(NSNumber *)RSSI {
  if ([RSSI integerValue] < 0) {
    NSString *deviceId = [[DHBle shareInstance] getDeviceIdForStringValue:peripheral];
    //        DDLogInfo(@"scan %@ %@  %@", deviceId, peripheral, RSSI);
    
    //        NSDictionary *lockDict = [KBUserManager sharedInstance].currentUserInfo.locksDictionary;
    NSDictionary *lockDict = self.lockDict;
    KBLockModel *lock = [[lockDict objectForKey:deviceId] copy];
    
    // 以蓝牙为主
    KBPeripheralModel *peripheralModel = [[KBPeripheralModel alloc] init];
    peripheralModel.peripheral = peripheral;
    peripheralModel.actRssi = RSSI;
    peripheralModel.scanTime = [NSDate date];
    peripheralModel.deviceId = deviceId;
    peripheralModel.name = lock ? lock.name : @"";
    [self.scanPeripherals addObject:peripheralModel];
    
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc]init];
    [dateFormatter setDateFormat:@"M月dd日 HH:mm:ss E"];
    // 保存原始locks
    BOOL haveLockInUnlimitedArr = NO;
    for (KBUnlimitedLockModel *unlimit in self.scanUnlimitedLocks) {
      if ([unlimit.deviceId isEqualToString:deviceId]) {
        haveLockInUnlimitedArr = YES;
        unlimit.actRssi = RSSI;
        [unlimit.rssis addObject:RSSI];
        if (unlimit.rssis.count > 10) {
          [unlimit.rssis removeObjectAtIndex:0];
        }
        [unlimit.timers addObject:[dateFormatter stringFromDate:[NSDate date]]];
        if (unlimit.timers.count > 10) {
          [unlimit.timers removeObjectAtIndex:0];
        }
      }
    }
    if (!haveLockInUnlimitedArr) {
      KBUnlimitedLockModel *unlimit = [[KBUnlimitedLockModel alloc] init];
      unlimit.deviceId = deviceId;
      unlimit.actRssi = RSSI;
      [unlimit.rssis addObject:RSSI];
      [unlimit.timers addObject:[dateFormatter stringFromDate:[NSDate date]]];
      if (lock) {
        unlimit.isUserLock = YES;
        unlimit.lockId = [NSNumber numberWithInteger:lock.ID];
        unlimit.name = lock.name;
        unlimit.iosRssi = lock.misRssi;
        unlimit.iosClickRssi = lock.clickRssi;
        unlimit.androidRssi = lock.androidRssi;
        unlimit.androidClickRssi = lock.androidClickRssi;
      } else {
        unlimit.isUserLock = NO;
      }
      [self.scanUnlimitedLocks addObject:unlimit];
    }
    
    if (lock) {
      lock.actRssi = RSSI;
      lock.readTime = [NSDate date];
      
      if (![lock.peripherals containsObject:peripheral]) {
        [lock.peripherals addObject:peripheral];
      }
      
      //添加距离范围内的门禁到扫描数组
      NSNumber *clickRssi = [NSNumber numberWithInteger:kRssiClick];
      if ([lock.clickRssi integerValue] != 0) {
        clickRssi = lock.clickRssi;
      } else {
        lock.clickRssi = clickRssi;
      }
      
      if ([lock.actRssi integerValue] > [lock.clickRssi integerValue]) {  //小于显示范围
        //                DDLogInfo(@"小于显示范围 %@ %@ click:%@", lockID, lock.actRssi, lock.clickRssi);
        [self.scannedLocksArray addObject:lock];
      }
    }
  }
}

- (void)scanDeviceEndCallBack {
  NSLog(@"scanDeviceEndCallBack");
}


#pragma mark - Lifang door access end scan
- (void)lfScanEndAction{
  
  NSArray *simpleDevices = [[RfmSession sharedManager] discoveredDevices];
  
  for (RfmSimpleDevice *device in simpleDevices)
  {
    NSString * deviceId = [device.mac dataToHexString];
    NSLog(@"Lifang BT Result mac:%@ %@ rssi:%d", deviceId, device.name, (int)device.rssi);
    NSLog(@"Lifang mac data %@", device.mac);
    
    [self.lifangLocks enumerateObjectsUsingBlock:^(KBLockPermissionModel *lockPermission, NSUInteger idx, BOOL * _Nonnull stop) {
      KBLockModel *lock = lockPermission.lock;
      if([lock.deviceId compare:deviceId options:NSCaseInsensitiveSearch | NSNumericSearch] == NSOrderedSame){
        lock.actRssi = [NSNumber numberWithInt:(int)device.rssi];
        [self.scannedLocksArray addObject:lock];
        *stop = YES;
      }
    }];
  }
}

#pragma mark - Lingling door access end scan
//扫描时的回调
- (void)getBleScanResult:(ScanResult)scanResult SecretKey:(NSString *)secretKey SNCode:(NSString *)SNCode ScanBlueName:(NSString *)scanBlueName RSSI:(NSString *)RSSI{
  if (scanResult == AccessToSuccessfully) {
    [self.linglingLocks enumerateObjectsUsingBlock:^(KBLockPermissionModel *permissionModel, NSUInteger idx, BOOL * _Nonnull stop) {
      KBLockModel *lock = permissionModel.lock;
      if([lock.serial compare:SNCode options:NSCaseInsensitiveSearch | NSNumericSearch] == NSOrderedSame){
        lock.actRssi = [NSNumber numberWithInt:(int)[RSSI integerValue]];
        NSLog(@"Lingling Locks Result: deviceID:%@, rssi:%@", lock.deviceId, lock.actRssi);
        [self.scannedLocksArray addObject:lock];
        *stop = YES;
      }
    }];
  }
}

/** 结束扫描回调 */
- (void)endOfTheScanningCallback{
  
}

#pragma mark - 点击
- (void)clickOpen:(KBLockModel *)lock {
  if (lock) {
    self.currentLock = lock;
    [self openLockWithModel:lock type:KBLockOpenActionType_Manual];
  }
}

#pragma mark - 摇一摇
- (void)shakeOpen {
  //    if ([KBUDHelper isLockShake]) {
  //        if (kEnvironmentInstance.allowAutoOpenDoor) {
  //            if ([UIApplication sharedApplication].applicationState != UIApplicationStateActive) {
  //                NSLog(@"App在后台运行，不允许摇一摇开门");
  //                return;
  //            }
  //        }
  //        NSLog(@"开始摇动");
  //        if (self.currentLock) {
  //            [self openLockWithModel:self.currentLock type:KBLockOpenActionType_Shake];
  //        }
  //    }
}

#pragma mark - 开门 大循环
- (void)openLockWithModel:(KBLockModel *)lock type:(KBLockOpenActionType)type {
  //    DDLogInfo(@"大循环");
  self.openTime = [NSDate date];
  [[NSNotificationCenter defaultCenter] postNotificationName:@"KBNotiUpdateLockUI" object:@{@"type":@(KBLockPostTypeOpening), @"lockId":@(lock.ID), @"lock":lock}];
  if ([lock.lockType isEqualToString:@"lifang"]) {
    NSArray *simpleDevices = [[RfmSession sharedManager] discoveredDevices];
    NSData *openingMac;
    for (RfmSimpleDevice *device in simpleDevices){
      if([lock.deviceId compare:[device.mac dataToHexString] options:NSCaseInsensitiveSearch | NSNumericSearch] == NSOrderedSame){
        openingMac = device.mac;
        break;
      }
    }
    NSString *devicePWD = [KBLockModel decryptedPasswordWith:lock.devicePassword isProd:[KBLockManager sharedInstance].isPROD];
    RfmActionError error = [[RfmSession sharedManager] openDoorCheckedWithMac:openingMac deviceKey:devicePWD outputActiveTime:60];
    NSString *errorString;
    DHBleResultType result = DHBLE_RESULT_OK;
    if (error == RfmActionErrorNone)
    {
      //            errorString = @"认证中...";
    }
    else if (error == RfmActionErrorParam)
    {
      errorString = @"方法调用失败";
      result = DHBLE_RESULT_SYSTEM_ERROR;
    }
    else if (error == RfmActionErrorNoDevice)
    {
      //            errorString = @"指定设备不再范围内";
      errorString = @"开门失败，请靠近设备后重试";
      result = METHOD_ERR_DEVICE_NOT_CONN;
    }
    else if (error == RfmActionErrorPoweredOff)
    {
      //            errorString = @"蓝牙开关未开启";
      errorString = @"开门失败，设备蓝牙未开启";
      result = METHOD_BLE_NOT_ENABLED;
    }
    else if (error == RfmActionErrorUnauthorized)
    {
      //            errorString = @"用户未授权";
      errorString = @"开门失败，请刷新后重试";
      result = DHBLE_RESULT_PASSWORD_ERROR;
    }
    else if (error == RfmActionErrorBusy)
    {
      //            errorString = @"操作忙";
      errorString = @"设备忙，请重试";
      result = DHBLE_RESULT_SYSTEM_ERROR;
    }
    else if (error == RfmActionErrorOther)
    {
      //            errorString = @"其他异常";
      errorString = @"开门失败，请刷新后重试";
      result = DHBLE_RESULT_SYSTEM_ERROR;
    }
    // 只是同步开门动作返回的结果，不是异步开门回调，so如果成功就等等待回调
    if (error != RfmActionErrorNone) {
      [self notifyOpening:lock result:result];
    }
  }
  else if ([lock.lockType isEqualToString:@"lingling"]) {
    NSArray* keys = [NSArray arrayWithObject:lock.decryptedDevicePassword];
    [self.gattManager decode:keys willOverdue:^(NSString *key){
      NSLog(@"key将要过期，还能使用，请从服务器获取全新的key: %@", key);
    } beenOverdue:^(NSString *key){
      NSLog(@"key已经过期，不能使用，请从服务器获取全新的key: %@", key);
    } allOverdue:^(NSArray *keyArray){
      NSLog(@"所有的key已经过期，不能开门，请从服务器获取全新的keyArray: %@", keyArray);
    }];
    [self.gattManager setUp];//实例化中心角色
    [self.gattManager setFlagDefault];
  }
  else if ([lock.lockType isEqualToString:@"bluetooth"] || [lock.lockType isEqualToString:@"network"]) {
    self.openPeripherals = [NSMutableArray array];   // 清空已开蓝牙数组
    self.openTime = [NSDate date];
    lock.openType = type;
    //        [[Mixpanel sharedInstance] track:@"open_lock_begin"];
    //        [[Mixpanel sharedInstance] timeEvent:@"time_event_open"];
    if (lock.subPeripheral) {
      [self openDoorWith:lock peripheral:lock.subPeripheral type:type];
    } else {
      if (lock.mainPeripheral) { // 没有副蓝牙 开主蓝牙
        [self openDoorWith:lock peripheral:lock.mainPeripheral type:type];
      }
    }
  }
}

// 开门成功或失败后统一处理
- (void)notifyOpening:(KBLockModel*)lock result:(DHBleResultType)result{
  // 开门提示
  KBLockPostType lockPostType = KBLockPostTypeOpening;
  if (result == DHBLE_RESULT_OK){
    lockPostType = KBLockPostTypeOpenSuccess;
    // 存入开门时间
  }
  else if (result == DHBLE_RESULT_PASSWORD_ERROR) {
    lockPostType = KBLockPostTypeOpenFailPassword;
  } else {    // 超时
    lockPostType = KBLockPostTypeOpenFailTimeOut;
  }
  
  [[NSNotificationCenter defaultCenter] postNotificationName:@"KBNotiUpdateLockUI" object:@{@"type":@(lockPostType), @"lockId":@(lock.ID), @"lock":lock}];
}

#pragma mark - 小循环
- (void)openDoorWith:(KBLockModel *)model peripheral:(CBPeripheral *)peripheral type:(KBLockOpenActionType)type {
  //    DDLogInfo(@"小循环");
  if (![self.openPeripherals containsObject:peripheral]) {
    self.currentPeripheral = peripheral;
  }
  if (self.currentPeripheral) {
    [self.openPeripherals addObject:self.currentPeripheral];
    //        DDLogInfo(@"open %@", self.currentPeripheral);
    //        DDLogInfo(@"openPeripherals %@", self.openPeripherals);
    NSString *device = [KBLockModel decryptedPasswordWith:model.devicePassword isProd:[KBLockManager sharedInstance].isPROD];
    DHBleErrorType t = [[DHBle shareInstance] oneKeyOpenDevice:self.currentPeripheral deviceNumStr:model.deviceId devicePasswordStr:device openType:TYPE_OPEN_LOCK];
    NSLog(@"DHLock Open~~~~~~~~~~~~ type = %ld, t = %ld",(long)type, (long)t);
  } else {
    // 所有蓝牙已开完
    //        DDLogInfo(@"所有蓝牙已开完");
    [self.openPeripherals removeAllObjects];
  }
}

#pragma mark - 打开或者关闭设备 的回调
- (void)openCloseDeviceIICallBack:(DHBleResultType)result deviceBattery:(Byte)battery deviceId:(NSString *)devId {

  NSDictionary *lockDict = self.lockDict;
  KBLockModel *lock = [[lockDict objectForKey:devId] copy];
  
  //    DDLogInfo(@"回调 %@", [KBLockModel resultReason:result]);
  if (lock) {
    if(self.currentPeripheral != nil) {
      [[DHBle shareInstance] disconnectDevice:self.currentPeripheral];
      self.currentPeripheral = nil;
    }
  }
  if (result == 0) {
    [self notifyOpening:lock result:DHBLE_RESULT_OK];
  } else {
    // 继续开门
    if (lock) {
      if (lock.mainPeripheral) {
        [self openDoorWith:lock peripheral:lock.mainPeripheral type:lock.openType];
      } else {
        [self notifyOpening:lock result:result];
      }
    }
  }
  
  // 断开设备连接
  [[DHBle shareInstance] disconnectDevice:[DHBle shareInstance].activePeripheral];
}

#pragma mark - 立方 callback
- (void)rfmSessionDidFinishedEvent:(RfmSessionEvent)event mac:(NSData *)mac error:(RfmSessionError)error extra:(id)extra
{
  DHBleResultType result = DHBLE_RESULT_OK;
  if (event == RfmSessionEventOpenDoor)   //开门
  {
    switch (error)
    {
      case RfmSessionErrorNone:
      {
        break;
      }
      case RfmSessionErrorNoDevice:
      {
        NSLog(@"RfmSessionErrorNoDevice");
        result = DHBLE_RESULT_LOCK_ID_ERROR;
        break;
      }
      case RfmSessionErrorDeviceInteraction:
      {
        NSLog(@"RfmSessionErrorDeviceInteraction");
        result = DHBLE_RESULT_TIMEOUT;
        break;
      }
      case RfmSessionErrorDeviceTimeOut:
      {
        NSLog(@"RfmSessionErrorDeviceTimeOut");
        result = DHBLE_RESULT_TIMEOUT;
        break;
      }
      case RfmSessionErrorDeviceRespError:    //蓝牙控制器拒绝请求，通常就是动态开门密码错误
      {
        int devResp = [extra intValue];
        if (devResp == 0x01 || devResp == 0x10)
        {
          NSLog(@"RfmSessionErrorDeviceRespError 密码错误");
          result = DHBLE_RESULT_PASSWORD_ERROR;
          break;
        }
        else if (devResp == 0x04)
        {
          NSLog(@"RfmSessionErrorDeviceRespError 设备不支持");
          result = DHBLE_RESULT_SYSTEM_ERROR;
          break;
        }
        else if (devResp <= 0x0f)
        {
          NSLog(@"RfmSessionErrorDeviceRespError 操作失败");
          result = DHBLE_RESULT_SYSTEM_ERROR;
          break;
        }
        else
        {
          NSLog(@"RfmSessionErrorDeviceRespError 设备拒绝，代码0x%x", devResp);
          result = DHBLE_RESULT_SYSTEM_ERROR;
          break;
        }
        break;
      }
      default:
        break;
    }
  }
  
  [self notifyOpening:self.currentLock result:result];
}

#pragma mark - 令令蓝牙 GattManager Delegate
- (void)getBleSearchAnswer:(int)res resultString:(NSString *)str26{
  
  DHBleResultType result = DHBLE_RESULT_OK;
  switch (res) {
    case 0:
    {
      NSLog(@"令令开门key: %@", [self.gattManager getOpenKey]);
      result = DHBLE_RESULT_OK;
      break;
    }
    case 1:
    {
      NSLog(@"令令蓝牙未打开");
      result = METHOD_BLE_NOT_ENABLED;
      break;
    }
    case 2:
    {
      NSLog(@"令令搜索超时");
      result = DHBLE_RESULT_TIMEOUT;
      break;
    }
    case 3:
    {
      NSLog(@"令令开门超时");
      result = DHBLE_RESULT_TIMEOUT;
      break;
    }
      
    default:
    {
      NSLog(@"令令开门失败");
      result = DHBLE_RESULT_PASSWORD_ERROR;
      break;
    }
  }
  
  if(self.gattManager)
    [self.gattManager setFlagDefault];
  
  
  [self notifyOpening:self.currentLock result:result];
}

- (void)BLEmonitor:(NSNotification *)notification{
  NSNumber *result = [notification object];
  NSLog(@"令令 BLEmonitor result = %@",result);
  switch ([result intValue]) {
    case 2:
    {
      NSLog(@"令令未搜索到设备");
      break;
    }
    case 3:
    {
      NSLog(@"令令正在连接设备");
      break;
    }
    case 4:
    {
      NSLog(@"令令连接成功");
      break;
    }
    case 5:
    {
      NSLog(@"令令连接超时");
      break;
    }
    case 6:
    {
      NSLog(@"令令连接失败");
      break;
    }
    case 7:
    {
      NSLog(@"令令未找到服务或特性");
      break;
    }
    default:
      break;
  }
}

- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)player successfully:(BOOL)flag{
  if (flag) {
    self.soundPlayer.delegate = nil;
    self.soundPlayer = nil;
  }
}

- (void)audioPlayerDecodeErrorDidOccur:(AVAudioPlayer *)player error:(NSError * __nullable)error{
  [player stop];
  self.soundPlayer.delegate = nil;
  self.soundPlayer = nil;
}

- (void)audioPlayerBeginInterruption:(AVAudioPlayer *)player{
  [player stop];
  self.soundPlayer.delegate = nil;
  self.soundPlayer = nil;
}

#pragma mark - 绑卡回调
- (void)addPaswdAndCardKeyCallBack:(DHBleResultType)result {
  [[NSNotificationCenter defaultCenter] postNotificationName:@"KBNotiAddPswCardCallBack" object:@{@"result":[KBLockModel resultReason:result]}];
}

- (void)disconnectDeviceCallBack {
  //    [self startScan]; // hidden, if not refresh before success animation haven't end
}

- (void)connectDeviceCallBack:(DHBleResultType)result {
  if (result == METHOD_OPERATE_TIMEOUT) {
    [self startScanNeedsLastestLocks:2.0f];
  }
}

#pragma mark - 判断蓝牙是否打开
- (void)judgeBluetooth {
  NSArray *backgroundModes = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"UIBackgroundModes"];
  if ([backgroundModes containsObject:@"bluetooth-central"]) {    // 后台
    self.centralManager = [[CBCentralManager alloc] initWithDelegate:self queue:nil options:@{CBCentralManagerOptionShowPowerAlertKey:[NSNumber numberWithBool:NO]}];
  } else {    // 非后台
    self.centralManager = [[CBCentralManager alloc] initWithDelegate:self queue:nil];
  }
}

#pragma mark - CBCentralManagerDelegate
- (void)centralManagerDidUpdateState:(CBCentralManager *)central {
  switch (central.state) {
    case CBManagerStatePoweredOn: {
      self.bluetoothEnabled = YES;
      [self stopScan];
      //      [self getLocks];
      [[NSNotificationCenter defaultCenter] postNotificationName:@"KBNotiUpdateBluetoothUI" object:@{@"bluetooth":@(YES)}];
    } break;
    case CBManagerStatePoweredOff: {
      self.bluetoothEnabled = NO;
      [self stopScan];
      [[NSNotificationCenter defaultCenter] postNotificationName:@"KBNotiUpdateBluetoothUI" object:@{@"bluetooth":@(NO)}];
    } break;
    default: break;
  }
}

- (void)updateBluetoothStateCallBack:(CBCentralManagerState)state{
  switch (state) {
    case CBManagerStatePoweredOn: {
      self.bluetoothEnabled = YES;
      [self stopScan];
      //      [self getLocks];
      [[NSNotificationCenter defaultCenter] postNotificationName:@"KBNotiUpdateBluetoothUI" object:@{@"bluetooth":@(YES)}];
    } break;
    case CBManagerStatePoweredOff: {
      self.bluetoothEnabled = NO;
      [self stopScan];
      [[NSNotificationCenter defaultCenter] postNotificationName:@"KBNotiUpdateBluetoothUI" object:@{@"bluetooth":@(NO)}];
    } break;
    default: break;
  }
}

- (NSMutableArray *)openPeripherals {
  if (!_openPeripherals) {
    _openPeripherals = [NSMutableArray array];
  }
  return _openPeripherals;
}

- (NSMutableArray *)scannedLocksArray {
  if (_scannedLocksArray == nil) {
    _scannedLocksArray = [NSMutableArray array];
  }
  return _scannedLocksArray;
}

- (NSMutableArray *)scanPeripherals {
  if (!_scanPeripherals) {
    _scanPeripherals = [NSMutableArray array];
  }
  return _scanPeripherals;
}

- (NSMutableArray *)scanUnlimitedLocks {
  if (_scanUnlimitedLocks == nil) {
    _scanUnlimitedLocks = [NSMutableArray array];
  }
  return _scanUnlimitedLocks;
}

- (NSArray *)sortedLocks {
  if (_sortedLocks == nil) {
    _sortedLocks = [NSArray array];
  }
  return _sortedLocks;
}

- (NSMutableDictionary *)cachedLocksDictionary {
  if (_cachedLocksDictionary == nil) {
    _cachedLocksDictionary = [NSMutableDictionary dictionary];
  }
  return _cachedLocksDictionary;
}

@end
