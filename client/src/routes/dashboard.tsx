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
import Task from '../components/Task';

interface IDashboardProps {}

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

const Dashboard: React.FC<IDashboardProps> = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const { taskStore } = useStores();
  const [createFocused, setCreateFocused] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = React.useState<string>('');

  const onInputFocus = () => {
    setCreateFocused(true);
  };

  const closeForm = () => {
    setCreateFocused(false);
  };

  const handleDateChange = (date: any) => {
    setDueDate(date);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isSuccess } = await taskStore.createTask({
      title,
      description,
      due_date: dueDate
    });
    if (isSuccess) {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  };

  return (
    <Container>
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

export default observer(Dashboard);
