/**
 * Function allowing to capitalize the first letter of a string
 * @param string 
 * @returns 
 */
export function upperCaseFirst(string) {
    return string[0].toUpperCase() + string.slice(1)
}

/**
 * Function to return only the firstName of the whole name
 * @param string 
 * @returns 
 */
export function firstName(string) {
    return string.split(" ")[0].replace("-", " ")
}