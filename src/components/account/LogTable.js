import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

let counter = 0;

function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return {id: counter, name, calories, fat, carbs, protein};
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === "desc"
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    {
        id: "name",
        numeric: false,
        label: "Dessert (100g serving)"
    },
    {id: "calories", numeric: true, label: "Calories"},
    {id: "fat", numeric: true, label: "Fat (g)"},
    {id: "carbs", numeric: true, label: "Carbs (g)"},
    {id: "protein", numeric: true, label: "Protein (g)"}
];

class LogTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy} = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? "bottom-end" : "bottom-start"}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

LogTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3
    },
    table: {
        minWidth: 1020
    },
    tableWrapper: {
        overflowX: "auto"
    }
});

class LogTable extends React.Component {
    state = {
        order: "asc",
        orderBy: "calories",
        data: [
            createData("Cupcake", 305, 3.7, 67, 4.3),
            createData("Donut", 452, 25.0, 51, 4.9),
            createData("Eclair", 262, 16.0, 24, 6.0),
            createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
            createData("Gingerbread", 356, 16.0, 49, 3.9),
            createData("Honeycomb", 408, 3.2, 87, 6.5),
            createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
            createData("Jelly Bean", 375, 0.0, 94, 0.0),
            createData("KitKat", 518, 26.0, 65, 7.0),
            createData("Lollipop", 392, 0.2, 98, 0.0),
            createData("Marshmallow", 318, 0, 81, 2.0),
            createData("Nougat", 360, 19.0, 9, 37.0),
            createData("Oreo", 437, 18.0, 63, 4.0)
        ],
        page: 0,
        rowsPerPage: 5
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";

        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }

        this.setState({order, orderBy});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, rowsPerPage, page} = this.state;
        const emptyRows =
            rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <React.Fragment className={classes.root}>
                <Toolbar>
                    <div className={classes.title}>
                        <Typography variant="h6" id="tableTitle">
                            Nutrition
                        </Typography>
                    </div>
                </Toolbar>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <LogTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={n.id}>
                                            <TableCell component="th" scope="row">
                                                {n.name}
                                            </TableCell>
                                            <TableCell>{n.calories}</TableCell>
                                            <TableCell>{n.fat}</TableCell>
                                            <TableCell>{n.carbs}</TableCell>
                                            <TableCell>{n.protein}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page"
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </React.Fragment>
        );
    }
}

LogTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogTable);
