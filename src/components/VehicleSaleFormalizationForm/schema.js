import * as yup from "yup";

const VehiclePurchaseSchema = yup.object().shape({
  bought_for: yup.
    number("Bought For must be a number").
    required("Bought For is required").
    positive("Bought For must be positive"),
  make: yup.string().required("Make is required"),
  customer_id: yup.string().required("Customer is required"),
  model: yup.string().required("Model is required"),
  year: yup.
    string().
    required("Year is required").
    test("validRange", "Year cannot be negative and must be between 1800-2020", function(value){
      let data = parseInt(value)
      if (!data) {
        return false
      }
      return (value >= 1800 && value <= 2020)
    }),
  price: yup.
    number("Price must be a number").
    required("Price is required").
    positive("Price must be positive"),
  milage: yup.
    number("Milage must be a number").
    required("Year is required").
    positive("Year must be positive").
    integer("Year must be an integer"),
  body_type: yup.string().required("Body type is required"),
  fuel_type: yup.string().required("Fuel type is required"),
  doors: yup.
    number("Doors must be a number").
    required("Doors is required").
    positive("Doors must be positive").
    integer("Doors must be an integer"),
  gearbox: yup.string().required("Gearbox type is required"),
  seats: yup.
    number("Seats must be a number").
    required("Seats is required").
    positive("Seats must be positive").
    integer("Seats must be an integer"),
  fuel_consumption: yup.
    number("Fuel Consumption must be a number").
    required("Fuel Consumption is required").
    positive("Fuel Consumption must be positive"),
  colour: yup.string().required("Colour is required"),
  engine: yup.
    number("Engine must be a number").
    required("Engine is required").
    positive("Engine must be positive"),
  description: yup.string().required("Description is required"),
  drivetrain: yup.string().required("Drivetrain is required"),
  specification: yup.
    string().
    required("Specification is required").
    test("validJSON", "Specification must be a valid JSON", function(value) {
      console.log(value)
      try {
        JSON.parse(value);
      } catch (e) {
          return false;
      }
      return true;
    }),
  images: yup
    .mixed()
    .test("fileType", "Images are required", function(value) {
      return value.length > 0;
    })
});

export default VehiclePurchaseSchema;