import React from "react";
import job_data from "@/data/job-data";
import NiceSelect from "@/ui/nice-select";
import useFilterStore from "@/lib/store/filter";


const FilterEnglishFluency = () => {
  const { setEnglishFluency } = useFilterStore((state) => state);
  const uniqueEnglishFluency = [
    ...new Set(job_data.map((job) => job.english_fluency)),
  ];

  const handleEnglishFluency = (item: { value: string; label: string }) => {
  setEnglishFluency(item.value)
  };
  const options = uniqueEnglishFluency.map((e) => {
    return { value: e, label: e };
  });

  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">English Fluency</div>
      <NiceSelect
        options={options}
        defaultCurrent={0}
        onChange={(item) => handleEnglishFluency(item)}
        name="English Fluency"
        placeholder="English Fluency"
        cls="bg-white"
      />
    </div>
  );
};

export default FilterEnglishFluency;
