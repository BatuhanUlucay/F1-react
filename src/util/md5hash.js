import md5 from "md5";

export const hashMessage = (message) => {
    return md5(message)
}