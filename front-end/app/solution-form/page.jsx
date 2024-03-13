"use client";
import React, { useState } from "react";
import DynamicAlert from "@/components/DynamicAlert";
import Weather from "@/components/Weather";


// Import statements

const SolutionForm = () => {
  const [formData, setFormData] = useState({
    building_type: "",
    solution_type: "",
    device_powered: "",
    power_generated: "",
    roof_type: "",
    grid_type: "",
    inverter_type: "",
    panel_type: "",
    electrical_consumption: "",
    building_size: "",
    device_consumption: "",
    excess_energy: "",
    selectedDeviceLists: [],
  });

  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const getWeatherInfo = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setError("Geolocation is not supported in this browser");
    }
    
    async function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      const weatherData = await Weather({ latitude, longitude });
  
    if (weatherData) {
      console.log("Temperature:", weatherData.temperature2m);
    } else {
      console.log("Unable to fetch weather data.");
    }
    }
    
    function error() {
      setError("Unable to retrieve your location");
    }
    setError("");

   };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleAddList = (e) => {
    // Create a new list with the selected device
    const selectedDevice = formData.device_consumption;
    if (selectedDevice) {
      setFormData({
        ...formData,
        selectedDeviceLists: [...formData.selectedDeviceLists, [selectedDevice]],
        device_consumption: "", // Clear the selected device for the next entry
      });
    }
  };

  const handleRemoveDevice = (listIndex, deviceIndex) => {
    // Remove the selected device from the list
    const updatedLists = [...formData.selectedDeviceLists];
    updatedLists[listIndex].splice(deviceIndex, 1);

    setFormData({
      ...formData,
      selectedDeviceLists: updatedLists,
    });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="bg-gradient-to-r from-green-200 to-green-400 text-black min-h-screen p-4 md:p-8">
  <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
    Choose your solution
  </h2>

  <div className="bg-slate-50 my-10 md:my-20 rounded-3xl py-4 flex flex-col md:h-3/4">
        <div className="flex justify-center mb-4">
          <div className="flex items-center">
            <div
              className={`flex w-96 h-1 bg-green-500 mx-1 font-semibold text-xl mb-20 ${
                currentStep >= 1 ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              {currentStep === 1 && "Calculate consumption"}
            </div>
            <div
              className={`flex w-96 h-1 bg-green-500 mx-1 font-semibold text-xl mb-20 ${
                currentStep >= 2 ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              {currentStep === 2 && "Define purpose"}
            </div>
            <div
              className={`flex w-96 h-1 bg-green-500 mx-1 font-semibold text-xl mb-20 ${
                currentStep >= 3 ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              {currentStep === 3 && "Choose solution"}
            </div>
          </div>
        </div>

        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="flex flex-col">
              <div className="flex flex-col my-4 mr-48">
                <p className="font-semibold">Building Type:</p>
                <div className="flex">
                  <div className="flex mx-8">
                    <input
                      type="checkbox"
                      id="apartment"
                      name="building_type"
                      value="apartment"
                      checked={formData.building_type === "apartment"}
                      onChange={handleCheckboxChange}
                    />
                    <label className="ml-2">Apartment</label>
                  </div>

                  <div className="flex items-center mx-8">
                    <input
                      type="checkbox"
                      id="single household"
                      name="building_type"
                      value="single household"
                      checked={formData.building_type === "single household"}
                      onChange={handleCheckboxChange}
                    />
                    <label className="ml-2">Single Household</label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col my-4">
                <p className="font-semibold">Electrical Consumption:</p>
                <div className="flex">
                  <div className="flex mx-8">
                    <input
                      type="checkbox"
                      id="list"
                      name="electrical_consumption"
                      value="list"
                      checked={formData.electrical_consumption === "list"}
                      onChange={handleCheckboxChange}
                    />
                    <label className="ml-2">List devices manually</label>
                  </div>

                  <div className="flex mx-8">
                    <input
                      type="checkbox"
                      id="average"
                      name="electrical_consumption"
                      value="average"
                      checked={formData.electrical_consumption === "average"}
                      onChange={handleCheckboxChange}
                    />
                    <label className="ml-2">Average of your bills for last year</label>
                  </div>
                </div>

                {formData.electrical_consumption === 'list' && (
                  <div className="pt-4 flex flex-col items-start mb-4">
                    <p className="font-semibold">Choose device:</p>
                    <div>
                      <select
                        id="device_consumption"
                        name="device_consumption"
                        required
                        className="mt-2 mb-4 w-80 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        value={formData.device_consumption}
                        onChange={handleInputChange}
                      >
                        <option value="">Select device</option>
                        <option value="TV">TV</option>
                        <option value="PC">PC</option>
                        <option value="Dishwasher">Dishwasher</option>
                        <option value="other">Other</option>
                      </select>
                      <button
                        type="button"
                        onClick={handleAddList}
                        className="w-10 mx-4 bg-green-400  text-white py-2 px-15 rounded-2xl hover:bg-green-200 focus:outline-none focus:bg-green-700 relative"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

{currentStep === 1 && (
        formData.electrical_consumption === 'list' && (
          <div className="pt-2 flex flex-col items-start mb-4">
            <p className="font-semibold">Selected Devices:</p>
            {formData.selectedDeviceLists.map((deviceList, listIndex) => (
              <div key={listIndex}>
                <ul>
                  {deviceList.map((device, deviceIndex) => (
                    <li key={deviceIndex}>
                      {device}
                      <button
                        type="button"
                        onClick={() => handleRemoveDevice(listIndex, deviceIndex)}
                        className="mx-3 my-1 bg-red-500 text-white py-1 px-2 rounded"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
      
        )
        )}

                {formData.electrical_consumption === 'average' && (
                  <div className="pt-4 flex flex-col items-start mb-4">
                    <p className="font-semibold">Average:</p>
                    <input
                      id="device_powered"
                      name="device_powered"
                      type="text"
                      required
                      className="mt-2 mb-4 w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder=""
                      value={formData.device_powered}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          

        {currentStep === 2 && (
          <div className="flex flex-col ">

          <div className="pt-4 mb-4">
            <p className="font-semibold">What device will it power?</p>
                <div>

                <select
                  id="device_powered"
                  name="device_powered"
                  required
                  className="mt-2 mb-4 w-80 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={formData.powered}
                  onChange={handleInputChange}
                >
                  <option value="">Select device</option>
                  <option value="TV">TV</option>
                  <option value="PC">PC</option>
                  <option value="dishwasher">Dishwasher</option>
                  <option value="other">Other</option>
                </select>
                </div>
          </div>

          <div className="pt-4 mb-4">
            <p className="font-semibold">Building size (in m<sup>2</sup>)</p>
            <input
              id="building_size"
              name="building_size"
              type="text"
              required
              className="mt-2 mb-4 w-80 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder=""
              value={formData.building_size}
              onChange={handleInputChange}
            />
          </div>

          <div  className="flex my-4">
          <p className="font-semibold mr-4 mb-4">Location:</p>
              <button 
              type="button"
              className="text-black mb-4 underline hover:text-blue-700"
              onClick={getWeatherInfo}
              >Detect location
              </button> 
            </div>

        </div>

        )}

        {currentStep === 3 && (

          <div className="flex flex-col items-center">
            <div className="flex items-center mb-4">
              <p className="font-semibold">Solution Type:</p>
              <div className="flex">
                <div className="flex mx-8">
                  <input
                    type="checkbox"
                    id="solar"
                    name="solution_type"
                    value="solar"
                    checked={formData.solution_type === "solar"}
                    onChange={handleCheckboxChange}
                  />
                  <label className="ml-2">
                    Solar
                  </label>
                </div>

                <div className="flex items-center mx-8">
                  <input
                    type="checkbox"
                    id="wind"
                    name="solution_type"
                    value="wind"
                    checked={formData.solution_type === "wind"}
                    onChange={handleCheckboxChange}
                  />
                  <label className="ml-2">
                    Wind
                  </label>
                </div>
              </div>
            </div>

            {formData.solution_type === 'solar' && (
              <div className="flex mb-4 pt-4 pl-2">
                <p className="font-semibold">Panel Type:</p>
                <div className="flex items-center mx-8">
                  <input
                    type="checkbox"
                    id="mono"
                    name="panel_type"
                    value="mono"
                    checked={formData.panel_type === "mono"}
                    onChange={handleCheckboxChange}
                  />
                  <label className="ml-2">
                    Monocrystal
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="poly"
                    name="panel_type"
                    value="poly"
                    checked={formData.panel_type === "poly"}
                    onChange={handleCheckboxChange}
                  />
                  <label className="ml-2">
                    Polycrsytal
                  </label>
                </div>
              </div>
            )}

            <div className="flex mb-4 pt-4">
              <p className="font-semibold">Roof Type:</p>
              <div className="flex items-center mx-8">
                <input
                  type="checkbox"
                  id="straight"
                  name="roof_type"
                  value="straight"
                  checked={formData.roof_type === "straight"}
                  onChange={handleCheckboxChange}
                />
                <label className="ml-2">
                  Straight
                </label>
              </div>

              <div className="flex items-center mx-8">
                <input
                  type="checkbox"
                  id="curved"
                  name="roof_type"
                  value="curved"
                  checked={formData.roof_type === "curved"}
                  onChange={handleCheckboxChange}
                />
                <label className="ml-2">
                  Curved
                </label>
              </div>
            </div>

            <div className="flex mb-4 pt-4">
              <p className="font-semibold">Grid Type:</p>
              <div className="flex items-center mx-8">
                <input
                  type="checkbox"
                  id="on_grid"
                  name="grid_type"
                  value="on_grid"
                  checked={formData.grid_type === "on_grid"}
                  onChange={handleCheckboxChange}
                />
                <label className="ml-2">
                  On-Grid
                </label>
              </div>

              <div className="flex items-center mx-8">
                <input
                  type="checkbox"
                  id="off_grid"
                  name="grid_type"
                  value="off_grid"
                  checked={formData.grid_type === "off_grid"}
                  onChange={handleCheckboxChange}
                />
                <label className="ml-2">
                  Off-grid
                </label>
              </div>
            </div>


          {formData.grid_type === 'off_grid' && (
            <div className="pt-4 flex flex-col items-start mb-4 pr-14">
              <p className="font-semibold">How do you plan to store excess energy?</p>
              <div>

                  <select
                    id="excess_energy"
                    name="excess_energy"
                    required
                    className="mt-2 mb-4 w-80 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={formData.excess_energy}
                    onChange={handleInputChange}
                  >
                    <option value="">Select method</option>
                    <option value="TV">Battery</option>
                    <option value="PC">Heat Pump</option>
                    <option value="dishwasher">Hydro Generator</option>
                    <option value="other">Other</option>
                  </select>
                  </div>
            </div>
          )}

            <div className="flex mb-4 pt-4">
              <p className="font-semibold">Inverter Type:</p>
              <div className="flex items-center mx-8">
                <input
                  type="checkbox"
                  id="type_1"
                  name="inverter_type"
                  value="type_1"
                  checked={formData.inverter_type === "type_1"}
                  onChange={handleCheckboxChange}
                />
                <label className="ml-2">
                  Type 1
                </label>
              </div>

              <div className="flex items-center mx-8">
                <input
                  type="checkbox"
                  id="type_2"
                  name="inverter_type"
                  value="type_2"
                  checked={formData.inverter_type === "type_2"}
                  onChange={handleCheckboxChange}
                />
                <label className="ml-2">
                  Type 2
                </label>
              </div>
            </div>

          </div>

        )}
          
          {error ? <DynamicAlert error={error} /> : ""}
        </form>

        <div className="flex justify-end mx-2 mt-24">
  {currentStep > 1 && (
    <button
      type="button"
      onClick={handlePrev}
      className="w-20 sm:w-24 bg-gray-300 text-gray-800 py-2 px-2 rounded-md mr-2 "
    >
      Previous
    </button>
  )}

  {currentStep < 3 && (
    <button
      type="button"
      onClick={handleNext}
      className="w-20 sm:w-24 bg-green-400 text-gray-800 py-2 px-2 rounded-md "
    >
      Next
    </button>
  )}

  {currentStep === 3 && (
    <button
      type="submit"
      className="w-20 sm:w-24 bg-green-400 text-gray-800 py-2 px-2 rounded-md"
    >
      Submit
    </button>
  )}
</div>

        
        </div>

        
        
        
      </div>
  );
};

export default SolutionForm;
          
