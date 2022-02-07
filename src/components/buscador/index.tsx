import React, { useEffect, useState } from "react";
import { Button } from "../ui/buttons";

import { Title } from "../ui/text";
import css from "./index.css";
function Search(props) {
  return (
    <form action={null} onSubmit={props.onSubmit} className={css.search__form}>
      <input
        name="q"
        type="search"
        className={css.input}
        placeholder={props.placeholder}
      />
      <Button>Buscar</Button>
    </form>
  );
}

export { Search };
