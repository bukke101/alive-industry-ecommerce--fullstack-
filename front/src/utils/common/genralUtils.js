const removeMessage = (message) => {
  setTimeout(() => {
    message(null);
  }, 2300);
};
export { removeMessage };
