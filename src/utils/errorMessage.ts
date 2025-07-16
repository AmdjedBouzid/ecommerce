export function errorMessage(error: any, toast: any) {
  const messages =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "An error occurred";

  if (Array.isArray(messages)) {
    messages.forEach((msg) => {
      toast.error(msg);
    });
  } else {
    toast.error(messages);
  }
}
