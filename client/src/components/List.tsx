import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { List as MaterialList, Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import XIcon from '@material-ui/icons/Close';

import { useStores } from '../utils/hooks/useStores';
import { IList } from '../interfaces/list';
import { ITaskInfo } from '../interfaces/task';

interface IListProps {
  list: IList;
}
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 350,
    minWidth: 280,
    marginBottom: 30,
    margin: 'auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  cardHeaderTitleDone: {
    textDecoration: 'line-through'
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
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  listRoot: {
    margin: -theme.spacing(2)
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

const List: React.FC<IListProps> = ({ list }) => {
  const classes = useStyles();
  const { listStore, taskStore } = useStores();
  const { _id, title, description, tasks } = list;
  const [open, setOpen] = useState(false);
  const [etitle, setTitle] = useState<string>(title);
  const [edescription, setDescription] = useState<string>(description);
  const [etasks, setTasks] = useState<string[]>([]);
  const [availableTasks, setAvailableTasks] = useState<ITaskInfo[]>(taskStore.availableTasks());

  useEffect(() => {
    let array: string[] = [];
    tasks.forEach(task => array.push(task._id));
    setTasks(array);
    setAvailableTasks([...availableTasks, ...tasks]);
  }, []);

  useEffect(() => {
    setTitle(title);
    setDescription(description);
    let array: string[] = [];
    tasks.forEach(task => array.push(task._id));
    setTasks(array);
    setAvailableTasks([...taskStore.availableTasks(), ...tasks]);
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteList = () => {
    listStore.deleteList(_id);
  };

  const handleChange = (event: any) => {
    setTasks(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isSuccess } = await listStore.editList(_id, {
      title: etitle,
      description: edescription,
      tasks: etasks
    });
    if (isSuccess) {
      taskStore.getTasks();
      setTitle('');
      setDescription('');
      setTasks([]);
      handleClose();
    }
  };

  const removeTaskFromList = (id: string) => {
    let taskIds: string[] = [];
    tasks.map(task => {
      if (task._id !== id) taskIds.push(task._id);
    });
    taskStore.editTask(id, { list: null });
    listStore.editList(_id, { tasks: taskIds });
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader title={title} subheader={description} />
        {tasks.length > 0 && (
          <CardContent>
            <br />
            <Divider />
            <br />
            <MaterialList classes={{ root: classes.listRoot }}>
              {tasks.map(task => (
                <ListItem key={task._id}>
                  <ListItemText
                    classes={{ primary: task.completed ? classes.cardHeaderTitleDone : '' }}
                    primary={task.title}
                    secondary={task.description}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => removeTaskFromList(task._id)}
                      edge="end"
                      aria-label="delete"
                    >
                      <XIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </MaterialList>
            <br />
            <Divider />
            <br />
          </CardContent>
        )}
        <CardActions disableSpacing>
          <IconButton aria-label="delete" onClick={deleteList}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit List</DialogTitle>
        <form className={classes.form} onSubmit={handleSubmit}>
          <DialogContent>
            <div>
              <InputBase
                required
                className={classes.input}
                placeholder="List name"
                value={etitle}
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
                rows={4}
                value={edescription}
                onInput={e => {
                  const target = e.target as HTMLInputElement;
                  setDescription(target.value);
                }}
              />
              <Divider />
              <FormControl className={classes.formControl}>
                <span>Select Tasks</span>
                <Select
                  multiple
                  value={etasks}
                  onChange={handleChange}
                  input={<Input id="select-multiple-chip" />}
                  className={classes.input}
                  renderValue={(selected: any) => (
                    <div className={classes.chips}>
                      {selected.map((value: any) => {
                        const task = taskStore.tasks.find(task => task._id === value);
                        return <Chip key={value} label={task?.title} className={classes.chip} />;
                      })}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {availableTasks.map(task => (
                    <MenuItem key={task._id} value={task._id}>
                      {task.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 20 }}></div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default List;
