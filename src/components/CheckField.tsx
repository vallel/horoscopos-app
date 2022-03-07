import { Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

export default function CheckField(props: any) {
  const { name, onSelection, selected } = props;
  const [isSelected, setIsSelected] = useState(selected);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const onFieldSelected = () => {
    let selected = !isSelected;
    setIsSelected(selected);
    onSelection(name, selected);
  };

  const fieldStyle = {
    backgroundColor: isSelected ? "#349beb" : "#ccc",
    color: isSelected ? "#fff" : "#000",
    ...styles.field,
  };

  return (
    <Text style={fieldStyle} onPress={onFieldSelected}>
      {name.charAt(0).toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  field: {
    width: 30,
    height: 30,
    fontWeight: "bold",
    padding: 5,
    borderRadius: 30,
    textAlignVertical: "center",
    textAlign: "center",
  },
});
