const changeLayout = (layout: "grid" | "list") => {
    return {
        type: "CHANGE_LAYOUT",
        payload: layout
    }
}

export { changeLayout }