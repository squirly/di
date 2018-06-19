export const expectRejectedWithError = (
  promise: Promise<any>,
  errorType: any,
  message: string,
): Promise<any> =>
  promise.then(
    () => {
      throw new Error('Expected promise rejection');
    },
    error => {
      expect(error.constructor).toBe(errorType);
      expect(error.message).toBe(message);
    },
  );
