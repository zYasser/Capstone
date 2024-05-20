export default function convertToCart(originalObject) {
  // Define prices for each solution type
  const prices = {
    Panels: {
      "Canadian Solar CS6P-200PM": 130,
      "Canadian Solar HiDM CS1U-MS": 190,
      "Trina Solar Vertex TSM-DE20-600": 250,
    },
    Inverters: {
      "HM-600NT": 230,
      "GrowattSPH6000": 1500,
    },
    "Battery Capacity": {
      "Sonnen Eco GEN3 ECO15": 14,
    },
    "Heat Pump": {
      "DAİKİN RXB12AXVJU": 1,
    },
  };

  const cartItems = [];
  let totalCost = 0;

  // Extract Panels if available
  if (originalObject.Solutions.Panels) {
    const panels = originalObject.Solutions.Panels;
    const panelName = panels.name;

    const price = prices.Panels[panelName];
    if (price) {
      cartItems.push({
        type: "PV",
        name: panelName,
        quantity: panels.count,
        price: price,
      });
      totalCost += panels.count * price;
    }
  }

  // Extract Inverters if available
  for (const key in originalObject.Solutions.Inverters) {
    if (originalObject.Solutions.Inverters.hasOwnProperty(key)) {
      const value = originalObject.Solutions.Inverters[key];
      const price = prices.Inverters[key];
      if (price) {
        cartItems.push({
          type: "Solar Inverter",
          name: key,
          quantity: value,
          price: price,
        });
        totalCost += value * price;
      }
    }
  }

  // Extract Heat Pump if available
  if (originalObject.Solutions["Heat Pump"]) {
    const pump = originalObject.Solutions["Heat Pump"];
    const price = prices["Heat Pump"][pump];
    if (price) {
      cartItems.push({
        type: "Heat Pump",
        name: pump,
        quantity: 1,
        price: price,
      });
      totalCost += price;
    }
  }

  // Extract Battery Capacity if available
  if (originalObject.Solutions["Battery Capacity"]) {
    const battery = originalObject.Solutions["Battery Capacity"];
    const batteryName = battery.name;
    const batteryCount = battery.count;
    const price = prices["Battery Capacity"][batteryName];
    if (price) {
      cartItems.push({
        type: "Battery",
        name: batteryName,
        quantity: batteryCount,
        price: price,
      });
      totalCost += batteryCount * price;
    }
  }

  return { cartItems, totalCost };
}
