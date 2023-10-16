import React, {FC} from 'react';
import {Button} from "@mui/material";
import {useActions} from "common/hooks";
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions
} from "features/todolists-list/todolists/model/todolists.slice";
import {OverridableStringUnion} from "@mui/types";

type Props = {
  todolist: TodolistDomainType;
};

const FilterTasksButtons: FC<Props> = ({todolist}) => {
  const {changeTodolistFilter} = useActions(todolistsActions);

  const filterButton = (filter: FilterValuesType, children: string, color: OverridableStringUnion<'inherit' | 'primary' | 'secondary'>) => {

    const changeTaskFilterHandler = () => {
      changeTodolistFilter({filter, id: todolist.id})
    }

    return (
      <Button
        variant={todolist.filter === filter ? "outlined" : "text"}
        onClick={changeTaskFilterHandler}
        color={color}
      >
        {children}
      </Button>
    )
  }

  return (
    <div >
      {filterButton('all', 'All', 'inherit')}
      {filterButton('active', 'Active', 'primary')}
      {filterButton('completed', 'Completed', 'secondary')}
    </div>
  );
};

export default FilterTasksButtons;
