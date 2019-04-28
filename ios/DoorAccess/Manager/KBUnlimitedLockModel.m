//
//  KBUnlimitedLockModel.m
//  KubanClient
//
//  Created by 莫小言 on 2017/7/20.
//  Copyright © 2017年 kuban. All rights reserved.
//

#import "KBUnlimitedLockModel.h"

@implementation KBUnlimitedLockModel

- (instancetype)init {
    self = [super init];
    if (self) {
        self.rssis = [NSMutableArray array];
        self.timers = [NSMutableArray array];
    }
    return self;
}

@end
