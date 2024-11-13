import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StationInfo, StationServicePricing, StationServiceType } from '../../types';
import PriceField from '../price-field/price-field';

interface PriceListProps {
    typeOptions: StationServiceType[];
    existingStation: StationInfo;
    onChange?: (val: StationServicePricing[]) => void;
    fieldName: string;
    WFormRef?: any;
}

const  PriceList = (props: PriceListProps) => {
  const { typeOptions, existingStation, onChange, WFormRef } = props;
  const [priceList, setPriceList] = useState<{
    currentVal: StationServicePricing;
    option: StationServiceType;
}[]>()
 
useEffect(() => {
    if (priceList?.length && typeOptions.length) {
        let _priceList = typeOptions.map(option => {
          const validIds = option.StationServiceTypeOptions.map(
            (t: any) => t.StationServiceId,
          );
          const currentVal = existingStation?.StationServicesPricing?.find(p =>
            validIds.includes(p.StationServiceId),
          ) ?? {
            StationServiceId: -1,
            StationServicePrice: 0,
          };
      
          return {
            currentVal,
            option,
          };
        });
        setPriceList(_priceList);
      }

}, [])

const onChangePriceField = (val: StationServicePricing, index: number) => {
    const newPriceList = [...priceList];
    newPriceList[index].currentVal = val;
    setPriceList(newPriceList);
    onChange(newPriceList.map(p => p.currentVal));
    setTimeout(() => {
        WFormRef?.current?.validate();
    });
}
    return (
       <View>
        {priceList?.map?.(({ currentVal, option }, index) => {
          return (
            <PriceField
            fieldName={`${props.fieldName}-${index}`}
            option= {option}
            value={currentVal}
            onChange={() => onChangePriceField(currentVal, index)}
            />
         )
        })}
       </View>
    );
}

export default PriceList;