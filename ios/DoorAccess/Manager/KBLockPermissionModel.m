//
//  KBLockPermissionModel.m
//  KubanClient
//
//  Created by 莫小言 on 2018/1/22.
//  Copyright © 2018年 kuban. All rights reserved.
//

#import "KBLockPermissionModel.h"

@implementation KBLockPermissionModel

+ (NSDictionary *)mj_objectClassInArray {
    return @{
             @"lock" : @"KBLockModel",
             };
}

+ (NSString *)mj_replacedKeyFromPropertyName121:(NSString *)propertyName {
  // nickName -> nick_name
  if ([[self mj_replacedKeyFromPropertyName] objectForKey:propertyName]) {
    return nil;
  }
  return [propertyName mj_underlineFromCamel];
}

+ (NSDictionary *)mj_replacedKeyFromPropertyName {
  return @{
           @"Id":@"id"
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
