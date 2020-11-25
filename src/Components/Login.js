import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            message: ""
        }
    }

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    Login = (event) => {
        event.preventDefault();
        let url = "http://localhost:8000/user/auth";
        let form = new FormData();
        form.append("username", this.state.username);
        form.append("password", this.state.password);
        axios.post(url, form)
        .then(response => {
            let logged = response.data.status;
            if(logged) {
                this.setState({message: "Login berhasil"});
                //menyimpan data token pada local storage
                localStorage.setItem("Token", response.data.token);
                //menyimpan data login user ke localStorage
                localStorage.setItem("user", JSON.stringify(response.data.user));
                //direct ke halaman data siswa
                window.location = "/siswa";
            } else {
                this.setState({message: "Login gagal"});
            }
            $("#message").toast("show");
        })
        .catch(error => {
            console.log(error);
        })
    }
}
export default Login;