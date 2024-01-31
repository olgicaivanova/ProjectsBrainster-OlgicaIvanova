import { Slider } from "@mui/material";
import { useState } from "react";
import { useFilterContext, useFilterSliderContext } from "../Context/context";
function valuetext(value: number) {
  return `${value}°C`;
}
// filters are not working currently / it's not explained in the doc what exactly should we filter
const minDistance = 10;
export const Filters = ({filteredSearch} : any) => {
  const [value1, setValue1] = useState<number[]>([0, 100]);
  const { filteredUsers } = useFilterContext();
  const {filters, setFilters} = useFilterSliderContext();

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="mt-4">Sort by</h2>
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <p>Recommended</p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <p>Rating</p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <p>Nearest to me</p>
          </div>
        </div>
        <hr />
        <div>
          <h2>Price range</h2>
          <Slider
            getAriaLabel={() => "Price"}
            value={value1}
            className="sliderPrice"
            onChange={handleChange1}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
          />
          <div className="d-flex align-items-center justify-content-between">
            <p className="text-muted">0$</p>
            <p className="text-muted">200$+</p>
          </div>
          <hr />

          <div>
            <h2>Amenities</h2>
            <div className="d-flex align-items-center justify-content-between">
              <p>Pay by card</p>
              <input
            type="checkbox"
            name="payByCard"
          />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p>Wi Fi</p>
              <input
            type="checkbox"
            name="wiFi"
          />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p>Child friendly</p>
            <input
            type="checkbox"
            name="childFriendly"
          />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p>Pet friendly</p>
              <input
            type="checkbox"
            name="petFriendly"
          />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p>Wheelchair accessible</p>
              <input
            type="checkbox"
            name="wheelchairAccessible"
          />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p>Free parking</p>
              <input
            type="checkbox"
            name="freeParking"
          />
            </div>
          </div>
          <hr />
          <div>
            <h2>Venue type</h2>
            <div className="d-flex align-items-center justify-content-between">
              <p>All</p>
              <input type="radio" />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p>Female</p>
              <input type="radio" />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p>Male</p>
              <input type="radio" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
