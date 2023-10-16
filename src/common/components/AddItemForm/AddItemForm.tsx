import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { RejectValueType } from "common/utils/create-app-async-thunk";

type AddItemFormPropsType = {
  addItem: (title: string) => Promise<unknown>;
  disabled?: boolean;
};

export const AddItemForm = React.memo(function ({ addItem, disabled = false }: AddItemFormPropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title)
        .then(() => {
          setTitle("");
        })
        .catch((e: RejectValueType) => {
          if (e.data) {
            const messages = e.data.messages;
            setError(messages.length ? messages[0] : "Some error occurred");
          }
        });
    } else {
      setError("Title is required");
    }
  };

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.key === "Enter") {
      addItemHandler();
    }
  };

  return (
    <div>
      <TextField
        sx={{ width: "300px" }}
        variant="outlined"
        disabled={disabled}
        error={!!error}
        value={title}
        onChange={changeTitleHandler}
        onKeyDown={onKeyPressAddItemHandler}
        label="Title"
        helperText={error}
      />
      <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
        <AddBox />
      </IconButton>
    </div>
  );
});
