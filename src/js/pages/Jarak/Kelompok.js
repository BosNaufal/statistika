
import React, { PropTypes } from 'react'

import angkaUtils from '../../utils/angka';

class Jarak extends React.Component {

  constructor() {
    super();
    this.state = {
      nilai: {},
      frekuensi: 0,
      data: []
    }
  }

  clearPrimaryInput() {
    this.inputNilai.value = ""
    this.inputFrekuensi.value = ""
  }

  handleChangeNilai(e) {
    const { value } = e.target
    const nilai = angkaUtils.pisahByDash(value)
    this.setState({ nilai })
  }

  handleChangeFrekuensi(e) {
    const { value } = e.target
    const frekuensi = parseFloat(value)
    this.setState({ frekuensi })
  }

  handleAddData() {
    const { nilai, frekuensi, data } = this.state
    const item = {
      nilai,
      frekuensi
    }
    data.push(item)
    this.setState({ data, nilai: {}, frekuensi: 0 })
    this.clearPrimaryInput()
  }

  handleEditItem(i) {
    const { data } = this.state
    data[i].isEditMode = true
    this.setState({ data })
    this.clearPrimaryInput()
  }

  handleDoneEditItem(i) {
    const { nilai, frekuensi, data } = this.state
    const newData = {
      nilai: nilai.xmin ? nilai : data[i].nilai,
      frekuensi: frekuensi || data[i].frekuensi
    }
    data[i] = newData
    data[i].isEditMode = false
    this.setState({ data, nilai: {}, frekuensi: 0 })
  }

  handleRemoveItem(i) {
    const { data } = this.state
    data.splice(i, 1)
    this.setState({ data })
  }

  render() {
    const { data } = this.state
    const dataTerbesar = data[data.length - 1]
    const dataTerKecil = data[0]
    const xmin = data.length ? (dataTerKecil.nilai.xmin +  dataTerKecil.nilai.xmax) / 2 : 0
    const xmax = data.length ? (dataTerbesar.nilai.xmin +  dataTerbesar.nilai.xmax) / 2 : 0
    const R = data.length ? xmax - xmin : 0;

    return (
      <div className="container">
        <h1>Jarak Kelompok</h1>
        <p>Sama Seperti Jarak Tunggal tapi diambil dari nilai tengah. Rumus umum jangkauan (<b>range</b>) :</p>
        <img src="./src/assets/img-content/jarak-tunggal.png" alt="rumus" style={{maxWidth: 250}} />
        <p>
          <br /> Keterangan :
          <br /> <b>R</b> = Jangkauan
          <br /> <b>Xmin</b> = Nilai Tengah Terkecil.
          <br /> <b>Xmaks</b> = Nilai Tengah Terbesar.
          Jarak terbagi menjadi jarak data tunggal dan jarak data kelompok.
        </p>

        <h3>Do It!</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nilai</th>
              <th>Frekuensi</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {this.state.data.map((item, i) => (
              <tr key={i}>
                <td>
                  {item.isEditMode ?
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleChangeNilai.bind(this)}
                      defaultValue={`${item.nilai.xmin} - ${item.nilai.xmax}`}
                    />
                    :
                    <span>{item.nilai.xmin} - {item.nilai.xmax}</span>
                  }
                </td>
                <td>
                  {item.isEditMode ?
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleChangeFrekuensi.bind(this)}
                      defaultValue={item.frekuensi}
                    />
                    :
                    <span>{item.frekuensi}</span>
                  }
                </td>
                <td>
                  {item.isEditMode ?
                    <button className="btn" onClick={this.handleDoneEditItem.bind(this, i)}>Done</button>
                    : <button className="btn" onClick={this.handleEditItem.bind(this, i)}>Edit</button>
                  }
                  <button className="btn" onClick={this.handleRemoveItem.bind(this, i)}>Remove</button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input type="text"
                  className="form-control"
                  onChange={this.handleChangeNilai.bind(this)}
                  ref={(e) => this.inputNilai = e }/>
              </td>
              <td>
                <input type="text"
                  className="form-control"
                  onChange={this.handleChangeFrekuensi.bind(this)}
                  ref={(e) => this.inputFrekuensi = e }/>
              </td>
              <td>
                <button className="btn" onClick={this.handleAddData.bind(this)}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>

        { data.length &&
          <div>
          <br />
          <b>Xmin: </b>
          <span>({dataTerKecil.nilai.xmin} + {dataTerKecil.nilai.xmax}) / 2 = {xmin}</span>

          <br />
          <b>Xmax: </b>
          <span>({dataTerbesar.nilai.xmin} + {dataTerbesar.nilai.xmax}) / 2 = {xmax}</span>

          {R > 0 &&
          <div>
          <br />
          <b>R: </b>
          <span>{xmax} - {xmin} = {R}</span>
          </div>
          }

          <br />
          </div>
        }
      </div>
    );
  }


}

export default Jarak;
