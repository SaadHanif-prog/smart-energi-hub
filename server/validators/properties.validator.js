const { body, param } = require("express-validator");

// Create Property Validation
const validateCreateProperty = [
  body("addressLine1")
    .notEmpty()
    .withMessage("Address Line One is required")
    .isString()
    .withMessage("Address Line One must be a string"),

  body("postcode")
    .notEmpty()
    .withMessage("Postcode is required")
    .isString()
    .withMessage("Postcode must be a string"),

  body("town").optional().isString().withMessage("Town must be a string"),

  body("country").optional().isString().withMessage("Country must be a string"),

  body("administrativeArea")
    .optional()
    .isString()
    .withMessage("Administrative Area must be a string"),

  body("addressLine2")
    .optional()
    .isString()
    .withMessage("Address Line Two must be a string"),

  body("addressLine3")
    .optional()
    .isString()
    .withMessage("Address Line Three must be a string"),

  body("buildingName")
    .optional()
    .isString()
    .withMessage("Building Name must be a string"),

  body("buildingNumber")
    .optional()
    .isString()
    .withMessage("Building Number must be a string"),

  body("county").optional().isString().withMessage("County must be a string"),

  body("deliveryPointSuffix")
    .optional()
    .isString()
    .withMessage("Delivery Point Suffix must be a string"),

  body("departmentName")
    .optional()
    .isString()
    .withMessage("Department Name must be a string"),

  body("dependantLocality")
    .optional()
    .isString()
    .withMessage("Dependant Locality must be a string"),

  body("dependantThoroughfare")
    .optional()
    .isString()
    .withMessage("Dependant Thoroughfare must be a string"),

  body("district")
    .optional()
    .isString()
    .withMessage("District must be a string"),

  body("doubleDependantLocality")
    .optional()
    .isString()
    .withMessage("Double Dependant Locality must be a string"),

  body("eastings")
    .optional()
    .isNumeric()
    .withMessage("Eastings must be a number"),

  body("isRural")
    .optional()
    .isBoolean()
    .withMessage("Is Rural must be a boolean"),

  body("latitude")
    .optional()
    .isNumeric()
    .withMessage("Latitude must be a number"),

  body("longitude")
    .optional()
    .isNumeric()
    .withMessage("Longitude must be a number"),

  body("northings")
    .optional()
    .isNumeric()
    .withMessage("Northings must be a number"),

  body("organisationName")
    .optional()
    .isString()
    .withMessage("Organisation Name must be a string"),

  body("poBox").optional().isString().withMessage("PO Box must be a string"),

  body("postcodeInwards")
    .optional()
    .isString()
    .withMessage("Postcode Inwards must be a string"),

  body("postcodeOutwards")
    .optional()
    .isString()
    .withMessage("Postcode Outwards must be a string"),

  body("postcodeType")
    .optional()
    .isString()
    .withMessage("Postcode Type must be a string"),

  body("premise").optional().isString().withMessage("Premise must be a string"),

  body("suOrganisationIndicator")
    .optional()
    .isString()
    .withMessage("SU Organisation Indicator must be a string"),

  body("subBuilding")
    .optional()
    .isString()
    .withMessage("Sub Building must be a string"),

  body("thoroughfare")
    .optional()
    .isString()
    .withMessage("Thoroughfare must be a string"),

  body("traditionalCounty")
    .optional()
    .isString()
    .withMessage("Traditional County must be a string"),

  body("udprn").optional().isString().withMessage("UDPRN must be a string"),

  body("umprn").optional().isString().withMessage("UMPRN must be a string"),

  body("ward").optional().isString().withMessage("Ward must be a string"),
];

// Update Property Validation
const validateUpdateProperty = [
  param("id").isMongoId().withMessage("Invalid property ID"),

  body("addressLine1")
    .optional()
    .isString()
    .withMessage("Address Line One must be a string"),

  body("postcode")
    .optional()
    .isString()
    .withMessage("Postcode must be a string"),

  body("town").optional().isString().withMessage("Town must be a string"),

  body("country").optional().isString().withMessage("Country must be a string"),

  body("administrativeArea")
    .optional()
    .isString()
    .withMessage("Administrative Area must be a string"),

  body("addressLine2")
    .optional()
    .isString()
    .withMessage("Address Line Two must be a string"),

  body("addressLine3")
    .optional()
    .isString()
    .withMessage("Address Line Three must be a string"),

  body("buildingName")
    .optional()
    .isString()
    .withMessage("Building Name must be a string"),

  body("buildingNumber")
    .optional()
    .isString()
    .withMessage("Building Number must be a string"),

  body("county").optional().isString().withMessage("County must be a string"),

  body("deliveryPointSuffix")
    .optional()
    .isString()
    .withMessage("Delivery Point Suffix must be a string"),

  body("departmentName")
    .optional()
    .isString()
    .withMessage("Department Name must be a string"),

  body("dependantLocality")
    .optional()
    .isString()
    .withMessage("Dependant Locality must be a string"),

  body("dependantThoroughfare")
    .optional()
    .isString()
    .withMessage("Dependant Thoroughfare must be a string"),

  body("district")
    .optional()
    .isString()
    .withMessage("District must be a string"),

  body("doubleDependantLocality")
    .optional()
    .isString()
    .withMessage("Double Dependant Locality must be a string"),

  body("eastings")
    .optional()
    .isNumeric()
    .withMessage("Eastings must be a number"),

  body("isRural")
    .optional()
    .isBoolean()
    .withMessage("Is Rural must be a boolean"),

  body("latitude")
    .optional()
    .isNumeric()
    .withMessage("Latitude must be a number"),

  body("longitude")
    .optional()
    .isNumeric()
    .withMessage("Longitude must be a number"),

  body("northings")
    .optional()
    .isNumeric()
    .withMessage("Northings must be a number"),

  body("organisationName")
    .optional()
    .isString()
    .withMessage("Organisation Name must be a string"),

  body("poBox").optional().isString().withMessage("PO Box must be a string"),

  body("postcodeInwards")
    .optional()
    .isString()
    .withMessage("Postcode Inwards must be a string"),

  body("postcodeOutwards")
    .optional()
    .isString()
    .withMessage("Postcode Outwards must be a string"),

  body("postcodeType")
    .optional()
    .isString()
    .withMessage("Postcode Type must be a string"),

  body("premise").optional().isString().withMessage("Premise must be a string"),

  body("suOrganisationIndicator")
    .optional()
    .isString()
    .withMessage("SU Organisation Indicator must be a string"),

  body("subBuilding")
    .optional()
    .isString()
    .withMessage("Sub Building must be a string"),

  body("thoroughfare")
    .optional()
    .isString()
    .withMessage("Thoroughfare must be a string"),

  body("traditionalCounty")
    .optional()
    .isString()
    .withMessage("Traditional County must be a string"),

  body("udprn").optional().isString().withMessage("UDPRN must be a string"),

  body("umprn").optional().isString().withMessage("UMPRN must be a string"),

  body("ward").optional().isString().withMessage("Ward must be a string"),
];

module.exports = {
  validateCreateProperty,
  validateUpdateProperty,
};
