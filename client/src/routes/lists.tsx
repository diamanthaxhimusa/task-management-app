import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { Divider, Collapse, Button } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useStores } from '../utils/hooks/useStores';
import { Route } from '../utils/enums/routes';
import { useHistory } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Task from '../components/Task';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import List from '../components/List';

interface IListsRouteProps {}

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
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  }
}));

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TaskContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 100%;
  justify-content: space-between;
`;

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

const ListsRoute: React.FC<IListsRouteProps> = () => {
  const classes = useStyles();
  const { listStore, taskStore } = useStores();
  const [createFocused, setCreateFocused] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tasks, setTasks] = useState<string[]>([]);

  const onInputFocus = () => {
    setCreateFocused(true);
  };

  const closeForm = () => {
    setCreateFocused(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isSuccess } = await listStore.createList({
      title,
      description,
      tasks
    });
    if (isSuccess) {
      setTitle('');
      setDescription('');
      setTasks([]);
    }
  };

  const handleChange = (event: any) => {
    setTasks(event.target.value);
  };

  return (
    <Container>
      <div>
        <h4>Start Creating a list</h4>
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
                placeholder="List name"
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
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={tasks}
                  onChange={handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected: any) => (
                    <div className={classes.chips}>
                      {selected.map((value: any) => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {taskStore.availableTasks().map(task => (
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
        {listStore.lists.map((list, index) => (
          <List key={index} list={list} />
        ))}
      </TaskContainer>
    </Container>
  );
};

export default observer(ListsRoute);
