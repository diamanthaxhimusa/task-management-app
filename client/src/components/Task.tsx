import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ITaskInfo } from '../interfaces/task';
import { useStores } from '../utils/hooks/useStores';
import { IList } from '../interfaces/list';

interface ITaskProps {
  task: ITaskInfo;
}
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    minWidth: 200,
    marginBottom: 30
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

const Task: React.FC<ITaskProps> = ({ task }) => {
  const classes = useStyles();
  const { taskStore, listStore } = useStores();
  const { _id, title, description, due_date, completed, list } = task;
  const [open, setOpen] = useState(false);
  const [etitle, setTitle] = useState<string>(title);
  const [edescription, setDescription] = useState<string>(description);
  const [edueDate, setDueDate] = useState<string>(due_date);
  const [lists, setLists] = useState<IList[]>(listStore.lists);
  const [listId, setListId] = useState<string>(list);

  useEffect(() => {
    setTitle(title);
    setDescription(description);
    setListId(list);
    setDueDate(due_date);
  }, [open]);

  const toggleStatus = () => {
    taskStore.setTaskCompleted(!completed, _id);
  };

  const deleteTask = () => {
    taskStore.deleteTask(_id);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: any) => {
    setListId(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isSuccess } = await taskStore.editTask(_id, {
      title: etitle,
      description: edescription,
      list: listId
    });
    if (isSuccess) {
      taskStore.getTasks();
      setTitle('');
      setDescription('');
      setListId('');
      handleClose();
    }
  };

  const renderList = (id: string) => {
    const list = lists.find(list => list._id === id);
    return <span>{list?.title}</span>;
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          title={title}
          subheader={due_date}
          classes={{ title: completed ? classes.cardHeaderTitleDone : '' }}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="check" onClick={toggleStatus}>
            {completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          </IconButton>
          <IconButton aria-label="delete" onClick={deleteTask}>
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
              <Divider />
              <label className={classes.label}>Due date</label>
              <InputBase
                required
                className={classes.input}
                type="date"
                value={edueDate}
                onInput={e => {
                  const target = e.target as HTMLInputElement;
                  setDueDate(target.value);
                }}
              />
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

export default Task;
