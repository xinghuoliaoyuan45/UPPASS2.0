///
//  KBModel.m
//  KubanClient
//
//  Created by zhouhan on 16/8/10.
//  Copyright © 2016年 kuban. All rights reserved.
//

#import "KBModel.h"

@implementation KBModel

MJExtensionCodingImplementation

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

+ (NSDictionary *)mj_objectClassInArray {
    return @{

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
