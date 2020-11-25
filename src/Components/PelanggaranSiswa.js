import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios';

class PelanggaranSiswa extends Component {
    constructor() {
      super();
      this.state = {
        siswa: [],
        pelanggaran_siswa: [],
        pelanggaran: [],
        id_pelanggaran: [],
        list_pelanggaran: [],
        id_siswa: []
      };

      /*if (!localStorage.getItem("Token")) {
        window.location = "/";
      }*/
  
    }
  
    bind = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    getSiswa = () => {
      let url = "http://localhost:8000/siswa";
      axios.get(url)
        .then(response => {
          this.setState({ siswa: response.data.siswa });
        })
        .catch(error => {
          console.log(error);
        });
    };
  
    getPelanggaran = () => {
      let url = "http://localhost:8000/pelanggaran";
      axios.get(url)
        .then(response => {
          this.setState({ pelanggaran: response.data.pelanggaran });
        })
        .catch(error => {
          console.log(error);
        });
    };
  
    getPelanggaranSiswa = () => {
      let url = "http://localhost:8000/pelanggaran_siswa";
      axios.get(url)
        .then(response => {
          this.setState({ pelanggaran_siswa: response.data.pelanggaran_siswa });
        })
        .catch(error => {
          console.log(error);
        });
    };
  
    componentDidMount() {
      this.getPelanggaranSiswa();
      this.getSiswa();
      this.getPelanggaran();
    }
  
    AddPelanggaran = () => {
      if (this.state.id_pelanggaran !== "") {
        let id = this.state.id_pelanggaran;
        let item = this.state.pelanggaran.find(itm => itm.id_pelanggaran == id);
        console.log(item);
        let temp = this.state.list_pelanggaran;
        temp.push(item);
        this.setState({ list_pelanggaran: temp });
      }
    };
  
    Save = event => {
      event.preventDefault();
      $("#modal_pelanggaran").modal("hide");
      let url = "http://localhost:8000/pelanggaran_siswa";
      // ambil data user dari local storage
      let user = JSON.parse(localStorage.getItem("user"));
      let form = new FormData();
      form.append("id_siswa", this.state.id_siswa);
      form.append("id_user", user.id_user);
      form.append(
        "detail_pelanggaran",
        JSON.stringify(this.state.list_pelanggaran)
      );
      axios.post(url, form)
        .then(response => {
          this.getPelanggaranSiswa();
          this.setState({ list_pelanggaran: [] });
        })
        .catch(error => {
          console.log(error);
        });
    };
  
    Drop = id_pelanggaran_siswa => {
      if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        $("#loading").toast("show");
        let url = "http://localhost:8000/pelanggaran_siswa/" + id_pelanggaran_siswa;
  
        axios
          .delete(url)
          .then(response => {
            this.setState({ message: response.data.message });
            this.getPelanggaranSiswa();
          })
          .catch(error => {
            console.log(error);
          });
      }
    };
  
    DropList = index => {
      let temp = this.state.list_pelanggaran;
      temp.splice(index, 1);
      this.setState({ list_pelanggaran: temp });
    };
  
    Add = () => {
      $("#modal_pelanggaran").modal("show");
      this.setState({
        action: "insert",
        id_siswa: "",
        id_pelanggaran: "",
        list_pelanggaran: []
      });
    };
  
    render() {
      return (
        <div className="m-3 card">
            <div className="card-header bg-info text-white">Data Pelanggaran Siswa</div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <td>Waktu</td>
                    <td>Nama Siswa</td>
                    <td>Pelanggaran</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.pelanggaran_siswa.map((item,index) => {
                    return (
                      <tr key={index}>
                        <td>{item.waktu}</td>
                        <td>{item.nama_siswa}</td>
                        <td>
                          <ul>
                            {item.list_pelanggaran.map(item => {
                              return (
                                <li key={item.id_pelanggaran}>
                                  {item.nama_pelanggaran}
                                </li>
                              );
                            })}
                          </ul>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => this.Drop(item.id_pelanggaran_siswa)}
                          >
                            <span className="fa fa-trash"></span> Hapus
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
  
              <button className="btn btn-success my-2" onClick={this.Add}>
                <span className="fa fa-plus"></span> Tambah Data
              </button>
            </div>
          
  
          {/* form modal pelanggaran siswa */}
          <div className="modal fade" id="modal">
            <form onSubmit={this.Save}>
              Nama Siswa
              <select
                name="id_siswa"
                className="form-control"
                value={this.state.id_siswa}
                onChange={this.bind}
                required
              >
                <option value="">-- Pilih Siswa --</option>
                {this.state.siswa.map(item => {
                  return (
                    <option key={item.id_siswa} value={item.id_siswa}>
                      {item.nama_siswa}
                    </option>
                  );
                })}
              </select>
              Pilih Pelanggaran
              <select
                name="id_pelanggaran"
                className="form-control"
                value={this.state.id_pelanggaran}
                onChange={this.bind}
                required
              >
                <option value="">-- Pilih Pelanggaran --</option>
                {this.state.pelanggaran.map(item => {
                  return (
                    <option key={item.id_pelanggaran} value={item.id_pelanggaran}>
                      {item.nama_pelanggaran}
                    </option>
                  );
                })}
              </select>
              <button
                type="button"
                className="btn btn-block btn-sm btn-primary my-2"
                onClick={this.AddPelanggaran}
              >
                Tambahkan Pelanggaran
              </button>
              Jenis Pelanggaran: <br />
              <ul>
                {this.state.list_pelanggaran.map((item, index) => {
                  return (
                    <li key={item.id_pelanggaran + index}>
                      {item.nama_pelanggaran}[
                      <a
                        className="text-danger"
                        onClick={() => this.DropList(index)}
                      >
                        X
                      </a>
                      ]
                    </li>
                  );
                })}
              </ul>
              <button className="pull-right btn btn-info my-2" type="submit">
                <span className="fa fa-check"></span> Simpan
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
  
  export default PelanggaranSiswa;