import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios';

class Siswa extends Component {
    constructor(){
        super();
        this.state = {
            siswa: [], //array barang untuk menampung data barang
            id_siswa: "",
            nis: "",
            nama_siswa: "",
            kelas: "",
            poin: "",
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
            id_siswa: "",
            nis: "",
            nama_siswa: "",
            kelas: "",
            poin: "",
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
            nis: item.nis,
            nama_siswa: item.nama_siswa,
            kelas: item.kelas,
            poin: item.poin,
            id_siswa: item.id_siswa
        });
    }

    getSiswa = () => {
        let url = "http://localhost:8000/siswa";
        //mengakses api utk mengambil data barang
        axios.get(url)
        .then(response => {
            //mengisikan data dari respon API ke array barang
            this.setState({siswa: response.data.siswa});
        })
        .catch(error => {
            console.log(error);
        });
    }


    SaveSiswa = (event) => {
        event.preventDefault();
        /* menampung data barang dari Form ke dalam FormData() untuk dikirim  */
        let url = "";

        if (this.state.action === "insert") {
           url = "http://localhost:8000/siswa/save"
        } else {
            url = "http://localhost:8000/siswa/update"
        }

        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_siswa", this.state.id_siswa);
        form.append("nis", this.state.nis);
        form.append("nama_siswa", this.state.nama_siswa);
        form.append("kelas", this.state.kelas);
        form.append("poin", this.state.poin);

        //mengirim data ke api utk disimpan pd database
        axios.post(url, form)
        .then(response => {
            //jika proses berhasil, memanggil data yg terbaru
            this.getSiswa();
        })
        .catch(error => {
            console.log(error);
        });
        //menutup form modal
        $("#modal").modal('hide');
    }

    Drop = (id_siswa) => {
        let url = "http://localhost:8000/siswa/" + id_siswa;
        //memanggil url api utk menghapus data pd database
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            axios.delete(url)
            .then(response => {
                //jika proses hapus data berhasil, memanggil data yg terbaru
                this.getSiswa();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    componentDidMount(){
        let url = "http://localhost:8000/siswa";
        //mengakses api utk mengambil data barang
        axios.get(url)
        .then(response => {
            //mengisikan data dari respon API ke array barang
            this.setState({siswa: response.data.siswa});
        })
        .catch(error => {
            console.log(error);
        });
    }

    render(){
        console.log(this.state.siswa);
        return (
            <div className="m-3 card">
                <div className="card-header bg-info text-white">Data Siswa</div>
                <div className="card-body">

                    {/* tampilan tabel barang */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID Siswa</th>
                                    <th>NIS</th>
                                    <th>Nama Siswa</th>
                                    <th>Kelas</th>
                                    <th>Poin</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.siswa.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id_siswa}</td>
                                            <td>{item.nis}</td>
                                            <td>{item.nama_siswa}</td>
                                            <td>{item.kelas}</td>
                                            <td>{item.poin}</td>
                                            <td>
                                                <button className="btn btn-sm btn-info m-1" data-toggle="modal"
                                                data-target="#modal" onClick={() => this.Edit(item)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_siswa)}>
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
                                        Form Siswa
                                    </div>
                                    <form onSubmit={this.SaveSiswa}>
                                        <div className="modal-body">
                                            ID Siswa
                                            <input type="number" name="id_siswa" value={this.state.id_siswa} onChange={this.bind}
                                            className="form-control"  />
                                            NIS
                                            <input type="number" name="nis" value={this.state.nis} onChange={this.bind}
                                            className="form-control"  />
                                            Nama Siswa
                                            <input type="text" name="nama_siswa" value={this.state.nama_siswa} onChange={this.bind}
                                            className="form-control" required />
                                            Kelas
                                            <input type="text" name="kelas" value={this.state.kelas} onChange={this.bind}
                                            className="form-control" required />
                                            Poin
                                            <input type="number" name="poin" value={this.state.poin} onChange={this.bind}
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

export default Siswa;