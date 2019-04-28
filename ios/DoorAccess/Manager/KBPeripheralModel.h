//
//  KBPeripheralModel.h
//  KubanClient
//
//  Created by 莫小言 on 2017/8/23.
//  Copyright © 2017年 kuban. All rights reserved.
//

#import "KBModel.h"
#import <CoreBluetooth/CoreBluetooth.h>
@interface KBPeripheralModel : KBModel

@property (nonatomic, copy) NSString *deviceId;
@property (nonatomic, copy) NSString *name;
@property (nonatomic, strong) NSNumber *actRssi;
@property (nonatomic, strong) NSDate *scanTime;
@property (nonatomic, strong) CBPeripheral *peripheral;

@end
