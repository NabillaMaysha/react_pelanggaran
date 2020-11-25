import React from 'react';
import {Link} from 'react-router-dom';
import Siswa from './Components/Siswa';
import Pelanggaran from './Components/Pelanggaran';
import User from './Components/User';
import PelanggaranSiswa from './Components/PelanggaranSiswa';


class App extends React.Component {
  render(){
    return (
      <div> <hr />
      

      <Link to="/siswa" className="nav-link">Daftar Siswa</Link>
      <Siswa />

      <Link to="/pelanggaran" className="nav-link">Daftar Pelanggaran</Link>
      <Pelanggaran />

      <Link to="/user" className="nav-link">Daftar User</Link>
      <User />

      <Link to="/pelanggaran_siswa" className="nav-link">Daftar Pelanggaran Siswa</Link>
      <PelanggaranSiswa />
    </div>
    );
  }
}

export default App;