import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import defaultStyles from '../../defaultStyles';
import Header from "../common/Header";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {setManagedUser, getAllUsers} from "../../actions/admin";
import {connect} from 'react-redux';
import ManageUserModal from "./ManageUserModal";

const styles = theme => ({
    ...defaultStyles(theme),
    root: {
        alignSelf: 'center',
        width: '98%',
        marginTop: theme.spacing.unit * 3,
        marginLeft: 'auto',
        marginRight: 'auto',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    title: {
        flex: '0 0 auto',
        padding: theme.spacing.unit * 2
    }
});

const createData = (name, affiliation, email, username, lastActive) => {
    return {name, affiliation, email, username, lastActive};
};

const rows = [
    createData('Mai T. Bunker', 'Researcher', 'MaiTBunker@dayrep.com', 'Hispossiond', new Date('07-12-2019').toISOString()),
    createData('Esther J. Barnett', 'Volunteer', 'EstherJBarnett@armyspy.com', 'Criongul', new Date('07-12-2019').toISOString()),
    createData('Malcolm R. Connolly', 'Volunteer', 'MalcolmRConnolly@dayrep.com', 'Frarte', new Date('07-12-2019').toISOString()),
    createData('Brandon A. Estepp', 'Researcher', 'BrandonAEstepp@jourrapide.com', 'Dionsiouseve', new Date('07-12-2019').toISOString()),
    createData('Donna B. Simon', 'Volunteer', 'DonnaBSimon@jourrapide.com', 'Hawas1981', new Date('07-12-2019').toISOString()),
];

class ManageUsers extends React.Component {
    componentDidMount() {
        this.props.getAllUsers();
    }

    setManagedUser = (user) => () => {
        this.props.setManagedUser(user);
    };

    renderTableRow = (row) => {
        return (
            <TableRow key={row.name} hover onClick={
                this.setManagedUser(row)
            }>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.affiliation}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">{row.lastActive}</TableCell>
            </TableRow>
        )
    };

    renderUserTable = () => {
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <div className={classes.title}>
                    <Typography variant={"h6"} id={"tableTitle"}>Users</Typography>
                </div>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Affiliation</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Last Active</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => this.renderTableRow(row))}
                    </TableBody>
                </Table>
            </Paper>
        )
    };

    render() {
        return (
            <div>
                <Header/>
                {this.renderUserTable()}
                <ManageUserModal/>
            </div>
        )
    }
}

export default connect(null, {setManagedUser, getAllUsers})(withStyles(styles)(ManageUsers));