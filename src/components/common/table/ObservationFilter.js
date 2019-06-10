import React from "react";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SealFilterFieldLeader from "./SealFilterFieldLeader";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  header: {
    marginLeft: theme.spacing.unit
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    minWidth: 180,
    maxWidth: 180
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    minWidth: 180,
    maxWidth: 180
  },
  button: {
    marginLeft: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

class SealFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, filter, handleChange } = this.props;

    let fieldLeaderComponents = [];
    const fieldLeaderList = Object.keys(filter.fieldLeaders);

    for (let i = 0; i < fieldLeaderList.length; i++) {
      fieldLeaderComponents.push(
        <SealFilterFieldLeader
          key={fieldLeaderList[i]}
          numFieldLeader={i + 1}
          fieldLeader={filter.fieldLeaders[fieldLeaderList[i]]}
          removeFieldLeader={() => {
            this.props.removeItem("fieldLeaders")(fieldLeaderList[i]);
          }}
          handleChange={this.props.editItem("fieldLeaders")(fieldLeaderList[i])}
        />
      );
    }

    return (
      <List>
        <ListItem alignItems="flex-start">
          <ListItemText>
            <Typography className={classes.header} variant="subtitle2">
              Observation Details
            </Typography>
            <TextField
              label="Date Start"
              type="date"
              className={classes.textField}
              onChange={handleChange("dateStart")}
              value={filter.dateStart}
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              label="Date End"
              type="date"
              className={classes.textField}
              onChange={handleChange("dateEnd")}
              value={filter.dateEnd}
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
            <FormControl className={classes.formControl}>
              <Select
                value={filter.location}
                onChange={handleChange("location")}
                input={<OutlinedInput labelWidth={0} />}
                displayEmpty
              >
                <MenuItem value="">
                  <i>Select Location</i>
                </MenuItem>
                <MenuItem value={"ACU"}>ACU</MenuItem>
                <MenuItem value={"ACL"}>ACL</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Recorder"
              className={classes.textField}
              value={filter.recorder}
              onChange={handleChange("recorder")}
              variant="outlined"
            />
          </ListItemText>
        </ListItem>
        {fieldLeaderComponents}
        <Button
          className={classes.button}
          variant="outlined"
          color={"secondary"}
          onClick={this.props.addFieldLeader}
        >
          Add Field Leader
        </Button>
        <Divider />
        <ListItem>
          <ListItemText>
            <Typography className={classes.header} variant="subtitle2">
              Sex
            </Typography>
            <FormControl className={classes.formControl}>
              <Select
                value={filter.sex}
                onChange={handleChange("sex")}
                input={<OutlinedInput labelWidth={0} />}
                displayEmpty
              >
                <MenuItem value="">
                  <i>Select Sex</i>
                </MenuItem>
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText>
            <Typography className={classes.header} variant="subtitle2">
              Age
            </Typography>
            <FormControl className={classes.formControl}>
              {filter.sex === "male" ? (
                <React.Fragment>
                  <Select
                    value={filter.ageClass}
                    onChange={handleChange("ageClass")}
                    input={<OutlinedInput labelWidth={0} />}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <i>Select Age Class</i>
                    </MenuItem>
                    <MenuItem value={"P"}>Pup</MenuItem>
                    <MenuItem value={"W"}>Weanling</MenuItem>
                    <MenuItem value={"J"}>Juvenile</MenuItem>
                    <MenuItem value={"SA1"}>Subadult 1</MenuItem>
                    <MenuItem value={"SA2"}>Subadult 2</MenuItem>
                    <MenuItem value={"SA3"}>Subadult 3</MenuItem>
                    <MenuItem value={"SA4"}>Subadult 4</MenuItem>
                    <MenuItem value={"A"}>Adult</MenuItem>
                  </Select>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Select
                    value={filter.ageClass}
                    onChange={handleChange("ageClass")}
                    input={<OutlinedInput labelWidth={0} />}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <i>Select Age Class</i>
                    </MenuItem>
                    <MenuItem value={"P"}>Pup</MenuItem>
                    <MenuItem value={"W"}>Weanling</MenuItem>
                    <MenuItem value={"J"}>Juvenile</MenuItem>
                    <MenuItem value={"A"}>Adult</MenuItem>
                  </Select>
                </React.Fragment>
              )}
            </FormControl>
            {filter.ageClass === "P" ? (
              <TextField
                label="Age in Days"
                className={classes.textField}
                value={filter.ageDays}
                onChange={handleChange("ageDays")}
                type="number"
                variant="outlined"
              />
            ) : null}
            {filter.sex === "female" && filter.ageClass === "A" ? (
              <TextField
                label="Pup Count"
                className={classes.textField}
                value={filter.pupCount}
                onChange={handleChange("pupCount")}
                type="number"
                variant="outlined"
              />
            ) : null}
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText>
            <Typography className={classes.header} variant="subtitle2">
              Last Observed Molt %
            </Typography>
            <TextField
              label="Start %"
              onChange={handleChange("moltStart")}
              type="number"
              className={classes.textField}
              value={filter.moltStart}
              variant="outlined"
            />
            <TextField
              label="End %"
              onChange={handleChange("moltEnd")}
              type="number"
              className={classes.textField}
              value={filter.moltEnd}
              variant="outlined"
            />
          </ListItemText>
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(SealFilter);
