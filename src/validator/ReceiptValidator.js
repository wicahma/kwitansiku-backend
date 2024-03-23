const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../helper/ApiError");

class ReceiptValidator {
  async createReceiptTKIValidator(req, res, next) {
    const receiptSchema = Joi.object({
      tanggal: Joi.date().required(),
      nama_penanggungjawab: Joi.string().max(100).required(),
      nama_sponsor: Joi.string().max(100).required(),
      keterangan: Joi.string().valid(null, "").max(255),
      total_pembayaran: Joi.number().required(),
    });

    const patientItemsSchema = Joi.object({
      negara_tujuan: Joi.string().max(50).required(),
      nama_lengkap: Joi.string().max(100).required(),
      usia: Joi.number(),
      jenis_kelamin: Joi.string().valid(
        ...Object.values({
          L: "L",
          P: "P",
        })
      ),
      harga: Joi.number().required(),
    });
    const patientSchema = Joi.array().items(patientItemsSchema);

    const schema = Joi.object({
      receipt: receiptSchema,
      patient: patientSchema,
    });

    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      const errorMessage = error.details
        .map((details) => {
          return details.message;
        })
        .join(", ");
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      req.body = value;
      return next();
    }
  }

  async updateReceiptTKIValidator(req, res, next) {
    const receiptSchema = Joi.object({
      tanggal: Joi.date().required(),
      nama_penanggungjawab: Joi.string().max(100).required(),
      nama_sponsor: Joi.string().max(100).required(),
      keterangan: Joi.string().valid(null, "").max(255),
      total_pembayaran: Joi.number().required(),
    });

    const patientItemsSchema = Joi.object({
      uuid: Joi.string().uuid().required(),
      negara_tujuan: Joi.string().max(50).required(),
      nama_lengkap: Joi.string().max(100).required(),
      usia: Joi.number(),
      jenis_kelamin: Joi.string().valid(
        ...Object.values({
          L: "L",
          P: "P",
        })
      ),
      harga: Joi.number().required(),
    });
    const patientSchema = Joi.array().items(patientItemsSchema);

    const schema = Joi.object({
      receipt: receiptSchema,
      patient: patientSchema,
    });

    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      const errorMessage = error.details
        .map((details) => {
          return details.message;
        })
        .join(", ");
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      req.body = value;
      return next();
    }
  }
}

module.exports = ReceiptValidator;