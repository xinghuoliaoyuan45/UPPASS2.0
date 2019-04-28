//
//  RNLockBridageManager.m
//  ReactNativeStart
//
//  Created by 郑南 on 2019/1/25.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNLockBridageManager.h"
#import <React/RCTLog.h>
#import "KBLockManager.h"
@implementation RNLockBridageManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setLocks:(NSArray *)locks isProd:(BOOL)isProd){
  RCTLogInfo(@"setLocks:%@",locks);
  [KBLockManager sharedInstance].isPROD = isProd;
  
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    [[KBLockManager sharedInstance] registerLockDelegate];
  });
  
  [[KBLockManager sharedInstance] checkLockTypes:[KBLockPermissionModel mj_objectArrayWithKeyValuesArray:locks]];
}

RCT_EXPORT_METHOD(openLock:(NSDictionary *)lock){
  RCTLogInfo(@"openLock===%@",lock);
  KBLockModel *lockModel = [KBLockModel mj_objectWithKeyValues:lock];
  [[KBLockManager sharedInstance] clickOpen:lockModel];
}

RCT_EXPORT_METHOD(scanLocksWithTimeOut:(CGFloat)time){
  RCTLogInfo(@"scanLocksWithTimeOut");
  [[KBLockManager sharedInstance] startScanNeedsLastestLocks:time];
}

RCT_EXPORT_METHOD(scanLocks){
  RCTLogInfo(@"scanLocks");
  [[KBLockManager sharedInstance] startScanNeedsLastestLocks:2.5f];
}

RCT_EXPORT_METHOD(closeLocks){
  RCTLogInfo(@"closeLocks");
  [[KBLockManager sharedInstance] stopScan];
}

RCT_EXPORT_METHOD(bluetoothIsOpen){
  RCTLogInfo(@"bluetoothIsOpen");
//  [[KBLockManager sharedInstance] judgeBluetooth];
  [[NSNotificationCenter defaultCenter] postNotificationName:@"KBBluetoothStateJudgement" object:nil];
}

-(void)startObserving {
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(LockUpdateBluetoothUIMessage:)
                                               name:@"KBNotiUpdateBluetoothUI"
                                             object:nil];
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(LockUpdateLockUIMessage:)
                                               name:@"KBNotiUpdateLockUI"
                                             object:nil];
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(bluetoothStateCallBack:)
                                               name:@"KBBluetoothStateJudgement"
                                             object:nil];
}

-(void)stopObserving {
  [[NSNotificationCenter defaultCenter]removeObserver:self name:@"KBNotiUpdateBluetoothUI" object:nil];
  [[NSNotificationCenter defaultCenter]removeObserver:self name:@"KBNotiUpdateLockUI" object:nil];
  [[NSNotificationCenter defaultCenter]removeObserver:self name:@"KBBluetoothStateJudgement" object:nil];
}

- (NSArray<NSString *>*)supportedEvents{
  return @[@"LockUpdateBluetoothUI",@"LockUpdateLockUI",@"KBBluetoothStateJudgement"];
}

-(void)LockUpdateBluetoothUIMessage:(NSNotification *)notification{
  
  dispatch_async(dispatch_get_main_queue(), ^{
    [self sendEventWithName:@"LockUpdateBluetoothUI" body:notification.object];
  });
}

-(void)LockUpdateLockUIMessage:(NSNotification *)notification{
  RCTLogInfo(@"notification.object------%@",notification.object);
  NSMutableArray *arr = [[NSMutableArray alloc]init];
  for (KBLockModel *lock in (NSArray*)[notification.object objectForKey:@"data"]) {
    NSDictionary *dict = [lock mj_keyValuesWithKeys:@[
                                                      @"ID",
                                                      @"name",
                                                      @"type",
                                                      @"deviceId",
                                                      @"networkType",
                                                      @"openType",
                                                      @"hasBindingCard",
                                                      @"devicePassword",
                                                      @"startAt",
                                                      @"endAt",
                                                      @"lockType",
                                                      @"serialNumber",
                                                      @"serial",
                                                      @"createdAt",
                                                      @"lockName",
                                                      @"peripherals",
                                                      @"readTime",
                                                      @"isGate",
                                                      @"is_enabled"]];
    [arr addObject:dict];
  }
  
  NSMutableDictionary *transfromDict = [[NSMutableDictionary alloc]initWithDictionary:notification.object];
  [transfromDict setObject:arr forKey:@"data"];
  
  if ([notification.object objectForKey:@"lock"]) {
    KBLockModel *lock = [notification.object objectForKey:@"lock"];
    [transfromDict setObject:[lock mj_keyValues] forKey:@"lock"];
  }
  
  dispatch_async(dispatch_get_main_queue(), ^{
    [self sendEventWithName:@"LockUpdateLockUI" body:transfromDict];
  });
  
}

- (void)bluetoothStateCallBack:(NSNotification *)notification{
  dispatch_async(dispatch_get_main_queue(), ^{
    [self sendEventWithName:@"KBBluetoothStateJudgement" body:@{@"bleIsOpen":@([KBLockManager sharedInstance].bluetoothEnabled)}];
  });
}

@end
