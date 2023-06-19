export const scrollBottom = (domNode) => {
  if (domNode) {
    domNode.scrollTo({
      top: domNode.scrollHeight,
      left: 0,
      behavior: 'instant'
    });
  }
}