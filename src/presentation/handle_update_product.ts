import { APIGatewayProxyHandler } from "aws-lambda";
import { updateProductService } from "../application/product_service";
import Joi from "joi";

// Esquema de validación con Joi
const updateParamsSchema = Joi.object({
  id: Joi.string().min(1).required().messages({
    "string.base": "El id debe ser una cadena.",
    "string.empty": "El id del producto no puede estar vacío.",
    "any.required": "El id del producto es requerido",
  }),
  name: Joi.string().min(1).optional(),
  description: Joi.string().optional(),
  category: Joi.string().min(1).optional(),
  price: Joi.number().greater(0).optional(),
});

export const handleEditProductById: APIGatewayProxyHandler = async (event) => {
  try {
    const productDataUpdate = event.body ? JSON.parse(event.body) : null;

    if (!productDataUpdate)
      throw new Error("El cuerpo de la solicitud está vacío");

    // Validar los datos con Joi
    const { error } = updateParamsSchema.validate(productDataUpdate);
    if (error) {
      throw new Error(`Error de validación: ${error.details[0].message}`);
    }

    const { id, ...updatedData } = productDataUpdate;

    if (!id) throw new Error("El id del producto es requerido");

    if (Object.keys(updatedData).length === 0)
      throw new Error("No se proporcionaron datos para actualizar el producto");

    const updatedProduct = await updateProductService(productDataUpdate);
    if (!updatedProduct) throw new Error("Producto no encontrado");

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Producto actualizado correctamente",
        product: updatedProduct,
      }),
    };
  } catch (error) {
    console.error("Error al actualizar el producto:", error);

    const { message: errMessage } = error as Error;
    const statusCode = errMessage.includes("Producto no encontrado")
      ? 404
      : 500;
    const message = errMessage || "Error al actualizar el producto";

    return {
      statusCode,
      body: JSON.stringify({
        message,
        error: errMessage,
      }),
    };
  }
};
