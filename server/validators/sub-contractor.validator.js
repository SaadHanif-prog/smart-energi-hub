const { body, param } = require("express-validator");

// Validation middleware for creating an address
const validateCreateSubContractor = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("registrationNumber")
    .notEmpty()
    .withMessage("Registration Number is required")
    .isString()
    .withMessage("Registration Number must be a string"),

  body("addressLine1")
    .notEmpty()
    .withMessage("Address line 1 is required")
    .isString()
    .withMessage("Address line 1 must be a string"),

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
    .withMessage("Administrative area must be a string"),

  body("addressLine2")
    .optional()
    .isString()
    .withMessage("Address line 2 must be a string"),

  body("addressLine3")
    .optional()
    .isString()
    .withMessage("Address line 3 must be a string"),

  body("buildingName")
    .optional()
    .isString()
    .withMessage("Building name must be a string"),

  body("buildingNumber")
    .optional()
    .isString()
    .withMessage("Building number must be a string"),

  body("county").optional().isString().withMessage("County must be a string"),

  body("deliveryPointSuffix")
    .optional()
    .isString()
    .withMessage("Delivery point suffix must be a string"),

  body("departmentName")
    .optional()
    .isString()
    .withMessage("Department name must be a string"),

  body("dependantLocality")
    .optional()
    .isString()
    .withMessage("Dependant locality must be a string"),

  body("dependantThoroughfare")
    .optional()
    .isString()
    .withMessage("Dependant thoroughfare must be a string"),

  body("district")
    .optional()
    .isString()
    .withMessage("District must be a string"),

  body("doubleDependantLocality")
    .optional()
    .isString()
    .withMessage("Double dependant locality must be a string"),

  body("eastings")
    .optional()
    .isNumeric()
    .withMessage("Eastings must be a number"),

  body("isRural")
    .optional()
    .isBoolean()
    .withMessage("Is rural must be true or false"),

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
    .withMessage("Organisation name must be a string"),

  body("poBox").optional().isString().withMessage("PO Box must be a string"),

  body("postcodeInwards")
    .optional()
    .isString()
    .withMessage("Postcode inwards must be a string"),

  body("postcodeOutwards")
    .optional()
    .isString()
    .withMessage("Postcode outwards must be a string"),

  body("postcodeType")
    .optional()
    .isString()
    .withMessage("Postcode type must be a string"),

  body("premise").optional().isString().withMessage("Premise must be a string"),

  body("suOrganisationIndicator")
    .optional()
    .isString()
    .withMessage("SU organisation indicator must be a string"),

  body("subBuilding")
    .optional()
    .isString()
    .withMessage("Sub building must be a string"),

  body("thoroughfare")
    .optional()
    .isString()
    .withMessage("Thoroughfare must be a string"),

  body("traditionalCounty")
    .optional()
    .isString()
    .withMessage("Traditional county must be a string"),

  body("udprn").optional().isString().withMessage("UDPRN must be a string"),

  body("umprn").optional().isString().withMessage("UMPRN must be a string"),

  body("ward").optional().isString().withMessage("Ward must be a string"),
];

// Validation middleware for updating an address
const validateUpdateSubContractor = [
  param("id").isMongoId().withMessage("Invalid address ID"),

  body("name").optional().isString().withMessage("Name must be a string"),

  body("registrationNumber")
    .optional()
    .isString()
    .withMessage("Registration Number must be a string"),

  body("addressLine1")
    .optional()
    .isString()
    .withMessage("Address line 1 must be a string"),

  body("postcode")
    .optional()
    .isString()
    .withMessage("Postcode must be a string"),

  body("town").optional().isString().withMessage("Town must be a string"),

  body("country").optional().isString().withMessage("Country must be a string"),

  body("administrativeArea")
    .optional()
    .isString()
    .withMessage("Administrative area must be a string"),

  body("addressLine2")
    .optional()
    .isString()
    .withMessage("Address line 2 must be a string"),

  body("addressLine3")
    .optional()
    .isString()
    .withMessage("Address line 3 must be a string"),

  body("buildingName")
    .optional()
    .isString()
    .withMessage("Building name must be a string"),

  body("buildingNumber")
    .optional()
    .isString()
    .withMessage("Building number must be a string"),

  body("county").optional().isString().withMessage("County must be a string"),

  body("deliveryPointSuffix")
    .optional()
    .isString()
    .withMessage("Delivery point suffix must be a string"),

  body("departmentName")
    .optional()
    .isString()
    .withMessage("Department name must be a string"),

  body("dependantLocality")
    .optional()
    .isString()
    .withMessage("Dependant locality must be a string"),

  body("dependantThoroughfare")
    .optional()
    .isString()
    .withMessage("Dependant thoroughfare must be a string"),

  body("district")
    .optional()
    .isString()
    .withMessage("District must be a string"),

  body("doubleDependantLocality")
    .optional()
    .isString()
    .withMessage("Double dependant locality must be a string"),

  body("eastings")
    .optional()
    .isNumeric()
    .withMessage("Eastings must be a number"),

  body("isRural")
    .optional()
    .isBoolean()
    .withMessage("Is rural must be true or false"),

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
    .withMessage("Organisation name must be a string"),

  body("poBox").optional().isString().withMessage("PO Box must be a string"),

  body("postcodeInwards")
    .optional()
    .isString()
    .withMessage("Postcode inwards must be a string"),

  body("postcodeOutwards")
    .optional()
    .isString()
    .withMessage("Postcode outwards must be a string"),

  body("postcodeType")
    .optional()
    .isString()
    .withMessage("Postcode type must be a string"),

  body("premise").optional().isString().withMessage("Premise must be a string"),

  body("suOrganisationIndicator")
    .optional()
    .isString()
    .withMessage("SU organisation indicator must be a string"),

  body("subBuilding")
    .optional()
    .isString()
    .withMessage("Sub building must be a string"),

  body("thoroughfare")
    .optional()
    .isString()
    .withMessage("Thoroughfare must be a string"),

  body("traditionalCounty")
    .optional()
    .isString()
    .withMessage("Traditional county must be a string"),

  body("udprn").optional().isString().withMessage("UDPRN must be a string"),

  body("umprn").optional().isString().withMessage("UMPRN must be a string"),

  body("ward").optional().isString().withMessage("Ward must be a string"),
];

module.exports = {
  validateCreateSubContractor,
  validateUpdateSubContractor,
};
