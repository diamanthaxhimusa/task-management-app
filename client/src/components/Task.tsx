import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ITaskInfo } from '../interfaces/task';
import { useStores } from '../utils/hooks/useStores';

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
  }
}));

const Task: React.FC<ITaskProps> = ({ task }) => {
  const classes = useStyles();
  const { taskStore } = useStores();
  const { _id, title, description, due_date, completed } = task;

  const toggleStatus = () => {
    taskStore.setTaskCompleted(!completed, _id);
  };

  const deleteTask = () => {
    taskStore.deleteTask(_id);
  };

  return (
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
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Task;
