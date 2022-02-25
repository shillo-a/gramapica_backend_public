// https://stackoverflow.com/questions/4647817/javascript-object-rename-key

export const changeObjectKeyName = (o, old_key, new_key) => {
    if (old_key !== new_key) {
        Object.defineProperty(o, new_key, Object.getOwnPropertyDescriptor(o, old_key));
        delete o[old_key];
    }
}
