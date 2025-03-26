import { APIGatewayProxyHandler } from "aws-lambda";
import { searchProductsService } from "../application/product_service";

export const handleSearchProducts: APIGatewayProxyHandler = async (event) => {
  try {
    const { searchParams } = JSON.parse(event.body!);

    if (!searchParams) {
      throw new Error("Debe proporcionar el parámetro 'searchParams'");
    }

    const products = await searchProductsService({
      name: searchParams,
      category: searchParams,
    });

    if (products.length === 0) {
      throw new Error("No se encontraron productos");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Productos encontrados",
        products: products,
      }),
    };
  } catch (error: unknown) {
    console.error("Error al buscar productos:", error);

    if (error instanceof Error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error al buscar productos",
          error: error.message,
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error desconocido al buscar productos",
        }),
      };
    }
  }
};
