import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

class Main extends Component {
    render = () => {
        return (
            <Switch>
                {/*load component tiap halaman */}
                <Route path="/siswa" component={Siswa} />

                <Route path="/pelanggaran" component={Pelanggaran} />

                <Route path="/user" component={User} />

                <Route path="/pelanggaran_siswa" component={PelanggaranSiswa} />
            </Switch>
            
        );
    }
}

export default Main;