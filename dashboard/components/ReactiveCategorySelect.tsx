"use client";
import React, { useState } from "react";
import Select from "react-select";

type Props = {
  selectedCategories: any[];
  allCategories: any[];
};

const ReactiveCategorySelect = (props: Props) => {
  const selectedCategories = props.selectedCategories;
  const allCategories = props.allCategories;

  // Convert initial categories to options
  const initialOptions = [];
  for (let i in selectedCategories) {
    const id = selectedCategories[i];
    const category = allCategories.find((c) => c.id == id);
    if (category) {
      initialOptions.push({ value: category.id, label: category.name });
    }
  }

  // Convert all categories to options
  const allOptions: any[] = [];
  for (let i in allCategories) {
    const category = allCategories[i];
    if (category) {
      allOptions.push({ value: category.id, label: category.name });
    }
  }

  const [selected, setSelected] = useState(initialOptions);
  const handleChange = async (selected: any) => {
    setSelected(selected);
  };

  return (
    <div className="text-black">
      <Select
        isMulti
        name="categories"
        className="basic-multi-select"
        classNamePrefix="select"
        options={allOptions}
        onChange={handleChange}
        placeholder="Kategorie"
        value={selected}
      />
    </div>
  );
};

export default ReactiveCategorySelect;
