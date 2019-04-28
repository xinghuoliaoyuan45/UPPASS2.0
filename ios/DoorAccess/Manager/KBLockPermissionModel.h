//
//  KBLockPermissionModel.h
//  KubanClient
//
//  Created by 莫小言 on 2018/1/22.
//  Copyright © 2018年 kuban. All rights reserved.
//

#import "KBLockModel.h"

@interface KBLockPermissionModel : NSObject

@property (nonatomic, strong) NSNumber *Id;
@property (nonatomic, strong) NSDate *startAt;
@property (nonatomic, strong) NSDate *endAt;
@property (nonatomic, strong) KBLockModel *lock;

@end
