import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { Divider, Collapse, Button } from '@material-ui/core';
import { useStores } from '../utils/hooks/useStores';
import { Route } from '../utils/enums/routes';
import { useHistory } from 'react-router-dom';
import Task from '../components/Task';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { IList } from '../interfaces/list';

interface ITasksRouteProps {}

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 400,
    transitionDuration: '300ms'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    width: '100%',
    marginLeft: theme.spacing(1),
    flex: 1,
    padding: theme.spacing(1)
  },
  label: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1),
    paddingBottom: 0,
    fontSize: 12
  },
  form: {
    marginBottom: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TaskContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  margin-top: 30px;
  width: 100%;
`;

const TasksRoute: React.FC<ITasksRouteProps> = () => {
  const classes = useStyles();
  const { taskStore, listStore } = useStores();
  const [createFocused, setCreateFocused] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = React.useState<string>('');
  const [lists, setLists] = useState<IList[]>(listStore.lists);
  const [listId, setListId] = useState<string | null>(null);

  const onInputFocus = () => {
    setCreateFocused(true);
  };

  const handleChange = (event: any) => {
    setListId(event.target.value);
  };

  const closeForm = () => {
    setCreateFocused(false);
  };

  useEffect(() => {
    taskStore.getTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isSuccess } = await taskStore.createTask({
      title,
      description,
      due_date: dueDate,
      list: listId
    });
    if (isSuccess) {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  };

  const renderList = (id: string) => {
    const list = lists.find(list => list._id === id);
    return <span>{list?.title}</span>;
  };

  return (
    <Container>
      <div>
        <h4>Start Creating a task</h4>
      </div>
      <Paper elevation={3} className={classes.root}>
        <Collapse
          classes={{ wrapperInner: classes.wrapper }}
          in={createFocused}
          collapsedHeight="2.5rem"
        >
          <form className={classes.form} onSubmit={handleSubmit}>
            <div>
              <InputBase
                required
                className={classes.input}
                onFocus={onInputFocus}
                placeholder="Task name"
                value={title}
                onInput={e => {
                  const target = e.target as HTMLInputElement;
                  setTitle(target.value);
                }}
              />
              <Divider />
              <InputBase
                required
                className={classes.input}
                placeholder="Description"
                multiline
                rows={2}
                value={description}
                onInput={e => {
                  const target = e.target as HTMLInputElement;
                  setDescription(target.value);
                }}
              />
              <Divider />
              <label className={classes.label}>Due date</label>
              <InputBase
                required
                className={classes.input}
                type="date"
                value={dueDate}
                onInput={e => {
                  const target = e.target as HTMLInputElement;
                  setDueDate(target.value);
                }}
              />
              <Divider />
              <FormControl className={classes.formControl}>
                <span>Select List</span>
                <Select
                  value={listId}
                  onChange={handleChange}
                  className={classes.input}
                  renderValue={(selected: any) => <div>{renderList(selected)}</div>}
                  MenuProps={MenuProps}
                >
                  {lists.map(task => (
                    <MenuItem key={task._id} value={task._id}>
                      {task.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 20 }}>
              <Button onClick={closeForm} variant="contained">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </div>
          </form>
        </Collapse>
      </Paper>
      <TaskContainer>
        {taskStore.tasks.map((task, index) => (
          <Task key={index} task={task} />
        ))}
      </TaskContainer>
    </Container>
  );
};

export default observer(TasksRoute);
