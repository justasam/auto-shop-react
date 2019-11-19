const Listed = [
  { value: 'any', 'label': 'Listed at (any)'}
];
const BodyTypes = [
  { value: 'any', label: 'Body Type (any)'},
  { value: 'hatchback', label: 'Hatchback'}
];
const Colours = [
  { value: 'any', label: 'Colour (any)'},
  { value: 'grey', label: 'Grey'}
];
const Doors = [
  { value: 'any', label: 'Doors (any)'},
  { value: 1, label: '1 door'},
  { value: 2, label: '2 doors'},
  { value: 3, label: '3 doors'},
  { value: 4, label: '4 doors'},
  { value: 5, label: '5 doors'},
  { value: 6, label: '6 doors'},
];
const Drivetrain = [
  { value: 'any', label: 'Drivetrain (any)'}
];
const EngineFrom = [
  { value: 'any', label: 'Engine From'},
  { value: 0, label: 'Engine From 0'},
  { value: 1, label: 'Engine From 1'},
  { value: 2, label: 'Engine From 2'},
  { value: 3, label: 'Engine From 3'},
];
const EngineTo = [
  { value: 'any', label: 'Engine To'},
  { value: 1, label: 'Engine To 1'},
  { value: 2, label: 'Engine To 2'},
  { value: 3, label: 'Engine To 3'},
  { value: 4, label: 'Engine To 4'},
];
const FuelConsumption = [
  { value: 'any', label: 'Fuel Consumption'},
];
const FuelType = [
  { value: 'any', label: 'Fuel Type (any)'},
];
const Gearbox = [
  { value: 'any', label: 'Gearbox (any)'},
]
const Make = [
  { value: 'any', label: 'Make (any)'},
  { value: 'volkswagen', label: 'Volkswagen'},
  { value: 'renault', label: 'Renault'},
  { value: 'ford', label: 'Ford'},
  { value: 'bmw', label: 'BMW'},
  { value: 'mazda', label: 'Mazda'},
  { value: 'seat', label: 'Seat'},
];
const MilageFrom = [
  { value: 'any', label: 'Mileage From (any)'},
  { value: 10000, label: 'Mileage From 10k'},
  { value: 50000, label: 'Mileage From 50k'},
  { value: 100000, label: 'Mileage From 100k'},
];
const MilageTo = [
  { value: 'any', label: 'Mileage To (any)'},
  { value: 10000, label: 'Mileage To 10k'},
  { value: 50000, label: 'Mileage To 50k'},
  { value: 100000, label: 'Mileage To 100k'},
];
const Model = [
  { value: 'any', label: 'Model (any)'}
];
const PriceFrom = [
  { value: 'any', label: 'Price From (any)'},
  { value: 10000, label: 'Price From 10k'},
  { value: 50000, label: 'Price From 50k'},
  { value: 100000, label: 'Price From 100k'},
];
const PriceTo = [
  { value: 'any', label: 'Price To (any)'},
  { value: 10000, label: 'Price To 10k'},
  { value: 50000, label: 'Price To 50k'},
  { value: 100000, label: 'Price To 100k'},
];
const SeatsFrom = [
  { value: 'any', label: 'Seats From (any)'},
  { value: 2, label: 'Seats From 2'},
  { value: 4, label: 'Seats From 4'},
  { value: 6, label: 'Seats From 6'},
];
const SeatsTo = [
  { value: 'any', label: 'Seats To (any)'},
  { value: 2, label: 'Seats To 2'},
  { value: 4, label: 'Seats To 4'},
  { value: 6, label: 'Seats To 6'},
];
const YearFrom = [
  { value: 'any', label: 'Year From (any)'},
  { value: '2000', label: 'Year From 2000'},
  { value: '2010', label: 'Year From 2010'},
  { value: '2016', label: 'Year From 2016'},
];
const YearTo = [
  { value: 'any', label: 'Year To (any)'},
  { value: '2000', label: 'Year To 2000'},
  { value: '2010', label: 'Year To 2010'},
  { value: '2016', label: 'Year To 2016'},
];

export default [
  {title: 'ListedAtLatest', filters: Listed},
  {title: 'body_type', filters: BodyTypes},
  {title: 'colour', filters: Colours},
  {title: 'doors', filters: Doors},
  {title: 'drivetrain', filters: Drivetrain},
  {title: 'engine_from', filters: EngineFrom},
  {title: 'engine_to', filters: EngineTo},
  {title: 'fuel_consumption', filters: FuelConsumption},
  {title: 'fuel_type', filters: FuelType},
  {title: 'gearbox', filters: Gearbox},
  {title: 'make', filters: Make},
  {title: 'milage_from', filters: MilageFrom},
  {title: 'milage_to', filters: MilageTo},
  {title: 'model', filters: Model},
  {title: 'price_from', filters: PriceFrom},
  {title: 'price_to', filters: PriceTo},
  {title: 'seats_from', filters: SeatsFrom},
  {title: 'seats_to', filters: SeatsTo},
  {title: 'year_from', filters: YearFrom},
  {title: 'year_to', filters: YearTo},
];