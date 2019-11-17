import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { ProductCardAlt } from '../../components/ProductCardAlt';
import { ProductCardPopup } from '../../components/ProductCardPopup';
import { DropdownAlt } from '../../components/Inputs';
import { ChevronLeft, ChevronRight } from 'react-feather';
import './index.css';

const mockJSON = {
  "objects": [
    {
      "id": "141cb874-2f76-4dc2-80e3-bd84c62364d6",
      "make": "renault",
      "model": "megane",
      "year": "2006",
      "price": 790,
      "milage": 89510,
      "body_type": "hatchback",
      "fuel_type": "petrol",
      "doors": 5,
      "gearbox": "manual",
      "drivetrain": "fwd",
      "seats": 5,
      "fuel_consumption": 40.9,
      "colour": "grey",
      "engine": 1.4,
      "description": "***2 YEARS WARRANTY AVAILABLE***, A GOOD LOOKING EXAMPLE OF THIS RENAULT MEGANE 1.4 16 VALVE AUTHENTIQUE FINISHED IN A METALLIC SILVER SHOWING A MERE 89,510 MILES FROM NEW, FRONT ELECTRIC WINDOWS, POWER STEERING, REMOTE CENTRAL LOCKING ALARM IMMOBILISER, TRIP COMPUTER, CODED RADIO WITH CD PLAYER, AIR CONDITIONING, RAKE CONTROLS, BLACK CLOTH INTERIOR, 5 SEATS, 5 SPEED GEARBOX, KEY CARD BUTTON START, ISOFIX, MULTIPLE STORAGE COMPARTMENTS, COLOUR CODED BUMPERS, REAR WASH WIPE, A FULL VOSA HISTORY PRINTOUT AVAILABLE, 2 KEYS***CARSON MOTORS OFFER A EXCLUSIVE RANGE OF VEHICLES TO SUIT ALL BUDGETS,EXTENDED WARRANTY AND SERVICE PACKAGES ALSO AVAILABLE,UNIT 4 CROMPTON STREET,PRESTON,LANCASHIRE,PR1 5RT. PART EXCHANGE WELCOME,, , Grey, £790",
      "specificaction": "{\"Economy & Performance\":{\"Fuel consumption (urban)\":\"30.7 mpg\",\"Fuel consumption (extra urban)\":\"50.4 mpg\",\"Fuel consumption (combined)\":\"40.9 mpg\",\"0 - 60 mph\":\"12.5 seconds\",\"Top speed\":\"114 mph\",\"Cylinders\":\"4\",\"Valves\":\"16\",\"Engine power\":\"100 bhp\",\"Engine torque\":\"93.68 lbs/ft\",\"CO₂ emissions\":\"165g/km\",\"Annual tax\":\"£200\"},\"Driver Convenience\":[\"In Car Entertainment (Radio/Cassette)\",\"Electric Windows (Front)\",\"Seat Height Adjustment\",\"Speakers\",\"Upholstery Cloth\",\"Adjustable Steering Column/Wheel\",\"Steering Wheel Mounted Controls (Audio)\"],\"Safety\":[\"Head Restraints\",\"Air Bag Passenger\",\"Immobiliser\",\"Air Bag Side\",\"Seat - ISOFIX Anchorage Point (Three Seats - Front & Rear)\",\"Anti-Lock Brakes\",\"Air Bag Driver\",\"Power-Assisted Steering\",\"Central Door Locking\",\"Deadlocks\",\"Seat Belt Pre-Tensioners\",\"Centre Rear Seat Belt\",\"Alarm\",\"Electronic Brake Force Distribution\"]}",
      "listed": false,
      "is_sold": false,
      "images": [
        "./vehicle_pictures/141cb874-2f76-4dc2-80e3-bd84c62364d6/0.jpg",
        "./vehicle_pictures/141cb874-2f76-4dc2-80e3-bd84c62364d6/1.jpg",
        "./vehicle_pictures/141cb874-2f76-4dc2-80e3-bd84c62364d6/2.jpg",
        "./vehicle_pictures/141cb874-2f76-4dc2-80e3-bd84c62364d6/3.jpg",
        "./vehicle_pictures/141cb874-2f76-4dc2-80e3-bd84c62364d6/4.jpg",
        "./vehicle_pictures/141cb874-2f76-4dc2-80e3-bd84c62364d6/5.jpg",
        "./vehicle_pictures/141cb874-2f76-4dc2-80e3-bd84c62364d6/6.jpg",
        "./vehicle_pictures/141cb874-2f76-4dc2-80e3-bd84c62364d6/7.jpg",
        "./vehicle_pictures/141cb874-2f76-4dc2-80e3-bd84c62364d6/8.jpg"
      ],
      "created_at": "2019-11-15T19:20:56Z"
    },
    {
      "id": "2cd5c0d9-6f05-4e58-ab67-433ea97aa9ff",
      "make": "volkswagen",
      "model": "Golf Plus",
      "year": "2008",
      "price": 650,
      "milage": 154838,
      "body_type": "hatchback",
      "fuel_type": "diesel",
      "doors": 5,
      "gearbox": "manual",
      "drivetrain": "fwd",
      "seats": 5,
      "fuel_consumption": 60.1,
      "colour": "black",
      "engine": 1.9,
      "description": "VW Golf Plus 1.9 TDi Luna. Had this car for three and a half years which has been trouble free. Done 154,838miles, timing belt, water pump, pulleys and tensioner changed at 122,000. As witnessed in the pictures, the car suffers from the VW rusty wheel arch on the front near side. MOT till January 2020. Good reliable car in fair condition for age and mileage. Price is ONO, no reasonable offer refused. Black, £650",
      "specificaction": "{}",
      "listed": false,
      "is_sold": false,
      "images": [
        "./vehicle_pictures/2cd5c0d9-6f05-4e58-ab67-433ea97aa9ff/0.jpg",
        "./vehicle_pictures/2cd5c0d9-6f05-4e58-ab67-433ea97aa9ff/1.jpg",
        "./vehicle_pictures/2cd5c0d9-6f05-4e58-ab67-433ea97aa9ff/2.jpg",
        "./vehicle_pictures/2cd5c0d9-6f05-4e58-ab67-433ea97aa9ff/3.jpg"
      ],
      "created_at": "2019-11-11T19:39:08Z"
    },
    {
      "id": "5c52864b-2003-4208-a28e-5973f5433842",
      "make": "mazda",
      "model": "6",
      "year": "2007",
      "price": 595,
      "milage": 114890,
      "body_type": "hatchback",
      "fuel_type": "petrol",
      "doors": 5,
      "gearbox": "manual",
      "drivetrain": "fwd",
      "seats": 5,
      "fuel_consumption": 44.8,
      "colour": "blue",
      "engine": 2,
      "description": "Mazda 6 2.0TS (147 hp) Low genuine mileage. Engine, gearbox, clutch excellent condition. Good bodywork. 2 keys., Smoke free, Pet free, HPI clear, Recent MOT Next MOT due 16/12/2019, Part service history, Blue, 4 owners, £595",
      "specificaction": "{}",
      "listed": false,
      "is_sold": false,
      "images": [
        "/vehicle_pictures/5c52864b-2003-4208-a28e-5973f5433842/0.jpg"
      ],
      "created_at": "2019-11-07T11:34:07Z"
    },
    {
      "id": "69577acf-4ea4-4e49-9e98-0a07eccf03ad",
      "make": "mazda",
      "model": "MX-51.6",
      "year": "2001",
      "price": 1595,
      "milage": 68500,
      "body_type": "convertible",
      "fuel_type": "petrol",
      "doors": 2,
      "gearbox": "manual",
      "drivetrain": "fwd",
      "seats": 2,
      "fuel_consumption": 36.7,
      "colour": "grey",
      "engine": 1.6,
      "description": "1 year MOT, till 3/10/2020. Excellent condition and mileage for age. Detachable hard top version, a must see, lovely driving car. Money has been spent ensuring this car is selling in top driving condition, please enquire for more detail, no future work expected in short or medium term. New air flow meter, new battery, new rear upper and lower suspension arms and bushes, new brake pipe, new rear anti roll links. Cheap to insure. Only selling as not using it enough. Only 800 miles in last 3 years, Smoke free, Pet free, Recent MOT. Grey, 5+ owners, £1,595",
      "specificaction": "{\"Economy & Performance\":{\"Fuel consumption (urban)\":\"27.7 mpg\",\"Fuel consumption (extra urban)\":\"44.1 mpg\",\"Fuel consumption (combined)\":\"36.7 mpg\",\"0 - 60 mph\":\"9.7 seconds\",\"Top speed\":\"119 mph\",\"Cylinders\":\"4\",\"Valves\":\"16\",\"Engine power\":\"110 bhp\",\"Engine torque\":\"98.83 lbs/ft\",\"CO₂ emissions\":\"188g/km\",\"Annual tax\":\"£300\"},\"Driver Convenience\":[\"In Car Entertainment (Radio/Cassette)\",\"Speakers\",\"Upholstery Cloth\",\"Adjustable Steering Column/Wheel\",\"Electric Windows (Front/Rear)\"],\"Safety\":[\"Air Bag Passenger\",\"Immobiliser\",\"Air Bag Side\",\"Seat - ISOFIX Anchorage Point (One Seat - Front)\",\"Alarm\",\"Anti-Lock Brakes\",\"Air Bag Driver\",\"Power-Assisted Steering\"]}",
      "listed": false,
      "is_sold": false,
      "images": [
        "./vehicle_pictures/69577acf-4ea4-4e49-9e98-0a07eccf03ad/0.jpg",
        "./vehicle_pictures/69577acf-4ea4-4e49-9e98-0a07eccf03ad/1.jpg",
        "./vehicle_pictures/69577acf-4ea4-4e49-9e98-0a07eccf03ad/2.jpg",
        "./vehicle_pictures/69577acf-4ea4-4e49-9e98-0a07eccf03ad/3.jpg",
        "./vehicle_pictures/69577acf-4ea4-4e49-9e98-0a07eccf03ad/4.jpg",
        "./vehicle_pictures/69577acf-4ea4-4e49-9e98-0a07eccf03ad/5.jpg",
        "./vehicle_pictures/69577acf-4ea4-4e49-9e98-0a07eccf03ad/6.jpg",
        "./vehicle_pictures/69577acf-4ea4-4e49-9e98-0a07eccf03ad/7.jpg",
        "./vehicle_pictures/69577acf-4ea4-4e49-9e98-0a07eccf03ad/8.jpg"
      ],
      "created_at": "2019-11-15T19:24:56Z"
    },
    {
      "id": "9030c19e-63f9-48b8-80b6-5af0e31bbba7",
      "make": "renault",
      "model": "laguna",
      "year": "2008",
      "price": 550,
      "milage": 249132,
      "body_type": "hatchback",
      "fuel_type": "diesel",
      "doors": 5,
      "gearbox": "manual",
      "drivetrain": "fwd",
      "seats": 5,
      "fuel_consumption": 47.1,
      "colour": "black",
      "engine": 2,
      "description": "This Laguna comes with automatic head lights,automatic rain sensing wipers,Bluetooth car function with voice controlled dialling ,speed limiter,sat nav with Europe and disc cracking sound system and a very nippy engine. This car has had a few pounds spent on it unfortunately it still needs a new wheel bearing ball joint and drop link. I was quoted £350 plus the mot but if your mechanically minded then it's not that hard a job. the mileage is showing 250k this is not the case I had the abs pump replaced with a second hand one in march and it came with the previous vehicle millage it. It combined the 2 and resultiled in the inflated figure you now see this is reflected in the price. Its been a great car to me over the years and I'll be sad to see it go I'm sure there's many more miles left in this car if someone is willing to invest a little time in it. I've been as honest as I can. Grey, 4 owners, £550",
      "specificaction": "{\"Economy & Performance\":{\"Fuel consumption (urban)\":\"36.2 mpg\",\"Fuel consumption (extra urban)\":\"56.5 mpg\",\"Fuel consumption (combined)\":\"47.1 mpg\",\"0 - 60 mph\":\"8.9 seconds\",\"Top speed\":\"134 mph\",\"Cylinders\":\"4\",\"Valves\":\"16\",\"Engine power\":\"150 bhp\",\"Engine torque\":\"250.78 lbs/ft\",\"CO₂ emissions\":\"160g/km\",\"Annual tax\":\"£200\"},\"Driver Convenience\":[\"Tinted Glass\",\"Cruise Control with Speed Limiter\",\"Electric Windows (Front/Rear)\",\"Heated Rear Screen\",\"Seat Height Adjustment\",\"Cruise Control\",\"Upholstery Cloth/Leather\",\"In Car Entertainment (Radio/CD)\",\"Air-Conditioning\",\"Speakers\",\"Steering Wheel Leather\",\"Seat Lumbar Support\"],\"Safety\":[\"Head Restraints\",\"Seat - ISOFIX Anchorage Point\",\"Air Bag Passenger\",\"Immobiliser\",\"Air Bag Side\",\"Anti-Lock Brakes\",\"Whiplash Protection System\",\"Air Bag Driver\",\"Power-Assisted Steering\",\"Front Fog Lamps\",\"Central Door Locking\",\"Deadlocks\",\"Seat Belt Pre-Tensioners\",\"Centre Rear Seat Belt\",\"Alarm\",\"Electronic Stability Programme\",\"Front Fog Lights\",\"Traction Control System\",\"Electronic Brake Force Distribution\"]}",
      "listed": false,
      "is_sold": false,
      "images": [
        "./vehicle_pictures/9030c19e-63f9-48b8-80b6-5af0e31bbba7/0.jpg",
        "./vehicle_pictures/9030c19e-63f9-48b8-80b6-5af0e31bbba7/1.jpg",
        "./vehicle_pictures/9030c19e-63f9-48b8-80b6-5af0e31bbba7/2.jpg",
        "./vehicle_pictures/9030c19e-63f9-48b8-80b6-5af0e31bbba7/3.jpg",
        "./vehicle_pictures/9030c19e-63f9-48b8-80b6-5af0e31bbba7/4.jpg",
        "./vehicle_pictures/9030c19e-63f9-48b8-80b6-5af0e31bbba7/5.jpg"
      ],
      "created_at": "2019-11-15T19:16:13Z"
    },
    {
      "id": "ae313a64-62d8-4dd9-a933-b3dcf03a3529",
      "make": "renault",
      "model": "megane",
      "year": "2009",
      "price": 1750,
      "milage": 81000,
      "body_type": "hatchback",
      "fuel_type": "petrol",
      "doors": 5,
      "gearbox": "manual",
      "drivetrain": "fwd",
      "seats": 5,
      "fuel_consumption": 40.9,
      "colour": "black",
      "engine": 1.6,
      "description": "Part exchange to clear. Supplied with 2 keys 1 years test and fully valeted. To view this megane email eddie@elitecars1.co.uk or call 01698357999, thanks. , Next MOT due 22/01/2020, Good bodywork, Interior - Clean Condition, Tyre condition Average, Black, 3 owners, Over 40 pics and video of each car on our website, please click the link on youtube for our videos, £1,750",
      "specificaction": "{\"Economy & Performance\":{\"Fuel consumption (urban)\":\"30.7 mpg\",\"Fuel consumption (extra urban)\":\"51.4 mpg\",\"Fuel consumption (combined)\":\"40.9 mpg\",\"0 - 60 mph\":\"10.5 seconds\",\"Top speed\":\"121 mph\",\"Cylinders\":\"4\",\"Valves\":\"16\",\"Engine power\":\"110 bhp\",\"Engine torque\":\"111.38 lbs/ft\",\"CO₂ emissions\":\"162g/km\",\"Annual tax\":\"£200\"},\"Driver Convenience\":[\"Leather Gear Knob\",\"Cigarette Lighter and Ashtray\",\"Tinted Windows\",\"Front and Rear Electric Windows with One-Touch Control for Drivers Window\",\"Heated Rear Windscreen\",\"4x15W RDS Radio/Single CD with Bluetooth and MP3 Connectivity, Fingertip Audio System Remote Control\",\"Cruise Control with Speed Limiter\",\"Drivers Seat with Lumbar Adjustment\",\"Bluetooth Hands Free Kit\",\"Automatic Front Windscreen Wipers\",\"60/40 Split Folding Seats\",\"Manual Air-Conditioning\",\"Trip Computer\",\"Centre Console\",\"Rake and Reach Adjustable Steering Wheel\",\"Underfloor Storage for Driver & Front Passenger\",\"4x15W RDS Radio/CD/MP3 and Bluetooth\",\"Front Centre Armrest with Storage\",\"Drivers and Passenger Height Adjustable Seats\",\"Leather Steering Wheel\",\"Hands Free Renault Card\",\"Drivers and Passengers Sunvisors with Vanity Mirror\",\"Upholstery - Dark Charcoal Upholstery\"],\"Safety\":[\"Insurance Approved (Category 1) Alarm System\",\"EBD (Electronic Brake Distribution)\",\"Third Brake Light\",\"Insurance Approved (Category 1) Immobiliser\",\"Height Adjustable Front Seatbelts with Double Pretensioners\",\"Front and Rear Lateral Airbags and Front/Rear Curtain Airbags\",\"Fully Adjustable Front Headrests and 3 Height Adjustable Rear Head Restraints\",\"ASR (Anti-Skid Regulation)\",\"Front Passengers Two Stage Adaptive Airbag with Deactivation\",\"Power Assisted Steering\",\"Drivers Two Stage Adaptive Airbag\",\"Radio Frequency Remote Control Central Locking\",\"Centre Rear Seat Belt\",\"Front Fog Lights\",\"ESP (Electronic Stability Programme)\",\"ISOFIX Child Seat Anchorage Points on Rear Outer Seats\",\"Automatic Headlights\",\"ABS with Emergency Brake Assist (EBA)\"]}",
      "listed": false,
      "is_sold": false,
      "images": [
        "./vehicle_pictures/ae313a64-62d8-4dd9-a933-b3dcf03a3529/0.jpg",
        "./vehicle_pictures/ae313a64-62d8-4dd9-a933-b3dcf03a3529/1.jpg",
        "./vehicle_pictures/ae313a64-62d8-4dd9-a933-b3dcf03a3529/2.jpg",
        "./vehicle_pictures/ae313a64-62d8-4dd9-a933-b3dcf03a3529/3.jpg",
        "./vehicle_pictures/ae313a64-62d8-4dd9-a933-b3dcf03a3529/4.jpg",
        "./vehicle_pictures/ae313a64-62d8-4dd9-a933-b3dcf03a3529/5.jpg",
        "./vehicle_pictures/ae313a64-62d8-4dd9-a933-b3dcf03a3529/6.jpg",
        "./vehicle_pictures/ae313a64-62d8-4dd9-a933-b3dcf03a3529/7.jpg"
      ],
      "created_at": "2019-11-15T19:09:53Z"
    },
    {
      "id": "af8ab371-7950-4347-9034-d46997407e79",
      "make": "volkswagen",
      "model": "Golf Plus",
      "year": "2008",
      "price": 650,
      "milage": 154838,
      "body_type": "hatchback",
      "fuel_type": "diesel",
      "doors": 5,
      "gearbox": "manual",
      "drivetrain": "fwd",
      "seats": 5,
      "fuel_consumption": 60.1,
      "colour": "black",
      "engine": 1.9,
      "description": "VW Golf Plus 1.9 TDi Luna. Had this car for three and a half years which has been trouble free. Done 154,838miles, timing belt, water pump, pulleys and tensioner changed at 122,000. As witnessed in the pictures, the car suffers from the VW rusty wheel arch on the front near side. MOT till January 2020. Good reliable car in fair condition for age and mileage. Price is ONO, no reasonable offer refused. Black, £650",
      "specificaction": "{}",
      "listed": false,
      "is_sold": false,
      "images": [
        "./vehicle_pictures/af8ab371-7950-4347-9034-d46997407e79/0.jpg",
        "./vehicle_pictures/af8ab371-7950-4347-9034-d46997407e79/1.jpg",
        "./vehicle_pictures/af8ab371-7950-4347-9034-d46997407e79/2.jpg",
        "./vehicle_pictures/af8ab371-7950-4347-9034-d46997407e79/3.jpg"
      ],
      "created_at": "2019-11-11T17:46:58Z"
    },
    {
      "id": "eedaac95-dac1-489d-a2a0-d6526431a62e",
      "make": "ford",
      "model": "kuga",
      "year": "2019",
      "price": 22478,
      "milage": 466,
      "body_type": "suv",
      "fuel_type": "diesel",
      "doors": 5,
      "gearbox": "manual",
      "drivetrain": "2wd",
      "seats": 5,
      "fuel_consumption": 43.5,
      "colour": "black",
      "engine": 2,
      "description": "Here we have an opportunity to buy an ultra low mileage Kuga ST-Line 2WD at a bargain price! This model is a real stunner in Shadow Black with upgraded 19 inch Rock Metallic Alloy Wheels, along with black roof rails and privacy glass",
      "specificaction": "{\"Safety\": [\"Courtesy Lights - Front and Rear\", \"Ford Key Free System - Keyless Entry with Keyless Start\", \"Child Locks - Manual on Rear Doors\", \"Seats - ISOFIX Mounting Provision for Child Seats - Outer Seats Only\", \"Airbags - Front Side Impact\", \"Airbags - Drivers Knee\", \"Electric Parking Brake\", \"Anti-Lock Braking System - ABS with Electronic Stability Control - ESC\", \"EBA - Emergency Brake Assist\", \"Airbags - Driver and Front Passenger\", \"Remote Central-Double Locking\", \"IPS - Intelligent Protection System\", \"Fog Lights - Front\", \"Airbags - Front and Rear Side Curtain\", \"Engine Immobiliser\", \"Thatcham Category 1 Alarm\", \"Headlights - Halogen with LED Daytime Running Lights\"], \"Dimensions\": {\"Width\": \"2086 mm\", \"Height\": \"1737 mm\", \"Length\": \"4541 mm\", \"Wheelbase\": \"2690 mm\", \"Fuel tank capacity\": \"60 litres\", \"Minimum kerb weight\": \"1647 kg\", \"Gross vehicle weight\": \"2250 kg\", \"Boot space (seats up)\": \"406 litres\", \"Boot space (seats down)\": \"1603 litres\"}, \"Driver Convenience\": [\"Ford SYNC3 DAB Navigation System\", \"12V Power Socket - Load Compartment\", \"Cruise Control with Adjustable Speed Limiter\", \"Rear Parking Sensors\", \"Enhanced Active Park Assist\", \"Tyre Pressure Monitoring System\"], \"Economy & Performance\": {\"Valves\": \"16\", \"Cylinders\": \"4\", \"Top speed\": \"121 mph\", \"0 - 62 mph\": \"10.1 seconds\", \"Annual tax\": \"£145\", \"Engine power\": \"148 bhp\", \"Engine torque\": \"273 lbs/ft\", \"CO? emissions\": \"152g/km\", \"Fuel consumption (combined)\": \"43.5 mpg\"}}",
      "listed": false,
      "is_sold": false,
      "images": [
        "./vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/0.jpg",
        "./vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/1.jpg",
        "./vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/2.jpg",
        "./vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/3.jpg",
        "./vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/4.jpg",
        "./vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/5.jpg",
        "./vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/6.jpg",
        "./vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/7.jpg",
        "./vehicle_pictures/eedaac95-dac1-489d-a2a0-d6526431a62e/8.jpg"
      ],
      "created_at": "2019-11-07T11:34:07Z"
    },
    {
      "id": "f2d39050-7b6d-47b0-a819-51ec15d456f8",
      "make": "bmw",
      "model": "3 series 320d sport",
      "year": "2016",
      "price": 11495,
      "milage": 55618,
      "body_type": "saloon",
      "fuel_type": "diesel",
      "doors": 4,
      "gearbox": "manual",
      "drivetrain": "rwd",
      "seats": 5,
      "fuel_consumption": 58.9,
      "colour": "white",
      "engine": 2,
      "description": "BMW Business Satellite Navigation, Ambient interior lighting, DAB Digital Radio/CD Player With AUX/USB Input, Bluetooth Phone + Audio Streaming, 3 Zone Climate Control, Digital Climate Control, LED Daytime Running Lights, Sun Protection Glass, 17 inch alloys, Multi-Function Steering Wheel, Keyless Start, Parking Sensors, Sports Seats, Auto Headlights, Cruise Control with Speed Limiter, Electric Windows, Start/Stop, Bolster Adjuster, Rain Sensors. Colour: White. Click Visit Website for service history, online valuation, finance illustration, full vehicle specification, HPI report plus multiple images & 360 degree spin. White, Mechanically Inpected, Hpi Clear & Backed with a Comprehensive Warranty, £11,495",
      "specificaction": "{\"Economy & Performance\":{\"Fuel consumption (urban)\":\"49.6 mpg\",\"Fuel consumption (extra urban)\":\"67.3 mpg\",\"Fuel consumption (combined)\":\"58.9 mpg\",\"0 - 62 mph\":\"7.4 seconds\",\"Top speed\":\"146 mph\",\"Cylinders\":\"4\",\"Valves\":\"16\",\"Engine power\":\"187 bhp\",\"Engine torque\":\"295 lbs/ft\",\"CO₂ emissions\":\"111g/km\",\"Annual tax\":\"£30\"},\"Driver Convenience\":[\"Real Time Traffic Information\",\"Access to BMW Connected Plus for 12 Months from Vehicle Production - Subscription Required\",\"iDrive Controller - 8 Favourite Buttons\",\"BMW Emergency Call\",\"Media Package - BMW Business\",\"Remote Services\",\"Brake Pad Wear Indicator - Front and Rear\",\"OBC - On-Board Computer\",\"Bluetooth Hands Free with USB Audio Interface\",\"TPMS - Tyre Pressure Monitoring\",\"BMW Online Services\",\"Drive Performance Control\",\"BMW Professional Radio - Single CD and MP3\",\"Shark Fin\",\"Cruise Control with Brake Function\",\"Oil Sensor For Level and Grade - Warning by Check Control System\",\"PDC - Park Distance Control - Rear\",\"BMW Navigation System\",\"Condition Based Service\",\"6.5in Colour Display Screen\",\"DAB Digital Radio\",\"Optimum Shift Indicator\",\"12V Power Socket in Front Centre Console and Passenger Footwell\"],\"Safety\":[\"Airbags\",\"High Level Third Brake Light\",\"Three-Point Seat Belts - All Seats\",\"Rear Lights - LED\",\"Battery Safety Cut Off\",\"Child Proof Locking System - Rear Doors\",\"Remote Control with Integrated Key with Insert in Red\",\"Check Control Warning System for Monitoring of Lights and Door-Luggage Compartment Open Warning\",\"Bumper System Front and Rear - Replaceable Deformation Elements for Impacts Up to 9mph\",\"DSC - Dynamic Stability Control Plus\",\"Interior Lighting\",\"Crash Sensor\",\"Alarm System - Thatcham 1 with Remote Control and Electronic Engine Immobiliser\",\"Luggage Compartment - Light\",\"Child Seat ISOFIX Attachment - Rear\",\"Extended Lighting\",\"LED Headlights\",\"Ambient Lighting - Switchable BMW Classic Orange - Cold White - LED\",\"Lights-On Warning by Audio Warning Signal When Ignition is Switched Off\",\"First Aid Kit and Warning Triangle\",\"LED Fog Lights - Front\",\"Side Impact Protection\",\"Visible VIN\",\"Dynamic Brake Lights\",\"Seat Belt Security Check for Driver\",\"Remote Control Including Integrated Ke\"]}",
      "listed": false,
      "is_sold": false,
      "images": [
        "./vehicle_pictures/f2d39050-7b6d-47b0-a819-51ec15d456f8/0.jpg",
        "./vehicle_pictures/f2d39050-7b6d-47b0-a819-51ec15d456f8/1.jpg",
        "./vehicle_pictures/f2d39050-7b6d-47b0-a819-51ec15d456f8/10.jpg",
        "./vehicle_pictures/f2d39050-7b6d-47b0-a819-51ec15d456f8/11.jpg",
        "./vehicle_pictures/f2d39050-7b6d-47b0-a819-51ec15d456f8/12.jpg",
        "./vehicle_pictures/f2d39050-7b6d-47b0-a819-51ec15d456f8/2.jpg",
        "./vehicle_pictures/f2d39050-7b6d-47b0-a819-51ec15d456f8/3.jpg",
        "./vehicle_pictures/f2d39050-7b6d-47b0-a819-51ec15d456f8/4.jpg",
        "./vehicle_pictures/f2d39050-7b6d-47b0-a819-51ec15d456f8/5.jpg",
        "./vehicle_pictures/f2d39050-7b6d-47b0-a819-51ec15d456f8/6.jpg",
        "./vehicle_pictures/f2d39050-7b6d-47b0-a819-51ec15d456f8/7.jpg",
        "./vehicle_pictures/f2d39050-7b6d-47b0-a819-51ec15d456f8/8.jpg",
        "./vehicle_pictures/f2d39050-7b6d-47b0-a819-51ec15d456f8/9.jpg"
      ],
      "created_at": "2019-11-15T18:37:28Z"
    }
  ],
  "total": 9,
  "per_page": 10,
  "page_number": 1
};

