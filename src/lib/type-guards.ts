export interface ShopifyErrorLink {
  status: number;
  message: Error;
  cause?: Error;
}

export const isObject = (
  object: unknown,
): object is Record<string, unknown> => {
  return (
    typeof object === "object" && object !== null && !Array.isArray(object)
  );
};

export const isShopifyError = (error: unknown): error is ShopifyErrorLink => {
  if (!isObject(error)) return false;

  if (error instanceof Error) return true;

  return findError(error);
};

function findError<T extends object>(error: T): boolean {
  // REVIEW:
  if (Object.prototype.toString.call(error) === "[object Object]") {
    return true;
  }

  const protoType = Object.getPrototypeOf(error) as T | null;
  return protoType === null ? false : findError(protoType);
}
