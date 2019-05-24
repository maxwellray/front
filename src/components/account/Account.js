import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import EditInfoButton from "./EditInfoButton";
import LogTable from "./LogTable";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3
    },
    dividerFullWidth: {
        margin: `5px 0 0 ${theme.spacing.unit * 2}px`
    }
});

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "John",
            lastName: "Doe",
            username: "joe",
            password: "password",
            email: "joe@john.doe",
            role: "Citizen Joe",
            affiliation: "Doe",
            checked: true
        };
    }

    handleChange = type => value => {
        this.setState({[type]: value});
    };

    handleChangeSwitch = name => event => {
        this.setState({[name]: event.target.checked});
    };

    render() {
        const {classes} = this.props;
        const info = [
            {
                key: "firstName",
                desc: "First Name",
                value: this.state.firstName
            },
            {
                key: "lastName",
                desc: "Last Name",
                value: this.state.lastName
            },
            {
                key: "username",
                desc: "Username",
                value: this.state.username
            },
            {
                key: "password",
                desc: "Password",
                value: "*".repeat(this.state.password.length)
            },
            {
                key: "email",
                desc: "Email",
                value: this.state.email
            },
            {
                key: "role",
                desc: "Role",
                value: this.state.role
            },
            {
                key: "affiliation",
                desc: "Affiliation",
                value: this.state.affiliation
            }
        ];

        const permissions = [
            {
                key: 1,
                name: "Adding Observations",
                desc: "Permission 1 description"
            },
            {
                key: 2,
                name: "Approving Observations",
                desc: "Permission 2 description"
            },
            {
                key: 3,
                name: "Modifying Observations",
                desc: "Permission 3 description"
            },
            {
                key: 4,
                name: "Archiving Observations",
                desc: "Permission 4 description"
            },
            {
                key: 5,
                name: "Mass Importing Observations",
                desc: "Permission 5 description"
            },
            {
                key: 6,
                name: "Mass Exporting Observations",
                desc: "Permission 6 description"
            }
        ];

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <Typography variant="h6" className={classes.dividerFullWidth}>
                                Personal Information
                            </Typography>
                            <List>
                                {info.map(entry => (
                                    <React.Fragment key={entry.key}>
                                        <li>
                                            <Typography
                                                className={classes.dividerFullWidth}
                                                color="textSecondary"
                                                variant="caption"
                                            >
                                                {entry.desc}
                                            </Typography>
                                        </li>
                                        <ListItem>
                                            <ListItemText primary={entry.value}/>
                                            <EditInfoButton
                                                desc={entry.desc}
                                                handleChange={this.handleChange(entry.key)}
                                            />
                                        </ListItem>
                                        <Divider component="li"/>
                                    </React.Fragment>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" className={classes.dividerFullWidth}>
                                Permission List
                            </Typography>
                            <List>
                                {permissions.map(permission => (
                                    <React.Fragment key={permission.key}>
                                        <ListItem>
                                            <ListItemText
                                                primary={permission.name}
                                                secondary={permission.desc}
                                            />
                                            <Switch
                                                checked={this.state.checked}
                                                onChange={this.handleChangeSwitch("checked")}
                                            />
                                        </ListItem>
                                        <Divider component="li"/>
                                    </React.Fragment>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </div>
                <LogTable/>
            </React.Fragment>
        );
    }
}

Account.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);