const getPageFromSearch = search => {
  if (!search) return 1;
  let splitSearch = search.split('p=')
  if (splitSearch.length !== 2) return 1;
  return parseInt(splitSearch[1].split('&')[0]);
}

const getSearchFromPage = page => `?p=${page}`

const PartsAlt = withRouter(props => {
  let [parts, setParts] = useState([]);

  let page = getPageFromSearch(props.location.search);

  let [pagesMax, setPagesMax] = useState(5);
  useEffect(() => {
    console.log('getData');
    let getData = async () => {
      setParts(mockJSON.objects);
    };

    getData();
  }, [page]);

  return (
    <div>
      <h3 style={{
        padding: '10px 20px',
        fontSize: 22
      }}>PartsAlt</h3>
      <div className='parts_alt_filters'>
        <DropdownAlt title='MODEL:' name='model' options={[
          { value: 'golf_3', name: 'Golf 3' },
          { value: 'loremipsum', name: 'lorem' }
        ]} />
        <DropdownAlt title='PRICE MIN:' name='model' options={[
          { value: '50', name: '50$' },
          { value: 'loremipsum', name: 'lorem' }
        ]} />
        <DropdownAlt title='PRICE MAX:' name='model' options={[
          { value: '200', name: '200$' },
          { value: 'loremipsum', name: 'lorem' }
        ]} />
        <DropdownAlt title='PRICE MIN:' name='model' options={[
          { value: '50', name: '50$' },
          { value: 'loremipsum', name: 'lorem' }
        ]} />
        <DropdownAlt title='PRICE MAX:' name='model' options={[
          { value: '200', name: '200$' },
          { value: 'loremipsum', name: 'lorem' }
        ]} />
        <DropdownAlt title='PRICE MAX:' name='model' options={[
          { value: '200', name: '200$' },
          { value: 'loremipsum', name: 'lorem' }
        ]} />
        <DropdownAlt title='PRICE MIN:' name='model' options={[
          { value: '50', name: '50$' },
          { value: 'loremipsum', name: 'lorem' }
        ]} />
        <div className='parts_alt_pagination'>
          <h3>Page {page}</h3>
          <Link to={{
            search: getSearchFromPage(page - 1)
          }} className={`link ${page === 1 ? 'disabled' : ''}`}>
            <ChevronLeft />
          </Link>
          <Link to={{
            search: getSearchFromPage(page + 1)
          }} className={`link ${page === pagesMax ? 'disabled' : ''}`}>
            <ChevronRight />
          </Link>
        </div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: 20,
        margin: '0 20px',
        boxSizing: 'border-box',
        justifyItems: 'center',
        maxWidth: '100vw',
        overflow: 'hidden'
      }} className='parts_alt_wrapper'>
        <ProductCardAlt id='1' title='Part Title' price='145$' image='https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&w=1000&q=80' />
        <ProductCardAlt id='2' title='Part Title' price='145$' image='https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&w=1000&q=80' />
        <ProductCardAlt id='3' title='Part Title' price='145$' image='https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&w=1000&q=80' />
      </div>
      {props.location.hash ? <ProductCardPopup id={props.location.hash.split('#')[1]} /> : null}
    </div>
  )
});

export default PartsAlt;
