import {seed_file_map} from "./config"

// should validate, if command line input contains supported seed types
const isSeedTypeValid = (input?: string) => !!seed_file_map[input]
export { isSeedTypeValid }