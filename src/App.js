import React, {Component} from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';

//import logo from './logo.svg';
//import './App.css';
const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: 600,
        textAlign: 'center'
    },

    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,

    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 220,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            boardId: '',
            minutes: 0,
            disableButtons: false,
            snackBar: {
                open: false,
                message: ''
            }
        };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleClose = () => {
        this.setState({
            snackBar: {
                open: false,
                message: ''
            }
        });
    }

    start = (event, minutes) => {
        //alert(this.state.sim);
        //alert(this.state.imei);
        //alert(minutes);
        axios.post('http://jingjing.fenglinfl.com/public/index.php/gprs/onenet/relay/enable', {
            deviceId: this.state.boardId,
            timeout: minutes * 60
        })
            .then(response => {
                this.setState({
                    disableButtons: true
                });

                if (typeof response.data.contents.error != 'undefined') {
                    this.setState({
                        snackBar: {
                            open: true,
                            message: response.data.contents.error
                        }
                    });

                    setTimeout(() => {
                        this.setState({
                            snackBar: {
                                open: false,
                                message: ''
                            },
                            disableButtons: false
                        });
                    }, 3000);
                }
            })
            .catch(function (error) {

            });
    }

    render() {
        const {classes} = this.props;

        return (
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <Paper className={classes.root} elevation={1}>
                    <form autoComplete="off" className={classes.container}>

                        <FormControl>
                            <TextField
                                required
                                id="required"
                                label="Device ID"
                                defaultValue=""
                                className={classes.textField}
                                margin="normal"
                                onChange={this.handleChange}
                                inputProps={{
                                    name: "boardId",
                                    id: "boardId"
                                }}
                            />
                        </FormControl>
                        <div>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 1)} disabled={this.state.disableButtons}>
                                1 min
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 2)} disabled={this.state.disableButtons}>
                                2 min
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 3)} disabled={this.state.disableButtons}>
                                3 min
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 4)} disabled={this.state.disableButtons}>
                                4 min
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 5)} disabled={this.state.disableButtons}>
                                5 min
                            </Button>
                        </div>
                        <div>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 6)} disabled={this.state.disableButtons}>
                                6 min
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 7)} disabled={this.state.disableButtons}>
                                7 min
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 8)} disabled={this.state.disableButtons}>
                                8 min
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 9)} disabled={this.state.disableButtons}>
                                9 min
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 10)} disabled={this.state.disableButtons}>
                                10 min
                            </Button>
                        </div>
                        <div>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 11)} disabled={this.state.disableButtons}>
                                11 min
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 12)} disabled={this.state.disableButtons}>
                                12 min
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 13)} disabled={this.state.disableButtons}>
                                13 min
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 14)} disabled={this.state.disableButtons}>
                                14 min
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button} onClick={(e, minutes) => this.start(e, 15)} disabled={this.state.disableButtons}>
                                15 min
                            </Button>
                        </div>
                    </form>

                    <Snackbar
                        anchorOrigin={{ vertical: `bottom`, horizontal: `center` }}
                        open={this.state.snackBar.open}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.snackBar.message}</span>}
                    />
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(App);