import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios';

class User extends Component {
    constructor(){
        super();
        this.state = {
            user: [], //array barang untuk menampung data barang
            id_user: "",
            nama_user: "",
            username: "",
            password: "",
            action: "",
        }

        /*if(!localStorage.getItem("Token")) {
            //direct ke halaman login
            window.location = "/login";
        }*/
    }

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    Add = () => {
        //mengosongkan isi variabel nip, nama dan alamat
        //set action mnjd insert
        this.setState({
            id_user: "",
            nama_user: "",
            username: "",
            password: "",
            action: "insert",
        });
    }

    Edit = (item) => {
        /*
    - mengisikan isi variabel sesuai dengan data yang
    akan diedit
    - set action menjadi "update" */
        this.setState({
            action: "update",
            id_user: item.id_user,
            nama_user: item.nama_user,
            username: item.username,
            password: item.password,
        });
    }

    getUser = () => {
        let url = "http://localhost:8000/user";
        //mengakses api utk mengambil data barang
        axios.get(url)
        .then(response => {
            //mengisikan data dari respon API ke array barang
            this.setState({user: response.data.user});
        })
        .catch(error => {
            console.log(error);
        });
    }


    SaveUser = (event) => {
        event.preventDefault();
        /* menampung data barang dari Form ke dalam FormData() untuk dikirim  */
        let url = "";

        if (this.state.action === "insert") {
           url = "http://localhost:8000/user"
        } else {
            url = "http://localhost:8000/user"
        }

        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_user", this.state.id_user);
        form.append("nama_user", this.state.nama_user);
        form.append("username", this.state.username);
        form.append("password", this.state.password);

        //mengirim data ke api utk disimpan pd database
        axios.post(url, form)
        .then(response => {
            //jika proses berhasil, memanggil data yg terbaru
            this.getUser();
        })
        .catch(error => {
            console.log(error);
        });
        //menutup form modal
        $("#modal").modal('hide');
    }

    Drop = (id_user) => {
        let url = "http://localhost:8000/user/" + id_user;
        //memanggil url api utk menghapus data pd database
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            axios.delete(url)
            .then(response => {
                //jika proses hapus data berhasil, memanggil data yg terbaru
                this.getUser();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    componentDidMount(){
        let url = "http://localhost:8000/user";
        //mengakses api utk mengambil data barang
        axios.get(url)
        .then(response => {
            //mengisikan data dari respon API ke array barang
            this.setState({user: response.data.user});
        })
        .catch(error => {
            console.log(error);
        });
    }

    render(){
        console.log(this.state.user);
        return (
            <div className="m-3 card">
                <div className="card-header bg-info text-white">Data User</div>
                <div className="card-body">

                    {/* tampilan tabel barang */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID User</th>
                                    <th>Nama User</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.user.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id_user}</td>
                                            <td>{item.nama_user}</td>
                                            <td>{item.username}</td>
                                            <td>{item.password}</td>
                                            <td>
                                                <button className="btn btn-sm btn-info m-1" data-toggle="modal"
                                                data-target="#modal" onClick={() => this.Edit(item)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_user)}>
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <button className="btn btn-success" onClick={this.Add} data-toggle="modal" data-target="#modal">
                            Tambah Data
                        </button>
                        {/* modal form barang */}
                        <div className="modal fade" id="modal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        Form User
                                    </div>
                                    <form onSubmit={this.SaveUser}>
                                        <div className="modal-body">
                                            ID User
                                            <input type="text" name="id_user" value={this.state.id_user} onChange={this.bind}
                                            className="form-control" required />
                                            Nama User
                                            <input type="text" name="nama_user" value={this.state.nama_user} onChange={this.bind}
                                            className="form-control" required />
                                            Username
                                            <input type="number" name="username" value={this.state.username} onChange={this.bind}
                                            className="form-control" required />
                                            Password
                                            <input type="number" name="password" value={this.state.password} onChange={this.bind}
                                            className="form-control" required />
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-sm btn-success" type="submit">
                                                Simpan
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default User;