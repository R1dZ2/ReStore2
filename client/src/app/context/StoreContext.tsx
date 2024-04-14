import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket | null) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue>({} as StoreContextValue);

export const useStoreContext = () => {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw new Error('useStoreContext must be used within a StoreContextProvider');
    }

    return context;
}

export const StoreContextProvider = ({ children }: PropsWithChildren) => {
    const [basket, setBasket] = useState<Basket | null>(null);

    const removeItem = (productId: number, quantity: number) => {
        if (!basket) return;
        const item = basket.items.find(item => item.productId === productId);
        if (!item) return;
        if (item.quantity > quantity) {
            item.quantity -= quantity;
        } else {
            basket.items = basket.items.filter(item => item.productId !== productId);
        }
        setBasket({ ...basket });
    }

    return (
        <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
            {children}
        </StoreContext.Provider>
    )
}