import { APIGatewayProxyHandler } from "aws-lambda";
import Joi from "joi";
import { deleteProductService } from "../application/product_service";

// Esquema de validación con Joi para el id
const deleteProductSchema = Joi.object({
  id: Joi.string().min(1).required().messages({
    "string.base": "El id debe ser un string.",
    "string.empty": "El id no puede estar vacío.",
    "any.required": "El id del producto es requerido",
  }),
});

export const handleDeleteProduct: APIGatewayProxyHandler = async (event) => {
  try {
    const productData = event.body ? JSON.parse(event.body) : null;
    if (!productData) throw new Error("El cuerpo de la solicitud está vacío");

    // Validación del id usando Joi
    const { error } = deleteProductSchema.validate(productData);
    if (error) {
      throw new Error(error.details[0].message); // Error de validación
    }
    console.log(productData);
    const { id } = productData;

    // Llamar al servicio de eliminación
    await deleteProductService(id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Producto eliminado",
      }),
    };
  } catch (error: unknown) {
    // Comprobación del tipo de error
    if (error instanceof Error) {
      console.error("Error al eliminar el producto:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error al eliminar el producto",
          error: error.message,
        }),
      };
    }

    // En caso de error desconocido
    console.error("Error desconocido al eliminar el producto:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error desconocido al eliminar el producto",
        error: "Error desconocido",
      }),
    };
  }
};
