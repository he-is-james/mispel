function redirect(path, navigate, state) {
  navigate(`/${path}`, state);
}

export {redirect};