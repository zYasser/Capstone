export default function convertToCart(originalObject) {
  // Define prices for each solution type
  const prices = {
    Panels: {
      "Canadian Solar CS6P-200PM": 130,
      "Canadian Solar HiDM CS1U-MS": 190,
      "Trina Solar Vertex TSM-DE20-600": 250,
    },
    Inverters: {
      "Hoymiles HM-600 NT": 230,
      "Growatt SPH 6000": 1500,
    },
    "Battery Capacity": {
      "Sonnen Eco GEN3 ECO15": 14,
    },
  };

  const cartItems = [];
  console.log(originalObject.Solutions);
  // Extract Panels if available
  if (originalObject.Solutions.Panels) {
    const panels = originalObject.Solutions.Panels;
    console.log()
    for (const [panelName, panelCount] of Object.entries(panels)) {
      const price = prices.Panels[panelName];
      if (price) {
        cartItems.push({
          type: "PV",
          name: panelName,
          quantity: panelCount,
          price: price,
        });
      }
    }
  }

  // Extract Inverters if available
  if (originalObject.Solutions.Inverters) {
    const inverterName = originalObject.Solutions.Inverters.Name;
    const inverterCount = originalObject.Solutions.Inverters.count;
    const price = prices.Inverters[inverterName];
    if (price) {
      cartItems.push({
        type: "Solar Inverter",
        name: inverterName,
        quantity: inverterCount,
        price: price,
      });
    }
  }

  // Extract Battery Capacity if available
  if (originalObject.Solutions["Battery Capacity"]) {
    const batteryName = originalObject.Solutions["Battery Capacity"].Name;
    const batteryCount =
      originalObject.Solutions["Battery Capacity"]["Battery Count"];
    const price = prices["Battery Capacity"][batteryName];
    if (price) {
      cartItems.push({
        type: "Battery",
        name: batteryName,
        quantity: batteryCount,
        price: price,
      });
    }
  }

  return cartItems;
}
