import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { List as MaterialList, Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import XIcon from '@material-ui/icons/Close';
import { useStores } from '../utils/hooks/useStores';
import { ITaskInfo } from '../interfaces/task';
import { IList } from '../interfaces/list';

interface IListProps {
  list: IList;
}
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    minWidth: 350,
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
  listRoot: {
    margin: -theme.spacing(2)
  }
}));

const List: React.FC<IListProps> = ({ list }) => {
  const classes = useStyles();
  const { listStore, taskStore } = useStores();
  const { _id, title, description, tasks } = list;

  const deleteList = () => {
    listStore.deleteList(_id);
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
        <CardHeader title={title} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <br />
          <Divider />
          <br />
          <MaterialList classes={{ root: classes.listRoot }}>
            {tasks.map(task => (
              <ListItem key={task._id}>
                <ListItemText primary={task.title} secondary={task.description} />
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
          <Typography variant="body2" color="textSecondary" component="p">
            list actions:
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="delete" onClick={deleteList}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default List;
