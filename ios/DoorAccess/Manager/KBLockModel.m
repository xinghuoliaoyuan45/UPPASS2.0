//
//  KBLockModel.m
//  KubanClient
//
//  Created by zhouhan on 16/9/6.
//  Copyright © 2016年 kuban. All rights reserved.
//

#import "KBLockModel.h"
#import "NSData+Base64.h"
#import "KBLockManager.h"
@implementation KBLockModel

+ (NSDictionary *)mj_replacedKeyFromPropertyName {
  return @{
           @"ID":@"id",
           @"misRssi":@"rssi",
           };
}

+ (NSArray *)mj_ignoredCodingPropertyNames {
  return @[@"actRssi", @"readTime", @"readTimeStr", @"openType"];
}

- (NSMutableArray *)peripherals {
  if (!_peripherals) {
    _peripherals = [NSMutableArray array];
  }
  return _peripherals;
}

- (NSString *)decryptedDevicePassword {
  if (self.devicePassword) {
    return [KBLockModel decryptedPasswordWith:self.devicePassword isProd:[KBLockManager sharedInstance].isPROD];
  }
  return nil;
}

+ (NSString *)decryptedPasswordWith:(NSString *)paswword isProd:(BOOL)prod{
  NSString *door_key;
  NSString *door_iv;
  if (prod) {
    door_key = @"82fc1839159ae08f78af9b36422a8068";
    door_iv = @"75fc3d3b2f4fe835";
  }else{
    door_key = @"08981fe1177f170e68667c1d3527848f";
    door_iv = @"9314059931eedf0e";
  }
  NSData *encryptedData = [NSData dataFromBase64String:paswword];
  NSData *key = [door_key dataUsingEncoding:NSUTF8StringEncoding];
  NSData *iv = [door_iv dataUsingEncoding:NSUTF8StringEncoding];
  NSData *newData = [FBEncryptorAES decryptData:encryptedData key:key iv:iv];
  NSString *device = [[NSString alloc] initWithData:newData encoding:NSUTF8StringEncoding];
  return device;
}

- (KBLockPlaceType)placeType {
  if (self.isGate) {
    return KBLockPlaceType_Door;
  } else if ([self.type isEqualToString:@"public_office"] || [self.type isEqualToString:@"private_office"] || [self.type isEqualToString:@"flexible_office"]) {
    return KBLockPlaceType_Office;
  } else {
    return KBLockPlaceType_Meeting;
  }
}

- (CBPeripheral *)mainPeripheral {
  return [self.peripherals ct_first:^BOOL(CBPeripheral* peripheral) {
    return [[peripheral.name uppercaseString] hasSuffix:@"ONE"];
  }];
}

- (CBPeripheral *)subPeripheral {
  return [self.peripherals ct_first:^BOOL(CBPeripheral* peripheral) {
    return ![[peripheral.name uppercaseString] hasSuffix:@"ONE"];
  }];
}

//+ (NSString *)resultReason:(DHBleResultType)resultType {
//    static NSDictionary *errorDict;
//    static dispatch_once_t onceToken;
//    dispatch_once(&onceToken, ^{
//        errorDict = @{
//                      @(0) : KBLocalizedStr(@"操作成功", nil),
//                      @(1) : KBLocalizedStr(@"操作失败", nil),
//                      @(2) : KBLocalizedStr(@"系统码错误", nil),
//                      @(3) : KBLocalizedStr(@"锁ID不一致", nil),
//                      @(4) : KBLocalizedStr(@"用户密码错误", nil),
//                      @(5) : KBLocalizedStr(@"超时", nil),
//                      @(6) : KBLocalizedStr(@"没有登录(需要更改配置，请登录)", nil),
//                      @(7) : KBLocalizedStr(@"钥匙己经存在", nil),
//                      @(8) : KBLocalizedStr(@"钥匙已满", nil),
//                      @(9) : KBLocalizedStr(@"钥匙为空", nil),
//                      @(10) : KBLocalizedStr(@"命令不支持", nil),
//                      @(11) : KBLocalizedStr(@"设备为未注册", nil),
//                      @(12) : KBLocalizedStr(@"设备密码为默认密码(请更改设备密码)", nil),
//                      @(-1) : KBLocalizedStr(@"服务未启用", nil),
//                      @(-2) : KBLocalizedStr(@"设备未连接", nil),
//                      @(-4) : KBLocalizedStr(@"不支持蓝牙", nil),
//                      @(-5) : KBLocalizedStr(@"蓝牙未启动", nil),
//                      @(-6) : KBLocalizedStr(@"接口调用超时", nil),
//                      @(-7) : KBLocalizedStr(@"服务未启动或门禁不存在", nil),
//                      @(-8) : KBLocalizedStr(@"输入参数错误", nil),
//                      @(-9) : KBLocalizedStr(@"没有扫描到对应的设备", nil),
//                      @(-10) : KBLocalizedStr(@"门禁服务未找到", nil),
//                      @(201) : KBLocalizedStr(@"设备不在线", nil),
//                      @(202) : KBLocalizedStr(@"请求端不在线", nil),
//                      @(203) : KBLocalizedStr(@"没有对应session对象", nil),
//                      @(204) : KBLocalizedStr(@"没有对应session", nil),
//                      @(205) : KBLocalizedStr(@"session未连接", nil),
//                      @(206) : KBLocalizedStr(@"主机未回复", nil)
//                      };
//    });
//    return errorDict[@(resultType)];
//}

- (id)copyWithZone:(NSZone *)zone {
  KBLockModel *lock = [KBLockModel allocWithZone:zone];
  lock.ID = self.ID;
  lock.name = self.name;
  lock.deviceId = self.deviceId;
  lock.devicePassword = self.devicePassword;
  lock.type = self.type;
  lock.misRssi = self.misRssi;
  lock.clickRssi = self.clickRssi;
  lock.androidRssi = self.androidRssi;
  lock.androidClickRssi = self.androidClickRssi;
  lock.isGate = self.isGate;
  lock.networking = self.networking;
  lock.networkType = self.networkType;
  lock.hasBindingCard = self.hasBindingCard;
  lock.actRssi = self.actRssi;
  lock.openType = self.openType;
  lock.peripherals = self.peripherals;
  lock.isAutoEnabled = self.isAutoEnabled;
  lock.isEnabled = self.isEnabled;
  lock.startAt = self.startAt;
  lock.endAt = self.endAt;
  lock.readTime = self.readTime;
  lock.readTimeStr = self.readTimeStr;
  lock.lockType = self.lockType;
  return lock;
}

+ (NSString *)mj_replacedKeyFromPropertyName121:(NSString *)propertyName {
  // nickName -> nick_name
  if ([[self mj_replacedKeyFromPropertyName] objectForKey:propertyName]) {
    return nil;
  }
  return [propertyName mj_underlineFromCamel];
}

+ (NSDictionary *)mj_objectClassInArray {
  return @{
           @"peripherals":@"CBPeripheral"
          };
}

- (id)mj_newValueFromOldValue:(id)oldValue property:(MJProperty *)property {
  if (property.type.typeClass == [NSDate class] && ![oldValue isKindOfClass:[NSNull class]]) {
    long long time = [oldValue longLongValue];
    NSDate *date = [NSDate dateWithTimeIntervalSince1970:time];
    return date;
  }
  return oldValue;
}

@end
