export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
    }).format(price);
}