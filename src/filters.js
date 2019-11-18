const Make = [
  { value: 'any', label: 'Make (any)'}
];

const Model = [
  { value: 'any', label: 'Model (any)'}
];

const Year = [
  { value: 'any', label: 'Year (any)'}
];

const BodyTypes = [
  { value: 'any', label: 'Body Type (any)'},
  { value: 'hatchback', label: 'Hatchback'}
];

const FuelType = [
  { value: 'any', label: 'Fuel Type (any)'}
];

const Doors = [
  { value: 'any', label: 'Doors (any)'}
];

const Gearbox = [
  { value: 'any', label: 'Gearbox (any)'}
];

const Drivetrain = [
  { value: 'any', label: 'Drivetrain (any)'}
];

const Seats = [
  { value: 'any', label: 'Seats (any)'}
];

const FuelConsumption = [
  { value: 'any', label: 'Fuel Consumption (any)'}
];

const Colours = [
  { value: 'any', label: 'Colour (any)'},
  { value: 'grey', label: 'Grey'}
];

const Engine = [
  { value: 'any', label: 'Engine (any)'}
];

export default [
  {title: 'make', filters: Make},
  {title: 'model', filters: Model},
  {title: 'body_types', filters: BodyTypes, isMultiple: true},
  {title: 'colours', filters: Colours, isMultiple: true},
];