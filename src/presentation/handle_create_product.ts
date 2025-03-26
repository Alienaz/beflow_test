import { APIGatewayProxyHandler } from "aws-lambda";
import Joi from "joi";
import { createProductService } from "../application/product_service";

const createParamsSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().allow("").optional(),
  category: Joi.string().min(1).required(),
  price: Joi.number().greater(0).required(),
});

export const handleCreateProduct: APIGatewayProxyHandler = async (event) => {
  try {
    const productData = JSON.parse(event.body ?? "");

    // Validar los datos con Joi
    const { error } = createParamsSchema.validate(productData);
    if (error) {
      throw new Error(`Error de validación: ${error.details[0].message}`);
    }

    // Pasar los datos validados a la capa de aplicación
    const newProduct = await createProductService(productData);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Producto creado exitosamente",
        product: newProduct,
      }),
    };
  } catch (error: unknown) {
    console.error("Error al crear el producto:", error);

    // Comprobación del tipo de error
    if (error instanceof Error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error al crear el producto",
          error: error.message,
        }),
      };
    }

    // En caso de que el error no sea una instancia de Error, devuelve un mensaje genérico
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al crear el producto",
        error: "Error desconocido",
      }),
    };
  }
};
