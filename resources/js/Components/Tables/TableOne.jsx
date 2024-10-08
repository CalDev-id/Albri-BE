import React from "react";

const brandData = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "Kemiri",
    visitors: 3.5,
    revenues: "Rp. 500.000",
    sales: "Rp. 200.000",
    conversion: 4.8,
    short: "K",
  },
  {
    logo: "/images/brand/brand-02.svg",
    name: "Kutoarjo",
    visitors: 2.2,
    revenues: "Rp. 500.000",
    sales: "Rp. 200.000",
    conversion: 4.3,
    short: "K",
  },
  {
    logo: "/images/brand/brand-03.svg",
    name: "Pituruh",
    visitors: 2.1,
    revenues: "Rp. 500.000",
    sales: "Rp. 200.000",
    conversion: 3.7,
    short: "P",
  },
  {
    logo: "/images/brand/brand-04.svg",
    name: "Loano",
    visitors: 1.5,
    revenues: "Rp. 500.000",
    sales: "Rp. 200.000",
    conversion: 2.5,
    short: "L",
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "Mranti",
    visitors: 3.5,
    revenues: "Rp. 500.000",
    sales: "Rp. 200.000",
    conversion: 4.2,
    short: "M",
  },
];

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Branch
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Students
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Revenues
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Outcomes
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Conversion
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-800">
                <h1 className="text-2xl font-bold text-gray-200">
                  {brand.short}
                </h1>
              </div>

              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.visitors}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{brand.revenues}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-red dark:text-white">{brand.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.conversion}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
