//
//  KBUnlimitedLockModel.h
//  KubanClient
//
//  Created by 莫小言 on 2017/7/20.
//  Copyright © 2017年 kuban. All rights reserved.
//

#import "KBModel.h"

@interface KBUnlimitedLockModel : KBModel

@property (nonatomic, copy) NSString *deviceId;
@property (nonatomic, assign) BOOL isUserLock;
@property (nonatomic, strong) NSNumber *lockId;
@property (nonatomic, copy) NSString *name;
@property (nonatomic, copy) NSString *peripheralName;
@property (nonatomic, strong) NSNumber *actRssi;
@property (nonatomic, strong) NSMutableArray *rssis;
@property (nonatomic, strong) NSMutableArray *timers;

@property (nonatomic, strong) NSNumber *iosRssi;
@property (nonatomic, strong) NSNumber *iosClickRssi;
@property (nonatomic, strong) NSNumber *androidRssi;
@property (nonatomic, strong) NSNumber *androidClickRssi;

@end
