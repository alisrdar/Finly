import {createContext} from "react";

export interface ThemeContextType {
    theme: string,
    toggleTheme : () => void
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export default ThemeContext