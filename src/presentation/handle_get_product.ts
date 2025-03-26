import { APIGatewayProxyHandler } from "aws-lambda";
import { getAllProductsService } from "../application/product_service";

export const handleGetAllProducts: APIGatewayProxyHandler = async () => {
  try {
    console.log("Obteniendo productos...");

    const products = await getAllProductsService();
    console.log(products);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Productos obtenidos correctamente",
        products,
      }),
    };
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al obtener los productos",
        error: (error as Error).message,
      }),
    };
  }
};
