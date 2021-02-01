import {configMap} from "./config"

// should validate, if command line input contains supported seed types
const isSeedTypeValid = (input?: string) => !!configMap[input]
export { isSeedTypeValid }