"use client";
import React, { useEffect, useState } from "react";
import DynamicAlert from "@/components/DynamicAlert";
import Weather from "@/api/Weather";
import { useRouter } from "next/navigation";

// Import statements

const SolutionForm = () => {
  const [formData, setFormData] = useState({
    building_type: "",
    solution_type: "",
    purpose: "",
    power_generated: "",
    roof_type: "",
    grid_type: "",
    inverter_type: "",
    panel_type: "",
    electrical_consumption: "",
    average_consumption: "",
    building_size: "",
    roof_size: "",
    device_consumption: "",
    excess_energy: "",
    default_consumption: "",
    selectedDeviceLists: [],
  });

  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const [azimuth, setAzimuth] = useState(null);
  const [solarDeclination, setSolarDeclination] = useState(null);
  const [trueSolarTime, setTrueSolarTime] = useState(null);
  const [solarHourAngle, setSolarHourAngle] = useState(null);
  const [angleOfIncidence, setAngleOfIncidence] = useState(null);
  const [useDefaultSettings, setUseDefaultSettings] = useState(false);

  var SunCalc = require("suncalc");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const router = useRouter();

  const handleInfoClick = (type) => {
    const infoDetails = {
      solar: (
        <div>
          <p>Advantages:</p>
          <p>
            • Wide applicability: Solar panels can work in most locations with
            sufficient sunlight.
            <br />
            • Low maintenance: They have no moving parts and require minimal
            maintenance.
            <br />• Silent operation: Solar panels produce electricity silently.
          </p>
          <p>Disadvantages:</p>
          <p>
            • Weather dependent: Solar energy production is dependent on
            sunshine availability.
            <br />• Lower power density: Compared to wind turbines, solar panels
            require more space to generate the same amount of energy.
          </p>
        </div>
      ),
      wind: (
        <div>
          <p>Advantages:</p>
          <p>
            • High power density: Wind turbines can generate more electricity
            per unit of space compared to solar panels (in suitable wind
            conditions).
            <br />• Wind is a predictable resource: Wind patterns can be studied
            and predicted to some extent.
          </p>
          <p>Disadvantages:</p>
          <p>
            • Site limitations: Wind turbines require sufficient wind resource
            and open space for efficient operation.
            <br />
            • Visual and noise impact: Wind turbines can be visually unappealing
            and generate noise, which may raise concerns for nearby residents.
            <br />• High maintenance: Wind turbines require regular maintenance
            due to their moving parts.
          </p>
        </div>
      ),
      Slope: (
        <div>
          <p>• SELF CLEANING DUE TO THE ANGLE</p>
          <p>• EASY INSTALLATION</p>
          <p>• IDEAL TILT ANGLE </p>
          <p>• MOST COMMON</p>
          <p>• CHEAPEST OPTION</p>
          <p>• BEST OPTION FOR MOUNTING</p>
        </div>
      ),
      Flat: (
        <div>
          <p>• FLEXIBILITY IN LAYOUT</p>
          <p>• TRACKING SYSTEMS MIGHT NEEDED WHICH IS EXTRA COST</p>
          <p>• MIDDLE COST</p>
          <p>• NEEDED MORE ROBUST MOUNTING SYSTEMS WHICH ADD EXTRA COST</p>
        </div>
      ),
      Composite: (
        <div>
          <p>• COMPLEX MOUNTING AND TRACKING SYSTEM</p>
          <p>• HIGHEST COST</p>
          <p>• NEEDED MORE ROBUST MOUNTING SYSTEMS WHICH ADD EXTRA COST</p>
        </div>
      ),
      OnGrid: (
        <div>
          <p>Advantages:</p>
          <p>
            • Lower initial cost: No need for batteries, simplifying the system
            and reducing upfront investment <br />
            • Reliable backup: Access to grid power when solar generation is
            insufficient <br />• Net metering: Receive credits for exported
            electricity, offsetting electricity bills{" "}
          </p>
          <p>Disadvantages:</p>
          <p>
            • Dependence on the grid: Power outages affect your supply [10].
            <br />
            • Limited export quotas: Excess generation beyond a threshold might
            not be credited <br />
            • Additional fees: Some grid operators charge fees for exported
            energy.
            <br />
          </p>
        </div>
      ),
      OffGrid: (
        <div>
          <p>Advantages:</p>
          <p>
            • Energy independence: Freedom from grid outages and fluctuations.
            <br />
            • Flexibility: Suitable for remote locations or areas with
            unreliable grid access.
            <br />• Environmental benefits: Reduced reliance on fossil fuels.
          </p>
          <p>Disadvantages:</p>
          <p>
            • Higher initial cost: Batteries and additional equipment increase
            upfront investment..
            <br />• System complexity: Requires careful sizing and management to
            ensure sufficient energy storage.
          </p>
        </div>
      ),

      panel1: (
          <div className="flex flex-col items-center justify-center">
          <img src="./panel1.png"/>
          <a href="https://static.csisolar.com/wp-content/uploads/2024/04/03113544/CS-Datasheet-TOPHiKu6-TOPConAll-Black_CS6R-T_v1.2_EN.pdf" className="py-4 text-blue-500 hover:underline">Panel datasheet</a>
          </div>
      ),

      panel2: (
        <div className="flex flex-col items-center justify-center">
        <img src="./panel2.png"/>
        <a href="https://static.trinasolar.com/sites/default/files/Vertex_NEG21C.20_EN_2023_APAC_C_web.pdf" className="py-4 text-blue-500 hover:underline">Panel datasheet</a>
        </div>
    ),

    panel3: (
          <div className="flex flex-col items-center justify-center">
          <img src="./panel3.png"/>
          <a href="https://www.canadiansolar.com/wp-content/uploads/2019/12/Canadian_Solar-Datasheet-HiKu_CS3L-MS_EN.pdf" className="py-4 text-blue-500 hover:underline">Panel datasheet</a>
          </div>
      ),

      panel4: (
        <div className="flex flex-col items-center justify-center">
        <img src="./panel4.png"/>
        <a href="https://www.jinkosolar.com/uploads/619f40ec/JKM550-570N-72HL4-BDV-F1-EN.pdf" className="py-4 text-blue-500 hover:underline">Panel datasheet</a>
        </div>
    ),

    inverter1: (
      <div className="flex flex-col items-center justify-center">
      <img src="./inverter1.png"/>
      <a href="https://files.sma.de/downloads/SBS38-60-US-DSP_MX183417W.pdf" className="py-4 text-blue-500 hover:underline">Inverter datasheet</a>
      </div>
  ),

  inverter2: (
    <div className="flex flex-col items-center justify-center">
    <img src="./inverter2.png"/>
    <a href="https://www.fronius.com/en-gb/uk/solar-energy/installers-partners/technical-data/all-products/inverters/fronius-symo/fronius-symo-5-0-3-m" className="py-4 text-blue-500 hover:underline">Inverter datasheet</a>
    </div>
),

inverter3: (
      <div className="flex flex-col items-center justify-center">
      <img src="./inverter3.png"/>
      <a href="https://www.fronius.com/~/downloads/Solar%20Energy/Datasheets/SE_DS_Fronius_Symo_EN.pdf" className="py-4 text-blue-500 hover:underline">Inverter datasheet</a>
      </div>
  ),

    };

    setModalContent(infoDetails[type]);
    setIsModalOpen(true);
  };

  const handleDefaultCustomizeChange = (e) => {
    setUseDefaultSettings(e.target.id === "default" && e.target.checked);
  };

  const handleSolutionCustomizationChange = (e) => {
    const { id, checked } = e.target;
    // Toggle the state based on which checkbox was clicked
    setIsCustomizeSelected(id === "customize" ? checked : !checked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "default_consumption") {
        // Handle default consumption checkbox separately
        setFormData({
          ...formData,
          [name]: checked ? "true" : "", // Set to "true" if checked, empty string otherwise
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
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
      setLatitude(latitude);
      setLongitude(longitude);

      const weatherData = await Weather({ latitude, longitude });
      setWeatherInfo(weatherData);

      var times = SunCalc.getTimes(new Date(), latitude, longitude);
      var sunrisePos = SunCalc.getPosition(times.sunrise, latitude, longitude);
      console.log(
        `Solar Altitude: ${sunrisePos.altitude}, Solar Azimuth: ${sunrisePos.azimuth}`
      );
      setAltitude(sunrisePos.altitude); // Set latitude state
      setAzimuth(sunrisePos.azimuth); // Set longitude state
    }

    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var dayInMs = 1000 * 60 * 60 * 24;
    var dayOfYear = Math.floor(diff / dayInMs);

    const solarDeclination = 23.27 * Math.sin((360 * (dayOfYear + 283)) / 265);
    setSolarDeclination(solarDeclination);

    var currentHour = now.getHours();
    var currentMinute = now.getMinutes();

    // Calculate the total minutes passed since midnight
    var totalMinutesPassed = currentHour * 60 + currentMinute;

    var EOT = 5;

    const trueSolarTime = totalMinutesPassed + EOT * 4 + longitude * 4;
    setTrueSolarTime(trueSolarTime);

    const solarHourAngle = trueSolarTime / 4 - 180;
    setSolarHourAngle(solarHourAngle);

    const angleOfIncidence = 90 - altitude - solarDeclination;
    setAngleOfIncidence(angleOfIncidence);

    function error() {
      setError("Unable to retrieve your location");
    }
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.p;
    const output = {
      ...formData, // Include existing form data
      latitude: latitude,
      longitude: longitude,
      altitude: altitude,
      azimuth: azimuth,
      // Include weather information only if available
      averageSolarIrradiancePerDay: weatherInfo
        ? weatherInfo.averageSolarIrradiancePerDay
        : null,
      averageSunshineDuration: weatherInfo
        ? weatherInfo.averageSunshineDuration
        : null,
      solarDeclination: solarDeclination,
      trueSolarTime: trueSolarTime,
      solarHourAngle: solarHourAngle,
      angleOfIncidence: angleOfIncidence,
    };
    router.push("solution");
    console.log(output);
  };

  const handleAddList = (e) => {
    // Create a new object with the selected device
    const selectedDevice = formData.device_consumption;
    if (selectedDevice) {
      const newDevice = {
        device: selectedDevice,
        consumption: "",
        useDefault: false,
      };

      setFormData({
        ...formData,
        selectedDeviceLists: [...formData.selectedDeviceLists, newDevice],
        device_consumption: "", // Clear the selected device for the next entry
      });
    }
  };

  const handleRemoveDevice = (index) => {
    const updatedSelectedDeviceLists = [...formData.selectedDeviceLists];
    updatedSelectedDeviceLists.splice(index, 1);
    setFormData({
      ...formData,
      selectedDeviceLists: updatedSelectedDeviceLists,
    });
  };

  const handleConsumptionChange = (e, index) => {
    const { value } = e.target;
    const updatedSelectedDeviceLists = [...formData.selectedDeviceLists];
    updatedSelectedDeviceLists[index].consumption = value;
    setFormData({
      ...formData,
      selectedDeviceLists: updatedSelectedDeviceLists,
    });
  };

  const handleDefaultChange = (e, index) => {
    const { checked } = e.target;
    const updatedSelectedDeviceLists = [...formData.selectedDeviceLists];
    updatedSelectedDeviceLists[index].useDefault = checked;
    setFormData({
      ...formData,
      selectedDeviceLists: updatedSelectedDeviceLists,
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
                    <label className="ml-2">
                      Average of your bills for last year
                    </label>
                  </div>
                </div>

                {formData.electrical_consumption === "list" && (
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
                        <option value="Refrigerator">Refrigerator</option>
                        <option value="Freezer">Freezer</option>
                        <option value="Washing Machine">Washing Machine</option>
                        <option value="Dryer Machine">Dryer Machine</option>
                        <option value="Dishwasher">Dishwasher</option>
                        <option value="Oven">Oven</option>
                        <option value="Microwave">Microwave</option>
                        <option value="Television">Television</option>
                        <option value="Computer">Computer</option>
                        <option value="Gaming Console">Gaming Console</option>
                        <option value="Vacuum Cleaner">Vacuum Cleaner</option>
                        <option value="Air Conditioner">Air Conditioner</option>
                        <option value="Space Heater">Space Heater</option>
                        <option value="Dehumidifier">Dehumidifier</option>
                        <option value="Water Heater">Water Heater</option>
                        <option value="Toaster">Toaster</option>
                        <option value="Coffee Maker">Coffee Maker</option>
                        <option value="Hair Dryer">Hair Dryer</option>
                        <option value="Clothes Iron">Clothes Iron</option>
                      </select>
                      <button
                        type="button"
                        onClick={handleAddList}
                        className="w-32 mx-4 bg-green-400  text-white py-2 px-15 rounded-2xl hover:bg-green-200 focus:outline-none focus:bg-green-700 relative"
                      >
                        Add Device
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 1 &&
                  formData.electrical_consumption === "list" && (
                    <div className="pt-2 flex flex-col items-start mb-4">
                      <p className="font-semibold">Selected Devices:</p>
                      {formData.selectedDeviceLists.map((device, index) => (
                        <div key={index}>
                          <ul>
                            <li>
                              {device.device}
                              <input
                                type="text"
                                placeholder="Average Daily Usage (hours)"
                                className={`mx-2 px-2 py-1 border border-gray-300 rounded ${
                                  device.useDefault ? "bg-gray-300" : ""
                                }`}
                                disabled={device.useDefault}
                                value={device.consumption}
                                onChange={(e) =>
                                  handleConsumptionChange(e, index)
                                }
                              />

                              <input
                                type="checkbox"
                                id={`default-${index}`}
                                name={`default_consumption-${index}`}
                                value={`default-${index}`}
                                checked={device.useDefault}
                                onChange={(e) => handleDefaultChange(e, index)}
                              />
                              <label className="ml-2">Default</label>
                              <button
                                type="button"
                                onClick={() => handleRemoveDevice(index)}
                                className="mx-3 my-1 bg-red-500 text-white py-1 px-2 rounded"
                              >
                                Remove
                              </button>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                {formData.electrical_consumption === "average" && (
                  <div className="pt-4 flex flex-col items-start mb-4">
                    <p className="font-semibold">Average:</p>
                    <input
                      id="average_consumption "
                      name="average_consumption"
                      type="text"
                      required
                      className="mt-2 mb-4 w-80 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder=""
                      value={formData.average_consumption}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col items-center">
              <div className="pt-4 mb-4 ml-16 mr-1">
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

              <div className="pt-4 mb-4">
                <p className="font-semibold">
                  Building size (in m<sup>2</sup>)
                </p>
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

              <div className="pt-4 mb-4">
                <p className="font-semibold">
                  Roof size (in m<sup>2</sup>)
                </p>
                <input
                  id="roof_size"
                  name="roof_size"
                  type="text"
                  required
                  className="mt-2 mb-4 w-80 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder=""
                  value={formData.roof_size}
                  onChange={handleInputChange}
                />
              </div>

              <div className="pt-4 mb-4">
                <p className="font-semibold">Purpose of the solution:</p>
                <div>
                  <select
                    id="purpose"
                    name="purpose"
                    required
                    className="mt-2 mb-4 w-80 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={formData.powered}
                    onChange={handleInputChange}
                  >
                    <option value="">Select purpose</option>
                    <option value="Lower down electricity bill">Lower down electricity bill</option>
                    <option value="Charge EV car">Charge EV car</option>
                    <option value="Heating/Cooling">Heating/Cooling</option>
                    <option value="Energy independence/Protection from power outages">Energy independence/Protection from power outages</option>
                    <option value="Contribution to eco-system and carbon footprint">Contribution to eco-system and carbon footprint</option>
                    <option value="Increase home value">Increase home value</option>
                  </select>
                </div>
              </div>

              <div className="flex my-4 mr-32 ml-2">
                <p className="font-semibold mr-4 mb-4">Location:</p>
                <button
                  type="button"
                  className="text-black mb-4 underline hover:text-blue-700"
                  onClick={getWeatherInfo}
                >
                  Detect location
                </button>
              </div>

              <div>
                <div className="my-4 mr-40 ml-3">
                  <p>Lattitude: {latitude}</p>
                  <p>Longitude: {longitude}</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-col items-center">
              <div className="w-full flex justify-center mb-4">
                <div className="flex items-center">
                  <p className="font-semibold mr-4">Solution:</p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="default"
                      checked={useDefaultSettings}
                      onChange={handleDefaultCustomizeChange}
                      className="form-checkbox h-5 w-5 text-green-600"
                    />
                    <label htmlFor="default" className="ml-2 mr-6">
                      I want Green Solution to generate solution for me
                    </label>
                    <input
                      type="checkbox"
                      id="customize"
                      checked={!useDefaultSettings}
                      onChange={handleDefaultCustomizeChange}
                      className="form-checkbox h-5 w-5 text-green-600"
                    />
                    <label htmlFor="customize" className="ml-2">
                      I want customize my solution
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-4 mr-3">
                <p className="font-semibold">Solution Type:</p>
                <div className="flex">
                  <div className="flex mx-8">
                    <input
                      type="checkbox"
                      id="solar"
                      name="solution_type"
                      value="solar"
                      disabled={useDefaultSettings}
                      checked={formData.solution_type === "solar"}
                      onChange={handleCheckboxChange}
                    />
                    <label className="ml-2">Solar</label>
                    <div
                      className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                      onClick={() => handleInfoClick("solar")}
                      title="Click for more info on Solar Energy"
                    >
                      ?
                    </div>
                  </div>

                  <div className="flex items-center mx-8">
                    <input
                      type="checkbox"
                      id="wind"
                      name="solution_type"
                      value="wind"
                      disabled={useDefaultSettings}
                      checked={formData.solution_type === "wind"}
                      onChange={handleCheckboxChange}
                    />
                    <label className="ml-2">Wind</label>
                    <div
                      className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                      onClick={() => handleInfoClick("wind")}
                      title="Click for more info on Wind Energy"
                    >
                      ?
                    </div>
                  </div>
                </div>
              </div>
              {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-screen z-50">
                  <div className="relative top-20 mx-auto p-5 border w-auto shadow-lg rounded-md bg-white">
                    <div className="mt-3 text-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Information
                      </h3>
                      <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-500">{modalContent}</p>
                      </div>
                      <div className="items-center px-4 py-3">
                        <button
                          className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {formData.solution_type === "solar" && (
                <div className="flex-col mb-4 pt-2 pl-28 pr-2">
                  <p className="font-semibold">Panel Type:</p>
                  <div className="flex items-center mx-8">
                    <input
                      type="checkbox"
                      id="type1"
                      name="panel_type"
                      value="type1"
                      checked={formData.panel_type === "type1"}
                      onChange={handleCheckboxChange}
                    />
                    <label className="ml-2">OPHiku6 (All-Black) CS6R-T -420W</label>
                    <div
                      className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                      onClick={() => handleInfoClick("panel1")}
                      title="Click for more info on panel types"
                    >
                      ?
                    </div>
                  </div>

                  <div className="flex items-center mx-8">
                    <input
                      type="checkbox"
                      id="type2"
                      name="panel_type"
                      value="type2"
                      checked={formData.panel_type === "type2"}
                      onChange={handleCheckboxChange}
                    />
                    <label className="ml-2">Trina Solar Vertex S 670W (TSM-700P-AB)</label>
                    <div
                      className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                      onClick={() => handleInfoClick("panel2")}
                      title="Click for more info on panel types"
                    >
                      ?
                    </div>
                  </div>
                  <div className="flex items-center mx-8">
                    <input
                      type="checkbox"
                      id="type3"
                      name="panel_type"
                      value="type3"
                      checked={formData.panel_type === "type3"}
                      onChange={handleCheckboxChange}
                    />
                    <label className="ml-2">Canadian Solar CS3L-405M Poly 405W Solar Panel</label>
                    <div
                      className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                      onClick={() => handleInfoClick("panel3")}
                      title="Click for more info on panel types"
                    >
                      ?
                    </div>
                  </div>

                  <div className="flex items-center mx-8">
                    <input
                      type="checkbox"
                      id="type4"
                      name="panel_type"
                      value="type4"
                      checked={formData.panel_type === "type4"}
                      onChange={handleCheckboxChange}
                    />
                    <label className="ml-2">Jinko Solar Tiger Pro 7R 570 W (JKM570N-72HL4-BDV) </label>
                    <div
                      className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                      onClick={() => handleInfoClick("panel4")}
                      title="Click for more info on panel types"
                    >
                      ?
                    </div>
                  </div>
                </div>
              )}
              <div className="flex mb-4 pt-4 pl-40 pr-2">
                <p className="font-semibold">Roof Type:</p>
                <div className="flex items-center mx-8">
                  <input
                    type="checkbox"
                    id="straight"
                    name="roof_type"
                    value="Slope"
                    disabled={useDefaultSettings}
                    checked={formData.roof_type === "Slope"}
                    onChange={handleCheckboxChange}
                  />
                  <label className="ml-2">Slope</label>
                  <div
                    className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                    onClick={() => handleInfoClick("Slope")}
                    title="Click for more info on Slope Type"
                  >
                    ?
                  </div>
                </div>

                <div className="flex items-center mx-8">
                  <input
                    type="checkbox"
                    id="straight"
                    name="roof_type"
                    value="Flat"
                    disabled={useDefaultSettings}
                    checked={formData.roof_type === "Flat"}
                    onChange={handleCheckboxChange}
                  />
                  <label className="ml-2">Flat</label>
                  <div
                    className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                    onClick={() => handleInfoClick("Flat")}
                    title="Click for more info on Flat Type"
                  >
                    ?
                  </div>
                </div>

                <div className="flex items-center mx-8">
                  <input
                    type="checkbox"
                    id="curved"
                    name="roof_type"
                    value="Composite"
                    disabled={useDefaultSettings}
                    checked={formData.roof_type === "Composite"}
                    onChange={handleCheckboxChange}
                  />
                  <label className="ml-2">Composite</label>
                  <div
                    className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                    onClick={() => handleInfoClick("Composite")}
                    title="Click for more info on Composite Type"
                  >
                    ?
                  </div>
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
                    disabled={useDefaultSettings}
                    checked={formData.grid_type === "on_grid"}
                    onChange={handleCheckboxChange}
                  />
                  <label className="ml-2">On-Grid</label>
                  <div
                    className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                    onClick={() => handleInfoClick("OnGrid")}
                    title="Click for more info for On-grid"
                  >
                    ?
                  </div>
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
                  <label className="ml-2">Off-grid</label>
                  <div
                    className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                    onClick={() => handleInfoClick("OffGrid")}
                    title="Click for more info for Off-grid"
                  >
                    ?
                  </div>
                </div>
              </div>

              {formData.grid_type === "off_grid" && (
                <div className="pt-4 flex flex-col items-start mb-4 pr-14">
                  <p className="font-semibold">
                    How do you plan to store excess energy?
                  </p>
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
                      <option value="Battery">Battery</option>
                      <option value="Heat Pump">Heat Pump</option>
                      <option value="Hydro generator">Hydro Generator</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              )}

                <div className="flex-col mb-4 pt-2 pr-20 pl-2">
                <p className="font-semibold">Inverter Type:</p>
                <div className="flex items-center mx-8">
                  <input
                    type="checkbox"
                    id="type1"
                    name="inverter_type"
                    value="type1"
                    disabled={useDefaultSettings}
                    checked={formData.inverter_type === "type1"}
                    onChange={handleCheckboxChange}
                  />
                  <label className="ml-2">SMA Sunny Boy Storage 5.0 (US) </label>
                  <div
                      className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                      onClick={() => handleInfoClick("inverter1")}
                      title="Click for more info on inverter types"
                    >
                      ?
                    </div>
                </div>

                <div className="flex items-center mx-8">
                  <input
                    type="checkbox"
                    id="type2"
                    name="inverter_type"
                    value="type2"
                    disabled={useDefaultSettings}
                    checked={formData.inverter_type === "type2"}
                    onChange={handleCheckboxChange}
                  />
                  <label className="ml-2">Fronius Symo 5.0-3-M</label>
                  <div
                      className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                      onClick={() => handleInfoClick("inverter2")}
                      title="Click for more info on inverter types"
                    >
                      ?
                    </div>
                </div>


                <div className="flex items-center mx-8">
                  <input
                    type="checkbox"
                    id="type3"
                    name="inverter_type"
                    value="type3"
                    disabled={useDefaultSettings}
                    checked={formData.inverter_type === "type3"}
                    onChange={handleCheckboxChange}
                  />
                  <label className="ml-2">Fronius Symo 12.5-3M</label>
                  <div
                      className="flex h-6 w-6 items-center justify-center text-xs bg-gray-200 rounded-full ml-2 cursor-pointer"
                      onClick={() => handleInfoClick("inverter3")}
                      title="Click for more info on inverter types"
                    >
                      ?
                    </div>
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
              onClick={handleSubmit}
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
