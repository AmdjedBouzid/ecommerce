import React from "react";
import Label from "./Label";
import Input from "./InputField";
interface formFildProps {
  labelName: string;
  inputType: string;
  value: any;
  onChange: any;
}
function formFild({ labelName, inputType, value, onChange }: formFildProps) {
  return (
    <div className="col-span-2 lg:col-span-1">
      <Label>{labelName}</Label>
      <Input type={inputType} value={value} onChange={onChange} />
    </div>
  );
}

export default formFild;
