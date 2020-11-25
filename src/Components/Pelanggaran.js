import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios';

class Pelanggaran extends Component {
    constructor(){
        super();
        this.state = {
            pelanggaran: [], //array barang untuk menampung data barang
            id_pelanggaran: "",
            nama_pelanggaran: "",
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
            id_pelanggaran: "",
            nama_pelanggaran: "",
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
            id_pelanggaran: item.id_pelanggaran,
            nama_pelanggaran: item.nama_pelanggaran,
            poin: item.poin,
        });
    }

    getPelanggaran = () => {
        let url = "http://localhost:8000/pelanggaran";
        //mengakses api utk mengambil data barang
        axios.get(url)
        .then(response => {
            //mengisikan data dari respon API ke array barang
            this.setState({pelanggaran: response.data.pelanggaran});
        })
        .catch(error => {
            console.log(error);
        });
    }


    SavePelanggaran = (event) => {
        event.preventDefault();
        /* menampung data barang dari Form ke dalam FormData() untuk dikirim  */
        let url = "";

        if (this.state.action === "insert") {
           url = "http://localhost:8000/pelanggaran"
        } else {
            url = "http://localhost:8000/pelanggaran"
        }

        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_pelanggaran", this.state.id_pelanggaran);
        form.append("nama_pelanggaran", this.state.nama_pelanggaran);
        form.append("poin", this.state.poin);

        //mengirim data ke api utk disimpan pd database
        axios.post(url, form)
        .then(response => {
            //jika proses berhasil, memanggil data yg terbaru
            this.getPelanggaran();
        })
        .catch(error => {
            console.log(error);
        });
        //menutup form modal
        $("#modal").modal('hide');
    }

    Drop = (id_pelanggaran) => {
        let url = "http://localhost:8000/pelanggaran/" + id_pelanggaran;
        //memanggil url api utk menghapus data pd database
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            axios.delete(url)
            .then(response => {
                //jika proses hapus data berhasil, memanggil data yg terbaru
                this.getPelanggaran();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    componentDidMount(){
        let url = "http://localhost:8000/pelanggaran";
        //mengakses api utk mengambil data barang
        axios.get(url)
        .then(response => {
            //mengisikan data dari respon API ke array barang
            this.setState({pelanggaran: response.data.pelanggaran});
        })
        .catch(error => {
            console.log(error);
        });
    }

    render(){
        console.log(this.state.pelanggaran);
        return (
            <div className="m-3 card">
                <div className="card-header bg-info text-white">Data Pelanggaran</div>
                <div className="card-body">

                    {/* tampilan tabel barang */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID Pelanggaran</th>
                                    <th>Nama Pelanggaran</th>
                                    <th>Poin</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.pelanggaran.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id_pelanggaran}</td>
                                            <td>{item.nama_pelanggaran}</td>
                                            <td>{item.poin}</td>
                                            <td>
                                                <button className="btn btn-sm btn-info m-1" data-toggle="modal"
                                                data-target="#modal" onClick={() => this.Edit(item)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_pelanggaran)}>
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
                                        Form Pelanggaran
                                    </div>
                                    <form onSubmit={this.SavePelanggaran}>
                                        <div className="modal-body">
                                            ID Pelanggaran
                                            <input type="text" name="id_pelanggaran" value={this.state.id_pelanggaran} onChange={this.bind}
                                            className="form-control" required />
                                            Nama Pelanggaran
                                            <input type="text" name="nama_pelanggaran" value={this.state.nama_pelanggaran} onChange={this.bind}
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

export default Pelanggaran;