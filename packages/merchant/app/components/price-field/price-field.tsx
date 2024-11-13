import { useState } from "react";
import { View } from "react-native";
import { WashubInput } from "../../../../shared/components";
import { Picker } from "../../../../shared/components/w-picker/w-picker";
import { formatMoney } from "../../../../shared/services/api/Utils";
import { StationServicePricing, StationServiceType } from "../../types";
import { styles } from "./price-field.style";

interface PriceFieldProps {
    option: StationServiceType;
    onChange: (val: StationServicePricing) => void;
    value: StationServicePricing;
    fieldName: string;
}

const PriceField = (props: PriceFieldProps) => {
    const {onChange, option, value, fieldName} = props

    const options = option.StationServiceTypeOptions.filter(
      o => o.StationServiceId > -1,
    ).map(o => ({
      label: o.StationServiceName,
      value: o.StationServiceId,
    }));
  
    const [price, setPrice] = useState(
        value.StationServicePrice > 0
          ? String(value.StationServicePrice)
          : undefined,
      );
    const [selectedOption, setSelectedOption] = useState(
     value.StationServiceId,
    );
  
    const priceEnabled = selectedOption > -1;

    const onChangeOption = (val: string) => {
        setSelectedOption(parseInt(val, 10));
        onChange({
            ...value,
            StationServiceId: parseInt(val, 10),
        });
    }
    const onChangePrice = (val: string) => {
        setPrice(formatMoney(val));
        onChange({
            ...value,
            StationServicePrice: parseInt(val),
        });
    }
  
    return (
      <View style={styles.priceField}>
        <Picker
          fieldName={`service-${fieldName}`}
          placeholder={`Select ${option.StationServiceClassName}`}
          value={String(selectedOption)}
          onChange={onChangeOption}
          items={options ?? []}
        />
        {priceEnabled && (
          <WashubInput
            fieldName={`price-${fieldName}`}
            style={styles.text18}
            keyboardType="numeric"
            placeholder="Price"
            value={price}
            editable={selectedOption > -1}
            onChangeText={onChangePrice}
          />
        )}
      </View>
    );
  };
  

  export default PriceField;