export const scrollStart = (className) => {
    const container = document.getElementsByClassName(className)[0]
    if (container) {
        container.scrollTop = container.scrollHeight
    }
}